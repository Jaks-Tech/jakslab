import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesCombined,
  Database,
  FileCheck2,
  FilePenLine,
  FileText,
  Globe2,
  Grid2X2,
  Layers3,
  Link2,
  ListChecks,
  Monitor,
  PanelsTopLeft,
  Plug,
  Route,
  Search,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/components/services/data";

const serviceOrder = ["content", "research", "development"] as const;
const orderedServices = serviceOrder.map(
  (id) => services.find((service) => service.id === id)!
);

const serviceIcons: Record<(typeof serviceOrder)[number], LucideIcon[]> = {
  content: [FileText, FilePenLine, Grid2X2, ChartNoAxesCombined, Search, Link2],
  research: [ListChecks, ShieldCheck, Layers3, Route, BookOpen, FileCheck2],
  development: [Monitor, Globe2, PanelsTopLeft, Plug, Database, Wrench],
};

export function ServicesOverview() {
  return (
    <main className="services-clean w-full bg-[#f7f5ef] text-[#1d1d1a]">
      <div className="mx-auto grid w-full max-w-[98rem] gap-[clamp(2.5rem,6vw,6rem)] px-3 py-[clamp(2rem,5vw,5rem)] sm:px-6 lg:px-10">
        {orderedServices.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`svc-service-shell svc-service-shell--${service.id} scroll-mt-28 ${
              service.id === "content"
                ? "bg-[#f3e9dc]"
                : index === 1
                ? "bg-[#f7f5ef]"
                : "bg-[#ecebe6]"
            }`}
          >
            <div
              className={`relative z-[1] mx-auto grid w-full max-w-[90rem] items-center gap-10 px-7 sm:px-10 lg:grid-cols-[1fr_auto_1.65fr] lg:gap-8 lg:px-14 xl:px-20 ${
                service.id === "content"
                  ? "py-[clamp(4rem,8vw,7.5rem)]"
                  : "py-[clamp(3.5rem,7vw,6.5rem)]"
              }`}
            >
              {/* 1. Left Text Column */}
              <div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tabular-nums text-[#6f665e]">
                    0{index + 1}
                  </span>
                  <span
                    className="h-px w-14"
                    style={{ background: service.accent }}
                  />
                  <p
                    className="text-[10px] uppercase tracking-[.18em]"
                    style={{ color: service.accent }}
                  >
                    {service.name}
                  </p>
                </div>
                <h2 className="mt-4 max-w-[18ch] font-serif text-[clamp(1.8rem,3.2vw,3.2rem)] font-normal leading-[1.05] tracking-[-.03em]">
                  {service.title}
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#625950]">
                  {service.detail}
                </p>

                {/* Neutral High-Contrast CTA Button */}
                <Link
                  href={`/services/${service.id}`}
                  scroll={false}
                  className="mt-8 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-[#1c1b19] bg-[#1c1b19] px-6 py-3 text-sm font-semibold !text-[#ffffff] shadow-sm transition-all duration-200 hover:bg-[#32302d] hover:border-[#32302d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1b19]"
                >
                  <span>Explore {service.name.toLowerCase()}</span>
                  <ArrowRight size={15} className="shrink-0 !text-[#ffffff]" aria-hidden="true" />
                </Link>
              </div>

              {/* Decorative divider between the description and arc. */}
              <div
                className="hidden select-none font-serif text-[clamp(6.5rem,9vw,10rem)] font-light leading-none text-[#aa9c90]/65 lg:block"
                aria-hidden="true"
              >
                {"}"}
              </div>

              {/* 2. Unified Right Stage: Arched Background Extending to Services */}
              <div
                className="relative w-full rounded-tl-[100px] sm:rounded-tl-[140px] lg:rounded-tl-[180px] overflow-hidden p-6 sm:p-8 lg:p-10 transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.18) 65%, rgba(255,255,255,0) 100%)",
                  boxShadow:
                    "inset 1px 1px 0px 0px rgba(207, 199, 189, 0.7)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                {/* The illustration now fills the arc as a soft background. */}
                <Image
                  src={service.image.src}
                  alt=""
                  fill
                  priority={service.id === "content"}
                  sizes="(max-width: 1024px) 95vw, 58vw"
                  className="pointer-events-none select-none object-contain object-center p-[clamp(1rem,3vw,3rem)] opacity-65 [filter:blur(3px)_saturate(.86)]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(247,245,239,.12),rgba(247,245,239,.28)_55%,rgba(247,245,239,.58))]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/40 blur-2xl"
                  aria-hidden="true"
                />

                <div className="relative z-10 grid min-h-[22rem] w-full items-center gap-6 lg:grid-cols-[1fr_1fr] lg:gap-6">
                  {/* Open space keeps the subject of the background image visible. */}
                  <div className="hidden lg:block" aria-hidden="true" />

                  {/* Right Side of Arc: Deliverables List */}
                  <div className="w-full rounded-[2rem_4rem_2.5rem_3rem] bg-[#f7f5ef]/45 p-4 shadow-[0_1rem_3rem_rgba(55,48,41,.06)] backdrop-blur-[2px] sm:p-5">
                    <ul className="divide-y divide-[#cfc7bd]/60 border-y border-[#cfc7bd]/60">
                      {service.work.map((item, itemIndex) => {
                        const Icon = serviceIcons[service.id][itemIndex];
                        return (
                          <li
                            key={item}
                            className="flex items-center gap-4 py-3.5 text-sm text-[#3f3934]"
                          >
                            <Icon
                              size={17}
                              strokeWidth={1.45}
                              style={{ color: service.accent }}
                              aria-hidden="true"
                              className="shrink-0"
                            />
                            <span className="leading-snug">{item}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-[clamp(3rem,6vw,5rem)] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <p className="text-[10px] uppercase tracking-[.18em] text-[#8a8076]">
            Have a defined requirement?
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.6rem)] font-normal">
            Send us the brief.
          </h2>
        </div>

        {/* Neutral High-Contrast Footer CTA Button */}
        <Link
          href="/order"
          className="inline-flex min-h-11 w-fit items-center rounded-full border border-[#1c1b19] bg-[#1c1b19] px-6 py-3 text-sm font-semibold !text-[#ffffff] shadow-sm transition-all duration-200 hover:bg-[#32302d] hover:border-[#32302d]"
        >
          Request a service
        </Link>
      </footer>
    </main>
  );
}
