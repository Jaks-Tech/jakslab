import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Sitemap | JaksLab",
  description: "Browse JaksLab content optimization, project research, product development, articles, tools and company information.",
};

const pageGroups = [
  {
    title: "Company",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/book-call", label: "Book a 30-minute call" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services#content-marketing", label: "Content Optimization" },
      { href: "/services#research-academic", label: "Pre-project Research" },
      { href: "/services#technology-development", label: "Product Development" },
      { href: "/services#research-academic", label: "Academic Tutoring" },
      { href: "/order", label: "Request a service" },
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "/products", label: "Products" },
      { href: "/ai-doc-analysis", label: "AI Document Analysis" },
      { href: "/chat-doc", label: "Chat with a Document" },
      { href: "/citation-generator", label: "Citation Generator" },
      { href: "/literature-planner", label: "Literature Planner" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export default function SitemapPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-transparent px-5 py-16 [font-family:Arial,Helvetica,sans-serif] text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[.14em] text-slate-600">Directory</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Sitemap</h1>
          <p className="mt-4 text-base leading-7 text-slate-700">
            Public services, tools, company pages and published articles.
          </p>
        </header>

        <section className="mt-12 grid gap-x-12 gap-y-10 border-y border-slate-300 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {pageGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-lg font-semibold">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <Link href={link.href} className="text-sm text-slate-700 underline-offset-4 hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-600">Our Insights</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Published articles</h2>
            </div>
            <Link href="/portfolio" className="text-sm font-semibold underline underline-offset-4">
              Browse Our Insights
            </Link>
          </div>

          <ul className="mt-8 divide-y divide-slate-300 border-y border-slate-300">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/portfolio/${article.slug}`}
                  className="grid gap-2 py-4 text-slate-900 hover:bg-white/45 sm:grid-cols-[1fr_auto] sm:items-center sm:px-3"
                >
                  <span className="font-medium">{article.title}</span>
                  <span className="text-sm text-slate-600">{article.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
