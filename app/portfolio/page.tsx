export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { getAllArticles } from "@/lib/articles";
import ArticlesHero from "@/components/portfolio/ArticlesHero";
import PortfolioClient from "@/components/portfolio/PortfolioClient";
import ResultsInfo from "@/components/portfolio/Pagination";

export default function PortfolioPage() {
  const articles = getAllArticles();

  return (
    <main className="relative bg-transparent min-h-screen overflow-hidden">
      {/* Global Ambient Glow */}
      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <div className="w-[1000px] h-[1000px] bg-blue-600/10 blur-[180px] rounded-full" />
      </div>

      {/* Hero */}
      <ArticlesHero />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
        <Suspense
          fallback={
            <div className="py-20 text-center text-slate-400">
              Loading...
            </div>
          }
        >
          <PortfolioClient articles={articles} />
          <ResultsInfo total={articles.length} />
        </Suspense>
      </div>
    </main>
  );
}