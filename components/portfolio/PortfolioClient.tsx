"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/lib/categories";
import CategoryTabs from "@/components/portfolio/CategoryTabs"; 
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
      {/* FILTER SECTION */}
      <div className="mb-8 sm:mb-10">
        <CategoryTabs onSelect={handleCategoryChange} />

        {/* RESULTS COUNT */}
        <div className="mt-5 text-center text-sm text-slate-400 md:text-left">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredArticles.length}
          </span>{" "}
          article{filteredArticles.length !== 1 && "s"}
        </div>
      </div>

      <div className="border-t border-white/15">
        {filteredArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/portfolio/${article.slug}`}
              className="group grid grid-cols-[2rem_1fr] gap-x-3 gap-y-3 border-b border-white/15 py-6 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6 sm:py-8"
            >
              <span className="pt-1 font-mono text-xs text-slate-600">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <span className="text-xs text-blue-400">{article.category}</span>
                <h2 className="mt-2 text-lg font-medium leading-snug text-white transition-colors group-hover:text-blue-300 sm:text-2xl">{article.title}</h2>
                {article.excerpt && <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">{article.excerpt}</p>}
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-medium uppercase tracking-wider text-slate-500"><span>{article.author}</span><span>{article.date}</span><span>{article.readTime}</span></div>
              </div>
              <div className="col-start-2 flex items-center justify-end sm:col-start-auto sm:row-start-1 sm:self-center">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-blue-400 transition group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white sm:h-10 sm:w-10"><ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </Link>
        ))}
      </div>
    </>
  );
}
