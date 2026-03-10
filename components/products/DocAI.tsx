"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function DocAICard() {
  return (
    <Link href="/chat-doc" className="group relative block h-full w-full max-w-xl">
      {/* Ambient Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

      {/* Card */}
      <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-6 flex flex-col overflow-hidden transition-all duration-500 group-hover:border-cyan-500/30 group-hover:bg-zinc-900/60 shadow-2xl">
        
        {/* Header - Image and Title Inline & Centered */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/5 bg-zinc-950/50 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
              <img
                src="/ai-doc.png"
                alt="Logo"
                className="max-h-[70%] max-w-[70%] object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Jakslab Doc-AI
            </h3>
          </div>
          

        </div>

        {/* Content Area - Justified Text */}
        <div className="flex flex-col mb-5">
          <p className="text-zinc-400 leading-relaxed text-[13px] sm:text-sm opacity-90 text-justify">
            Upload documents and ask questions about their content. DocAI reads
            your files and gives instant answers based on the information inside,
            utilizing secure neural processing to maintain data privacy and 
            source-accurate responses.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            DOC_AI_READY
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors uppercase tracking-widest">
            Open Terminal
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}