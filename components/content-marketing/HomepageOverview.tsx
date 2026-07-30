import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/articles";
import { RecentArticlesRotator } from "@/components/content-marketing/RecentArticlesRotator";
import { ResponsiveSection } from "@/components/layout/ResponsiveLayout";
import { HomepageFinalCta } from "@/components/content-marketing/HomepageFinalCta";

type ArticlePreview = ArticleMeta & { slug: string; readTime: string };

export function HomepageOverview({ articles }: { articles: ArticlePreview[] }) {
  return (
    <>
      <ResponsiveSection className="bg-transparent !py-[clamp(1.5rem,2.5vw,2rem)]">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            
            
            <h2 className="mt-3 text-[clamp(2.25rem,4vw,3.75rem)] leading-none text-slate-950">Featured insights</h2>
          </div>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
            Read all <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="w-full"><RecentArticlesRotator articles={articles} /></div>
      </ResponsiveSection>

      <ResponsiveSection className="bg-transparent !py-[clamp(1.5rem,2.5vw,2rem)]">
        <HomepageFinalCta />
      </ResponsiveSection>
    </>
  );
}
