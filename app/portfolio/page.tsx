export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticlesHeroSimple from "@/components/portfolio/ArticlesHeroSimple";
import InsightsList from "@/components/portfolio/InsightsList";
import { ResponsiveContainer } from "@/components/layout/ResponsiveLayout";

export const metadata: Metadata = {
  title: "Technical Content, Technology and Research Articles",
  description:
    "Practical articles about technical content marketing, digital products, software, research and academic work.",
  keywords: [
    "technical content marketing articles",
    "technology articles",
    "research and academic articles",
    "JaksLab blog",
  ],
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-transparent [font-family:Arial,Helvetica,sans-serif] text-slate-800">
      <ArticlesHeroSimple />

      <ResponsiveContainer className="py-[var(--section-space)]">
        <InsightsList articles={articles} />
      </ResponsiveContainer>
    </main>
  );
}
