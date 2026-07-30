"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, FileSearch, SearchCheck } from "lucide-react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveLayout";

const expertiseImages = [
  "/homepage-service-images/technical-blog-growth-glass-v3.png",
  "/homepage-service-images/technology-development-glass-v3.png",
  "/homepage-service-images/research-academic-support-glass-v3.png",
  "/homepage-service-images/jakslab-integrated-services-landing.png",
] as const;

export function HomepageServiceHero() {
  const [activeExpertiseImage, setActiveExpertiseImage] = useState(0);

  useEffect(() => {
    const expertiseTimer = window.setInterval(() => {
      setActiveExpertiseImage((current) => (current + 1) % expertiseImages.length);
    }, 6500);

    return () => {
      window.clearInterval(expertiseTimer);
    };
  }, []);

  return (
    <section
      className="bg-white bg-cover bg-center bg-no-repeat pb-[clamp(2rem,5vw,4.5rem)] pt-4 sm:pt-7"
      style={{ backgroundImage: "url('/homepage-hero-knowledge-flow.png')" }}
    >
      <ResponsiveContainer>
        <div className="flex min-h-[clamp(30rem,55vw,46rem)] items-center">
          <div className="flex w-full flex-col items-center justify-center bg-transparent px-[clamp(.25rem,4vw,4rem)] py-[clamp(3rem,7vw,7rem)] text-center">
            <h1 className="max-w-[22ch] text-[clamp(2.5rem,5vw,5rem)] font-normal uppercase leading-[.92] tracking-[-.045em] text-[#2d1e15] [font-family:Didot,'Bodoni_MT','Times_New_Roman',serif]">
              Let&apos;s generate traffic
              <br />
              that converts
            </h1>
            <p className="mt-7 max-w-[48rem] text-[clamp(1rem,1.35vw,1.2rem)] leading-relaxed text-[#59473a]">
              Content built around your real expertise - researched, structured, and written for how people actually search now.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[#4b372b]" aria-label="JaksLab services">
              <span className="inline-flex items-center gap-2 text-sm">
                <SearchCheck size={19} strokeWidth={1.6} aria-hidden="true" />
                Content optimization
              </span>
              <span className="inline-flex items-center gap-2 text-sm">
                <FileSearch size={19} strokeWidth={1.6} aria-hidden="true" />
                Project research
              </span>
              <span className="inline-flex items-center gap-2 text-sm">
                <Code2 size={19} strokeWidth={1.6} aria-hidden="true" />
                Product development
              </span>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("jakslab:open-action-panel"))}
                className="inline-flex min-h-11 w-fit items-center rounded-full bg-[#3f2b20] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#573b2b]"
              >
                Let&apos;s talk
              </button>
              <Link
                href="/services"
                className="inline-flex min-h-11 w-fit items-center rounded-full border border-[#6f594b]/40 bg-white/40 px-7 py-3 text-sm font-semibold text-[#4b2e1c] backdrop-blur-md transition hover:border-[#6f594b]/65 hover:bg-white/70"
              >
                View services
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-[clamp(1rem,2.5vw,2rem)] grid gap-3 bg-transparent sm:grid-cols-[1.15fr_.7fr_1.15fr]">
          <div className="relative grid min-h-44 grid-cols-[minmax(0,.85fr)_minmax(8rem,1.15fr)] items-center overflow-hidden rounded-[2rem_3.5rem_2rem_2rem] border border-[#7c563b]/15 bg-[#ead8c5] p-[clamp(1.25rem,3vw,2.5rem)] shadow-[0_14px_40px_rgba(69,42,26,.07)]">
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

          <div className="flex min-h-44 flex-col items-center justify-center rounded-[3rem_2rem_3rem_2rem] border border-[#7c563b]/15 bg-[#dedbd4] p-6 text-center shadow-[0_14px_40px_rgba(69,42,26,.06)]">
            <strong className="text-[clamp(3rem,5vw,5rem)] font-normal italic leading-none text-[#3b291f]">3</strong>
            <p className="mt-2 text-xs text-[#6b5548]">Connected services</p>
          </div>

          <div className="flex min-h-44 flex-col justify-center rounded-[2rem_2rem_3.5rem_2rem] border border-[#7c563b]/15 bg-[#f4eee4] p-[clamp(1.25rem,3vw,2.5rem)] shadow-[0_14px_40px_rgba(69,42,26,.06)]">
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
