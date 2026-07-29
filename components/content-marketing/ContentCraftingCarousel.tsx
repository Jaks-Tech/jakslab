"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const slides = [
  {
    label: "Start a blog",
    title: "Build the publishing foundation.",
    audience: "For companies without a blog",
    description:
      "We add a structured article section that fits the existing website and gives your team a practical place to publish useful technical knowledge.",
    actions: ["Article layout and navigation", "Publishing structure and topic plan", "First articles from company knowledge"],
    image: "/homepage-service-images/technical-blog-growth-glass-v3.png",
  },
  {
    label: "Improve a blog",
    title: "Make existing content work harder.",
    audience: "For companies already publishing",
    description:
      "We audit the current blog, strengthen useful articles, remove repetition and connect content more clearly to products, services and customer questions.",
    actions: ["Content and structure audit", "Article updates and internal links", "Clearer conversion paths"],
    image: "/homepage-service-images/jakslab-integrated-services-landing.png",
  },
  {
    label: "Grow visibility",
    title: "Build visibility around real expertise.",
    audience: "For teams that need to be found",
    description:
      "We shape topics and articles around search intent, buyer questions and answer-engine visibility without sacrificing technical accuracy.",
    actions: ["SEO and AEO topic mapping", "Search-ready article structure", "Service and product alignment"],
    image: "/homepage-service-images/jakslab-strategy-flow.png",
  },
  {
    label: "Generate leads",
    title: "Turn useful readers into potential customers.",
    audience: "For blogs that need business outcomes",
    description:
      "We connect informative articles to relevant next steps, measure what attracts qualified readers and improve the journey from insight to enquiry.",
    actions: ["Intent-based calls to action", "Lead paths and measurement", "Continuous content improvement"],
    image: "/homepage-service-images/technical-content-marketing-glass-v2.png",
  },
] as const;

export function ContentCraftingCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const active = slides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 11000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#76533b]">01 / Content crafting</p>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-[14ch] text-[clamp(2.5rem,5vw,5.25rem)] font-medium leading-[.94] tracking-[-.055em] text-slate-950">
              Build a technical blog that earns attention.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              We create the blog, improve what already exists and grow visibility around the knowledge your customers need.
            </p>
          </div>
          <Link href="/book-call" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-slate-400 underline-offset-8">
            <CalendarDays size={16} aria-hidden="true" />
            Discuss your blog
          </Link>
        </div>

        <div className="mt-[clamp(2rem,5vw,4rem)]">
          <div className="flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label="Content crafting routes">
            {slides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                role="tab"
                aria-selected={activeSlide === index}
                onClick={() => setActiveSlide(index)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                  activeSlide === index
                    ? "border-slate-400 bg-slate-200 text-slate-950 shadow-sm"
                    : "border-slate-300 bg-transparent text-slate-700 hover:border-slate-600"
                }`}
              >
                {slide.label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid overflow-hidden rounded-[clamp(1.5rem,3vw,2.75rem)] border border-[#76533b]/15 bg-white/20 shadow-[0_22px_70px_rgba(70,42,25,.09)] lg:grid-cols-[1.08fr_.92fr]">
            <div key={active.title} className="flex min-h-[34rem] flex-col p-[clamp(1.5rem,4vw,4rem)]">
              <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#76533b]">{active.audience}</p>
              <h3 className="mt-5 max-w-[14ch] text-[clamp(2rem,4vw,4rem)] font-medium leading-[.96] tracking-[-.05em] text-slate-950">
                {active.title}
              </h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">{active.description}</p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {active.actions.map((action, index) => (
                  <li key={action} className="border-t border-slate-300 pt-3 text-sm leading-6 text-slate-700">
                    <span className="mr-2 text-[10px] font-semibold text-[#76533b]">0{index + 1}</span>
                    {action}
                  </li>
                ))}
              </ul>

              <Link href="/contact?service=content-marketing" className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-semibold text-[#5d3c28]">
                Plan this route
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <figure className="relative m-4 min-h-80 overflow-hidden rounded-[clamp(1.25rem,3vw,2.5rem)] bg-[#f7eee4]/60 sm:m-6 lg:m-8 lg:ml-0">
              {slides.map((slide, index) => (
                <Image
                  key={slide.image}
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className={`h-full w-full max-w-full object-contain object-center transition-[opacity,transform] duration-[1500ms] ease-in-out ${
                    activeSlide === index ? "scale-100 opacity-100" : "scale-[1.025] opacity-0"
                  }`}
                />
              ))}
            </figure>
          </div>

          <div className="mt-4 flex justify-end gap-2" aria-hidden="true">
            {slides.map((slide, index) => (
              <span
                key={slide.label}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeSlide === index ? "w-12 bg-slate-800" : "w-5 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
