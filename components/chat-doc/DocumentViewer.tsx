"use client";

import { useState } from "react";
import { 
  FileText, 
  ChevronDown, 
  RefreshCw, 
  Database, 
  Fingerprint, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";

type Props = {
  title: string;
  documentId: string;
  chunks?: number;
  onReset: () => void;
};

export default function DocumentViewer({
  title,
  documentId,
  chunks,
  onReset,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto mb-10 px-4 sm:px-0 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-white/20">
        
        {/* Main Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-inner">
              <FileText size={24} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-tight uppercase">
                  Source Active
                </h2>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              <p className="text-sm text-zinc-400 font-medium truncate max-w-[200px] sm:max-w-md">
                {title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                isOpen 
                ? "bg-white/10 border-white/20 text-white" 
                : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Details
              <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/10 hover:border-red-500/30 transition-all active:scale-95"
            >
              <RefreshCw size={14} />
              <span className="hidden xs:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Collapsible Dropdown Content */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out border-t border-white/5 bg-black/20 ${
            isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Metadata Item 1 */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Fingerprint size={12} /> Reference ID
              </span>
              <p className="text-xs font-mono text-zinc-300 break-all bg-white/5 p-2 rounded-lg border border-white/5">
                {documentId}
              </p>
            </div>

            {/* Metadata Item 2 */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Database size={12} /> Vector Chunks
              </span>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                {chunks || 0} segments indexed
                <ShieldCheck size={14} className="text-emerald-500/50" />
              </div>
            </div>

            {/* Metadata Item 3 */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <ExternalLink size={12} /> Status
              </span>
              <p className="text-xs font-semibold text-zinc-300">
                Ready for Analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}