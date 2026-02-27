import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import { ContactWhatsAppCard } from "@/components/contact/ContactWhatsAppCard";
import { ContactBusinessHours } from "@/components/contact/ContactBusinessHours";

export default function ContactPage() {
  return (
    <main className="relative bg-transparent overflow-hidden">
      {/* Global Ambient Depth Layer */}
      <div className="absolute inset-0 flex flex-col items-center pointer-events-none -z-10">
        <div className="w-[1200px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full mt-[-10%]" />
        <div className="w-[1000px] h-[1000px] bg-indigo-600/5 blur-[140px] rounded-full mt-auto mb-[-20%]" />
      </div>

      {/* 1. Hero Section */}
      <section className="pt-24 pb-12 text-center">
        <ContactHero />
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-32">
        
        {/* 2. Full Width Contact Form */}
        <div className="flex justify-center mb-24">
          <div className="w-full max-w-4xl">
            <ContactForm />
          </div>
        </div>

        {/* 3. Middle Section: WhatsApp & FAQ aligned in a balanced column */}
        <div className="flex flex-col items-center gap-10 mb-24">
          <ContactWhatsAppCard />
          <ContactFAQ />
        </div>

        {/* 4. Global Reach Info Cards */}
        <div className="relative mb-32 w-full">
          <div className="absolute inset-0 bg-blue-500/5 blur-[100px] -z-10 rounded-full" />
          <ContactInfoCards />
        </div>

        {/* 5. Business Hours (The Last One) */}
        <div className="flex justify-center">
          <ContactBusinessHours />
        </div>

      </div>
    </main>
  );
}