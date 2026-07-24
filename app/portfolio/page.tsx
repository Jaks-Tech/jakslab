export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { getAllArticles } from "@/lib/articles";
import ArticlesHeroSimple from "@/components/portfolio/ArticlesHeroSimple";
import PortfolioClient from "@/components/portfolio/PortfolioClient";

export default function PortfolioPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-white [font-family:Arial,Helvetica,sans-serif] text-slate-800">
      <ArticlesHeroSimple />

      <div className="w-full px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
        <Suspense
          fallback={
            <div className="py-20 text-center text-slate-400">
              Loading...
            </div>
          }
        >
          <PortfolioClient articles={articles} />
        </Suspense>
      </div>
    </main>
  );
}
