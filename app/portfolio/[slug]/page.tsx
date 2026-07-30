import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { ResponsiveContainer } from "@/components/layout/ResponsiveLayout";

const BASE_URL = "https://www.jakslab.work";
const DEFAULT_IMAGE = "/homepage-service-images/jakslab-integrated-services-landing.png";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getArticleBySlug(slug);
    const description =
      article.excerpt ||
      `Read ${article.title}, a ${article.category.toLowerCase()} article from JaksLab.`;

    return {
      title: article.title,
      description,
      keywords: [
        article.title,
        article.category,
        "JaksLab",
        "technical content marketing",
        "technology development",
        "research support",
      ],
      alternates: {
        canonical: `/portfolio/${slug}`,
      },
      openGraph: {
        type: "article",
        url: `${BASE_URL}/portfolio/${slug}`,
        title: article.title,
        description,
        publishedTime: article.date,
        authors: [article.author],
      },
      twitter: {
        card: "summary",
        title: article.title,
        description,
      },
    };
  } catch {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) notFound();

  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const related = getAllArticles()
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: `${BASE_URL}/portfolio/${article.slug}`,
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
    articleSection: article.category,
    inLanguage: "en",
  };

  return (
    <main className="min-h-screen bg-transparent [font-family:Arial,Helvetica,sans-serif] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <header className="pb-12 pt-20 sm:pb-16 sm:pt-24">
        <ResponsiveContainer>
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb">
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950">
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Our Insights
              </Link>
            </nav>

            <div className="mt-10 text-center">
              <h1 className="text-[clamp(2.5rem,6vw,5.75rem)] font-medium leading-[1.02] tracking-[-.055em] text-slate-950">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-700">{article.excerpt}</p>
              )}
              <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-600">
                <span>By {article.author}</span>
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
            </div>

            <figure className="relative mt-10 aspect-[16/9] w-full overflow-hidden bg-[#f7eee4]/55">
              <Image
                src={article.image || DEFAULT_IMAGE}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="h-full w-full max-w-full object-contain object-center"
              />
            </figure>
          </div>
        </ResponsiveContainer>
      </header>

      <ResponsiveContainer className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[82rem] gap-8 lg:grid-cols-[13rem_minmax(0,48rem)_13rem] lg:items-start">
          <aside className="article-promo lg:sticky lg:top-28" aria-label="JaksLab content optimization service">
            <p className="text-[10px] uppercase tracking-[.13em] text-[#a94318]">JaksLab service</p>
            <h2 className="mt-4 font-serif text-2xl font-normal leading-tight text-[#1d1d1a]">
              Turn expertise into qualified traffic.
            </h2>
            <p className="mt-4 text-xs leading-6 text-[#625b54]">
              Research, technical content, SEO, AEO, and continuous optimization.
            </p>
            <Link href="/services#content-marketing" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#1d1d1a] underline underline-offset-4">
              Explore content growth <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </aside>

        <article
          className="article-prose prose prose-lg w-full max-w-3xl"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

          <aside className="article-promo article-promo--warm lg:sticky lg:top-28" aria-label="JaksLab project research service">
            <p className="text-[10px] uppercase tracking-[.13em] text-[#a94318]">Before you build</p>
            <h2 className="mt-4 font-serif text-2xl font-normal leading-tight text-[#1d1d1a]">
              Test the direction before development.
            </h2>
            <p className="mt-4 text-xs leading-6 text-[#625b54]">
              Clarify requirements, users, frameworks, risks, and the practical delivery path.
            </p>
            <Link href="/services#research-academic" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#1d1d1a] underline underline-offset-4">
              Explore project research <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </ResponsiveContainer>

      {related.length > 0 && (
        <ResponsiveContainer className="border-t border-slate-300 py-14 sm:py-16 lg:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Continue reading</h2>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              All articles <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/portfolio/${item.slug}`} className="group bg-transparent py-6">
                <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-950">{item.title}</h3>
                {item.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-700">{item.excerpt}</p>}
                <div className="mt-6 flex items-center justify-between border-t border-slate-300 pt-4 text-xs text-slate-600">
                  <span>{item.date}</span>
                  <span>{item.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </ResponsiveContainer>
      )}
    </main>
  );
}
