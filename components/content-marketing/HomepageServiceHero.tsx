"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Check,
  FileSearch,
  SearchCheck,
} from "lucide-react";

import { ResponsiveContainer } from "@/components/layout/ResponsiveLayout";

const results = [
  "More qualified traffic",
  "Higher conversion potential",
  "Stronger search and AI visibility",
];

const services = [
  {
    label: "Content optimization",
    href: "/services/content",
    icon: SearchCheck,
    primary: true,
  },
  {
    label: "Project research",
    href: "/services/research",
    icon: FileSearch,
    primary: false,
  },
  {
    label: "Product development",
    href: "/services/development",
    icon: Blocks,
    primary: false,
  },
];

export function HomepageServiceHero() {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-transparent">
      {/* Full hero background */}
      <Image
        src="/hero-6.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[72%_center] [filter:none!important] sm:object-[76%_center] lg:object-[82%_center] xl:object-center"
      />

      {/* Transparent reading gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(250,247,243,0.94)_0%,rgba(250,247,243,0.78)_48%,rgba(250,247,243,0.28)_78%,rgba(250,247,243,0.12)_100%)] sm:bg-[linear-gradient(90deg,rgba(250,247,243,0.97)_0%,rgba(250,247,243,0.9)_45%,rgba(250,247,243,0.48)_72%,transparent_100%)] lg:bg-[linear-gradient(90deg,rgba(250,247,243,0.96)_0%,rgba(250,247,243,0.86)_34%,rgba(250,247,243,0.34)_54%,rgba(250,247,243,0.05)_67%,transparent_78%)]"
      />

      {/* Keep mobile copy readable while preserving the full-bleed background. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[28%] bg-[linear-gradient(180deg,transparent_0%,rgba(250,247,243,0.18)_100%)] sm:hidden"
      />

      <ResponsiveContainer>
        <div className="relative flex min-h-[100svh] items-center px-0 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-0 lg:pb-16 lg:pt-32">
          {/* Restrict content to left side on laptops */}
          <div className="w-full max-w-[680px] lg:w-[48%] lg:max-w-[590px] xl:w-[46%] xl:max-w-[640px]">
            <h1 className="max-w-[12ch] font-serif text-[clamp(2.8rem,10vw,5.6rem)] font-normal leading-[0.95] tracking-[-0.045em] text-zinc-950 sm:text-[clamp(3.6rem,7vw,5.6rem)] lg:text-[clamp(3.7rem,5vw,5.15rem)]">
              Let&apos;s generate traffic that converts.
            </h1>

            <p className="mt-6 max-w-[580px] text-base font-medium leading-7 text-zinc-800 sm:mt-7 sm:text-lg sm:leading-8 lg:max-w-[550px]">
              We help companies turn real expertise into content that is
              researched, structured, and written for how people search and
              discover answers today.
            </p>

            {/* Results */}
            <ul className="mt-7 grid max-w-[580px] grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
              {results.map((result) => (
                <li
                  key={result}
                  className="flex min-w-0 items-center gap-2.5 text-sm font-semibold leading-5 text-zinc-900"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center bg-white text-zinc-950 shadow-sm">
                    <Check
                      size={13}
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                  </span>

                  <span>{result}</span>
                </li>
              ))}
            </ul>

            {/* Services */}
            <div className="mt-12 sm:mt-14 lg:mt-12 xl:mt-16">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 sm:text-[11px]">
                Explore services
              </p>

              <nav
                aria-label="JaksLab services"
                className="flex w-full flex-col sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-3"
              >
                {services.map((service, index) => {
                  const Icon = service.icon;

                  return (
                    <div
                      key={service.href}
                      className="flex w-full flex-col sm:w-auto sm:flex-row sm:items-center sm:gap-4"
                    >
                      <Link
                        href={service.href}
                        className={[
                          "group flex min-h-12 w-full items-center justify-between gap-3 border-b border-zinc-900/20 py-3 text-base transition-colors duration-200",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
                          "sm:min-h-0 sm:w-auto sm:justify-start sm:border-b-0 sm:py-1 sm:text-sm",
                          service.primary
                            ? "font-bold text-zinc-950"
                            : "font-semibold text-zinc-700 hover:text-zinc-950",
                        ].join(" ")}
                      >
                        <span className="flex items-center gap-2">
                          <Icon
                            size={15}
                            strokeWidth={1.9}
                            className="shrink-0"
                            aria-hidden="true"
                          />

                          <span className="whitespace-nowrap border-b border-current/30 pb-1 transition-colors group-hover:border-current">
                            {service.label}
                          </span>
                        </span>

                        <ArrowRight
                          size={15}
                          strokeWidth={2}
                          className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>

                      {index < services.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="hidden text-sm font-light text-zinc-400 sm:block"
                        >
                          |
                        </span>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
