"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";

const routes = [
  {
    label: "Define the project",
    type: "Project research",
    title: "Turn the idea into clear requirements.",
    description: "Define the users, workflows, constraints, data and expected result before development.",
    steps: ["Requirements and scope", "Feasibility and gaps", "Success criteria"],
    outcome: "A brief the project team can build from.",
  },
  {
    label: "Choose the approach",
    type: "Project research",
    title: "Select the right framework and technology.",
    description: "Compare platforms, frameworks, integrations and architecture against the project needs.",
    steps: ["Technology comparison", "System architecture", "Trade-offs and risks"],
    outcome: "Defensible technical choices, not guesswork.",
  },
  {
    label: "Plan delivery",
    type: "Project research",
    title: "Create a practical route to development.",
    description: "Arrange the work into priorities, phases, resources and decisions.",
    steps: ["Delivery roadmap", "Resources and dependencies", "Recommendations"],
    outcome: "A clear plan for moving into the build.",
  },
  {
    label: "Academic research",
    type: "Academic tutoring",
    title: "Build a credible study.",
    description: "Work with a tutor to understand the research structure, literature, methods, analysis and findings.",
    steps: ["Questions and literature", "Methods and analysis", "Findings and discussion"],
    outcome: "A coherent, evidence-led research project.",
  },
  {
    label: "Write and present",
    type: "Academic tutoring",
    title: "Make the work clear and defensible.",
    description: "Learn how to strengthen the report, references, formatting, summaries and presentation.",
    steps: ["Academic writing", "Editing and referencing", "Slides and presentation"],
    outcome: "Research ready for review and presentation.",
  },
] as const;

export function ResearchServicePath() {
  const [activeRoute, setActiveRoute] = useState(0);
  const active = routes[activeRoute];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveRoute((current) => (current + 1) % routes.length);
    }, 12000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#526b84]">
          03 / Project Research &amp; Academic Tutoring
        </p>
        <div className="mt-5 grid gap-7 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <h2 className="max-w-[14ch] text-[clamp(2.5rem,5vw,5.25rem)] font-medium leading-[.94] tracking-[-.055em] text-slate-950">
            Research before the work begins.
          </h2>
          <div>
            <p className="max-w-xl text-base leading-8 text-slate-600">
              Define a project, choose its technical direction or develop credible academic research.
            </p>
            <Link href="/order" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-slate-400 underline-offset-8">
              <ClipboardList size={16} aria-hidden="true" />
              Request research
            </Link>
          </div>
        </div>

        <div className="mt-[clamp(2rem,5vw,4rem)] grid gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[.72fr_.78fr_1fr] lg:items-center">
          <div className="space-y-1">
            {routes.map((route, index) => (
              <button
                key={route.label}
                type="button"
                onClick={() => setActiveRoute(index)}
                aria-pressed={activeRoute === index}
                className={`group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 py-4 text-left transition ${
                  activeRoute === index ? "text-slate-950" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span className="text-[10px] font-semibold text-[#526b84]">0{index + 1}</span>
                <span className="text-sm font-semibold">{route.label}</span>
                <span className={`h-px transition-all ${activeRoute === index ? "w-10 bg-[#526b84]" : "w-4 bg-slate-300 group-hover:w-7"}`} />
              </button>
            ))}
          </div>

          <figure className="relative aspect-square min-w-0 overflow-hidden rounded-[42%] bg-white/20 shadow-[inset_0_0_45px_rgba(82,107,132,.08)]">
            <Image
              src="/homepage-service-images/research-academic-support-glass-v3.png"
              alt="Research book, evidence charts, magnifying glass and graduation cap"
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="h-full w-full max-w-full object-contain object-center"
            />
          </figure>

          <div key={active.label} className="min-h-[30rem] py-5 lg:flex lg:flex-col lg:justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#526b84]">{active.type}</p>
            <h3 className="mt-4 text-[clamp(2rem,3.5vw,3.75rem)] font-medium leading-[.98] tracking-[-.045em] text-slate-950">
              {active.title}
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-600">{active.description}</p>
            <ol className="mt-7 space-y-3">
              {active.steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-6 text-slate-700">
                  <span className="text-[10px] font-semibold text-[#526b84]">0{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-7 border-t border-slate-300 pt-5 text-sm font-semibold leading-6 text-slate-900">
              Outcome: {active.outcome}
            </p>
            <Link href="/contact?service=research-academic" className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#526b84]">
              Discuss this research
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
