"use client";

import { useState, useEffect } from "react";
import { Quote, Sparkles, Loader2 } from "lucide-react";
import StyleSelector from "@/components/citation/StyleSelector";
import CitationOutput from "@/components/citation/CitationOutput";
import ReferenceHistory from "@/components/citation/ReferenceHistory";

// Interface Definitions
interface CitationResult {
  full_reference: string;
  in_text: string;
  example: string;
  hash?: string;
}

interface HistoryItem {
  id: string;
  displayTitle: string;
  data: CitationResult;
}

export default function CitationGeneratorPage() {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState("APA");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CitationResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("jakslab_citations_v1");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/cite", {
        method: "POST",
        body: JSON.stringify({ rawInput: input, targetStyle: style }),
      });
      
      const data: CitationResult = await res.json();
      setResult(data);

      const newEntry: HistoryItem = {
        id: data.hash || Math.random().toString(36).substring(7),
        displayTitle: data.in_text,
        data: data
      };

      const updatedHistory = [
        newEntry,
        ...history.filter(h => h.displayTitle !== newEntry.displayTitle)
      ].slice(0, 10);

      setHistory(updatedHistory);
      localStorage.setItem("jakslab_citations_v1", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Neural Synthesis failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (id: string) => {
    const selected = history.find(h => h.id === id);
    if (selected) setResult(selected.data);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("jakslab_citations_v1");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-600/10 rounded-full blur-[120px] -z-10" />

        {/* Logo Container */}
        <div className="relative mb-12 inline-block group cursor-default">
            {/* Animated Ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-1000 group-hover:duration-200" />
            
            <div className="relative flex items-center justify-center">
            {/* Outer Border */}
            <div className="p-[1px] rounded-full bg-gradient-to-b from-white/20 to-transparent shadow-2xl">
                <div className="rounded-full p-2 bg-zinc-950/90 backdrop-blur-xl">
                <img 
                    src="/cite.png" 
                    alt="Logo" 
                    className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500" 
                />
                </div>
            </div>
            
            {/* Floating Badge (Neural Engine Indicator) */}
            <div className="absolute -bottom-2 -right-2 bg-zinc-900 border border-white/10 px-3 py-1 rounded-full shadow-xl">
                <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">Live</span>
                </div>
            </div>
            </div>
        </div>

        <div className="flex flex-col items-center px-4">
            {/* Micro-label */}
            <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <Quote size={14} className="text-violet-400" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-400">Universal Referencing</span>
            </div>

            {/* Typography with Gradient & Kerning */}
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Citation 
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-200 to-zinc-500 ml-3">
                Synthesis
            </span>
            </h1>

            {/* Refined Copy */}
            <p className="max-w-xl text-zinc-400 text-base md:text-lg font-light leading-relaxed italic">
            "A high-performance <span className="text-zinc-200">neural engine</span> architected for 
            universal academic precision and seamless style transformation."
            </p>

            {/* Decorative Divider */}
            <div className="mt-8 flex items-center gap-4 w-full max-w-[200px]">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-zinc-800" />
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-zinc-800" />
            </div>
        </div>
        </div>

        {/* Input Terminal Area */}
        <div className="relative mb-8 group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste raw reference, URL, or DOI here..."
            className="w-full h-44 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 text-zinc-200 text-sm focus:outline-none focus:border-violet-500/40 transition-all resize-none shadow-2xl group-hover:bg-zinc-900/50"
          />
          
          <button
            onClick={handleGenerate}
            disabled={isLoading || !input}
            className="absolute bottom-5 right-5 px-3 py-2.5 rounded-full bg-violet-600 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-violet-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-violet-500/20"
          >
            {isLoading ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
            Process_Reference
          </button>
        </div>

        {/* Workbench: Dropdowns Side-by-Side */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-6 mb-16">
          <div className="w-full md:max-w-[320px]">
            <StyleSelector selected={style} onSelect={setStyle} />
          </div>
          <div className="w-full md:max-w-[320px]">
            <ReferenceHistory 
              history={history.map(h => ({ id: h.id, displayTitle: h.displayTitle }))}
              onSelect={handleSelectHistory}
              onClear={clearHistory}
            />
          </div>
        </div>

        {/* Result Output */}
        {result && (
          <div className="animate-in fade-in zoom-in duration-500">
             <CitationOutput data={result} />
          </div>
        )}
      </div>
    </div>
  );
}