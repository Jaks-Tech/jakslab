import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  CircleAlert,
  Route,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { HomepagePillar } from "@/lib/homepage-pillars";

const pillarIcons: Record<string, LucideIcon> = {
  "the-problem": CircleAlert,
  "our-strategy": Route,
  opportunities: TrendingUp,
  "measuring-success": ChartNoAxesCombined,
};

const processShapes = [
  "process-shape-1 lg:-translate-x-5 lg:-translate-y-6",
  "process-shape-2 lg:translate-x-4 lg:translate-y-8",
  "process-shape-3 lg:translate-x-2 lg:-translate-y-2",
  "process-shape-4 lg:translate-x-8 lg:translate-y-14",
];

export function HomepagePillars({ pillars }: { pillars: HomepagePillar[] }) {
  return (
    <section id="our-approach" className="homepage-pillars-section px-4 py-[clamp(4rem,8vw,7rem)] text-[#1d1d1a] sm:px-6 md:px-8 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-xs uppercase tracking-[.15em]">How we work</p>
          <h2 className="approach-display-title mt-5 max-w-[8ch] text-[clamp(3.5rem,8vw,7.5rem)] uppercase italic leading-[.78] tracking-[-.07em]">Our Approach</h2>
          <div className="mt-8 w-full max-w-md border-t border-[#b9b1a8]" aria-hidden="true" />
          <p className="mt-10 max-w-md text-sm leading-7 text-[#403a35]">
            We turn technical knowledge into clear answers people can find and trust. The result is stronger search visibility, useful traffic, and better-qualified leads.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-12 lg:pb-14">
          {pillars.map((pillar, index) => {
            const Icon = pillarIcons[pillar.legacySlug] ?? CircleAlert;

            return (
              <Link
                key={pillar.slug}
                href={`/insights/${pillar.slug}`}
                className={`approach-item group relative flex min-h-[20rem] min-w-0 flex-col justify-center overflow-hidden px-7 py-12 sm:min-h-[21rem] sm:px-8 ${processShapes[index]}`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={27} strokeWidth={1.45} aria-hidden="true" />
                  <span className="text-[10px] uppercase tracking-[.14em] text-[#796e64]">
                    {pillar.sectionLabel} {String(pillar.order).padStart(2, "0")}
                  </span>
                </span>
                <span className="mt-5 block max-w-full break-words font-serif text-[clamp(1.2rem,2vw,1.55rem)] leading-tight">{pillar.label}</span>
                <span className="mt-3 block max-w-full text-xs leading-5 text-[#625a53]">{pillar.brief}</span>
                <span className="mt-6 inline-flex max-w-full items-end gap-2 self-start border-b border-[#9e443a] pb-1 text-xs font-semibold leading-4 text-[#9e443a]">
                  <span>{pillar.ctaLabel}</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
