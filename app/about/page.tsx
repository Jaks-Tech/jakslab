import { AboutHero } from "@/components/about/AboutHero";
import { MissionSection } from "@/components/about/MissionSection";
import { CoreValues } from "@/components/about/CoreValues";
import { ExpertiseSection } from "@/components/about/ExpertiseSection";
import { ConfidentialityBanner } from "@/components/about/ConfidentialityBanner";
import { StatsStrip } from "@/components/about/StatsStrip";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutHero />
      <MissionSection />
      <CoreValues />
      <ExpertiseSection />
      <ConfidentialityBanner />
      <StatsStrip />
    </main>
  );
}