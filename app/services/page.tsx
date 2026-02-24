import { ServicesHero } from "@/components/services/ServicesHero";
import { AcademicServices } from "@/components/services/AcademicServices";
import { TechServices } from "@/components/services/TechServices";
import { HowItWorks } from "@/components/services/HowItWorks";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { ServicesFlexibilityNotice } from "@/components/services/ServicesFlexibilityNotice";

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <ServicesHero />
      <AcademicServices />
      <TechServices />
      <HowItWorks />
      <ServicesFlexibilityNotice />
      <ServicesCTA />
    </main>
  );
}