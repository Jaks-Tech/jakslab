import { ServicesHero } from "@/components/services/ServicesHero";
import { AcademicServices } from "@/components/services/AcademicServices";
import { TechServices } from "@/components/services/TechServices";
import { HowItWorks } from "@/components/services/HowItWorks";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { ServicesFlexibilityNotice } from "@/components/services/ServicesFlexibilityNotice";

export default function ServicesPage() {
  return (
    /* 1. Changed 'bg-white' to 'bg-transparent' to show the 3D stars.
       2. Added 'text-white' as a base so all text is readable on the dark 3D bg.
    */
    <main className="bg-transparent text-white min-h-screen">
      <ServicesHero />
      <AcademicServices />
      <TechServices />
      <HowItWorks />
      <ServicesFlexibilityNotice />
      <ServicesCTA />
    </main>
  );
}