import { HomepageHero } from "@/components/content-marketing/HomepageHero";
import { HomepageServices } from "@/components/content-marketing/HomepageServices";
import { HomepageOverview } from "@/components/content-marketing/HomepageOverview";
import { HomepagePracticeVisual } from "@/components/content-marketing/HomepagePracticeVisual";
import { HomepageSelectedWork } from "@/components/content-marketing/HomepageSelectedWork";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();

  return (
    <main className="w-full flex-1 bg-transparent [font-family:Arial,Helvetica,sans-serif] text-slate-800">
      <HomepageHero />
      <section className="w-full bg-transparent px-5 py-6 sm:px-8 sm:py-8 lg:px-12 xl:px-16 2xl:px-20" aria-label="Services">
        <HomepageServices />
      </section>
      <section className="w-full bg-transparent px-5 py-6 sm:px-8 sm:py-8 lg:px-12 xl:px-16 2xl:px-20" aria-label="Selected work">
        <HomepageSelectedWork />
      </section>
      <section className="w-full bg-transparent px-5 py-6 sm:px-8 sm:py-8 lg:px-12 xl:px-16 2xl:px-20" aria-label="Our practices">
        <HomepagePracticeVisual />
      </section>
      <HomepageOverview articles={articles} />
    </main>
  );
}
