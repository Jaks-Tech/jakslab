import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { getHomepagePillarBySlug, getHomepagePillars } from "@/lib/homepage-pillars";

export async function generateStaticParams() {
  const pillars = await getHomepagePillars();
  return pillars.flatMap((pillar) => [{ slug: pillar.slug }, { slug: pillar.legacySlug }]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = await getHomepagePillarBySlug(slug);
  if (!pillar) return {};

  return {
    title: pillar.title,
    description: pillar.summary,
    authors: [{ name: pillar.author }],
    keywords: pillar.keywords,
    alternates: { canonical: `/insights/${pillar.slug}` },
    openGraph: {
      type: "article",
      title: pillar.title,
      description: pillar.summary,
      publishedTime: pillar.publishedAt,
      modifiedTime: pillar.updatedAt,
      authors: [pillar.author],
      images: [{ url: pillar.image, alt: pillar.imageAlt }],
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = await getHomepagePillarBySlug(slug);
  if (!pillar) notFound();
  if (slug !== pillar.slug) redirect(`/insights/${pillar.slug}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pillar.title,
    description: pillar.summary,
    image: `https://www.jakslab.work${pillar.image}`,
    datePublished: pillar.publishedAt,
    dateModified: pillar.updatedAt,
    author: { "@type": "Organization", name: pillar.author, url: "https://www.jakslab.work/about" },
    publisher: {
      "@type": "Organization",
      name: "JaksLab",
      url: "https://www.jakslab.work",
      logo: { "@type": "ImageObject", url: "https://www.jakslab.work/jakslab.png" },
    },
    mainEntityOfPage: `https://www.jakslab.work/insights/${pillar.slug}`,
    keywords: pillar.keywords.join(", "),
  };

  return (
    <main className="bg-[#f7f5ef] px-4 py-[clamp(3rem,7vw,7rem)] sm:px-6">
      <article className="mx-auto max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
        />
        <Link href="/#our-approach" className="inline-flex items-center gap-2 text-sm underline underline-offset-4">
          <ArrowLeft size={15} aria-hidden="true" /> Back to Our Approach
        </Link>
        <p className="mt-12 text-xs uppercase tracking-[.14em] text-[#6e5542]">
          {pillar.label} · {pillar.readTime}
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[1.02] text-[#1d1d1a]">
          {pillar.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#554d46]">{pillar.summary}</p>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-y border-[#c8bfb4] py-4 text-sm text-[#625950]">
          <span>By {pillar.author}</span>
          <time dateTime={pillar.publishedAt}>
            Published {new Date(pillar.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </time>
          <time dateTime={pillar.updatedAt}>
            Updated {new Date(pillar.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </time>
        </div>
        <div className="article-prose prose mt-9 max-w-none" dangerouslySetInnerHTML={{ __html: pillar.contentHtml }} />
      </article>
    </main>
  );
}
