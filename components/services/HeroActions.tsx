"use client";

import Link from "next/link";
import { Send } from "lucide-react";

export function HeroActions() {
  const scrollToProcess = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* CTA Buttons - Forced 2 columns on all screens via 'grid-cols-2' */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 items-center w-full max-w-lg px-2">
        <Link
          href="/order"
          className="inline-flex items-center justify-center gap-2 sm:gap-3
                     px-4 sm:px-10 py-4 rounded-full
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white font-semibold text-sm sm:text-lg
                     shadow-lg hover:shadow-blue-500/40
                     hover:-translate-y-1 active:translate-y-0
                     transition-all duration-300"
        >
          <Send className="w-4 h-4 sm:w-5 h-5" />
          <span className="whitespace-nowrap">Request Service</span>
        </Link>

        <button
          onClick={scrollToProcess}
          className="px-4 sm:px-10 py-4 rounded-full border border-indigo-500/30 
                     bg-indigo-500/10 text-indigo-300 font-medium text-sm sm:text-lg
                     hover:bg-indigo-500/20 hover:border-indigo-500/50 
                     transition-all duration-300 cursor-pointer whitespace-nowrap"
        >
          How it Works
        </button>
      </div>
    </div>
  );
}