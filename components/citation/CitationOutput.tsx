"use client";

import { Check, Copy, Globe, BookOpen, Quote, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CitationOutputProps {
  data?: {
    full_reference: string
    in_text: string
    example: string
    original_paragraph?: string
  }
  isLoading?: boolean
}

export default function CitationOutput({ data, isLoading }: CitationOutputProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  /* ---------------- Research Placeholder ---------------- */

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-700">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full mb-6"
        />

        <h3 className="text-lg font-semibold text-zinc-200">
          Scanning scholarly databases
        </h3>

        <p className="text-sm text-zinc-500 mt-2 max-w-sm">
          Extracting research topics, searching recent academic papers, and
          generating a validated citation.
        </p>

        <div className="flex gap-2 mt-6 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          <span>Jakslab</span>
          <span>•</span>
          <span>Crossref</span>
          <span>•</span>
          <span>Neural Citation Engine</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">

      {/* Main Reference Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000" />

        <div className="relative flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-violet-500/10 border border-violet-500/20">
                <Globe size={12} className="text-violet-400" />
              </div>
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold text-zinc-500">
                Validated_Output
              </span>
            </div>
            <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>

          <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/[0.05] rounded-[2rem] p-6 sm:p-10 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 blur-3xl rounded-full" />

            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-2">
                  Primary Reference
                </h2>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,1)]" />
                  <div className="h-[2px] w-12 bg-zinc-800 rounded-full" />
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(data.full_reference, "full")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                  copied === "full"
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                )}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {copied === "full" ? "Captured" : "Copy All"}
                </span>
                {copied === "full" ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>

            <p className="text-base sm:text-xl text-zinc-200 leading-relaxed font-serif">
              {data.full_reference}
            </p>
          </div>
        </div>
      </div>

      {/* Secondary Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">

        {/* In-text citation */}
        <div className="group/card bg-zinc-900/30 border border-white/5 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Quote size={16} className="text-violet-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                In-Text Example
              </span>
            </div>

            <button
              onClick={() => copyToClipboard(data.in_text, "intext")}
              className="p-2 text-zinc-600 hover:text-violet-400"
            >
              {copied === "intext" ? (
                <Check size={16} className="text-emerald-400" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          <p className="text-2xl sm:text-3xl font-bold text-white">
            {data.in_text}
          </p>
        </div>

        {/* Context Module */}
        <div className="group/card bg-zinc-900/30 border border-white/5 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3 text-zinc-500">
              <BookOpen size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Context Example
              </span>
            </div>

            <button
              onClick={() => copyToClipboard(data.example, "example")}
              className="p-2 text-zinc-600 hover:text-indigo-400"
            >
              {copied === "example" ? (
                <Check size={16} className="text-emerald-400" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed">
            {data.original_paragraph ? (
              <>
                {data.original_paragraph}{" "}
                <span className="text-violet-400 font-semibold">
                  {data.in_text}
                </span>
              </>
            ) : (
              `"${data.example}"`
            )}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-6 opacity-30 py-4">
        <div className="flex items-center gap-2">
          <Sparkles size={10} className="text-violet-400" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
            Jakslab Citation Generator
          </span>
        </div>
      </div>
    </div>
  );
}