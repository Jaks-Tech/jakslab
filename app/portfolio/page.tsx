export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { getAllArticles } from "@/lib/articles";
import ArticlesHero from "@/components/portfolio/ArticlesHero";
import PortfolioClient from "@/components/portfolio/PortfolioClient";
import ResultsInfo from "@/components/portfolio/Pagination";

export default function PortfolioPage() {
  const articles = getAllArticles();

  return (
    <main className="bg-slate-50 min-h-screen">

      {/* ✅ Full Width Hero */}
      <ArticlesHero />

      {/* ✅ Wrapped Content Only */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-24">

        <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
          <PortfolioClient articles={articles} />
          <ResultsInfo total={articles.length} />
        </Suspense>

      </div>
    </main>
  );
}