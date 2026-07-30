"use client";

import { ArrowRight, MessageSquareText } from "lucide-react";

export function HomepageFinalCta() {
  return (
    <section className="border-y border-[#a94318] bg-[#f4f5f5] px-[clamp(1.25rem,4vw,4rem)] py-[clamp(3rem,7vw,6rem)]">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-20">
        <div>
          
          <h2 className="mt-5 max-w-[16ch] text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.03]">
            More content will not fix <span className="text-[#a94318]">weak traffic.</span>
          </h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#4e4944]">
            Generic blog posts attract the wrong readers - or no readers at all. Your expertise stays buried, search visibility stalls, and traffic fails to become qualified leads.
          </p>
          <p className="mt-8 max-w-md text-[clamp(1.3rem,2.5vw,2rem)] leading-snug">
            Build a content system people can find, trust, and act on.
            <ArrowRight className="ml-3 inline text-[#a94318]" size={25} aria-hidden="true" />
          </p>
        </div>

        <div className="homepage-final-solution p-[clamp(1.5rem,4vw,3rem)]">
          <p className="text-xs titlecase tracking-[.14em] text-[#a94318]">The proposed solution</p>
          <h3 className="mt-5 text-[clamp(1.75rem,3vw,2.75rem)] leading-tight">
            Content optimization grounded in your expertise.
          </h3>
          <p className="mt-6 text-sm leading-7 text-[#554f49]">
            JaksLab researches how your buyers search, turns specialist knowledge into useful answers, and improves each page for SEO, AEO, and AI discovery.
          </p>
          <ul className="mt-7 space-y-3 border-t border-[#c7c1ba] pt-6 text-sm text-[#403b37]">
            <li>Clear topics tied to buyer intent</li>
            <li>Expert-led content built to earn trust</li>
            <li>Measured improvements in traffic and leads</li>
          </ul>
          <p className="mt-7 font-semibold">Ready to turn expertise into qualified demand?</p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("jakslab:open-action-panel"))}
            className="homepage-final-action mt-6 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm font-semibold"
          >
            <MessageSquareText size={17} aria-hidden="true" />
            Discuss your growth plan
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
