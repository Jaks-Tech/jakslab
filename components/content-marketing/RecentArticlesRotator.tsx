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
    <div className="mt-10">
      <div key={start} className={`homepage-article-change grid gap-6 ${visible.length > 1 ? "lg:grid-cols-[1.15fr_.85fr]" : "grid-cols-1"}`}>
        {visible[0] && (
          <Link href={`/portfolio/${visible[0].slug}`} className="insight-feature group grid min-h-[22rem] min-w-0 overflow-hidden rounded-[2rem_5rem_2.5rem_3rem] border border-[#ddd4c9] bg-[#eee7de] sm:grid-cols-[.95fr_1.05fr]">
            <span className="relative min-h-56 min-w-0 overflow-hidden bg-[#f5f2ed]">
              <Image src={visible[0].image || fallbackImage} alt="" fill sizes="(max-width: 640px) 100vw, 48vw" className="h-full w-full max-w-full object-contain object-center p-4 transition-transform duration-500 group-hover:scale-[1.015]" />
            </span>
            <span className="flex min-w-0 flex-col justify-center p-7 sm:p-9 lg:p-12">
              <span className="text-[11px] uppercase tracking-[.12em] text-[#9e443a]">{visible[0].category}</span>
              <span className="mt-4 max-w-[22ch] font-serif text-[clamp(1.65rem,2.5vw,2.4rem)] leading-[1.08] text-[#1d1d1a]">{visible[0].title}</span>
              {visible[0].excerpt && <span className="mt-5 max-w-xl text-sm leading-7 text-[#5e5750]">{visible[0].excerpt}</span>}
              <span className="mt-8 inline-flex items-center gap-3 text-xs text-[#4c4641]">
                {visible[0].readTime}
                <span>Read insight</span>
              </span>
            </span>
          </Link>
        )}
        {visible.length > 1 && <div className="flex flex-col gap-5">
        {visible.slice(1).map((article) => (
          <Link key={article.slug} href={`/portfolio/${article.slug}`} className="insight-compact group grid min-h-[13.25rem] min-w-0 grid-cols-[7rem_minmax(0,1fr)] items-center gap-4 overflow-hidden bg-[#f7f5ef] p-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-5 sm:p-5">
            <span className="insight-thumb relative aspect-[16/10] min-w-0 overflow-hidden bg-[#e7dfd5]">
              <Image src={article.image || fallbackImage} alt="" fill sizes="(max-width: 640px) 112px, 160px" className="h-full w-full max-w-full object-contain object-center p-1 [filter:none!important] transition-transform duration-500 group-hover:scale-[1.015]" />
            </span>
            <span className="min-w-0 py-2">
              <span className="text-[10px] uppercase tracking-[.1em] text-[#9e443a]">{article.category || "Insight"}</span>
              <span className="mt-3 block font-serif text-[clamp(1.2rem,2vw,1.65rem)] leading-tight text-[#1d1d1a]">{article.title}</span>
              <span className="mt-4 block text-xs text-[#625b54]">{article.readTime} · Read article</span>
            </span>
          </Link>
        ))}
        </div>}
      </div>
      {articles.length > visibleCount && (
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={() => move(-1)} aria-label="Previous articles" className="insight-control grid size-11 place-items-center border border-[#aaa198] bg-transparent text-[#1d1d1a]"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next articles" className="insight-control grid size-11 place-items-center border border-[#aaa198] bg-transparent text-[#1d1d1a]"><ChevronRight size={18} /></button>
        </div>
      )}
    </div>
  );
}
