"use client";

import { MessageSquareText } from "lucide-react";

export function HomepageAuthorityCta() {
  return (
    <section className="border-t border-[#bdb4aa] px-[clamp(1.25rem,4vw,4rem)] py-[clamp(4rem,8vw,7rem)]">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-20">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#8a7e73]">
            A practical next step
          </p>
          <h2 className="mt-5 max-w-[18ch] font-serif text-[clamp(2rem,4vw,3.6rem)] font-normal leading-[1.05] tracking-[-.035em]">
            Bring us the problem. Leave with a clear direction.
          </h2>
        </div>

        <div className="lg:border-l lg:border-[#d2c9bf] lg:pl-10">
          <p className="max-w-md text-sm leading-7 text-[#5e564f]">
            We will identify whether the next move is better content, focused research, or a working product - and explain why.
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("jakslab:open-action-panel"))}
            className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#1d1d1a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3a3530] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1d1a]"
          >
            <MessageSquareText size={17} aria-hidden="true" />
            Discuss your requirement
          </button>
        </div>
      </div>
    </section>
  );
}
