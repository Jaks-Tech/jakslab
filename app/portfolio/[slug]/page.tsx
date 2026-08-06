import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
} from "lucide-react";

import {
  ResponsiveContainer,
} from "@/components/layout/ResponsiveLayout";
import {
  getAllArticles,
  getArticleBySlug,
} from "@/lib/articles";

const BASE_URL = "https://www.jakslab.work";

const DEFAULT_IMAGE =
  "/homepage-service-images/jakslab-integrated-services-landing.png";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getAbsoluteImageUrl(image?: string) {
  const source = image || DEFAULT_IMAGE;

  if (source.startsWith("http://") || source.startsWith("https://")) {
    return source;
  }

  return `${BASE_URL}${source.startsWith("/") ? source : `/${source}`}`;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getArticleBySlug(slug);

    const description =
      article.excerpt ||
      `Read ${article.title}, an insight from JaksLab.`;

    const image = getAbsoluteImageUrl(article.image);
    const canonical = `${BASE_URL}/portfolio/${article.slug}`;

    return {
      title: article.title,
      description,
      keywords: [
        article.title,
        ...(article.category ? [article.category] : []),
        "JaksLab",
        "technical content",
        "search growth",
        "digital products",
        "project research",
      ],
      alternates: {
        canonical,
      },
      openGraph: {
        type: "article",
        url: canonical,
        siteName: "JaksLab",
        title: article.title,
        description,
        publishedTime: article.date,
        authors: [article.author],
        section: article.category,
        images: [
          {
            url: image,
            alt:
              article.imageAlt ||
              `${article.title} article cover`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Article not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

type PromoCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  accent: string;
};

function PromoCard({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  accent,
}: PromoCardProps) {
  return (
    <aside className="border-t border-[#d9d2c8] pt-5 lg:border-t-0 lg:pt-0">
      <div className="lg:sticky lg:top-28">
        <div className="flex items-center gap-3">
          <span
            className="h-px w-8"
            style={{ backgroundColor: accent }}
          />

          <p
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            {eyebrow}
          </p>
        </div>

        <h2 className="mt-5 max-w-[12ch] font-serif text-[1.65rem] font-normal leading-[1.08] tracking-[-0.025em] text-[#1d1d1a]">
          {title}
        </h2>

        <p className="mt-4 max-w-[17rem] text-sm leading-6 text-[#625950]">
          {description}
        </p>

        <Link
          href={href}
          className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#2c251f]"
        >
          <span className="border-b border-[#2c251f]/40 pb-1 transition group-hover:border-[#2c251f]">
            {linkLabel}
          </span>

          <ArrowRight
            size={13}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </aside>
  );
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  let article;

  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const allArticles = getAllArticles();

  const sameCategoryArticles = allArticles.filter(
    (item) =>
      item.slug !== article.slug &&
      item.category === article.category,
  );

  const otherArticles = allArticles.filter(
    (item) =>
      item.slug !== article.slug &&
      item.category !== article.category,
  );

  const related = [
    ...sameCategoryArticles,
    ...otherArticles,
  ].slice(0, 3);

  const canonicalUrl =
    `${BASE_URL}/portfolio/${article.slug}`;

  const articleImage = getAbsoluteImageUrl(article.image);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "JaksLab",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/jakslab.png`,
      },
    },
    image: articleImage,
    ...(article.category
      ? { articleSection: article.category }
      : {}),
    inLanguage: "en",
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f5ef] text-[#1d1d1a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleStructuredData,
          ).replace(/</g, "\\u003c"),
        }}
      />

      {/* Article header */}
      <header className="border-b border-[#d9d2c8]">
        <ResponsiveContainer className="py-[clamp(2rem,5vw,4rem)]">
          <nav aria-label="Breadcrumb">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#625950] transition hover:text-[#1d1d1a]"
            >
              <ArrowLeft
                size={15}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-1"
              />

              Back to insights
            </Link>
          </nav>

          <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)] lg:items-end lg:gap-16">
            <div>
              {article.category && (
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-[#9e443a]" />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e443a]">
                    {article.category}
                  </p>
                </div>
              )}

              <h1 className="mt-6 max-w-[16ch] text-balance font-serif text-[clamp(2.75rem,6.5vw,6.75rem)] font-normal leading-[0.94] tracking-[-0.05em] text-[#1d1d1a]">
                {article.title}
              </h1>
            </div>

            <div className="lg:pb-2">
              {article.excerpt && (
                <p className="max-w-xl text-base leading-8 text-[#625950] sm:text-lg">
                  {article.excerpt}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#d9d2c8] pt-5 text-xs text-[#766d64]">
                <span className="font-semibold text-[#2c251f]">
                  By {article.author}
                </span>

                <span>{article.date}</span>

                {article.readTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3
                      size={13}
                      aria-hidden="true"
                    />
                    {article.readTime}
                  </span>
                )}
              </div>
            </div>
          </div>

          <figure className="relative mt-[clamp(3rem,6vw,5rem)] aspect-[16/8.5] w-full overflow-hidden rounded-[clamp(1.25rem,3vw,2.5rem)] border border-[#d9d2c8] bg-[#eee6dc]">
            <Image
              src={article.image || DEFAULT_IMAGE}
              alt={
                article.imageAlt ||
                `${article.title} article cover`
              }
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover object-center"
            />
          </figure>
        </ResponsiveContainer>
      </header>

      {/* Article body */}
      <ResponsiveContainer className="py-[clamp(3.5rem,7vw,7rem)]">
        <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[12rem_minmax(0,46rem)_12rem] lg:items-start lg:gap-10 xl:grid-cols-[14rem_minmax(0,48rem)_14rem] xl:gap-14">
          <PromoCard
            eyebrow="Content growth"
            title="Turn expertise into qualified traffic."
            description="Research, technical content, SEO, AEO and continuous content improvement."
            href="/services/content"
            linkLabel="Explore content growth"
            accent="#9e443a"
          />

          <article
            className="
              article-prose
              prose
              prose-lg
              min-w-0
              max-w-none
              text-[#302c28]

              prose-headings:font-serif
              prose-headings:font-normal
              prose-headings:tracking-[-0.03em]
              prose-headings:text-[#1d1d1a]

              prose-h2:mb-5
              prose-h2:mt-14
              prose-h2:text-[clamp(2rem,4vw,3rem)]
              prose-h2:leading-[1.05]

              prose-h3:mb-4
              prose-h3:mt-10
              prose-h3:text-2xl
              prose-h3:leading-tight

              prose-p:my-6
              prose-p:text-[1.05rem]
              prose-p:leading-[1.9]
              prose-p:text-[#4f4943]

              prose-a:font-semibold
              prose-a:text-[#844038]
              prose-a:decoration-[#844038]/35
              prose-a:underline-offset-4
              hover:prose-a:decoration-[#844038]

              prose-strong:font-semibold
              prose-strong:text-[#24211e]

              prose-blockquote:my-10
              prose-blockquote:border-l-[#9e443a]
              prose-blockquote:bg-[#eee5da]/55
              prose-blockquote:px-7
              prose-blockquote:py-5
              prose-blockquote:font-serif
              prose-blockquote:text-xl
              prose-blockquote:font-normal
              prose-blockquote:leading-8
              prose-blockquote:text-[#332e29]

              prose-li:my-2
              prose-li:text-[#4f4943]
              prose-li:marker:text-[#9e443a]

              prose-hr:my-14
              prose-hr:border-[#d9d2c8]

              prose-img:my-10
              prose-img:rounded-2xl
              prose-img:border
              prose-img:border-[#d9d2c8]

              prose-figcaption:text-center
              prose-figcaption:text-sm
              prose-figcaption:text-[#766d64]

              prose-code:rounded
              prose-code:bg-[#e9e3da]
              prose-code:px-1.5
              prose-code:py-0.5
              prose-code:text-[#743b33]
              prose-code:before:content-none
              prose-code:after:content-none

              prose-pre:overflow-x-auto
              prose-pre:rounded-2xl
              prose-pre:border
              prose-pre:border-[#3d3833]
              prose-pre:bg-[#24211e]
            "
            dangerouslySetInnerHTML={{
              __html: article.contentHtml,
            }}
          />

          <PromoCard
            eyebrow="Before you build"
            title="Test the direction before development."
            description="Clarify requirements, users, technologies, risks and the practical delivery path."
            href="/services/research"
            linkLabel="Explore project research"
            accent="#526b84"
          />
        </div>
      </ResponsiveContainer>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-[#d9d2c8] bg-[#eeeae3]">
          <ResponsiveContainer className="py-[clamp(3.5rem,7vw,6rem)]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a8076]">
                  More from JaksLab
                </p>

                <h2 className="mt-3 font-serif text-[clamp(2.25rem,4vw,3.75rem)] font-normal leading-none tracking-[-0.04em] text-[#1d1d1a]">
                  Continue reading.
                </h2>
              </div>

              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2c251f]"
              >
                All articles

                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="mt-10 grid border-y border-[#cfc7bd] md:grid-cols-3">
              {related.map((item, index) => (
                <Link
                  key={item.slug}
                  href={`/portfolio/${item.slug}`}
                  className={`
                    group flex min-w-0 flex-col py-8
                    md:px-7
                    ${index > 0
                      ? "border-t border-[#cfc7bd] md:border-l md:border-t-0"
                      : ""
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8a8076]">
                    <span>
                      {item.category || "Insight"}
                    </span>

                    <span>
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-balance font-serif text-[1.75rem] font-normal leading-[1.08] tracking-[-0.025em] text-[#1d1d1a]">
                    {item.title}
                  </h3>

                  {item.excerpt && (
                    <p className="mt-5 line-clamp-3 text-sm leading-7 text-[#625950]">
                      {item.excerpt}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between gap-4 pt-8 text-xs text-[#766d64]">
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <span>{item.date}</span>

                      {item.readTime && (
                        <span>{item.readTime}</span>
                      )}
                    </div>

                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#bdb3a8] transition group-hover:border-[#2c251f] group-hover:bg-[#2c251f] group-hover:text-white">
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </ResponsiveContainer>
        </section>
      )}
    </main>
  );
}