"use client";

import { useSearchParams } from "next/navigation";
import { CATEGORIES, Category } from "@/lib/categories";

interface Props {
  onSelect: (category: Category | null) => void;
}

export default function CategoryFilter({ onSelect }: Props) {
  const searchParams = useSearchParams();
  const active = (searchParams.get("category") as Category | null) ?? null;

  return (
    <div aria-label="Filter articles by category" className="-mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
      <div className="flex w-max min-w-full gap-2 border-b border-slate-300 pb-4">
        <button
          type="button"
          onClick={() => onSelect(null)}
          aria-pressed={!active}
          className={`shrink-0 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
            !active
              ? "border-slate-900 bg-[#202733] text-[#fff]"
              : "border-slate-300 bg-white text-slate-800 hover:border-slate-600"
          }`}
        >
          All articles
        </button>
        {CATEGORIES.map((category) => {
          const isActive = active === category.name;
          return (
            <button
              key={category.name}
              type="button"
              onClick={() => onSelect(category.name)}
              aria-pressed={isActive}
              className={`shrink-0 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "border-slate-900 bg-[#202733] text-[#fff]"
                  : "border-slate-300 bg-white text-slate-800 hover:border-slate-600"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
