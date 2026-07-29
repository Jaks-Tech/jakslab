"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const strategySteps = [
  {
    number: "01",
    title: "Understand",
    summary: "We define the problem, audience, available knowledge and result that matters.",
    outputs: ["Clear brief", "Success criteria"],
  },
  {
    number: "02",
    title: "Research",
    summary: "We study users, search demand, evidence, competitors, frameworks and technology options.",
    outputs: ["Critical analysis", "Recommended direction"],
  },
  {
    number: "03",
    title: "Plan",
    summary: "We turn the findings into a focused roadmap for content, technology or research delivery.",
    outputs: ["Priorities", "Delivery roadmap"],
  },
  {
    number: "04",
    title: "Create",
    summary: "We write the content, build the digital product or develop the research output.",
    outputs: ["Working deliverable", "Clear documentation"],
  },
  {
    number: "05",
    title: "Improve",
    summary: "We test, optimize and refine until the work supports the required business or project outcome.",
    outputs: ["Measured improvement", "Useful final outcome"],
  },
] as const;

export function HomepageStrategy() {
  const [activeStep, setActiveStep] = useState(0);
  const active = strategySteps[activeStep];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % strategySteps.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-transparent py-[clamp(2.5rem,6vw,5.5rem)] text-slate-950">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#76533b]">Our strategy</p>
      </div>

      <div className="mt-[clamp(2rem,5vw,4rem)] grid items-center gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-[.55fr_1.15fr_1fr]">
        <div>
          {strategySteps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              aria-pressed={activeStep === index}
              className={`grid w-full grid-cols-[2.5rem_1fr] items-center gap-3 py-4 text-left transition ${
                activeStep === index ? "text-slate-950" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span className="text-[10px] font-semibold text-[#76533b]">{step.number}</span>
              <span className={`text-sm font-medium ${activeStep === index ? "underline decoration-[#76533b]/40 underline-offset-8" : ""}`}>{step.title}</span>
            </button>
          ))}
        </div>

        <figure className="relative min-h-64 overflow-hidden bg-transparent sm:min-h-80 lg:min-h-[28rem]">
          <Image
            src="/homepage-service-images/jakslab-strategy-flow.png"
            alt="A connected strategy moving from discovery and planning through creation and optimization to growth"
            fill
            sizes="(max-width: 1024px) 100vw, 38vw"
            className="object-contain object-center"
          />
        </figure>

        <div className="flex min-h-[22rem] flex-col justify-between bg-transparent py-[clamp(1.5rem,4vw,3.5rem)]">
          <div key={active.number}>
            <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#76533b]">
              Step {active.number}
            </p>
            <h3 className="mt-4 text-[clamp(2rem,4vw,4rem)] font-medium leading-none tracking-[-.05em]">{active.title}</h3>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">{active.summary}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {active.outputs.map((output) => (
                <span key={output} className="px-1 py-2 text-xs text-slate-600">
                  {output}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("jakslab:open-action-panel"))}
            className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#76533b] underline decoration-[#76533b]/35 underline-offset-8 transition hover:decoration-[#76533b]"
          >
            Discuss your required outcome
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
