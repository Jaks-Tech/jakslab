"use client";

import { Check, Copy, BookOpen, Layers, Terminal, Sparkles, Hash, ExternalLink, Link2, Target, List } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

export default function LiteratureOutput({ data, isLoading }: any) {
  const [copied, setCopied] = useState<number | null>(null);
  const [copyAllStatus, setCopyAllStatus] = useState(false);

  const handleCopyAll = async () => {
    if (!data?.literature_plan || data.literature_plan.length === 0) return;
    
    // Explicitly mapping to citation text to avoid summary strings from history
    const allCitations = data.literature_plan
      .map((item: any) => item.citation)
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(allCitations);
      setCopyAllStatus(true);
      setTimeout(() => setCopyAllStatus(false), 2000);
    } catch (err) {
      console.error("Bulk copy failed", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-700">
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="relative w-16 h-16 border-2 border-emerald-500 border-t-transparent rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={20} className="text-emerald-400 animate-pulse" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Mapping Research Landscape
          </h3>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto font-light leading-relaxed px-6">
            Analyzing paper intersections, extracting core contributions, and synthesizing thematic clusters for your topic.
          </p>
        </div>

        {/* Thematic Progress Bits */}
        <div className="mt-10 flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1] 
              }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* 1. Executive Summary */}
      <div className="bg-zinc-950/20 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
           <Terminal size={120} />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Terminal size={16} className="text-emerald-400" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500">Topic Overview</span>
          </div>

          <button 
            onClick={handleCopyAll}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all active:scale-95 group/btn shadow-lg"
          >
            {copyAllStatus ? <Check size={14} /> : <List size={14} className="group-hover/btn:rotate-12 transition-transform" />}
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Copy {data.literature_plan?.length || ''} Sources
            </span>
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10 tracking-tight">
          {data.topic}
        </h2>
        <p className="text-zinc-400 leading-relaxed italic text-lg font-light relative z-10 max-w-4xl">
          {data.topic_summary}
        </p>
      </div>

      

      {/* 2. Synthesis Matrix */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 px-4">
          <Layers size={14} className="text-emerald-500" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Source_Matrix_Analysis</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
        </div>

        {(data.literature_plan ?? []).map((item: any, idx: number) => (
          <div key={idx} className="group relative bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 flex flex-col gap-8 transition-all hover:bg-zinc-900/60 hover:border-emerald-500/20 shadow-xl">
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-emerald-500/50">#0{idx + 1}</span>
                <div className={cn(
                    "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                    item.relevance === "High" 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                      : "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
                )}>
                  {item.relevance} Relevance
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.link && item.link !== "#" && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                    title="View Original Source"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <button 
                    onClick={() => {navigator.clipboard.writeText(item.citation); setCopied(idx); setTimeout(()=>setCopied(null),2000);}} 
                    className="p-2.5 rounded-full bg-white/5 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all active:scale-90"
                >
                  {copied === idx ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-8">
                <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Link2 size={12} className="text-emerald-500/50" /> Formal Reference
                    </h4>
                    <p className="text-zinc-200 font-serif leading-relaxed text-xl italic group-hover:text-white transition-colors">
                      {item.citation}
                    </p>
                </div>
                
                <div className="pt-6 border-t border-white/5">
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <BookOpen size={12} className="text-emerald-500/50" /> Content Abstract
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed text-justify font-light">
                      {item.content_snippet}
                    </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/[0.01] border border-white/5 rounded-3xl p-6 self-start group-hover:bg-emerald-500/[0.03] group-hover:border-emerald-500/10 transition-all duration-500">
                <div className="flex items-center gap-2 mb-4 text-emerald-400/80">
                  <Target size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Thematic Relationship</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-medium italic">
                  "{item.relationship}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Themes Footer */}
      <div className="flex flex-col items-center pt-10 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles size={14} className="text-emerald-500" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Inferred Topic Sources</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
          {(data.suggested_themes ?? []).map((theme: string, i: number) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -2 }}
              className="px-5 py-2.5 rounded-full bg-zinc-900/50 border border-white/5 text-[11px] text-zinc-400 flex items-center gap-2 hover:border-emerald-500/40 hover:text-emerald-400 transition-all cursor-default shadow-sm"
            >
              <Hash size={10} className="text-zinc-600" /> {theme}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}