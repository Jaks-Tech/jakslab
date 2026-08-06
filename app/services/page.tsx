import type { Metadata } from "next";
import { ServicesOverview } from "@/components/services/ServicesOverview";

export const metadata: Metadata = {
  title: "Content Marketing, Technology and Research Services",
  description:
    "Technical content marketing, SEO and AEO, websites and software, plus research and academic support from JaksLab.",
  keywords: [
    "technical content marketing services",
    "SEO and AEO services",
    "blog development",
    "website development services",
    "software development",
    "academic research support",
  ],
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesOverview />;
}
