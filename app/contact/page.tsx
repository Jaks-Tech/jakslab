import { CompactContactForm } from "@/components/contact/CompactContactForm";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactFAQ } from "@/components/contact/ContactFAQ";

export default function ContactPage() {
  return (
    <main className="contact-page relative min-h-[calc(100vh-5rem)] overflow-hidden bg-transparent px-4 pb-20 pt-14 text-white sm:px-6 sm:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,.2),transparent_68%)]" />
      <section className="relative mx-auto max-w-2xl text-center">
        
        <h1 className="mx-auto mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Let&apos;s talk.</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">Tell us what you need.</p>
        <div className="mt-9 text-left"><CompactContactForm /></div>
      </section>
      <div className="relative mx-auto mt-16 max-w-5xl space-y-16 sm:mt-24 sm:space-y-20">
        <ContactChannels />
        <ContactFAQ />
      </div>
    </main>
  );
}
