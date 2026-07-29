import type { Metadata } from "next";
import { HomepageServiceHero } from "@/components/content-marketing/HomepageServiceHero";
import { HomepageOverview } from "@/components/content-marketing/HomepageOverview";
import { HomepageAudienceArcs } from "@/components/content-marketing/HomepageAudienceArcs";
import { HomepageStrategy } from "@/components/content-marketing/HomepageStrategy";
import { getAllArticles } from "@/lib/articles";
import { ResponsiveSection } from "@/components/layout/ResponsiveLayout";

export const metadata: Metadata = {
  title: {
    absolute: "JaksLab | SEO, AEO, Content, Research & Product Development",
  },
  description:
    "Grow qualified traffic with SEO, AEO and company-specific technical content, research a project before development and build a useful digital product with JaksLab.",
  keywords: [
    "technical content marketing company",
    "technical article writing",
    "B2B blog content",
    "blog traffic growth",
    "pre-project research",
    "project requirements research",
    "website and software development",
    "digital product builder",
    "JaksLab",
  ],
  alternates: { canonical: "/" },
};

export default function Home() {
  const articles = getAllArticles();

  return (
    <main className="w-full flex-1 bg-transparent [font-family:Arial,Helvetica,sans-serif] text-slate-800">
      <HomepageServiceHero />
      <ResponsiveSection className="bg-transparent !py-[clamp(1.5rem,2.5vw,2rem)]" aria-label="Teams we work best with">
        <HomepageAudienceArcs />
      </ResponsiveSection>
      <ResponsiveSection className="bg-transparent !py-[clamp(1.5rem,2.5vw,2rem)]" aria-label="Our strategy">
        <HomepageStrategy />
      </ResponsiveSection>
      <HomepageOverview articles={articles} />
    </main>
  );
}
