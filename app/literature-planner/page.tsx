"use client";

import { useState, useEffect, useRef } from "react";
import { Layers, Library, Sparkles, Loader2, X, SlidersHorizontal, BookOpenCheck } from "lucide-react";
import StyleSelector from "@/components/citation/StyleSelector";
import LiteratureOutput from "@/components/literature-planner/LiteratureOutput";
import ReferenceHistory from "@/components/citation/ReferenceHistory";

export default function LiteraturePlannerPage() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("APA");
  const [refCount, setRefCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow logic matching the high-performance UI
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "176px"; 
      if (topic) {
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = scrollHeight > 176 ? `${scrollHeight}px` : "176px";
      }
    }
  }, [topic]);

  // Load history from unique Literature local storage key
  useEffect(() => {
    const saved = localStorage.getItem("jakslab_lit_plans_v1");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/literature-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic,
          targetStyle: style,
          refCount: refCount,
        }),
      });

      if (!res.ok) throw new Error("Synthesis failed");

      const data = await res.json();
      setResult(data);

      const newEntry = {
        id: data.topic_hash || Math.random().toString(36).substring(7),
        displayTitle: data.topic,
        fullReference: `${data.literature_plan?.length ?? 0} Sources Synthesized`,
        data: data,
      };

      const updatedHistory = [
        newEntry,
        ...history.filter((h) => h.displayTitle !== newEntry.displayTitle),
      ].slice(0, 15);

      setHistory(updatedHistory);
      localStorage.setItem("jakslab_lit_plans_v1", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Neural Mapping failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (id: string) => {
    const selected = history.find((h) => h.id === id);
    if (selected) {
      setResult(selected.data);
      setTopic(selected.data.topic); 
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("jakslab_lit_plans_v1");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20 px-4 sm:px-6 font-sans text-zinc-400">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-600/10 rounded-full blur-[120px] -z-10" />
          
          <div className="relative mb-12 inline-block group cursor-default">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-1000" />
            <div className="relative flex items-center justify-center">
              <div className="p-[1px] rounded-full bg-gradient-to-b from-white/20 to-transparent shadow-2xl">
                <div className="rounded-full p-2 bg-zinc-950/90 backdrop-blur-xl">
                  <img src="/literature.png" alt="Logo" className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-zinc-900 border border-white/10 px-3 py-1 rounded-full shadow-xl">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">Archiver</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <Library size={14} className="text-emerald-400" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-400">Topic Synthesis</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Research <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-200 to-zinc-500">Architect</span>
            </h1>
            <p className="max-w-xl text-zinc-400 text-base md:text-lg font-light leading-relaxed italic">
              "A strategic neural engine designed for multi-source academic mapping and theme extraction."
            </p>
          </div>
        </div>

        {/* Input Area */}
        <div className="relative mb-8 group">
          {topic && !isLoading && (
            <button
              onClick={() => setTopic("")}
              className="absolute top-5 right-5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <X size={12} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Clear</span>
            </button>
          )}

          <textarea
            ref={textareaRef}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter research topic or thesis statement..."
            className="w-full min-h-[11rem] bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 pt-14 pr-24 text-zinc-200 text-lg focus:outline-none focus:border-emerald-500/40 transition-all duration-300"
          />

          <div className="absolute bottom-5 right-5">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !topic}
              className="px-6 py-3 rounded-full bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-emerald-500 disabled:opacity-50 flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-600/20"
            >
              {isLoading ? <Loader2 className="animate-spin" size={14} /> : <BookOpenCheck size={14} />}
              Generate Sources
            </button>
          </div>
        </div>

        {/* Configuration Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="md:col-span-1">
            <StyleSelector selected={style} onSelect={setStyle} />
          </div>

          {/* Compact Reference Count Tool */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-3 px-4 flex flex-col justify-center group/slider">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                <SlidersHorizontal size={10} />
                Sources
              </div>
              <input 
                type="number"
                min="1" max="20"
                value={refCount}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setRefCount(isNaN(val) ? 1 : Math.min(Math.max(val, 1), 20));
                }}
                className="bg-zinc-950/50 border border-white/10 rounded w-10 text-center py-0 text-emerald-400 font-mono text-[11px] focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <input 
              type="range" min="1" max="20" step="1" 
              value={refCount} 
              onChange={(e) => setRefCount(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="md:col-span-1">
            <ReferenceHistory
              history={history.map((h) => ({
                id: h.id,
                displayTitle: h.displayTitle,
                fullReference: h.fullReference, 
              }))}
              onSelect={handleSelectHistory}
              onClear={clearHistory}
            />
          </div>
        </div>

        <LiteratureOutput data={result ?? undefined} isLoading={isLoading} />
        {/* 4. System Methodology & Documentation */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 border-t border-white/5 pt-16">
          
          {/* Phase 1: Neural Discovery */}
          <div className="group space-y-4 p-8 rounded-[2rem] bg-zinc-900/20 border border-white/5 hover:border-emerald-500/20 transition-all duration-500">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Library size={20} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Phase 01: Neural Discovery</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              The engine executes a high-dimensional search across **OpenAlex** and **Crossref** databases, filtering over 250 million records to isolate foundational papers that match your specific thematic scope.
            </p>
          </div>

          {/* Phase 2: Synthesis Mapping */}
          <div className="group space-y-4 p-8 rounded-[2rem] bg-zinc-900/20 border border-white/5 hover:border-emerald-500/20 transition-all duration-500">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Layers size={20} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Phase 02: Synthesis Mapping</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              Each source is processed through a synthesis transformer that extracts core contributions, verifies academic relevance, and creates a logical relationship between the paper and your central research claim.
            </p>
          </div>

          {/* Phase 3: Thematic Clustering */}
          <div className="group space-y-4 p-8 rounded-[2rem] bg-zinc-900/20 border border-white/5 hover:border-emerald-500/20 transition-all duration-500 md:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Phase 03: Thematic Clustering</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              The final output clusters research into evolving themes, allowing you to visualize the current trajectory of the academic conversation and identify "gaps" for your own literature review.
            </p>
          </div>
        </div>

        {/* 5. Quick Start / Pro-Tips Bar */}
        <div className="max-w-3xl mx-auto p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-1">Architecture Pro-Tip</h4>
            <p className="text-[11px] text-zinc-500 italic leading-relaxed">
              "For deep-dive reviews, start with a 5-source overview to map the themes, then run a 12-source generation on the most relevant theme discovered."
            </p>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-900 flex items-center justify-center text-[10px] font-bold text-emerald-500/50">
                0{i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}