import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  ClipboardList,
  Code2,
  FileCheck2,
  FileText,
  GraduationCap,
  Mail,
  MessageSquareText,
} from "lucide-react";

const serviceAreas = [
  {
    number: "01",
    title: "Content Marketing",
    description:
      "We turn product documentation, Confluence pages, reports, interviews and customer questions into useful technical articles.",
    detail: "Content planning · Technical articles · Blog setup · SEO · AEO",
    href: "/services#content-marketing",
    icon: FileText,
    primary: true,
  },
  {
    number: "02",
    title: "Technology & Development",
    description:
      "We build and improve websites, web applications, internal tools, APIs, integrations and data-backed products.",
    detail: "Planning · Interfaces · Backend · Data · Deployment",
    href: "/services#technology-development",
    icon: Code2,
    primary: false,
  },
  {
    number: "03",
    title: "Research & Academic Work",
    description:
      "We support research planning, literature reviews, technical reports, editing, referencing and academic presentations.",
    detail: "Research · Analysis · Writing · Editing · Referencing",
    href: "/services#research-academic",
    icon: GraduationCap,
    primary: false,
  },
];

const principles = [
  {
    title: "Work from the source",
    description: "Claims, technical details and recommendations should be traceable to approved material.",
    icon: BookOpenText,
  },
  {
    title: "Keep specialists involved",
    description: "The people who know the subject review the substance before work is finalized.",
    icon: MessageSquareText,
  },
  {
    title: "Deliver something usable",
    description: "The result should be clear, correctly structured and ready for its intended audience.",
    icon: FileCheck2,
  },
];

export function AboutExperience() {
  return (
    <main className="mx-auto w-full max-w-[1440px] bg-white [font-family:Arial,Helvetica,sans-serif] text-slate-800">
      <section className="border-b border-slate-300">
        <div className="grid w-full gap-12 px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-12 lg:py-24 xl:px-16 2xl:px-20">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              We make technical knowledge useful outside the team that created it.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700">
              JaksLab works across technical content, software development and research. Our main focus is helping companies explain complex products and services through accurate, useful content.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book-call" className="inline-flex items-center gap-2 rounded-lg bg-[#202733] px-5 py-3 text-sm font-semibold text-[#fff] transition hover:bg-[#111827]">
                <CalendarDays size={18} aria-hidden="true" />
                Book a content call
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-800">
                <Mail size={18} aria-hidden="true" />
                Enquire
              </Link>
            </div>
          </div>

          <div className="border border-slate-300 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">From source material to usable work.</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div className="space-y-3">
                {["Documentation", "Technical people", "Research and data"].map((item) => (
                  <div key={item} className="border border-slate-300 px-4 py-3 text-sm font-medium text-slate-800">
                    {item}
                  </div>
                ))}
              </div>
              <ArrowRight className="mx-auto rotate-90 text-slate-500 sm:rotate-0" size={22} aria-hidden="true" />
              <div className="border border-slate-500 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[.12em] text-slate-600">Useful output</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-800">
                  <li>Customer articles</li>
                  <li>Working digital products</li>
                  <li>Clear research outputs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-b border-slate-300 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16 2xl:px-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="border border-slate-300 bg-white p-7 sm:p-9">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Our mission</h2>
            <p className="mt-5 text-base leading-8 text-slate-700">
              To help technical companies turn the knowledge inside their documentation, systems and teams into clear content that customers can find, understand and use.
            </p>
          </article>
          <article className="border border-slate-300 bg-white p-7 sm:p-9">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Our vision</h2>
            <p className="mt-5 text-base leading-8 text-slate-700">
              A web where technical information is accurate, readable and genuinely useful. It should work for people, search engines and AI answer tools.
            </p>
          </article>
        </div>
      </section>

      <section className="w-full border-b border-slate-300 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16 2xl:px-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Three connected areas of work.</h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {serviceAreas.map(({ number, title, description, detail, href, icon: Icon, primary }) => (
            <article key={title} className={`border bg-white p-6 sm:p-8 ${primary ? "border-slate-700" : "border-slate-300"}`}>
              <div className="flex items-center justify-between">
                <Icon size={22} className="text-slate-700" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-500">{number}</span>
              </div>
              <h3 className="mt-7 text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-700">{description}</p>
              <p className="mt-5 border-t border-slate-300 pt-5 text-xs leading-6 text-slate-600">{detail}</p>
              {primary ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={href} className="inline-flex items-center gap-2 rounded-lg border border-slate-400 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-800">
                    View services <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link href="/book-call" className="inline-flex items-center gap-2 rounded-lg bg-[#202733] px-4 py-2.5 text-sm font-semibold text-[#fff] transition hover:bg-[#111827]">
                    <CalendarDays size={17} aria-hidden="true" />
                    Book a call
                  </Link>
                </div>
              ) : (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/contact?service=${number === "02" ? "technology-development" : "research-academic"}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-400 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-800"
                  >
                    <Mail size={17} aria-hidden="true" />
                    Enquire
                  </Link>
                  <Link href="/order" className="inline-flex items-center gap-2 rounded-lg bg-[#202733] px-4 py-2.5 text-sm font-semibold text-[#fff] transition hover:bg-[#111827]">
                    <ClipboardList size={17} aria-hidden="true" />
                    Request service
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="w-full border-b border-slate-300 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16 2xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Simple working principles.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {principles.map(({ title, description, icon: Icon }) => (
              <article key={title} className="border-t border-slate-500 pt-6">
                <Icon size={20} className="text-slate-700" aria-hidden="true" />
                <h3 className="mt-5 font-semibold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
