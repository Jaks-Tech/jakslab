"use client";

import Link from "next/link";
import { Send } from "lucide-react";

export function ServicesHero() {
  return (
    /* 1. Removed 'bg-white' and solid gradients. 
       2. Kept 'relative' and 'z-10' to ensure it sits above the 3D canvas. */
    <section className="relative pt-30 pb-28 text-center overflow-hidden bg-transparent">

      {/* Optional: Keeping the blur glow but reducing opacity for a subtle 3D depth effect */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 
                      w-[500px] h-[500px] bg-blue-500/10 
                      rounded-full blur-3xl -z-10"></div>

      <div className="relative max-w-4xl mx-auto px-8 z-10">

        {/* Adjusted badge: Lowered background opacity for a 'glass' look */}
        <div className="inline-block px-4 py-1 mb-6 text-sm font-medium 
                        text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-full backdrop-blur-sm">
          Academic & Technical Solutions
        </div>

        {/* Text color changed to white/slate-100 for visibility on dark bg */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Our Services
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-300 
                      max-w-2xl mx-auto leading-relaxed">
          Comprehensive academic and technical solutions crafted with precision,
          professionalism, and a commitment to outstanding results.
        </p>

        <div className="mt-10">
          <Link
            href="/order"
            className="inline-flex items-center justify-center gap-3
                       px-10 py-4 rounded-full
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-semibold text-lg
                       shadow-lg hover:shadow-blue-500/25
                       hover:-translate-y-1 active:translate-y-0
                       transition-all duration-300"
          >
            <Send className="w-5 h-5" />
            Request a Service
          </Link>
        </div>

      </div>
    </section>
  );
}