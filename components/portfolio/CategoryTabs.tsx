"use client";

import { useState } from "react";
import {
  CATEGORIES,
  Category,
  getCategoryTheme,
} from "@/lib/categories";

interface Props {
  onSelect: (category: Category | null) => void;
}

export default function CategoryTabs({ onSelect }: Props) {
  const [active, setActive] = useState<Category | null>(null);

  const handleSelect = (category: Category | null) => {
    setActive(category);
    onSelect(category);
  };

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
      return "bg-blue-600 text-white border-transparent";
    if (theme === "indigo")
      return "bg-indigo-600 text-white border-transparent";
    if (theme === "emerald")
      return "bg-emerald-600 text-white border-transparent";
    if (theme === "purple")
      return "bg-purple-600 text-white border-transparent";
    if (theme === "orange")
      return "bg-orange-600 text-white border-transparent";
    if (theme === "pink")
      return "bg-pink-600 text-white border-transparent";

    return "bg-slate-900 text-white border-transparent";
  };

  return (
    <div className="flex flex-wrap gap-4 mt-10">

      {/* All Button */}
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

      {/* Categories */}
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
  );
}