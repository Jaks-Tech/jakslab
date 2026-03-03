import { ServicesHero } from "@/components/services/ServicesHero";
import { AcademicServices } from "@/components/services/AcademicServices";
import { TechServices } from "@/components/services/TechServices";
import { HowItWorks } from "@/components/services/HowItWorks";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { ServicesFlexibilityNotice } from "@/components/services/ServicesFlexibilityNotice";

export default function ServicesPage() {
  return (
    <main className="bg-transparent text-white min-h-screen flex flex-col space-y-16 md:space-y-5">
      <ServicesHero />
      <AcademicServices />
      <TechServices />
      <ServicesFlexibilityNotice />
      <HowItWorks />
      <ServicesCTA />
    </main>
  );
}