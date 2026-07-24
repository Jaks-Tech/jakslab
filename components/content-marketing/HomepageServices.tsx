import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, FileText, GraduationCap } from "lucide-react";

const services = [
  {
    number: "P1",
    title: "Content Marketing",
    description: "Articles, blog improvement, content planning, SEO and AEO.",
    items: ["Technical articles", "Documentation into content", "Blog setup and improvement"],
    href: "/services#content-marketing",
    visual: "/service-visuals/content-knowledge-pipeline.svg",
    visualAlt: "Technical source material becoming a useful customer article.",
    icon: FileText,
  },
  {
    number: "P2",
    title: "Technology & Development",
    description: "Websites, applications, internal tools, APIs and integrations.",
    items: ["Business websites", "Web applications and internal tools", "APIs, data and integrations"],
    href: "/services#technology-development",
    visual: "/service-visuals/product-delivery-loop.svg",
    visualAlt: "Product planning, development, verification and release.",
    icon: Code2,
  },
  {
    number: "P3",
    title: "Research & Academic Work",
    description: "Research planning, analysis, reports, editing and presentation.",
    items: ["Research and literature reviews", "Data analysis and reports", "Editing and referencing"],
    href: "/services#research-academic",
    visual: "/service-visuals/research-evidence-flow.svg",
    visualAlt: "Sources and evidence moving through analysis into a research output.",
    icon: GraduationCap,
  },
];

export function HomepageServices() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-slate-700">Services</p>
        </div>
        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
          View the full services page <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className="service-steps-stage relative mt-8 grid gap-5 lg:grid-cols-3">
        <svg className="pointer-events-none absolute inset-x-0 top-3 hidden h-48 w-full lg:block" viewBox="0 0 1200 190" preserveAspectRatio="none" aria-hidden="true">
          <path className="service-step-connector" d="M120 28 L600 92 L1080 156" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="7 8" />
        </svg>
        {services.map(({ number, title, description, items, href, visual, visualAlt, icon: Icon }, index) => (
          <article key={title} className={`service-step-item group relative z-10 px-1 py-4 sm:px-2 ${index === 1 ? "lg:mt-12" : index === 2 ? "lg:mt-24" : ""}`}>
            <div className="flex items-center justify-between">
              <Icon size={22} className="text-slate-900" aria-hidden="true" />
              <span className="service-step-marker grid size-11 place-items-center rounded-full border-2 border-slate-700 bg-white text-xs font-bold text-slate-950">{number}</span>
            </div>
            <h3 className="mt-7 text-xl font-semibold text-slate-950">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-800">{description}</p>
            <figure className="mt-5 overflow-hidden border border-slate-300 bg-white">
              <Image
                src={visual}
                alt={visualAlt}
                width={1200}
                height={560}
                className="h-36 w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </figure>
            <p className="mt-5 text-sm leading-6 text-slate-900">{items.join(" · ")}</p>
            <Link href={href} className="service-step-link mt-7 inline-flex items-center gap-2 rounded-lg bg-[#202733] px-4 py-2.5 text-sm font-semibold text-[#fff]">
              Explore this service <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
