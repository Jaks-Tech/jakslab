"use client";

import { Trash2, History, ChevronDown, Search, Database, Terminal, Cpu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryItem {
  id: string;
  displayTitle: string; 
  timestamp?: string; // Optional: adds to the "log" feel
}

interface ReferenceHistoryProps {
  history: HistoryItem[];
  onSelect: (id: string) => void;
  onClear: () => void;
}

export default function ReferenceHistory({ history, onSelect, onClear }: ReferenceHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (history.length === 0) return null;

  return (
    <div className="relative w-full flex flex-col group/history" ref={dropdownRef}>
      {/* Header Info Bar */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
            Local_Archive <span className="text-zinc-800">/</span> {history.length} Units
          </span>
        </div>
        
        <button 
          onClick={onClear}
          className="group flex items-center gap-1.5 px-2 py-1 rounded hover:bg-red-500/5 transition-colors"
        >
          <span className="text-[9px] font-bold text-zinc-600 group-hover:text-red-400 transition-colors uppercase tracking-widest">
            Purge_Cache
          </span>
          <Trash2 size={10} className="text-zinc-700 group-hover:text-red-500 transition-colors" />
        </button>
      </div>

      <div className="relative">
        {/* Main Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 border backdrop-blur-xl",
            "group-hover/history:shadow-[0_0_20px_rgba(139,92,246,0.05)]",
            isOpen 
              ? "bg-violet-500/5 border-violet-500/30 text-violet-400" 
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

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="absolute top-full left-0 right-0 mt-4 p-2 bg-zinc-950/80 backdrop-blur-3xl border border-white/10 rounded-2xl z-[70] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Scanning Line Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                <div className="w-full h-[100px] bg-gradient-to-b from-violet-500/5 to-transparent -translate-y-full animate-[scan_3s_linear_infinite]" />
              </div>

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
                          <span className="h-[2px] w-[2px] rounded-full bg-zinc-800" />
                          <span className="text-[9px] font-mono text-zinc-700">Ready_for_recall</span>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <History size={12} className="text-violet-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}