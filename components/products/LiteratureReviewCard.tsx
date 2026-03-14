"use client";

import Link from "next/link";
import { ArrowRight, ListChecks } from "lucide-react";

export default function LiteratureReviewCard() {
  return (
    <Link href="/literature-planner" className="group relative block h-full w-full max-w-xl">
      {/* Ambient Glow - Emerald/Teal Palette */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

      {/* Card */}
      <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-6 flex flex-col overflow-hidden transition-all duration-500 group-hover:border-emerald-500/30 group-hover:bg-zinc-900/60 shadow-2xl">
        
        {/* Header - Image and Title Inline */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/5 bg-zinc-950/50 flex items-center justify-center group-hover:border-emerald-500/30 transition-colors">
              {/* Replace with your specific literature icon or generic academic icon */}
              <img
                src="/literature.png" 
                alt="Literature Review Icon"
                className="max-h-[70%] max-w-[70%] object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Literature Planner
            </h3>
          </div>
        </div>

        {/* Content Area - Justified Text */}
        <div className="flex flex-col mb-5">
          <p className="text-zinc-400 leading-relaxed text-[13px] sm:text-sm opacity-90 text-justify">
            Create an accurate list of sources and references for any academic topic. Specify your required reference count to generate a curated list of foundational papers, analyze their specific contributions, and identify evolving research themes in your field.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SYNTHESIS_V1.0
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors uppercase tracking-widest">
            Execute Review
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}