"use client";

import { Trash2, History, ChevronDown, Terminal, Cpu, Copy, Check, AlertCircle, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryItem {
  id: string;
  displayTitle: string; 
  fullReference: string; // The raw citation string for copying
}

interface ReferenceHistoryProps {
  history: HistoryItem[];
  onSelect: (id: string) => void;
  onClear: () => void;
}

// Added default parameter to history to prevent 'length' of undefined error
export default function ReferenceHistory({ history = [], onSelect, onClear }: ReferenceHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // Internal confirmation state
  const dropdownRef = useRef<HTMLDivElement>(null);

  const copyAllCitations = async () => {
    if (!history || history.length === 0) return;
    
    const allCitations = history.map(item => item.fullReference).join("\n\n");
    
    try {
      await navigator.clipboard.writeText(allCitations);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy citations:", err);
    }
  };

  // Internal purge logic
  const handlePurgeClick = () => {
    if (showConfirm) {
      onClear();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      // Reset if not confirmed within 4 seconds
      setTimeout(() => setShowConfirm(false), 4000);
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setShowConfirm(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Safety check: only return null if history is explicitly empty or null
  if (!history || history.length === 0) return null;

  return (
    <div className="relative w-full flex flex-col group/history" ref={dropdownRef}>
      {/* Header Info Bar */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
            Archive <span className="text-zinc-800">/</span> {history.length} Units
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Bulk Export Button - Hidden during confirmation for space */}
          {!showConfirm && (
            <button 
              onClick={copyAllCitations}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-violet-500/10 border border-white/5 hover:border-violet-500/20 transition-all active:scale-95"
            >
              <span className="text-[9px] font-bold text-zinc-400 group-hover:text-violet-400 transition-colors uppercase tracking-widest">
                {copied ? "Copied" : "Bulk_Export"}
              </span>
              {copied ? (
                <Check size={10} className="text-green-500" />
              ) : (
                <Copy size={10} className="text-zinc-500 group-hover:text-violet-500 transition-colors" />
              )}
            </button>
          )}

          {/* Red Purge Button with Internal Confirmation */}
          <button 
            onClick={handlePurgeClick}
            className={cn(
              "group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all active:scale-95 border",
              showConfirm 
                ? "bg-red-500/20 border-red-500/50 text-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                : "bg-white/5 border-white/5 hover:bg-red-500/10 hover:border-red-500/20 text-zinc-600 hover:text-red-400"
            )}
          >
            <span className="text-[9px] font-bold uppercase tracking-widest">
              {showConfirm ? "Confirm_Purge?" : "Purge"}
            </span>
            {showConfirm ? (
              <AlertCircle size={10} className="text-red-500" />
            ) : (
              <Trash2 size={10} className="group-hover:text-red-500 transition-colors" />
            )}
          </button>

          {/* Cancel button when in confirmation mode */}
          {showConfirm && (
            <button 
              onClick={() => setShowConfirm(false)}
              className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-500 transition-colors"
            >
              <X size={10} />
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 border backdrop-blur-xl",
            isOpen 
              ? "bg-violet-500/5 border-violet-500/30 text-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.1)]" 
              : "bg-zinc-900/20 border-white/[0.03] text-zinc-400 hover:border-white/10 hover:bg-zinc-900/40"
          )}
        >
          <div className="flex items-center gap-4 truncate">
            <div className={cn(
              "p-1.5 rounded-lg border transition-all duration-500",
              isOpen ? "bg-violet-500/20 border-violet-500/40" : "bg-white/5 border-white/5"
            )}>
              <Cpu size={14} className={isOpen ? "text-violet-300" : "text-zinc-600"} />
            </div>
            <div className="flex flex-col items-start truncate">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-50">System_History</span>
              <span className="text-xs font-bold uppercase tracking-[0.1em] truncate transition-colors group-hover:text-zinc-200">
                {isOpen ? "Awaiting_Input..." : "Recall_Previous_Data"}
              </span>
            </div>
          </div>
          <ChevronDown className={cn("shrink-0 transition-transform duration-700 ease-in-out text-zinc-700", isOpen && "rotate-180 text-violet-500")} size={16} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="absolute top-full left-0 right-0 mt-4 p-2 bg-zinc-950/90 backdrop-blur-3xl border border-white/10 rounded-2xl z-[70] shadow-2xl overflow-hidden"
            >
              <div className="max-h-[320px] overflow-y-auto pr-1 custom-scrollbar relative z-10">
                <div className="flex flex-col gap-1">
                  {history.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelect(item.id);
                        setIsOpen(false);
                      }}
                      className="group w-full p-4 text-left flex items-start justify-between bg-white/[0.01] hover:bg-violet-500/10 rounded-xl transition-all border border-transparent hover:border-violet-500/20"
                    >
                      <div className="flex flex-col gap-1.5 truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono text-violet-500/50">0{idx + 1}</span>
                          <span className="text-[11px] font-bold text-zinc-300 group-hover:text-white transition-colors truncate uppercase tracking-wide">
                            {item.displayTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-mono text-zinc-600 flex items-center gap-1 uppercase tracking-tighter">
                            <Terminal size={8} /> hash:{item.id.slice(0, 8)}
                          </span>
                        </div>
                      </div>
                      <History size={12} className="text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(139, 92, 246, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}