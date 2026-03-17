"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Quote, 
  Sparkles, 
  Loader2, 
  X, 
  BookOpen, 
  Link as LinkIcon, 
  FileText 
} from "lucide-react";
import StyleSelector from "@/components/citation/StyleSelector";
import SourcesSelector from "@/components/citation/SourcesSelector";
import CitationOutput from "@/components/citation/CitationOutput";
import ReferenceHistory from "@/components/citation/ReferenceHistory";

/* ---------- API Response Type ---------- */

interface CitationResult {
  references: string[];
  in_text_citations: string[];
  example: string;
  hash?: string;
}

/* ---------- Local History Type ---------- */

interface HistoryItem {
  id: string;
  displayTitle: string;
  fullReference: string;
  data: CitationResult;
}

/* ---------- Quick Examples Data ---------- */
const QUICK_EXAMPLES = [
  {
    label: "Journal DOI",
    icon: <FileText size={14} />,
    value: "https://doi.org/10.1007/s42979-021-00592-x",
  },
  {
    label: "Book Title",
    icon: <BookOpen size={14} />,
    value: "Thinking, Fast and Slow by Daniel Kahneman",
  },
  {
    label: "Website URL",
    icon: <LinkIcon size={14} />,
    value: "https://towardsdatascience.com/machine-learning-in-production-what-this-really-means/",
  },
];

export default function CitationGeneratorPage() {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState("APA");
  const [numSources, setNumSources] = useState(2);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CitationResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* ---------- Auto Resize ---------- */

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "176px";

    if (input) {
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height =
        scrollHeight > 176 ? `${scrollHeight}px` : "176px";
    }
  }, [input]);

  /* ---------- Load History ---------- */

  useEffect(() => {
    const saved = localStorage.getItem("jakslab_citations_v2");

    if (!saved) return;

    try {
      setHistory(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to parse history", e);
    }
  }, []);

  /* ---------- Generate Citation ---------- */

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/cite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rawInput: input,
          targetStyle: style,
          numSources: numSources,
        }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data: CitationResult = await res.json();

      setResult(data);

      const firstReference = data.references?.[0] || "Reference";

      const newEntry: HistoryItem = {
        id: data.hash || Math.random().toString(36).substring(7),
        displayTitle: data.in_text_citations?.join("; ") || "",
        fullReference: firstReference,
        data: data,
      };

      const updatedHistory = [
        newEntry,
        ...history.filter((h) => h.displayTitle !== newEntry.displayTitle),
      ].slice(0, 15);

      setHistory(updatedHistory);

      localStorage.setItem(
        "jakslab_citations_v2",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error("Citation generation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- History Selection ---------- */

  const handleSelectHistory = (id: string) => {
    const selected = history.find((h) => h.id === id);

    if (selected) {
      setResult(selected.data);
    }
  };

  /* ---------- Clear History ---------- */

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("jakslab_citations_v2");
    setResult(null);
  };

  /* ---------- Clear Input ---------- */

  const clearInput = () => {
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "176px";
    }
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20 px-4 sm:px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-600/10 rounded-full blur-[120px] -z-10" />

          <div className="flex flex-col items-center px-4">
            
            {/* --- ROUND LOGO FROM PUBLIC FOLDER --- */}
            <div className="flex justify-center mb-8">
              <div className="relative p-1 rounded-full bg-gradient-to-b from-violet-500 to-purple-600 shadow-2xl shadow-violet-500/20">
                <img 
                  src="/cite.png" // Replace with your actual filename in /public
                  alt="Logo"
                  className="h-20 w-20 rounded-full border-2 border-zinc-950 object-cover"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <Quote size={14} className="text-violet-400" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-400">
                Universal Referencing
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Cite Your
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-200 to-zinc-500 ml-3">
                Work
              </span>

            </h1>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
                  Paste your text, URL, or DOI and get accurate reference source and contextual usage
              </p>
          </div>
        </div>

        {/* Input */}
        <div className="relative mb-8 group">
          {input && !isLoading && (
            <button
              onClick={clearInput}
              className="absolute top-5 right-5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
            >
              <X size={12} />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                Clear
              </span>
            </button>
          )}

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste reference, DOI, URL, or research paragraph..."
            className="w-full min-h-[11rem] bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 pt-14 pr-24 text-zinc-200 text-sm focus:outline-none focus:border-violet-500/40 resize-none"
          />

          {/* Generate Button */}
          <div className="absolute bottom-5 right-5">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !input}
              className="px-4 py-2.5 rounded-full bg-violet-600 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-violet-500 disabled:opacity-50 flex items-center gap-2 transition-all"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Sparkles size={14} />
              )}
              Get References
            </button>
          </div>
        </div>

        {/* Quick Examples (Only shows when empty) */}
        {!input && !result && !isLoading && (
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-[11px] font-medium tracking-[0.1em] uppercase text-zinc-500 mb-3 px-2">
              Try an example
            </h3>
            <div className="flex flex-wrap gap-2">
              {QUICK_EXAMPLES.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(example.value)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/10 text-zinc-300 text-xs transition-all"
                >
                  <span className="text-violet-400">{example.icon}</span>
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <StyleSelector selected={style} onSelect={setStyle} />

          {/* Number of Sources Selector */}
          <SourcesSelector selected={numSources} onSelect={setNumSources} />

          <ReferenceHistory
            history={(history || []).map((h) => ({
              id: h.id,
              displayTitle: h.displayTitle,
              fullReference: h.fullReference,
            }))}
            onSelect={handleSelectHistory}
            onClear={clearHistory}
          />
        </div>

        {/* Result & Empty State */}
        {result ? (
          <CitationOutput data={result} isLoading={isLoading} />
        ) : (
          !isLoading && (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01] mt-8 animate-in fade-in duration-700">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <BookOpen className="text-zinc-500" size={24} />
              </div>
              <h3 className="text-zinc-300 font-medium mb-2">No citations generated yet</h3>
              <p className="text-zinc-500 text-sm max-w-sm">
                Paste your source material above or click one of the examples to instantly generate perfectly formatted references.
              </p>
            </div>
          )
        )}

        {isLoading && !result && (
          <CitationOutput data={undefined} isLoading={true} />
        )}

      </div>
    </div>
  );
}