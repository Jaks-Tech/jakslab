import type { Metadata } from "next";
import { HomepageServiceHero } from "@/components/content-marketing/HomepageServiceHero";
import { HomepageOverview } from "@/components/content-marketing/HomepageOverview";
import { HomepageAudienceSwitcher } from "@/components/content-marketing/HomepageAudienceSwitcher";
import { getAllArticles } from "@/lib/articles";
import { ResponsiveSection } from "@/components/layout/ResponsiveLayout";
import { HomepagePillars } from "@/components/content-marketing/HomepagePillars";
import { getHomepagePillars } from "@/lib/homepage-pillars";

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

export default async function Home() {
  const articles = getAllArticles();
  const pillars = await getHomepagePillars();

  return (
    <main className="homepage-simple w-full flex-1 bg-[#f7f5ef] text-[#1d1d1a]">
      <HomepageServiceHero />
      <HomepagePillars pillars={pillars} />
      <ResponsiveSection className="bg-transparent !py-[clamp(1.5rem,2.5vw,2rem)]" aria-label="Teams we work best with">
        <HomepageAudienceSwitcher />
      </ResponsiveSection>
      <HomepageOverview articles={articles} />
    </main>
  );
}
