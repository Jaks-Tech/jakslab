"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";

const buildRoutes = [
  {
    name: "Business website",
    problem: "Your services need a clearer, faster and more credible digital home.",
    approach: ["Content and user journeys", "Responsive interface development", "CMS, forms and analytics"],
    outcome: "A website customers can understand, trust and act on.",
  },
  {
    name: "Web application",
    problem: "A customer or team workflow needs more than a standard website.",
    approach: ["Product scope and interface", "Authentication and backend logic", "Database, testing and deployment"],
    outcome: "A working web product shaped around the real workflow.",
  },
  {
    name: "Internal tool",
    problem: "Manual handovers, spreadsheets or disconnected forms are slowing the team.",
    approach: ["Workflow mapping", "Purpose-built dashboards and tools", "Permissions, reporting and automation"],
    outcome: "A simpler internal system that reduces repeated work.",
  },
  {
    name: "APIs and integrations",
    problem: "Important platforms, data and business processes do not work together.",
    approach: ["Integration architecture", "API and data connections", "Monitoring and technical documentation"],
    outcome: "Reliable connections between the systems the business depends on.",
  },
  {
    name: "Product improvement",
    problem: "An existing product has usability, performance or reliability gaps.",
    approach: ["Focused technical audit", "Priority fixes and missing features", "Performance, testing and deployment"],
    outcome: "A stronger product without rebuilding what already works.",
  },
] as const;

export function TechnologyBuildPath() {
  const [activeRoute, setActiveRoute] = useState(0);
  const active = buildRoutes[activeRoute];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveRoute((current) => (current + 1) % buildRoutes.length);
    }, 12000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#4f7059]">02 / Technology &amp; Development</p>
        <div className="mt-5 grid gap-7 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <h2 className="max-w-[14ch] text-[clamp(2.5rem,5vw,5.25rem)] font-medium leading-[.94] tracking-[-.055em] text-slate-950">
            Choose the digital system you need.
          </h2>
          <div>
            <p className="max-w-xl text-base leading-8 text-slate-600">
              We move from a defined business need to a reliable website, product, internal tool or connected system.
            </p>
            <Link href="/order" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-slate-400 underline-offset-8">
              <ClipboardList size={16} aria-hidden="true" />
              Request a build
            </Link>
          </div>
        </div>

        <div className="mt-[clamp(2rem,5vw,4rem)] grid gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[.72fr_.78fr_1fr] lg:items-center">
          <div className="space-y-1">
            {buildRoutes.map((route, index) => (
              <button
                key={route.name}
                type="button"
                onClick={() => setActiveRoute(index)}
                aria-pressed={activeRoute === index}
                className={`group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 py-4 text-left transition ${
                  activeRoute === index ? "text-slate-950" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span className="text-[10px] font-semibold text-[#4f7059]">0{index + 1}</span>
                <span className="text-sm font-semibold">{route.name}</span>
                <span className={`h-px transition-all ${activeRoute === index ? "w-10 bg-[#4f7059]" : "w-4 bg-slate-300 group-hover:w-7"}`} />
              </button>
            ))}
          </div>

          <figure className="relative aspect-square min-w-0 overflow-hidden rounded-[42%] bg-white/20 shadow-[inset_0_0_45px_rgba(79,112,89,.08)]">
            <Image
              src="/homepage-service-images/technology-development-glass-v3.png"
              alt="Glass laptop, code and connected software modules representing technology development"
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="h-full w-full max-w-full object-contain object-center"
            />
          </figure>

          <div key={active.name} className="min-h-[30rem] py-5 lg:flex lg:flex-col lg:justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#4f7059]">Current build path</p>
            <h3 className="mt-4 text-[clamp(2rem,3.5vw,3.75rem)] font-medium leading-[.98] tracking-[-.045em] text-slate-950">
              {active.name}
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-600">{active.problem}</p>

            <ol className="mt-7 space-y-3">
              {active.approach.map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-6 text-slate-700">
                  <span className="text-[10px] font-semibold text-[#4f7059]">0{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>

            <p className="mt-7 border-t border-slate-300 pt-5 text-sm font-semibold leading-6 text-slate-900">
              Outcome: {active.outcome}
            </p>
            <Link href="/contact?service=technology-development" className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#3f624b]">
              Discuss this build
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
