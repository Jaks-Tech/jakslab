"use client";

import { useState, useEffect, useRef } from "react";
import { Quote, Sparkles, Loader2, X } from "lucide-react";
import StyleSelector from "@/components/citation/StyleSelector";
import CitationOutput from "@/components/citation/CitationOutput";
import ReferenceHistory from "@/components/citation/ReferenceHistory";

// Interface for the raw API response
interface CitationResult {
  full_reference: string;
  in_text: string;
  example: string;
  original_paragraph?: string;
  hash?: string;
}

// Interface for the local history state
interface HistoryItem {
  id: string;
  displayTitle: string;
  fullReference: string; 
  data: CitationResult;
}

export default function CitationGeneratorPage() {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState("APA");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CitationResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow and Condense logic
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "176px"; 
      if (input) {
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = scrollHeight > 176 ? `${scrollHeight}px` : "176px";
      }
    }
  }, [input]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("jakslab_citations_v1");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/cite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawInput: input,
          targetStyle: style,
        }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data: CitationResult = await res.json();
      setResult(data);

      const newEntry: HistoryItem = {
        id: data.hash || Math.random().toString(36).substring(7),
        displayTitle: data.in_text,
        fullReference: data.full_reference,
        data: data,
      };

      const updatedHistory = [
        newEntry,
        ...history.filter((h) => h.displayTitle !== newEntry.displayTitle),
      ].slice(0, 15);

      setHistory(updatedHistory);
      localStorage.setItem("jakslab_citations_v1", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Neural Synthesis failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (id: string) => {
    const selected = history.find((h) => h.id === id);
    if (selected) setResult(selected.data);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("jakslab_citations_v1");
    setResult(null);
  };

  const clearInput = () => {
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "176px";
    }
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20 px-4 sm:px-6 font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-600/10 rounded-full blur-[120px] -z-10" />
          
          <div className="relative mb-12 inline-block group cursor-default">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center justify-center">
              <div className="p-[1px] rounded-full bg-gradient-to-b from-white/20 to-transparent shadow-2xl">
                <div className="rounded-full p-2 bg-zinc-950/90 backdrop-blur-xl">
                  <img
                    src="/cite.png"
                    alt="Logo"
                    className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-zinc-900 border border-white/10 px-3 py-1 rounded-full shadow-xl">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">Live</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <Quote size={14} className="text-violet-400" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-400">Universal Referencing</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Citation
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-200 to-zinc-500 ml-3">Synthesis</span>
            </h1>
            <p className="max-w-xl text-zinc-400 text-base md:text-lg font-light leading-relaxed italic">
              "A high-performance neural engine architected for universal academic precision."
            </p>
          </div>
        </div>

        {/* Input Area */}
        <div className="relative mb-8 group">
          {/* Top-Left Clear Button */}
          {input && !isLoading && (
            <button
              onClick={clearInput}
              className="absolute top-5 right-5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all active:scale-95 group/clear"
            >
              <X size={12} className="group-hover/clear:rotate-90 transition-transform" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Clear</span>
            </button>
          )}

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste reference, DOI, URL, or research paragraph..."
            className="w-full min-h-[11rem] bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 pt-14 pr-24 text-zinc-200 text-sm focus:outline-none focus:border-violet-500/40 resize-none transition-all duration-300 ease-in-out overflow-hidden"
          />

          <div className="absolute bottom-5 right-5">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !input}
              className="px-4 py-2.5 rounded-full bg-violet-600 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-violet-500 disabled:opacity-50 flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-violet-600/20"
            >
              {isLoading ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
              Get Reference
            </button>
          </div>
        </div>

        {/* Tools (Style Selector & History) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <div className="w-full">
            <StyleSelector selected={style} onSelect={setStyle} />
          </div>

          <div className="w-full">
            <ReferenceHistory
              history={(history || []).map((h) => ({
                id: h.id,
                displayTitle: h.displayTitle,
                fullReference: h.fullReference || "", 
              }))}
              onSelect={handleSelectHistory}
              onClear={clearHistory}
            />
          </div>
        </div>

        {/* Result Output */}
        <CitationOutput data={result ?? undefined} isLoading={isLoading} />

      </div>
    </div>
  );
}