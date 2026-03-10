"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function CitationHelperCard() {
  return (
    <Link href="/citation-generator" className="group relative block h-full w-full outline-none">
      {/* Ambient Glow - Reduced intensity on mobile for performance */}
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/10 to-indigo-600/10 rounded-[1.5rem] sm:rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

      {/* Card Container */}
      <div className="relative h-full w-full bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col overflow-hidden transition-all duration-500 group-hover:border-violet-500/40 group-hover:bg-zinc-900/60 shadow-2xl">
        
        {/* Header - Scaled for small devices */}
        <div className="flex flex-col items-center justify-center mb-5 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl overflow-hidden border border-white/5 bg-zinc-950/50 flex items-center justify-center group-hover:border-violet-500/30 transition-colors shrink-0">
              <img
                src="/cite.png"
                alt="Citation Logo"
                className="max-h-[65%] max-w-[65%] object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Citation Generator
            </h3>
          </div>

        </div>

        {/* Content Area - Justified on Tablet/Desktop, Left-aligned on Mobile */}
        <div className="flex-1 flex flex-col mb-6">
          <p className="text-zinc-400 leading-relaxed text-[12px] sm:text-[13px] md:text-sm opacity-90 text-left sm:text-justify">
            Automate academic referencing with precision. Generate perfectly formatted citations and in-text references across APA, MLA, Harvard, and Chicago styles. Our engine ensures compliance with the latest manual editions for journals, books, and digital sources.
          </p>
        </div>

        {/* Footer - Optimized for touch targets */}
        <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-600 uppercase tracking-tighter">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="hidden xs:inline">REF_ENGINE_</span>V1.0
          </div>

          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-violet-400 group-hover:text-violet-300 transition-colors uppercase tracking-widest cursor-pointer">
            <span className="hidden sm:inline">Format Source</span>
            <span className="sm:hidden">Start</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}