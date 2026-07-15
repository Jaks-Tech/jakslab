"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/lib/categories";
import CategoryTabs from "@/components/portfolio/CategoryTabs"; 

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
      <div className="mb-14">
        <CategoryTabs onSelect={handleCategoryChange} />

        {/* RESULTS COUNT */}
        <div className="mt-8 text-sm text-slate-400 text-center md:text-left">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredArticles.length}
          </span>{" "}
          article{filteredArticles.length !== 1 && "s"}
        </div>
      </div>

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {filteredArticles.map((article) => {
          return (
            <Link
              key={article.slug}
              href={`/portfolio/${article.slug}`}
              className="blog-article-card group p-6 sm:p-7 rounded-2xl bg-white/[0.035] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-blue-500/30 flex flex-col h-full"
            >
              {/* 1. Category Badge */}
              <div>
                <span className="text-xs text-slate-500">
                  {article.category}
                </span>
              </div>

              {/* 2. Title */}
              <h2 className="text-xl font-medium mt-5 text-white group-hover:text-blue-300 transition-colors duration-300 leading-snug">
                {article.title}
              </h2>

              {/* 3. Metadata (Moved here - after Title) */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[10px] font-medium text-slate-500 mt-3 uppercase tracking-wider">
                <span>{article.author}</span><span>{article.date}</span><span>{article.readTime}</span>
              </div>

              {/* 4. Excerpt */}
              {article.excerpt && (
                <p className="text-slate-400 mt-5 text-sm leading-relaxed line-clamp-3 flex-grow border-t border-white/5 pt-4">
                  {article.excerpt}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
