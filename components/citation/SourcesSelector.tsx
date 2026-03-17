"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Database, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const OPTIONS = [1,2,3,4,5,6,7,8,9,10];

interface SourcesSelectorProps {
  selected: number;
  onSelect: (n: number) => void;
}

export default function SourcesSelector({ selected, onSelect }: SourcesSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ---------- Close when clicking outside ---------- */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="flex flex-col items-center mb-10 w-full max-w-[300px] mx-auto group"
    >

      {/* Label */}
      <div className="flex items-center gap-2 mb-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
        <Sparkles size={10} className="text-violet-400 animate-pulse" />
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em]">
          Sources
        </span>
      </div>

      <div className="relative w-full">

        {/* Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500",
            "border backdrop-blur-xl overflow-hidden",
            isOpen
              ? "bg-violet-500/10 border-violet-500/40 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
              : "bg-zinc-900/40 border-white/5 hover:border-white/20 hover:bg-zinc-900/60"
          )}
        >

          {/* Indicator */}
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-[2px] bg-violet-500 transition-transform duration-500",
              isOpen ? "scale-y-100" : "scale-y-0"
            )}
          />

          <div className="flex items-center gap-4">

            <div
              className={cn(
                "p-2 rounded-lg transition-colors duration-500",
                isOpen
                  ? "bg-violet-500/20 text-violet-400"
                  : "bg-white/5 text-zinc-500"
              )}
            >
              <Database size={18} strokeWidth={1.5} />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-tighter">
                Sources
              </span>

              <span
                className={cn(
                  "text-sm font-bold tracking-widest transition-colors duration-300",
                  isOpen ? "text-white" : "text-zinc-300"
                )}
              >
                {selected}
              </span>
            </div>

          </div>

          <ChevronDown
            size={18}
            className={cn(
              "transition-all duration-500 ease-out text-zinc-600",
              isOpen && "rotate-180 text-violet-400"
            )}
          />
        </button>

        {/* Dropdown */}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-3 p-2 bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl z-[60]"
            >
              <div className="space-y-1">

                {OPTIONS.map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      onSelect(n);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "group w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300",
                      selected === n
                        ? "bg-violet-500/10 text-violet-400"
                        : "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                    )}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                      {n}
                    </span>

                    {selected === n && (
                      <motion.div layoutId="checkSources">
                        <Check size={14} className="text-violet-400" strokeWidth={3} />
                      </motion.div>
                    )}
                  </button>
                ))}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}