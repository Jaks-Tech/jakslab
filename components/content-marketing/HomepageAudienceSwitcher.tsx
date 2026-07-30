"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const audiences = [
  { name: "Software & SaaS", title: "Make a complex product easier to discover.", description: "We turn product knowledge into clear technical content, useful search journeys, and digital experiences that help buyers understand the product before they speak to sales.", outcomes: ["SEO and AEO content", "Product education", "Qualified traffic"], image: "/audiences/software-saas.png" },
  { name: "Engineering & IT", title: "Show buyers the value behind specialist work.", description: "We translate deep engineering capability into credible content, well-researched service positioning, and tools that make technical value easier to evaluate.", outcomes: ["Technical authority", "Clear service value", "Better enquiries"], image: "/audiences/engineering-it.png" },
  { name: "Product Teams", title: "Keep positioning, experience, and launch aligned.", description: "We connect research, content, and product delivery so the market promise matches the experience people receive after they click, sign up, or buy.", outcomes: ["Market research", "Product messaging", "Useful digital products"], image: "/audiences/product-teams.png" },
  { name: "Research Teams", title: "Make decisions from evidence, not assumptions.", description: "We help research-led teams structure complex knowledge, test project directions, and communicate findings in a form that stakeholders can understand and use.", outcomes: ["Evidence review", "Project direction", "Clear research outputs"], image: "/audiences/research-teams.png" },
] as const;

export function HomepageAudienceSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % audiences.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const active = audiences[activeIndex];

  return (
    <div className="py-[clamp(2rem,5vw,4rem)]">
      <div className="flex flex-col gap-5 border-b border-[#aaa39b] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.15em] text-[#a24e3e]">Who we work with</p>
          <h2 className="mt-3 text-[clamp(2.25rem,4vw,3.75rem)] leading-none">Teams we understand.</h2>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3" role="tablist" aria-label="Company categories">
          {audiences.map((audience, index) => (
            <button key={audience.name} type="button" role="tab" aria-selected={activeIndex === index} onClick={() => setActiveIndex(index)} className={`border-b pb-2 text-sm ${activeIndex === index ? "border-[#a24e3e] text-[#1d1d1a]" : "border-transparent text-[#746c65]"}`}>
              {audience.name}
            </button>
          ))}
        </div>
      </div>

      <div key={active.name} className="relative mt-8 grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-stretch">
        <section className="flex flex-col justify-center py-4 lg:pr-10">
          <p className="text-xs text-[#a24e3e]">{String(activeIndex + 1).padStart(2, "0")} / 04</p>
          <h3 className="mt-5 max-w-[15ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.02]">{active.title}</h3>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[#5d554e]">{active.description}</p>
          <ul className="mt-7 grid gap-3 border-t border-[#b9b2aa] pt-5 text-sm">
            {active.outcomes.map((outcome) => <li key={outcome} className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-[#a24e3e]" />{outcome}</li>)}
          </ul>
          <button type="button" onClick={() => window.dispatchEvent(new Event("jakslab:open-action-panel"))} className="mt-8 inline-flex w-fit items-center gap-2 border-b border-[#1d1d1a] pb-1 text-sm">
            Discuss your problem <ArrowRight size={14} />
          </button>
        </section>
        <div className="pointer-events-none absolute left-[39%] top-1/2 z-10 hidden -translate-y-1/2 items-center gap-2 lg:flex" aria-hidden="true">
          <span className="size-2 rounded-full bg-[#a24e3e]" /><span className="size-3 rounded-full bg-[#bd765f]" /><span className="size-5 rounded-full bg-[#d7a995]" /><span className="size-8 rounded-full bg-[#ead8c5]" />
        </div>
        <figure className="audience-image-cloud relative min-h-80 overflow-hidden bg-[#ded8d0] sm:min-h-[30rem]">
          <Image src={active.image} alt={`${active.name} team collaborating`} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover [filter:none!important]" />
        </figure>
      </div>
    </div>
  );
}
