import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, Star } from "lucide-react";
import type { ArticleMeta } from "@/lib/articles";
import { RecentArticlesRotator } from "@/components/content-marketing/RecentArticlesRotator";

type ArticlePreview = ArticleMeta & { slug: string; readTime: string };

export function HomepageOverview({ articles }: { articles: ArticlePreview[] }) {
  return (
    <>
      <section className="bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16 2xl:px-20">
        <div className="relative mx-auto w-full max-w-[1350px] overflow-hidden border border-[#202733] bg-[#202733] px-7 py-9 sm:px-10 sm:py-12 lg:grid lg:grid-cols-[.55fr_1.45fr] lg:gap-14 lg:px-14">
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#d9bd7a]">Our mission</p>
            <Star className="mt-4 text-[#d9bd7a]" size={22} strokeWidth={1.6} aria-hidden="true" />
          </div>
          <div className="relative mt-6 lg:mt-0">
            <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[#fff] sm:text-4xl">
              Make specialist knowledge useful beyond the team that created it.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#e5e7eb]">
              We help technical companies turn knowledge from their documentation, systems and people into work others can understand and use.
            </p>
            <Link href="/about" className="group mt-7 inline-flex items-center gap-3 text-sm font-semibold text-[#d9bd7a]">
              <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-50 after:bg-[#d9bd7a] after:transition-transform after:duration-300 group-hover:after:scale-x-100">Read about us</span>
              <span className="grid size-8 place-items-center rounded-full border border-[#d9bd7a]/60 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16 2xl:px-20">
        <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700">From the blog</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Recent articles.</h2>
          </div>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
            Browse all articles <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mx-auto w-full max-w-[1450px]"><RecentArticlesRotator articles={articles} /></div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16 2xl:px-20">
        <div className="mx-auto flex w-full max-w-[1250px] flex-col gap-7 bg-white py-6 lg:flex-row lg:items-center lg:justify-between lg:py-8">
          <div>
            <p className="text-sm font-semibold text-slate-700">Start a conversation</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Tell us what you need to explain, build or research.</h2>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/book-call" className="inline-flex items-center gap-2 rounded-lg bg-[#202733] px-5 py-3 text-sm font-semibold text-[#fff]">
              <CalendarDays size={18} aria-hidden="true" />Book a content call
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-slate-500 bg-white px-5 py-3 text-sm font-semibold text-slate-950">
              <Mail size={18} aria-hidden="true" />Send an enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
