import type { Metadata } from "next";
import { AboutExperience } from "@/components/about/AboutExperience";

export const metadata: Metadata = {
  title: "About",
  description:
    "JaksLab helps companies and professionals turn specialist knowledge into useful content, digital products and carefully developed research.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutExperience />;
}
