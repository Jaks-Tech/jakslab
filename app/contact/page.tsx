import type { Metadata } from "next";
import { CompactContactForm } from "@/components/contact/CompactContactForm";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import Link from "next/link";
import { CalendarDays, ClipboardList, Code2, FileText, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact JaksLab about technical content marketing, a website or software project, or research and academic support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="contact-page mx-auto min-h-[calc(100vh-5rem)] w-full max-w-[1440px] bg-transparent [font-family:Arial,Helvetica,sans-serif] text-slate-800">
      <section className="w-full border-b border-slate-300 px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-12 lg:pb-16 lg:pt-24 xl:px-16 2xl:px-20">
        <div className="w-full text-center">
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Tell us what you need help with.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-700">
            Give us the subject, the expected result and any deadline or technical requirement that matters. We will reply with the next practical step.
          </p>
        </div>

        <div className="mt-10 w-full border border-slate-300 bg-transparent p-5 shadow-[0_18px_45px_rgba(15,23,42,.08)] sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-950">Send an enquiry</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">Start with a short description. Your contact details come next.</p>
          <div className="mt-7">
            <CompactContactForm />
          </div>
        </div>

        <div className="mt-10 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex min-w-0 gap-4 border border-slate-300 p-5">
            <FileText className="mt-0.5 shrink-0 text-slate-700" size={20} aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-slate-950">Content Marketing</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">For blog work, technical articles, SEO and AEO.</p>
              <Link href="/book-call" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
                <CalendarDays size={16} aria-hidden="true" />
                Book a 30-minute call
              </Link>
            </div>
          </div>
          <div className="flex min-w-0 gap-4 border border-slate-300 p-5">
            <Code2 className="mt-0.5 shrink-0 text-slate-700" size={20} aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-slate-950">Technology &amp; Development</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">Describe the product, problem or improvement you need.</p>
              <Link href="/order" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
                <ClipboardList size={16} aria-hidden="true" />
                Request service
              </Link>
            </div>
          </div>
          <div className="flex min-w-0 gap-4 border border-slate-300 p-5 sm:col-span-2 lg:col-span-1">
            <GraduationCap className="mt-0.5 shrink-0 text-slate-700" size={20} aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-slate-950">Research &amp; Academic Work</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">Include the brief, required standard and deadline where possible.</p>
              <Link href="/order" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
                <ClipboardList size={16} aria-hidden="true" />
                Request service
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full space-y-14 px-5 py-14 sm:px-8 sm:py-16 lg:space-y-16 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
        <ContactChannels />
        <ContactFAQ />
      </div>
    </main>
  );
}
