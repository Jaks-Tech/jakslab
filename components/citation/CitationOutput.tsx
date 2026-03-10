"use client";

import { Check, Copy, Globe, BookOpen, Quote, Sparkles, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CitationOutputProps {
  data: {
    full_reference: string;
    in_text: string;
    example: string;
  };
}

export default function CitationOutput({ data }: CitationOutputProps) {
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

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* 1. Main Reference Card */}
      <div className="relative group">
        {/* Decorative Background Glow */}
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
            {/* Corner Accent */}
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
                onClick={() => copyToClipboard(data.full_reference, 'full')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                  copied === 'full' 
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" 
                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                )}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {copied === 'full' ? "Captured" : "Copy All"}
                </span>
                {copied === 'full' ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            
            <div className="relative">
               <p className="text-base sm:text-xl text-zinc-200 leading-relaxed font-serif pl-0 sm:pl-2">
                {data.full_reference}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Secondary Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        
        {/* In-Text Citation Block */}
        <div className="group/card relative bg-zinc-900/30 border border-white/5 rounded-3xl p-6 transition-all hover:bg-zinc-900/50 hover:border-violet-500/20">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 group-hover/card:scale-110 transition-transform">
                <Quote size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">In_Text.sys</span>
            </div>
            <button 
              onClick={() => copyToClipboard(data.in_text, 'intext')}
              className="p-2 text-zinc-600 hover:text-violet-400 transition-colors"
            >
              {copied === 'intext' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-zinc-600">RENDERED_CLIP:</span>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tighter">
              {data.in_text}
            </p>
          </div>
        </div>

        {/* Usage Example Block */}
        <div className="group/card relative bg-zinc-900/30 border border-white/5 rounded-3xl p-6 transition-all hover:bg-zinc-900/50 hover:border-indigo-500/20">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3 text-zinc-500">
              <div className="p-2 rounded-xl bg-zinc-800 text-zinc-400 group-hover/card:scale-110 transition-transform">
                <BookOpen size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Context_Module</span>
            </div>
            <button 
              onClick={() => copyToClipboard(data.example, 'example')}
              className="p-2 text-zinc-600 hover:text-indigo-400 transition-colors"
            >
              {copied === 'example' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>
          <div className="space-y-2">
             <span className="text-[10px] font-mono text-zinc-600 uppercase">Implementation:</span>
             <p className="text-[13px] sm:text-sm text-zinc-400 leading-relaxed font-light italic">
               "{data.example}"
             </p>
          </div>
        </div>
      </div>

      {/* Footer System Meta */}
      <div className="flex items-center justify-center gap-6 opacity-30 py-4">
          <div className="flex items-center gap-2">
            <Sparkles size={10} className="text-violet-400" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Neural_Standard_2.1</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Precision_Encrypted</span>
          </div>
      </div>
    </div>
  );
}