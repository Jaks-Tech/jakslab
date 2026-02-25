import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import { ContactWhatsAppCard } from "@/components/contact/ContactWhatsAppCard";
import { ContactBusinessHours } from "@/components/contact/ContactBusinessHours";

export default function ContactPage() {
  return (
    <main className="bg-white">
      
      {/* ✅ Full Width Hero */}
      <ContactHero />

      {/* ✅ Constrained Content Section */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 pt-24 pb-32">

        <div className="grid lg:grid-cols-2 gap-10">
          <ContactForm />
          <div className="space-y-6">
            <ContactFAQ />
            <ContactWhatsAppCard />
          </div>
        </div>

        <ContactInfoCards />
        <ContactBusinessHours />

      </div>
    </main>
  );
}