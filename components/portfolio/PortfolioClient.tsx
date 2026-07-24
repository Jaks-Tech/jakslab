"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/lib/categories";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import { ArrowUpRight } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: Category;
  excerpt?: string;
  readTime: string;
}

export default function PortfolioClient({
  articles,
}: {
  articles: Article[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = (searchParams.get("category") as Category | null) ?? null;

  const filteredArticles = useMemo(() => {
    if (!activeCategory) return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [activeCategory, articles]);

  const handleCategoryChange = (category: Category | null) => {
    if (!category) {
      router.push("/portfolio");
    } else {
      router.push(`/portfolio?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <>
      <div className="mb-9 sm:mb-12">
        <CategoryFilter onSelect={handleCategoryChange} />

        <div className="mt-5 text-sm text-slate-600">
          Showing{" "}
          <span className="font-semibold text-slate-950">
            {filteredArticles.length}
          </span>{" "}
          article{filteredArticles.length !== 1 && "s"}
        </div>
      </div>

      <div className="border-t border-slate-300">
        {filteredArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/portfolio/${article.slug}`}
              className="group -mx-3 grid grid-cols-[2rem_1fr] gap-x-3 gap-y-3 border-b border-slate-300 px-3 py-7 transition hover:bg-slate-50 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6 sm:py-9"
            >
              <span className="pt-1 text-xs font-semibold text-slate-500">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase tracking-[.1em] text-slate-600">{article.category}</span>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-slate-950 sm:text-2xl">{article.title}</h2>
                {article.excerpt && <p className="mt-3 line-clamp-2 max-w-4xl text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">{article.excerpt}</p>}
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-medium uppercase tracking-wider text-slate-600"><span>{article.author}</span><span>{article.date}</span><span>{article.readTime}</span></div>
              </div>
              <div className="col-start-2 flex items-center justify-end sm:col-start-auto sm:row-start-1 sm:self-center">
                <span className="grid size-9 place-items-center rounded-full border border-slate-400 text-slate-800 transition group-hover:border-slate-900 group-hover:bg-[#202733] group-hover:text-[#fff] sm:size-10"><ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </Link>
        ))}
        {filteredArticles.length === 0 && (
          <p className="border-b border-slate-300 py-12 text-center text-sm text-slate-600">No articles are available in this category yet.</p>
        )}
      </div>
    </>
  );
}
