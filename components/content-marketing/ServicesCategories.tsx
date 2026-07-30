"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  BookOpenText,
  CalendarDays,
  Code2,
  FileText,
  GraduationCap,
  Headphones,
  Mail,
  Megaphone,
  MessageSquareText,
  ClipboardList,
  Presentation,
} from "lucide-react";
import { ContentCraftingCarousel } from "@/components/content-marketing/ContentCraftingCarousel";
import { TechnologyBuildPath } from "@/components/content-marketing/TechnologyBuildPath";
import { ResearchServicePath } from "@/components/content-marketing/ResearchServicePath";

const contentServices = [
  {
    title: "Content planning",
    description: "We look at what your company sells, what your customers need to understand and what useful knowledge already exists inside the business. From that, we prepare a realistic publishing plan.",
  },
  {
    title: "Technical articles",
    description: "We write clear articles from interviews, documentation and approved technical sources. Your specialists check the substance; we handle the research, structure and writing.",
  },
  {
    title: "Documentation into articles",
    description: "We turn product documentation, Confluence pages, reports and internal notes into articles written for customers rather than internal teams.",
  },
  {
    title: "Blog setup",
    description: "If your website has no blog, we can add and organize one. This includes the page structure, categories, article layout, navigation and the first publishing plan.",
  },
  {
    title: "Existing blog improvement",
    description: "We review what has already been published, update weak or outdated articles, remove unnecessary repetition and connect useful pages to your services.",
  },
  {
    title: "SEO and AEO",
    description: "We make articles easier to find through search and easier for AI answer tools to understand. The writing remains useful to people first.",
  },
];

const sourceMaterials = [
  { label: "Product and service documentation", icon: FileText },
  { label: "Confluence and internal knowledge pages", icon: BookOpenText },
  { label: "Technical reports and presentations", icon: Presentation },
  { label: "Interviews with founders, engineers and specialists", icon: MessageSquareText },
  { label: "Support questions and implementation experience", icon: Headphones },
];

const technologyServices = [
  {
    title: "Business websites",
    description: "Fast, responsive websites with clear service pages, enquiry routes, content sections and straightforward administration.",
  },
  {
    title: "Web applications",
    description: "Purpose-built portals, dashboards and browser-based tools for customers, teams or specific business workflows.",
  },
  {
    title: "Internal tools",
    description: "Simple systems that replace repetitive spreadsheets, disconnected forms and manual handovers inside a company.",
  },
  {
    title: "APIs and integrations",
    description: "Connections between websites, databases, payment services, communication tools and other software your work depends on.",
  },
  {
    title: "Data and automation",
    description: "Structured databases, reporting views and practical automations that reduce repeated work and make information easier to use.",
  },
  {
    title: "Existing product improvement",
    description: "Focused work on performance, usability, reliability, missing features, technical debt and deployment problems.",
  },
];

const researchServices = [
  {
    title: "Research planning",
    description: "Research questions, objectives, methods, work plans and clear structures developed from the brief or proposed topic.",
  },
  {
    title: "Literature reviews",
    description: "Careful source discovery, comparison and synthesis organized around themes, debates, evidence and identifiable research gaps.",
  },
  {
    title: "Data analysis",
    description: "Cleaning, organizing and analysing qualitative or quantitative data, with the method and limits explained clearly.",
  },
  {
    title: "Technical and research reports",
    description: "Well-structured reports that connect the question, method, findings and recommendations for academic or professional readers.",
  },
  {
    title: "Editing and referencing",
    description: "Detailed review of argument, structure, clarity, citations and formatting while preserving the writer's meaning and voice.",
  },
  {
    title: "Presentations and research summaries",
    description: "Slides, posters, evidence summaries and briefing documents that communicate complex work without losing its substance.",
  },
];

const serviceTabs = [
  { id: "content-marketing", label: "Content Marketing", icon: Megaphone },
  { id: "technology-development", label: "Technology & Development", icon: Code2 },
  { id: "research-academic", label: "Project Research & Tutoring", icon: GraduationCap },
];

export function ServicesCategories() {
  const [activeSection, setActiveSection] = useState("content-marketing");
  const [showServiceNav, setShowServiceNav] = useState(true);
  const previousScrollPosition = useRef(0);
  const activeIndex = serviceTabs.findIndex(({ id }) => id === activeSection);

  useEffect(() => {
    const sections = serviceTabs
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.1, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    previousScrollPosition.current = window.scrollY;

    const handleScroll = () => {
      const currentPosition = window.scrollY;
      const movement = currentPosition - previousScrollPosition.current;

      if (currentPosition < 80) {
        setShowServiceNav(true);
      } else if (movement > 2) {
        setShowServiceNav(false);
      } else if (movement < -2) {
        setShowServiceNav(true);
      }

      previousScrollPosition.current = currentPosition;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="services-clean mx-auto w-full max-w-[1440px] pt-8 text-slate-800">
      <nav
        aria-label="Service categories"
        className={`sticky top-[88px] z-30 mx-auto w-full max-w-2xl px-4 py-3 transition-opacity duration-200 ease-out ${
          showServiceNav ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="relative grid grid-cols-3 items-start gap-2 sm:gap-5">
          <div className="absolute left-[16.666%] right-[16.666%] top-5 h-px bg-slate-300" aria-hidden="true">
            <span
              className="block h-full bg-slate-800 transition-[width] duration-500 ease-out"
              style={{ width: `${Math.max(activeIndex, 0) * 50}%` }}
            />
          </div>

          {serviceTabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActiveSection(id)}
                className="relative z-10 flex min-w-0 flex-col items-center gap-2 text-center"
                style={{ color: "#172033" }}
              >
                <span
                  className={`grid size-10 place-items-center rounded-full border bg-transparent shadow-sm transition sm:size-11 ${
                    isActive
                      ? "border-slate-900 text-slate-950"
                      : "border-slate-400 text-slate-700 hover:border-slate-700"
                  }`}
                >
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span className={`text-[10px] font-semibold leading-4 sm:text-xs ${isActive ? "text-slate-950" : "text-slate-700"}`}>
                  {label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      <section id="content-marketing" className="service-section scroll-mt-36 border-t-4 border-[#946832] bg-transparent">
        <ContentCraftingCarousel />
        <div className="hidden">
          <p className="text-sm text-slate-600">01 / Content Marketing</p>
          <div className="mt-5 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:gap-10 lg:gap-16">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Technical content built from what your company already knows.
              </h2>
              <p className="mt-5 leading-8 text-slate-700">
                Most technical companies already have useful material in their documentation, internal pages, reports and experienced staff. We turn that material into articles customers can find and understand.
              </p>
              <p className="mt-4 leading-8 text-slate-700">
                We can improve a blog you already have or help you add a straightforward articles section to an existing website.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/book-call"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#202733] px-5 py-3 text-sm font-semibold text-[#fff] transition hover:bg-[#111827]"
                >
                  <CalendarDays size={18} aria-hidden="true" />
                  Book a 30-minute call
                </Link>
                <Link
                  href="/contact?service=content-marketing"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-400 bg-transparent px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-700"
                >
                  <Mail size={18} aria-hidden="true" />
                  Enquire
                </Link>
              </div>
            </div>

            <aside className="border-l border-slate-300 pl-6 sm:pl-8">
              <h3 className="text-base font-semibold text-slate-950">Material we can work from</h3>
              <ul className="mt-5 space-y-3">
                {sourceMaterials.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md bg-transparent text-slate-700">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <span className="pt-1">{label}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <figure className="mt-12 overflow-hidden rounded-2xl border border-slate-300 bg-transparent sm:mt-16">
            <Image
              src="/service-visuals/content-knowledge-pipeline.svg"
              alt="Company documentation, expert interviews and customer questions moving through an editorial system to become useful articles."
              width={1200}
              height={560}
              className="h-auto w-full"
            />
          </figure>

          <div className="mt-12 sm:mt-16">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[.14em] text-slate-600">Content marketing roadmap</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl">
                From company knowledge to content people can find and use
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                We adapt the route to your website and existing material. Each stage builds on the work before it.
              </p>
            </div>

            <ol className="relative mt-10 space-y-0 before:absolute before:bottom-8 before:left-5 before:top-8 before:w-px before:bg-slate-300 sm:before:left-7">
              {contentServices.map((service, index) => (
                <li key={service.title} className="relative grid grid-cols-[2.5rem_1fr] gap-5 pb-9 last:pb-0 sm:grid-cols-[3.5rem_.55fr_1fr] sm:gap-7 sm:pb-10">
                  <span className="relative z-10 grid size-10 place-items-center rounded-full border-2 border-slate-700 bg-transparent text-xs font-bold text-slate-900 sm:size-14">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="border-t border-slate-300 pt-4 sm:pt-5">
                    <h4 className="font-semibold text-slate-950">{service.title}</h4>
                  </div>
                  <p className="col-start-2 border-t border-slate-300 pt-3 text-sm leading-7 text-slate-700 sm:col-start-3 sm:pt-5">
                    {service.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12 border border-white/15 p-5 sm:mt-16 sm:p-8">
            <h3 className="text-xl font-semibold">Already have a blog?</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
              We will start by reviewing it. There is often more value in improving useful older work than publishing another batch of disconnected articles.
            </p>
            <h3 className="mt-8 text-xl font-semibold">No blog yet?</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
              We can add a simple articles section, organize it properly and prepare the first topics from your existing company material.
            </p>
            <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-300 bg-transparent">
              <Image
                src="/service-visuals/blog-route-map.svg"
                alt="Decision map showing separate improvement and build routes for companies with and without an existing blog."
                width={1200}
                height={540}
                className="h-auto w-full"
              />
            </figure>
          </div>

          <div className="mt-12 flex flex-col gap-6 rounded-2xl border border-slate-300 bg-transparent p-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-950">Turn your company knowledge into useful articles.</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                Bring an existing blog, documentation or simply an idea for where to begin.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/book-call"
                className="inline-flex items-center gap-2 rounded-lg bg-[#202733] px-5 py-3 text-sm font-semibold text-[#fff] transition hover:bg-[#111827]"
              >
                <CalendarDays size={18} aria-hidden="true" />
                Book a 30-minute call
              </Link>
              <Link
                href="/contact?service=content-marketing"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-400 bg-transparent px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-700"
              >
                <Mail size={18} aria-hidden="true" />
                Enquire
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="technology-development" className="service-section scroll-mt-36 border-t-4 border-[#4f7059] bg-transparent">
        <TechnologyBuildPath />
        <div className="hidden">
          <p className="text-sm text-slate-600">02 / Technology &amp; Development</p>
          <div className="mt-5 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:gap-10 lg:gap-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">We design and build reliable digital products.</h2>
            <div>
              <p className="leading-8 text-slate-700">
                We build websites, web applications, internal tools, APIs, integrations and data systems. We can take a project from an early idea to a working product, improve an existing system or solve a specific technical problem.
              </p>
              <p className="mt-4 leading-8 text-slate-700">
                Our work includes product planning, interface development, backend engineering, database design, deployment, testing and technical documentation.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact?service=technology-development"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-400 bg-transparent px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-700"
                >
                  <Mail size={18} aria-hidden="true" />
                  Enquire
                </Link>
                <Link
                  href="/order"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#202733] px-5 py-3 text-sm font-semibold text-[#fff] transition hover:bg-[#111827]"
                >
                  <ClipboardList size={18} aria-hidden="true" />
                  Request service
                </Link>
              </div>
            </div>
          </div>
          <ServiceExamples
            heading="Technology services"
            introduction="Projects can cover a complete product or one defined part of an existing system."
            services={technologyServices}
          />
          <figure className="mt-12 overflow-hidden rounded-2xl border border-slate-300 bg-transparent sm:mt-16">
            <Image
              src="/service-visuals/product-delivery-loop.svg"
              alt="Product delivery loop connecting scope, architecture, build, verification and release."
              width={1200}
              height={560}
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section id="research-academic" className="service-section scroll-mt-36 border-y-4 border-[#526b84] bg-transparent">
        <ResearchServicePath />
        <div className="hidden">
          <p className="text-sm text-slate-600">03 / Research &amp; Academic Work</p>
          <div className="mt-5 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:gap-10 lg:gap-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">We research, analyse, write and improve serious academic work.</h2>
            <div>
              <p className="leading-8 text-slate-700">
                We help with research planning, literature reviews, source analysis, technical reports, editing, referencing and academic presentations. We work from the assignment or research brief and follow the required standard, structure and citation style.
              </p>
              <p className="mt-4 leading-8 text-slate-700">
                We also review existing drafts for argument, evidence, organization, language and formatting.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact?service=research-academic"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-400 bg-transparent px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-700"
                >
                  <Mail size={18} aria-hidden="true" />
                  Enquire
                </Link>
                <Link
                  href="/order"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#202733] px-5 py-3 text-sm font-semibold text-[#fff] transition hover:bg-[#111827]"
                >
                  <ClipboardList size={18} aria-hidden="true" />
                  Request service
                </Link>
              </div>
            </div>
          </div>
          <ServiceExamples
            heading="Research and academic services"
            introduction="Support is shaped around the brief, required standard, available material and stage of the work."
            services={researchServices}
          />
          <figure className="mt-12 overflow-hidden rounded-2xl border border-slate-300 bg-transparent sm:mt-16">
            <Image
              src="/service-visuals/research-evidence-flow.svg"
              alt="Research flow from a defined brief through sources, evidence testing and synthesis to a defensible output."
              width={1200}
              height={560}
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <footer className="w-full px-5 py-16 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <h2 className="text-2xl font-semibold">Not sure which category fits?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">Send a short description of the work. We will tell you where it belongs and what information is needed to scope it.</p>
        <Link href="/contact" className="mt-6 inline-block border-b border-white pb-1 text-sm font-semibold">Contact JaksLab</Link>
      </footer>
    </main>
  );
}

function ServiceExamples({
  heading,
  introduction,
  services,
}: {
  heading: string;
  introduction: string;
  services: { title: string; description: string }[];
}) {
  const [highlightedService, setHighlightedService] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHighlightedService((current) => (current + 1) % services.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [services.length]);

  return (
    <div className="mt-12 border-t border-slate-300 pt-9 sm:mt-16 sm:pt-12">
      <div className="max-w-3xl">
        <h3 className="text-2xl font-semibold text-slate-950 sm:text-3xl">{heading}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-700">{introduction}</p>
      </div>
      <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-slate-300 bg-transparent md:grid-cols-2">
        {services.map((service, index) => (
          <li
            key={service.title}
            className={`service-example-card grid grid-cols-[2.5rem_1fr] gap-4 bg-transparent p-5 sm:grid-cols-[3rem_1fr] sm:p-6 ${
              highlightedService === index ? "is-current" : ""
            }`}
          >
            <span className="service-example-number grid size-8 place-items-center rounded-full border border-slate-300 text-sm font-semibold text-slate-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h4 className="font-semibold text-slate-950">{service.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-700">{service.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
