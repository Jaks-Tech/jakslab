"use client";

import { Check, Copy, Globe, BookOpen, Quote, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CitationOutputProps {
  data?: {
    references: string[];
    in_text_citations: string[];
    example: string;
  };
  isLoading?: boolean;
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

  /* ---------------- Loading State ---------------- */

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
          generating validated citations.
        </p>
      </div>
    );
  }

  if (!data) return null;

  const combinedCitations = data.in_text_citations?.join("; ");

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">

      {/* REFERENCES BLOCK */}

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000" />

        <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/[0.05] rounded-[2rem] p-6 sm:p-10 shadow-2xl">

          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-2">
                References
              </h2>
            </div>

            <button
              onClick={() =>
                copyToClipboard(data.references.join("\n"), "refs")
              }
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                copied === "refs"
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
              )}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {copied === "refs" ? "Copied" : "Copy All"}
              </span>
              {copied === "refs" ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>

          <div className="space-y-4">
            {data.references?.map((ref, i) => (
              <div
                key={i}
                className="flex justify-between items-start gap-4 bg-zinc-900/40 border border-white/5 rounded-xl p-4"
              >
                <p className="text-zinc-200 text-sm leading-relaxed font-serif">
                  {ref}
                </p>

                <button
                  onClick={() => copyToClipboard(ref, `ref-${i}`)}
                  className="text-zinc-500 hover:text-violet-400"
                >
                  {copied === `ref-${i}` ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECONDARY BLOCKS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">

        {/* IN TEXT CITATIONS */}

        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6">

          <div className="flex justify-between items-center mb-8">

            <div className="flex items-center gap-3">
              <Quote size={16} className="text-violet-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                In-Text Citations
              </span>
            </div>

            <button
              onClick={() => copyToClipboard(combinedCitations, "intext")}
              className="p-2 text-zinc-600 hover:text-violet-400"
            >
              {copied === "intext" ? (
                <Check size={16} className="text-emerald-400" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          <p className="text-xl sm:text-2xl font-semibold text-white">
            {combinedCitations}
          </p>

        </div>

        {/* CONTEXT / EXAMPLE */}

        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6">

          <div className="flex justify-between items-center mb-8">

            <div className="flex items-center gap-3 text-zinc-500">
              <BookOpen size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Contextual Use
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

          <p className="text-sm text-zinc-400 leading-relaxed italic">
            {data.example}
          </p>

        </div>

      </div>

      {/* FOOTER */}

      <div className="flex items-center justify-center gap-6 opacity-30 py-4">
        <div className="flex items-center gap-2">
          <Sparkles size={10} className="text-violet-400" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
            Jakslab Neural Citation Engine
          </span>
        </div>
      </div>

    </div>
  );
}