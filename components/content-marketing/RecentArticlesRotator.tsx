"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { ArticleMeta } from "@/lib/articles";

type ArticlePreview = ArticleMeta & { slug: string; readTime: string };
const fallbackImage = "/homepage-service-images/jakslab-integrated-services-landing.png";

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
          <Link href={`/portfolio/${visible[0].slug}`} className="group grid min-h-64 min-w-0 overflow-hidden border border-slate-300 bg-white/45 sm:grid-cols-[.9fr_1.1fr]">
            <span className="relative min-h-52 min-w-0 overflow-hidden bg-[#f7eee4]/55">
              <Image src={visible[0].image || fallbackImage} alt="" fill sizes="(max-width: 640px) 100vw, 42vw" className="h-full w-full max-w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]" />
            </span>
            <span className="flex min-w-0 flex-col p-6 sm:p-8">
              <span className="text-xs font-semibold text-slate-600">{visible[0].category}</span>
              <span className="mt-4 max-w-2xl text-2xl font-semibold leading-snug text-slate-950 group-hover:underline group-hover:underline-offset-4 sm:text-3xl">{visible[0].title}</span>
              {visible[0].excerpt && <span className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">{visible[0].excerpt}</span>}
              <span className="mt-auto pt-6 text-xs font-medium text-slate-600">{visible[0].readTime}</span>
            </span>
          </Link>
        )}
        <div className="space-y-4">
        {visible.slice(1).map((article) => (
          <Link key={article.slug} href={`/portfolio/${article.slug}`} className="group grid min-w-0 grid-cols-[7rem_minmax(0,1fr)] overflow-hidden border border-slate-300 bg-white/45 transition-colors hover:border-slate-600">
            <span className="relative min-h-32 min-w-0 overflow-hidden bg-[#f7eee4]/55">
              <Image src={article.image || fallbackImage} alt="" fill sizes="112px" className="h-full w-full max-w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]" />
            </span>
            <span className="min-w-0 p-5">
              <span className="text-xs font-semibold text-slate-600">{article.category}</span>
              <span className="mt-3 block text-xl font-semibold leading-snug text-slate-950 group-hover:underline group-hover:underline-offset-4">{article.title}</span>
              <span className="mt-3 block text-xs font-medium text-slate-600">{article.readTime}</span>
            </span>
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
