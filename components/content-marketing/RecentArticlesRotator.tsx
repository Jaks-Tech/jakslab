"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { ArticleMeta } from "@/lib/articles";

type ArticlePreview = ArticleMeta & { slug: string; readTime: string };

export function RecentArticlesRotator({ articles }: { articles: ArticlePreview[] }) {
  const [start, setStart] = useState(0);
  const visibleCount = Math.min(3, articles.length);

  useEffect(() => {
    if (articles.length <= visibleCount) return;
    const timer = window.setInterval(() => setStart((current) => (current + 1) % articles.length), 5000);
    return () => window.clearInterval(timer);
  }, [articles.length, visibleCount]);

  if (!articles.length) return null;

  const visible = Array.from({ length: visibleCount }, (_, index) => articles[(start + index) % articles.length]);
  const move = (direction: number) => setStart((current) => (current + direction + articles.length) % articles.length);

  return (
    <div className="mt-9">
      <div key={start} className="homepage-article-change grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
        {visible[0] && (
          <Link href={`/portfolio/${visible[0].slug}`} className="group flex min-h-64 flex-col border border-slate-500 border-l-4 border-l-[#202733] bg-white p-6 sm:p-8">
            <span className="text-xs font-semibold text-slate-600">{visible[0].category}</span>
            <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug text-slate-950 group-hover:underline group-hover:underline-offset-4 sm:text-3xl">{visible[0].title}</h3>
            {visible[0].excerpt && <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">{visible[0].excerpt}</p>}
            <span className="mt-auto pt-6 text-xs font-medium text-slate-600">{visible[0].readTime}</span>
          </Link>
        )}
        <div className="space-y-4">
        {visible.slice(1).map((article) => (
          <Link key={article.slug} href={`/portfolio/${article.slug}`} className="group block border border-slate-300 bg-white p-5 transition-colors hover:border-slate-600">
            <span className="text-xs font-semibold text-slate-600">{article.category}</span>
            <h3 className="mt-3 text-xl font-semibold leading-snug text-slate-950 group-hover:underline group-hover:underline-offset-4">{article.title}</h3>
            <span className="mt-3 block text-xs font-medium text-slate-600">{article.readTime}</span>
          </Link>
        ))}
        </div>
      </div>
      {articles.length > visibleCount && (
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={() => move(-1)} aria-label="Previous articles" className="grid size-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next articles" className="grid size-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"><ChevronRight size={18} /></button>
        </div>
      )}
    </div>
  );
}
