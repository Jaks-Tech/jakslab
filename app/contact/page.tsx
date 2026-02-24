import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import { ContactWhatsAppCard } from "@/components/contact/ContactWhatsAppCard";
import { ContactBusinessHours } from "@/components/contact/ContactBusinessHours";

export default function ContactPage() {
  return (
    <main className="pt-24 pb-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

        <ContactHero />

        

        <div className="grid lg:grid-cols-2 gap-10 mt-16">
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