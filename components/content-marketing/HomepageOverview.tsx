import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { ArticleMeta } from "@/lib/articles";
import { RecentArticlesRotator } from "@/components/content-marketing/RecentArticlesRotator";
import { ResponsiveSection } from "@/components/layout/ResponsiveLayout";
import { HomepageFinalCta } from "@/components/content-marketing/HomepageFinalCta";

type ArticlePreview = ArticleMeta & { slug: string; readTime: string };

export function HomepageOverview({ articles }: { articles: ArticlePreview[] }) {
  return (
    <>
      <ResponsiveSection className="bg-transparent !py-[clamp(1.5rem,2.5vw,2rem)]">
        <div className="grid overflow-hidden rounded-[clamp(1.5rem,3vw,2.75rem)] border border-[#76533b]/18 bg-white/20 shadow-[0_22px_70px_rgba(72,44,27,.09)] backdrop-blur-sm lg:grid-cols-2">
          <section className="p-[clamp(1.75rem,4vw,4rem)] lg:border-r lg:border-[#76533b]/15">
            <div className="flex items-center gap-3">
              <Star className="text-[#76533b]" size={20} strokeWidth={1.6} aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#76533b]">Our mission</p>
            </div>
            <h2 className="mt-7 max-w-xl text-[clamp(2rem,4vw,4rem)] font-medium leading-[.98] tracking-[-.05em] text-slate-950">
              Make specialist knowledge useful beyond the team that created it.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
              We help valuable expertise become easier to find, understand and act on.
            </p>
          </section>

          <section className="border-t border-[#76533b]/15 p-[clamp(1.75rem,4vw,4rem)] lg:border-t-0">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#76533b]">About JaksLab</p>
            <h2 className="mt-7 max-w-xl text-[clamp(1.75rem,3vw,3rem)] font-medium leading-tight tracking-[-.04em] text-slate-950">
              One partner from visibility and research to product development.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              We improve SEO and AEO, create company-specific content from technical expertise, research projects before development and build useful digital products.
            </p>
            <Link href="/about" className="group mt-7 inline-flex items-center gap-3 text-sm font-semibold text-[#76533b]">
              <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-50 after:bg-[#76533b] after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                More about JaksLab
              </span>
              <span className="grid size-8 place-items-center rounded-full border border-[#76533b]/35 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          </section>
        </div>
      </ResponsiveSection>

      <ResponsiveSection className="bg-transparent !py-[clamp(1.5rem,2.5vw,2rem)]">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Our Insights.</h2>
          </div>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
            Browse all articles <ArrowRight size={16} aria-hidden="true" />
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
