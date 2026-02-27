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

  if (!slug) notFound();

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
    <main className="relative bg-transparent min-h-screen overflow-hidden">
      {/* Global Ambient Glow */}
      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <div className="w-[1200px] h-[1200px] bg-blue-600/10 blur-[200px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* ===============================
           BREADCRUMB
        =============================== */}
        <div className="text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link href="/portfolio" className="hover:text-blue-400 transition">
            Portfolio
          </Link>
          <span className="mx-2">›</span>
          <span className="text-slate-400">{article.category}</span>
        </div>

        {/* ===============================
           TITLE + META
        =============================== */}
        <h1 className="text-4xl font-bold text-white leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-slate-400">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        {/* ===============================
           FEATURED IMAGE
        =============================== */}
        <div className="mt-12 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.15)]">
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
              prose-invert
              prose-headings:text-white
              prose-p:text-slate-300
              prose-strong:text-white
              prose-a:text-blue-400
              hover:prose-a:text-indigo-400
            "
            dangerouslySetInnerHTML={{
              __html: article.contentHtml,
            }}
          />

          {/* Sidebar */}
          <aside className="space-y-12 lg:sticky lg:top-24 self-start">
            {/* AUTHOR CARD */}
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] p-8 text-center hover:border-blue-500/40 transition-all duration-500">
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/20">
                  <Image
                    src="/jakslab.png"
                    alt="Author"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white">
                About the Author
              </h3>

              <div className="mt-3 mb-6 h-1 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto" />

              <p className="text-sm leading-relaxed text-slate-400">
                <span className="font-semibold text-white">
                  {article.author}
                </span>{" "}
                consists of academic and technical professionals delivering
                structured research insights and expert guidance.
              </p>

              <div className="my-6 border-t border-white/10" />

              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition"
              >
                Explore More Articles →
              </Link>
            </div>

            {/* SHARE CARD */}
            <ShareCard />
          </aside>
        </div>

        {/* ===============================
           RELATED ARTICLES
        =============================== */}
        <section className="mt-32 pt-16 border-t border-white/10">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">
              Related Articles
            </h2>
            <span className="text-sm text-slate-500">
              Explore more insights
            </span>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                className="group rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 transition-all duration-500 hover:border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
              >
                <div className="mb-4">
                  <span className="inline-block text-xs font-medium bg-white/10 border border-white/20 text-blue-400 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-blue-400 transition">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-400 mt-4 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                  <span>{item.date}</span>
                  <span>{item.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}