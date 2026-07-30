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
    <div className="w-full px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32 xl:px-16 2xl:px-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#765f4c]">
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

        <div className="mt-[clamp(3.5rem,7vw,6.5rem)] grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-5">
            {routes.map((route, index) => (
              <button
                key={route.label}
                type="button"
                onClick={() => setActiveRoute(index)}
                aria-pressed={activeRoute === index}
                className={`group grid min-h-20 w-full grid-cols-[2rem_1fr] items-center gap-3 rounded-[1.5rem_2.5rem_1.5rem_2rem] px-5 py-4 text-left transition ${
                  activeRoute === index ? "bg-[#eee8df] text-slate-950" : "bg-[#f8f6f1] text-slate-500 hover:bg-white hover:text-slate-800"
                }`}
              >
                <span className="text-[10px] font-semibold text-[#765f4c]">0{index + 1}</span>
                <span className="text-sm font-semibold">{route.label}</span>
              </button>
            ))}
          </div>

          <figure className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-[2.5rem_5rem_2.5rem_4rem] bg-[#f8f6f1] lg:aspect-auto lg:min-h-[34rem]">
            <Image
              src="/homepage-service-images/research-academic-support-glass-v3.png"
              alt="Research book, evidence charts, magnifying glass and graduation cap"
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="h-full w-full max-w-full object-contain object-center"
            />
          </figure>

          <div key={active.label} className="rounded-[3rem_5rem_3rem_4rem] bg-[#f3efe8] px-7 py-10 sm:px-10 sm:py-12 lg:flex lg:min-h-[34rem] lg:flex-col lg:justify-center lg:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#765f4c]">{active.type}</p>
            <h3 className="mt-4 text-[clamp(2rem,3.5vw,3.75rem)] font-medium leading-[.98] tracking-[-.045em] text-slate-950">
              {active.title}
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-600">{active.description}</p>
            <ol className="mt-7 space-y-3">
              {active.steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-6 text-slate-700">
                  <span className="text-[10px] font-semibold text-[#765f4c]">0{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-7 border-t border-slate-300 pt-5 text-sm font-semibold leading-6 text-slate-900">
              Outcome: {active.outcome}
            </p>
            <Link href="/contact?service=research-academic" className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#765f4c]">
              Discuss this research
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
