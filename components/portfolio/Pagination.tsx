"use client";

import { useSearchParams } from "next/navigation";
import { Category } from "@/lib/categories";

export default function ResultsInfo({
  total,
}: {
  total: number;
}) {
  const searchParams = useSearchParams();
  const activeCategory =
    (searchParams.get("category") as Category | null) ?? null;

  return (
    <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 rounded-3xl px-8 py-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500">
      
      {/* Results Info */}
      <div className="text-slate-400 text-sm md:text-base text-center md:text-left">
        {activeCategory ? (
          <>
            Showing <span className="font-semibold text-white">{total}</span> articles in{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {activeCategory}
            </span>
          </>
        ) : (
          <>
            Showing <span className="font-semibold text-white">{total}</span> total articles
          </>
        )}
      </div>

      {/* Clear Filter */}
      {activeCategory && (
        <a
          href="/portfolio"
          className="text-sm font-medium text-blue-400 hover:text-white transition-colors duration-300"
        >
          Clear Filter
        </a>
      )}
    </div>
  );
}