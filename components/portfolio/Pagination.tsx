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
    <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-slate-200 rounded-3xl px-8 py-6 shadow-sm">
      
      {/* Results Info */}
      <div className="text-slate-700 text-sm md:text-base">
        {activeCategory ? (
          <>
            Showing <span className="font-semibold">{total}</span> articles in{" "}
            <span className="font-semibold text-blue-600">
              {activeCategory}
            </span>
          </>
        ) : (
          <>
            Showing <span className="font-semibold">{total}</span> total articles
          </>
        )}
      </div>

      {/* Clear Filter */}
      {activeCategory && (
        <a
          href="/portfolio"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Clear Filter
        </a>
      )}
    </div>
  );
}