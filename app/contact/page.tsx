import { ContactHeroSimple } from "@/components/contact/ContactHeroSimple";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import { ContactOrbit } from "@/components/contact/ContactOrbit";
import { ContactChannels } from "@/components/contact/ContactChannels";

export default function ContactPage() {
  return (
    <main className="contact-page relative bg-transparent overflow-hidden pb-24">
      {/* Global Ambient Depth Layer */}
      <div className="absolute inset-0 flex flex-col items-center pointer-events-none -z-10">
        <div className="w-[1200px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full mt-[-10%]" />
        <div className="w-[1000px] h-[1000px] bg-indigo-600/5 blur-[140px] rounded-full mt-auto mb-[-20%]" />
      </div>

      {/* 1. Hero Section */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:grid-cols-[1.05fr_.95fr] lg:pt-28">
        <ContactHeroSimple /><ContactOrbit />
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-5 sm:px-8">
        
        {/* 2. Full Width Contact Form */}
        <ContactChannels />
        <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_.92fr]">
          <div className="w-full">
            <ContactForm />
          </div>
          <ContactFAQ />
        </div>

      </div>
    </main>
  );
}
