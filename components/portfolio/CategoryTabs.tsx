"use client";

import { useState, useRef, useEffect } from "react";
import {
  CATEGORIES,
  Category,
  getCategoryStyles,
} from "@/lib/categories";
import { ChevronDown } from "lucide-react";

interface Props {
  onSelect: (category: Category | null) => void;
}

export default function CategoryTabs({ onSelect }: Props) {
  const [active, setActive] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (category: Category | null) => {
    setActive(category);
    onSelect(category);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===============================
      DARK GLASS CATEGORY HELPERS
  =============================== */

  const getCategoryClasses = () =>
    "bg-white/5 text-slate-300 border border-white/10 hover:border-blue-500/40 hover:text-white";

  const getActiveAllClasses = () =>
    "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-transparent shadow-[0_0_20px_rgba(59,130,246,0.35)]";

  return (
    <>
      {/* ===============================
           MOBILE DROPDOWN
      =============================== */}
      <div className="mt-10 md:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white transition-all duration-300 hover:border-blue-500/40 outline-none select-none"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <span className="font-bold text-white text-lg tracking-tight">
            {active ?? "All Categories"}
          </span>

          <ChevronDown
            size={22}
            className={`transition-transform duration-500 ${
              open ? "rotate-180 text-blue-400" : "text-white"
            }`}
          />
        </button>

        <div
          className={`absolute left-0 right-0 mt-2 z-50 overflow-hidden transition-all duration-300 rounded-xl border border-white/10 bg-[#0a0f1d] shadow-2xl ${
            open ? "max-h-96 opacity-100 p-3" : "max-h-0 opacity-0 p-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleSelect(null)}
              className={`px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all ${
                !active
                  ? getActiveAllClasses()
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              All Categories
            </button>

            {CATEGORIES.map((cat) => {
              const isActive = active === cat.name;
              const styles = getCategoryStyles(cat.name);

              return (
                <button
                  key={cat.name}
                  onClick={() => handleSelect(cat.name)}
                  className={`px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all flex items-center gap-3 ${
                    isActive
                      ? `${styles.badge} border-transparent text-white` // Apply category specific color when active
                      : `text-slate-300 hover:bg-white/10 hover:text-white`
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} bg-current ${isActive ? 'animate-pulse' : ''}`} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===============================
           DESKTOP TABS
      =============================== */}
      <div className="hidden md:flex flex-wrap gap-4 mt-10">
        <button
          onClick={() => handleSelect(null)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
            !active
              ? getActiveAllClasses()
              : `${getCategoryClasses()}`
          }`}
        >
          All
        </button>

        {CATEGORIES.map((cat) => {
          const isActive = active === cat.name;
          const styles = getCategoryStyles(cat.name);

          return (
            <button
              key={cat.name}
              onClick={() => handleSelect(cat.name)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${
                isActive
                  ? `${styles.badge} border-transparent text-white font-bold` // Use dynamic styles
                  : `${getCategoryClasses()}`
              }`}
            >
              {isActive && <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} bg-current animate-pulse`} />}
              {cat.name}
            </button>
          );
        })}
      </div>
    </>
  );
}