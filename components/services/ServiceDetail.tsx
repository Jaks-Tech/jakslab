"use client";

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import {
  serviceById,
  type Service,
} from "@/components/services/data";

type ServiceDetailProps = {
  service: Service;
  variant?: "page" | "modal";
};

export function ServiceDetail({
  service,
  variant = "page",
}: ServiceDetailProps) {
  const isModal = variant === "modal";

  const MainHeading = isModal ? "h2" : "h1";
  const ItemHeading = isModal ? "h4" : "h3";

  const headerClasses = isModal
    ? "px-6 pt-6 sm:px-10"
    : "px-5 pt-[clamp(2rem,5vw,4rem)] sm:px-8 lg:px-12";

  const contentClasses = isModal
    ? "px-6 pb-10 sm:px-10"
    : "px-5 pb-[clamp(3rem,6vw,5rem)] sm:px-8 lg:px-12";

  const headingClasses = isModal
    ? "text-[clamp(1.85rem,3.4vw,2.6rem)] leading-[1.05]"
    : "text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.02]";

  return (
    <article className="services-clean relative text-[#1d1d1a]">
      {/* --- Header Section --- */}
      <header className={headerClasses}>
        <span
          aria-hidden="true"
          className="block h-1 w-14 rounded-full"
          style={{ backgroundColor: service.accent }}
        />

        <p
          className="mt-5 text-[10px] font-medium uppercase tracking-[0.2em]"
          style={{ color: service.accent }}
        >
          {service.name}
        </p>

        <MainHeading
          className={`mt-4 max-w-[17ch] font-serif font-normal tracking-[-0.04em] ${headingClasses}`}
        >
          {service.title}
        </MainHeading>

        <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#544a42]">
          {service.intro}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={service.cta.href}
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-[#1c1b19] bg-[#1c1b19] px-6 py-3 text-sm font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-[#32302d] hover:border-[#32302d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1b19]"
          >
            <span>{service.cta.label}</span>
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="shrink-0 !text-white"
            />
          </Link>

          <Link
            href="/book-call"
            className="inline-flex min-h-11 items-center rounded-full border border-[#c2b9ae] bg-transparent px-6 py-3 text-sm font-semibold text-[#1c1b19] transition-all duration-200 hover:border-[#1c1b19] hover:bg-[#1c1b19]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1b19]"
          >
            Book a call
          </Link>
        </div>
      </header>

      {/* --- Architectural Illustration Stage (Page Mode Only) --- */}
      {!isModal && (
        <figure
          className="relative mx-5 mt-[clamp(2.5rem,5vw,4rem)] aspect-[16/8] sm:aspect-[16/7] overflow-hidden rounded-tl-[80px] sm:rounded-tl-[120px] rounded-br-3xl border border-[#e0d9cf] bg-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] sm:mx-8 lg:mx-12"
          style={{
            background: `linear-gradient(135deg, ${service.accent}12 0%, rgba(255,255,255,0.4) 80%)`,
          }}
        >
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1100px"
            className="object-contain object-center p-6 sm:p-10 [filter:none!important]"
          />
        </figure>
      )}

      {/* --- Detailed Content Sections --- */}
      <div className={contentClasses}>
        {/* Included Deliverables breakdown */}
        <ContentBlock title="What's included" isModal={isModal}>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {service.included.map((item) => (
              <li key={item.label} className="border-t border-[#d9d2c8] py-5">
                <ItemHeading className="text-sm font-semibold text-[#1d1d1a]">
                  {item.label}
                </ItemHeading>
                <p className="mt-2 text-sm leading-6 text-[#6b6259]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </ContentBlock>

        {/* Process & Execution Steps */}
        <ContentBlock title="How it runs" isModal={isModal}>
          <ol className="grid gap-x-10 sm:grid-cols-2">
            {service.steps.map((step, index) => (
              <li
                key={step.label}
                className="flex gap-4 border-t border-[#d9d2c8] py-5"
              >
                <span
                  className="mt-0.5 text-[11px] font-semibold tabular-nums"
                  style={{ color: service.accent }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <ItemHeading className="text-sm font-semibold text-[#1d1d1a]">
                    {step.label}
                  </ItemHeading>
                  <p className="mt-2 text-sm leading-6 text-[#6b6259]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </ContentBlock>

        {/* Deliverables Checklist */}
        <ContentBlock title="What you get" isModal={isModal}>
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2.5 text-sm text-[#4a423b]"
              >
                <Check
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="shrink-0"
                  style={{ color: service.accent }}
                />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#6b6259]">
            {service.fit}
          </p>
        </ContentBlock>

        {/* Cross-Service Bridges */}
        <aside aria-label="Related services">
          <ContentBlock title="Works with" isModal={isModal}>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.bridges.map((bridge) => {
                const target = serviceById[bridge.to];

                if (!target) return null;

                const cardStyles = {
                  "--svc-accent": target.accent,
                } as CSSProperties;

                return (
                  <Link
                    key={bridge.to}
                    href={`/services/${target.id}`}
                    scroll={false}
                    style={cardStyles}
                    className="group flex flex-col justify-between rounded-2xl sm:rounded-tl-[40px] border border-[#d9d2c8] bg-white/40 p-6 transition-all duration-200 hover:border-[color:var(--svc-accent)] hover:bg-white/70 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--svc-accent)]"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: target.accent }}
                        />
                        <span className="text-sm font-semibold text-[#1d1d1a]">
                          {target.name}
                        </span>
                      </span>

                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="text-[#8a8076] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>

                    <span className="mt-3 text-sm leading-6 text-[#6b6259]">
                      {bridge.body}
                    </span>
                  </Link>
                );
              })}
            </div>
          </ContentBlock>
        </aside>
      </div>
    </article>
  );
}

type ContentBlockProps = {
  title: string;
  isModal: boolean;
  children: ReactNode;
};

function ContentBlock({ title, isModal, children }: ContentBlockProps) {
  const SectionHeading = isModal ? "h3" : "h2";

  return (
    <section className={isModal ? "mt-10" : "mt-[clamp(2.5rem,5vw,4rem)]"}>
      <SectionHeading className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a9086]">
        {title}
      </SectionHeading>

      <div className="mt-4">{children}</div>
    </section>
  );
}
