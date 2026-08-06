import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/articles";

type Insight = ArticleMeta & {
  slug: string;
  readTime: string;
};

const defaultImage = "/homepage-service-images/jakslab-integrated-services-landing.png";

// Adjust these to match your ResponsiveContainer's actual max-width.
const CONTAINER_MAX_WIDTH = 1280;
const FEATURED_IMAGE_SIZES = `(max-width: 1024px) 100vw, (max-width: ${CONTAINER_MAX_WIDTH}px) 56vw, ${Math.round(
  CONTAINER_MAX_WIDTH * 0.56
)}px`;
const STORY_IMAGE_SIZES = `(max-width: 768px) 100vw, (max-width: ${CONTAINER_MAX_WIDTH}px) 50vw, ${Math.round(
  CONTAINER_MAX_WIDTH * 0.5
)}px`;

export default function InsightsList({ articles }: { articles: Insight[] }) {
  if (!articles.length) {
    return <p className="py-16 text-center text-sm text-slate-600">New insights are coming soon.</p>;
  }

  const [featured, ...remaining] = articles;

  return (
    <div>
      <Link
        href={`/portfolio/${featured.slug}`}
        className="portfolio-feature group grid min-w-0 overflow-hidden bg-[#eee7de] lg:grid-cols-[1.12fr_.88fr]"
      >
        <span className="relative min-h-[clamp(20rem,40vw,34rem)] min-w-0 overflow-hidden bg-white/70">
          <Image
            src={featured.image || defaultImage}
            alt={featured.imageAlt || `${featured.title} article cover`}
            fill
            priority
            sizes={FEATURED_IMAGE_SIZES}
            className="h-full w-full max-w-full object-contain object-center p-3 transition-transform duration-700 group-hover:scale-[1.01] sm:p-5"
          />
        </span>
        <span className="flex min-w-0 flex-col justify-center p-[clamp(1.5rem,5vw,4.5rem)]">
          <span className="text-[11px] uppercase tracking-[.12em] text-[#9e443a]">Latest insight</span>
          <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,4rem)] font-normal leading-[1.02] tracking-[-.035em] text-slate-950">
            {featured.title}
          </h2>
          {featured.excerpt && <span className="mt-5 text-sm leading-7 text-slate-600">{featured.excerpt}</span>}
          <span className="mt-8 flex items-center justify-between gap-4 text-xs text-slate-600">
            <span>{featured.category || "Insight"} · {featured.readTime}</span>
            <ArrowUpRight className="text-slate-900 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={19} aria-hidden="true" />
          </span>
        </span>
      </Link>

      <div className="mt-[clamp(2.5rem,5vw,5rem)] grid gap-x-8 gap-y-12 md:grid-cols-2">
        {remaining.map((article) => (
          <Link
            key={article.slug}
            href={`/portfolio/${article.slug}`}
            className="portfolio-story group min-w-0"
          >
            <span className="portfolio-story-image relative block aspect-[16/10] min-w-0 overflow-hidden bg-[#eee7de]">
              <Image
                src={article.image || defaultImage}
                alt={article.imageAlt || `${article.title} article cover`}
                fill
                sizes={STORY_IMAGE_SIZES}
                className="h-full w-full max-w-full object-contain object-center p-3 transition-transform duration-700 group-hover:scale-[1.025] sm:p-4"
              />
            </span>
            <span className="block min-w-0 pt-6">
              <span className="text-[11px] uppercase tracking-[.1em] text-[#9e443a]">{article.category || "Insight"}</span>
              <h2 className="mt-3 font-serif text-[clamp(1.5rem,2.5vw,2.25rem)] font-normal leading-tight tracking-[-.025em] text-slate-950">
                {article.title}
              </h2>
              {article.excerpt && <span className="mt-4 block line-clamp-2 text-sm leading-6 text-slate-600">{article.excerpt}</span>}
              <span className="mt-5 flex items-center justify-between gap-3 border-t border-[#c8c1b9] pt-4 text-xs text-slate-700">
                <span>{article.date} · {article.readTime}</span>
                <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={17} aria-hidden="true" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}