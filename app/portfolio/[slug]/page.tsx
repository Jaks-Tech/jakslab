import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import ShareCard from "@/components/portfolio/ShareCard";
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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

  const related = getAllArticles()
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-[1100px] mx-auto px-8 py-24">

        {/* ===============================
           BREADCRUMB
        =============================== */}
        <div className="text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link href="/portfolio" className="hover:text-blue-600">
            Portfolio
          </Link>
          <span className="mx-2">›</span>
          <span>{article.category}</span>
        </div>

        {/* ===============================
           TITLE + META
        =============================== */}
        <h1 className="text-4xl font-bold text-slate-900 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-6 mt-6 text-sm text-slate-600">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        {/* ===============================
           FEATURED IMAGE
        =============================== */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/article-placeholder.png"
            alt={article.title}
            width={1200}
            height={600}
            className="w-full object-cover"
          />
        </div>

        {/* ===============================
           CONTENT + SIDEBAR
        =============================== */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-16 mt-16">

          {/* Article Content */}
            <article
            className="
                prose prose-lg max-w-none
                prose-slate
                prose-headings:text-slate-900
                prose-headings:no-underline
                prose-a:no-underline
                prose-a:text-slate-900
                hover:prose-a:text-blue-600
            "
            dangerouslySetInnerHTML={{
                __html: article.contentHtml,
            }}
            />

            {/* Sidebar */}
            <aside className="space-y-12 lg:sticky lg:top-24 self-start">

            {/* ===============================
                AUTHOR CARD
            ================================ */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center transition hover:shadow-lg">

            {/* Avatar Holder */}
            <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 shadow-md">
                <Image
                    src="/jakslab.png"
                    alt="Author"
                    fill
                    className="object-cover"
                />
                </div>
            </div>

            {/* Heading */}
            <h3 className="text-lg font-bold text-slate-900">
                About the Author
            </h3>

            <div className="mt-2 mb-6 h-1 w-16 bg-blue-600 rounded-full mx-auto" />

            {/* Description */}
            <p className="text-sm leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-900">
                {article.author}
                </span>{" "}
                consists of academic and technical professionals
                delivering structured research insights and expert guidance.
            </p>

            {/* Divider */}
            <div className="my-6 border-t border-slate-100" />

            {/* CTA Button */}
            <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm hover:shadow-md"
            >
                Explore More Articles →
            </Link>

            </div>


            {/* ===============================
                SHARE CARD
            =============================== */}
            <ShareCard />

            </aside>
        </div>

        {/* ===============================
        RELATED ARTICLES
        ================================ */}
        <section className="mt-32 border-t border-slate-200 pt-16">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
            Related Articles
            </h2>
            <span className="text-sm text-slate-500">
            Explore more insights
            </span>
        </div>

        {/* Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
            <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                className="group relative bg-white border border-slate-200 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-200"
            >
                {/* Category Badge */}
                <div className="mb-4">
                <span className="inline-block text-xs font-medium tracking-wide uppercase bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                    {item.category}
                </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900 leading-snug transition group-hover:text-blue-600">
                {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-600 mt-4 line-clamp-3 leading-relaxed">
                {item.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                <span>{item.date}</span>
                <span>{item.readTime}</span>
                </div>

                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-blue-100 transition pointer-events-none" />
            </Link>
            ))}
        </div>
        </section>

      </div>
    </main>
  );
}