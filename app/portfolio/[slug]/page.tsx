import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import ShareCard from "@/components/portfolio/ShareCard";

const BASE_URL = "https://www.jakslab.work";

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
    <main className="min-h-screen bg-white [font-family:Arial,Helvetica,sans-serif] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <header className="border-b border-slate-300 px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-12 lg:pb-20 lg:pt-24 xl:px-16 2xl:px-20">
        <nav aria-label="Breadcrumb">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to all articles
          </Link>
        </nav>

        <div className="mt-10 max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-slate-600">{article.category}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">{article.excerpt}</p>
          )}
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            <span>By {article.author}</span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      <div className="grid w-full gap-12 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
        <article
          className="article-prose prose prose-lg w-full max-w-4xl"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <aside className="space-y-5 self-start lg:sticky lg:top-28">
          <div className="border border-slate-300 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-950">Article information</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-slate-600">Category</dt>
                <dd className="mt-1 font-medium text-slate-950">{article.category}</dd>
              </div>
              <div>
                <dt className="text-slate-600">Author</dt>
                <dd className="mt-1 font-medium text-slate-950">{article.author}</dd>
              </div>
              <div>
                <dt className="text-slate-600">Reading time</dt>
                <dd className="mt-1 font-medium text-slate-950">{article.readTime}</dd>
              </div>
            </dl>
          </div>

          <ShareCard />

          <div className="border border-slate-300 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-950">Need technical content for your company?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Bring your documentation, existing blog or an idea for where to begin.
            </p>
            <Link href="/book-call" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
              <CalendarDays size={16} aria-hidden="true" />
              Book a 30-minute call
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-slate-300 px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Continue reading</h2>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              All articles <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/portfolio/${item.slug}`} className="group border border-slate-300 bg-white p-6 transition hover:border-slate-700">
                <p className="text-xs font-semibold uppercase tracking-[.1em] text-slate-600">{item.category}</p>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-950">{item.title}</h3>
                {item.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-700">{item.excerpt}</p>}
                <div className="mt-6 flex items-center justify-between border-t border-slate-300 pt-4 text-xs text-slate-600">
                  <span>{item.date}</span>
                  <span>{item.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
