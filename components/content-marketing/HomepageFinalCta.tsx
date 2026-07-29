"use client";

import Link from "next/link";
import { ArrowRight, MessageSquareText } from "lucide-react";

export function HomepageFinalCta() {
  return (
    <div className="flex w-full flex-col items-center py-[clamp(2rem,5vw,4rem)] text-center">
      <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#76533b]">Start here</p>
      <h2 className="mt-4 max-w-3xl text-[clamp(2.25rem,5vw,5rem)] font-medium leading-[.96] tracking-[-.055em] text-slate-950">
        Bring us the outcome you need.
      </h2>
      <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
        We will help you choose the right content, technology or research path.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("jakslab:open-action-panel"))}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-900 bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(15,23,42,.18)] transition hover:bg-slate-700"
        >
          <MessageSquareText size={17} aria-hidden="true" />
          Book or request
        </button>
        <Link
          href="/services"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-400 bg-white/35 px-6 py-3 text-sm font-semibold text-slate-900 backdrop-blur-sm transition hover:border-slate-700 hover:bg-white/65"
        >
          Explore our services
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
