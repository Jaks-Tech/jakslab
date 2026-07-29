"use client";

import { useEffect, useState } from "react";
import { Boxes, Building2, CloudCog, FlaskConical, MessageSquareText } from "lucide-react";

const audienceIntroduction =
  "JaksLab works with software teams, engineering firms, product builders and research groups to turn complex knowledge into clear content, useful technology and well-grounded decisions.";

const audiences = [
  {
    name: "Software & SaaS",
    problem: "Complex products are hard to discover and explain.",
    icon: CloudCog,
    position:
      "md:left-1/2 md:top-0 md:w-[46%] md:-translate-x-1/2 md:rounded-b-[48%] md:rounded-t-3xl",
  },
  {
    name: "Engineering & IT",
    problem: "Expert services are difficult for buyers to evaluate.",
    icon: Building2,
    position:
      "md:left-0 md:top-1/2 md:w-[38%] md:-translate-y-1/2 md:rounded-l-3xl md:rounded-r-[48%]",
  },
  {
    name: "Product Teams",
    problem: "Positioning, experience and launch often drift apart.",
    icon: Boxes,
    position:
      "md:right-0 md:top-1/2 md:w-[38%] md:-translate-y-1/2 md:rounded-l-[48%] md:rounded-r-3xl",
  },
  {
    name: "Research Teams",
    problem: "Projects begin before evidence and technology choices are clear.",
    icon: FlaskConical,
    position:
      "md:bottom-0 md:left-1/2 md:w-[46%] md:-translate-x-1/2 md:rounded-b-3xl md:rounded-t-[48%]",
  },
] as const;

export function HomepageAudienceArcs() {
  const [typedIntroduction, setTypedIntroduction] = useState("");

  useEffect(() => {
    let character = 0;
    const timer = window.setInterval(() => {
      character += 1;
      setTypedIntroduction(audienceIntroduction.slice(0, character));

      if (character >= audienceIntroduction.length) {
        window.clearInterval(timer);
      }
    }, 24);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="border-y border-[#76533b]/15 py-[clamp(2.5rem,6vw,5rem)]">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[.2em] text-[#76533b]">
          Who we work with
        </h2>
        <div className="grid gap-[clamp(2rem,6vw,6rem)] lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div className="relative mx-auto mt-12 w-full max-w-sm rounded-b-[2.75rem] rounded-t-xl border border-[#76533b]/18 bg-white/20 px-6 pb-8 pt-7 shadow-[0_20px_55px_rgba(70,42,25,.1)] backdrop-blur-sm before:absolute before:bottom-full before:left-1/2 before:h-12 before:w-px before:-translate-x-1/2 before:bg-[#76533b]/30 after:absolute after:bottom-[calc(100%+3rem)] after:left-1/2 after:size-2.5 after:-translate-x-1/2 after:rounded-full after:bg-[#76533b]/50">
            <p className="sr-only">{audienceIntroduction}</p>
            <p aria-hidden="true" className="min-h-44 text-base leading-7 text-slate-800">
              {typedIntroduction}
              <span className="ml-0.5 inline-block h-5 w-px animate-pulse bg-[#76533b] align-middle" />
            </p>
          </div>

          <div className="relative">
            <div className="grid gap-3">
              {audiences.map((audience, index) => {
                const Icon = audience.icon;

                return (
                  <article
                    key={audience.name}
                    className="flex min-h-32 w-[88%] items-center gap-5 border border-[#76533b]/18 bg-transparent px-6 py-5 shadow-[inset_0_0_30px_rgba(112,72,45,.045)] even:rounded-l-[45%] even:rounded-r-3xl odd:rounded-l-3xl odd:rounded-r-[45%] sm:w-[78%]"
                    style={{ marginLeft: `${index * 7}%` }}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#76533b]/20 bg-white/25 text-[#76533b]">
                      <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-950">{audience.name}</h3>
                      <p className="mt-1 max-w-md text-sm leading-6 text-slate-600">{audience.problem}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("jakslab:open-action-panel"))}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#76533b]/30 bg-transparent px-5 py-3 text-sm font-semibold text-[#493326] transition hover:border-[#76533b]/55 hover:bg-white/40"
            >
              <MessageSquareText size={16} aria-hidden="true" />
                Discuss your problem
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
