"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveLayout";

const heroServices = [
  {
    shortLabel: "Content Optimization",
    linkLabel: "Optimize your content",
    title: "Drive traffic that can convert.",
    description: "SEO and AEO optimization with company-specific content developed from your technical expertise.",
    image: "/homepage-service-images/technical-blog-growth-glass-v3.png",
    href: "/services#content-marketing",
  },
  {
    shortLabel: "Project Research",
    linkLabel: "Research your project",
    title: "Leave the pre-research to us.",
    description: "Requirements, critical analysis, frameworks, technology choices and a practical delivery direction.",
    image: "/homepage-service-images/research-academic-support-glass-v3.png",
    href: "/services#research-academic",
  },
  {
    shortLabel: "Product Building",
    linkLabel: "Build your product",
    title: "Move from plan to working product.",
    description: "Websites, applications, internal tools and integrations built around the real requirement.",
    image: "/homepage-service-images/technology-development-glass-v3.png",
    href: "/services#technology-development",
  },
] as const;

const expertiseImages = [
  "/homepage-service-images/technical-blog-growth-glass-v3.png",
  "/homepage-service-images/technology-development-glass-v3.png",
  "/homepage-service-images/research-academic-support-glass-v3.png",
  "/homepage-service-images/jakslab-integrated-services-landing.png",
] as const;

export function HomepageServiceHero() {
  const [activeService, setActiveService] = useState(0);
  const [activeExpertiseImage, setActiveExpertiseImage] = useState(0);

  useEffect(() => {
    const serviceTimer = window.setInterval(() => {
      setActiveService((current) => (current + 1) % heroServices.length);
    }, 8000);
    const expertiseTimer = window.setInterval(() => {
      setActiveExpertiseImage((current) => (current + 1) % expertiseImages.length);
    }, 6500);

    return () => {
      window.clearInterval(serviceTimer);
      window.clearInterval(expertiseTimer);
    };
  }, []);

  const active = heroServices[activeService];

  return (
    <section className="bg-transparent pb-[clamp(2rem,5vw,4.5rem)] pt-4 sm:pt-7">
      <ResponsiveContainer>
        <div className="grid items-stretch gap-[clamp(1.25rem,3vw,2.5rem)] lg:grid-cols-2">
          <div className="flex min-h-[clamp(26rem,48vw,44rem)] flex-col items-center justify-center bg-transparent px-[clamp(.25rem,3vw,3rem)] py-[clamp(2rem,5vw,5rem)] text-center">
            <h1 className="max-w-[13ch] text-[clamp(2.5rem,5vw,5.5rem)] font-normal uppercase leading-[.9] tracking-[-.045em] text-[#2d1e15] [font-family:Didot,'Bodoni_MT','Times_New_Roman',serif]">
              Let&apos;s generate traffic that converts
            </h1>
            <p className="mt-7 max-w-[31rem] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-[#59473a]">
              /SEO, AEO and technical content built around your expertise/
            </p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("jakslab:open-action-panel"))}
              className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[#6f594b]/35 bg-white/15 px-6 py-3 text-sm font-semibold text-[#39291f] backdrop-blur-md transition hover:border-[#6f594b]/55 hover:bg-white/40"
            >
              Let&apos;s talk
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-[clamp(34rem,52vw,44rem)] flex-col overflow-hidden rounded-[clamp(1.5rem,4vw,3rem)] bg-transparent p-[clamp(1.25rem,3.5vw,3rem)] shadow-[0_28px_75px_rgba(70,42,25,.13)]">
            <div>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="JaksLab services">
                {heroServices.map((service, index) => (
                  <button
                    key={service.shortLabel}
                    type="button"
                    role="tab"
                    aria-selected={activeService === index}
                    onClick={() => setActiveService(index)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      activeService === index
                        ? "border-[#655247]/45 bg-white/55 text-[#31251e] shadow-[inset_0_0_12px_rgba(83,61,47,.08)] backdrop-blur-md"
                        : "border-[#825536]/20 bg-transparent text-[#59483d] hover:border-[#655247]/40 hover:bg-white/25"
                    }`}
                  >
                    {service.shortLabel}
                  </button>
                ))}
              </div>

              <div key={active.title} className="mt-[clamp(1.5rem,3vw,2.5rem)] max-w-[28rem]">
                <h2 className="max-w-[16ch] text-[clamp(1.75rem,3.2vw,3.25rem)] font-medium leading-[.95] tracking-[-.045em] text-[#2d1e15]">
                  {active.title}
                </h2>
                <p className="mt-3 max-w-[27rem] text-[clamp(.85rem,1vw,.98rem)] leading-relaxed text-[#756256]">
                  {active.description}
                </p>
              </div>
            </div>

            <figure
              key={active.image}
              className="relative my-[clamp(1.25rem,2.5vw,2rem)] min-h-0 flex-1 overflow-hidden rounded-[clamp(1rem,2.5vw,2rem)] bg-transparent"
            >
              <Image
                src={active.image}
                alt={`${active.shortLabel} service illustration`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </figure>

            <div className="mt-auto flex items-end justify-between gap-4">
                <Link
                  href={active.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#4b2e1c] underline decoration-[#9c6844]/45 underline-offset-8 transition hover:decoration-[#6e4228]"
                >
                  {active.linkLabel}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>

                <div className="flex items-center gap-2" aria-hidden="true">
                  {heroServices.map((service, index) => (
                    <span
                      key={service.shortLabel}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        activeService === index ? "w-10 bg-[#5b351f]" : "w-4 bg-[#805536]/25"
                      }`}
                    />
                  ))}
                </div>
            </div>
          </div>
        </div>

        <div className="mt-[clamp(1rem,2.5vw,2rem)] grid overflow-hidden rounded-[clamp(1.25rem,3vw,2.5rem)] border border-[#7c563b]/15 bg-white/20 shadow-[0_18px_55px_rgba(69,42,26,.08)] backdrop-blur-md sm:grid-cols-[1.15fr_.7fr_1.15fr]">
          <div className="relative grid min-h-44 grid-cols-[minmax(0,.85fr)_minmax(8rem,1.15fr)] items-center overflow-hidden bg-[#9a6c4d]/18 p-[clamp(1.25rem,3vw,2.5rem)]">
            <div className="relative z-10">
              <h2 className="text-[clamp(1.25rem,2vw,1.8rem)] font-medium leading-tight text-[#34241b]">
                Built on expertise.
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-[#655044]">Technical work, clearly delivered.</p>
            </div>
            <div className="relative h-36 min-w-0 overflow-hidden rounded-[clamp(1.5rem,3vw,2.5rem)] bg-white/35 sm:h-40">
              {expertiseImages.map((image, index) => (
                <Image
                  key={image}
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 45vw, 240px"
                  className={`object-contain object-center transition-[opacity,transform] duration-1000 ease-in-out ${
                    activeExpertiseImage === index ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex min-h-44 flex-col items-center justify-center border-y border-[#7c563b]/12 bg-transparent p-6 text-center sm:border-x sm:border-y-0">
            <strong className="text-[clamp(3rem,5vw,5rem)] font-normal italic leading-none text-[#3b291f]">3</strong>
            <p className="mt-2 text-xs text-[#6b5548]">Connected services</p>
          </div>

          <div className="flex min-h-44 flex-col justify-center bg-transparent p-[clamp(1.25rem,3vw,2.5rem)]">
            <h2 className="max-w-[15ch] text-[clamp(1.35rem,2.3vw,2rem)] font-medium uppercase leading-[.95] tracking-[-.035em] text-[#34241b]">
              One partner. More impact.
            </h2>
            <Link
              href="/services"
              className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-[#5d3c28] underline decoration-[#8f6345]/40 underline-offset-8 transition hover:decoration-[#5d3c28]"
            >
              View services
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
