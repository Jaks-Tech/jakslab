import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/articles";

type Insight = ArticleMeta & {
  slug: string;
  readTime: string;
};

const defaultImage = "/homepage-service-images/jakslab-integrated-services-landing.png";

export default function InsightsList({ articles }: { articles: Insight[] }) {
  if (!articles.length) {
    return <p className="py-16 text-center text-sm text-slate-600">New insights are coming soon.</p>;
  }

  const [featured, ...remaining] = articles;

  return (
    <div>
      <Link
        href={`/portfolio/${featured.slug}`}
        className="group grid min-w-0 overflow-hidden bg-white/30 lg:grid-cols-[1.3fr_.7fr]"
      >
        <span className="relative min-h-[clamp(22rem,46vw,42rem)] min-w-0 overflow-hidden bg-[#f7eee4]/55">
          <Image
            src={featured.image || defaultImage}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="h-full w-full max-w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.015]"
          />
        </span>
        <span className="flex min-w-0 flex-col justify-center p-[clamp(1.5rem,5vw,4.5rem)]">
          <span className="text-xs font-medium text-slate-500">Featured insight</span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,4.25rem)] font-medium leading-[.98] tracking-[-.05em] text-slate-950">
            {featured.title}
          </h2>
          {featured.excerpt && <span className="mt-5 text-sm leading-7 text-slate-600">{featured.excerpt}</span>}
          <span className="mt-7 flex items-center justify-between gap-4 text-xs text-slate-500">
            <span>{featured.readTime}</span>
            <ArrowUpRight className="text-slate-900 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={19} aria-hidden="true" />
          </span>
        </span>
      </Link>

      <div className="mt-[clamp(1rem,3vw,2rem)]">
        {remaining.map((article, index) => (
          <Link
            key={article.slug}
            href={`/portfolio/${article.slug}`}
            className="group grid min-w-0 border-t border-slate-300 py-[clamp(1.5rem,4vw,3.5rem)] md:grid-cols-2 md:items-stretch"
          >
            <span className={`relative min-h-[clamp(17rem,34vw,30rem)] min-w-0 overflow-hidden bg-[#f7eee4]/55 ${index % 2 ? "md:order-2" : ""}`}>
              <Image
                src={article.image || defaultImage}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-full w-full max-w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </span>
            <span className={`flex min-w-0 flex-col justify-center px-[clamp(1rem,5vw,4rem)] py-8 ${index % 2 ? "md:order-1" : ""}`}>
              <span className="text-xs text-slate-500">{article.date}</span>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,3.25rem)] font-medium leading-tight tracking-[-.04em] text-slate-950">
                {article.title}
              </h2>
              {article.excerpt && <span className="mt-5 line-clamp-3 text-sm leading-7 text-slate-600">{article.excerpt}</span>}
              <span className="mt-7 flex items-center gap-3 text-sm font-semibold text-slate-900">
                Read insight
                <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={17} aria-hidden="true" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
