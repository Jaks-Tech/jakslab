"use client";

import { useState, useRef, useEffect } from "react";
import {
  CATEGORIES,
  Category,
  getCategoryTheme,
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

  // Close dropdown when clicking outside
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
     CATEGORY STYLE HELPERS
  =============================== */

  const getCategoryClasses = (category: Category) => {
    const theme = getCategoryTheme(category);

    if (theme === "blue")
      return "bg-blue-50 text-blue-600 border-blue-200";
    if (theme === "indigo")
      return "bg-indigo-50 text-indigo-600 border-indigo-200";
    if (theme === "emerald")
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    if (theme === "purple")
      return "bg-purple-50 text-purple-600 border-purple-200";
    if (theme === "orange")
      return "bg-orange-50 text-orange-600 border-orange-200";
    if (theme === "pink")
      return "bg-pink-50 text-pink-600 border-pink-200";

    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getActiveCategoryClasses = (category: Category) => {
    const theme = getCategoryTheme(category);

    if (theme === "blue")
      return "bg-blue-600 text-white";
    if (theme === "indigo")
      return "bg-indigo-600 text-white";
    if (theme === "emerald")
      return "bg-emerald-600 text-white";
    if (theme === "purple")
      return "bg-purple-600 text-white";
    if (theme === "orange")
      return "bg-orange-600 text-white";
    if (theme === "pink")
      return "bg-pink-600 text-white";

    return "bg-slate-900 text-white";
  };

  return (
    <>
      {/* ===============================
         MOBILE DROPDOWN
      =============================== */}
      <div className="mt-10 md:hidden" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-3 rounded-xl border border-slate-300 bg-white shadow-sm text-slate-700"
        >
          <span className="font-medium">
            {active ?? "All Categories"}
          </span>

          <ChevronDown
            size={20}
            className={`transition-transform duration-300 ${
              open ? "rotate-180 text-slate-900" : "text-slate-500"
            }`}
          />
        </button>

        {/* Animated Dropdown */}
        <div
          className={`mt-2 overflow-hidden transition-all duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 p-2 rounded-xl border border-slate-200 bg-white shadow-lg">
            <button
              onClick={() => handleSelect(null)}
              className={`px-4 py-2 rounded-lg text-left text-sm font-medium ${
                !active
                  ? "bg-slate-900 text-white"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              All
            </button>

            {CATEGORIES.map((cat) => {
              const isActive = active === cat.name;

              return (
                <button
                  key={cat.name}
                  onClick={() => handleSelect(cat.name)}
                  className={`px-4 py-2 rounded-lg text-left text-sm font-medium transition ${
                    isActive
                      ? `${getActiveCategoryClasses(cat.name)}`
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
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
          className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
            !active
              ? "bg-slate-900 text-white border-slate-900 shadow"
              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          All
        </button>

        {CATEGORIES.map((cat) => {
          const isActive = active === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => handleSelect(cat.name)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                isActive
                  ? `${getActiveCategoryClasses(cat.name)} shadow`
                  : `${getCategoryClasses(cat.name)} hover:opacity-80`
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </>
  );
}