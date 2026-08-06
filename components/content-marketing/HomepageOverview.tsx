import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/articles";
import { RecentArticlesRotator } from "@/components/content-marketing/RecentArticlesRotator";
import { ResponsiveSection } from "@/components/layout/ResponsiveLayout";
import { HomepageAuthorityCta } from "@/components/content-marketing/HomepageAuthorityCta";

type ArticlePreview = ArticleMeta & { slug: string; readTime: string };

export function HomepageOverview({ articles }: { articles: ArticlePreview[] }) {
  return (
    <>
      <ResponsiveSection className="bg-transparent !py-[clamp(2.5rem,5vw,4.5rem)]">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            
            
            <p className="text-[10px] uppercase tracking-[.18em] text-[#8a7e73]">From the journal</p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,3.5vw,3rem)] font-normal leading-none text-slate-950">Featured insight</h2>
          </div>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
            Read all <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="w-full"><RecentArticlesRotator articles={articles} /></div>
      </ResponsiveSection>

      <ResponsiveSection className="bg-transparent !py-0">
        <HomepageAuthorityCta />
      </ResponsiveSection>
    </>
  );
}
