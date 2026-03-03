"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ServicesCTA() {
  return (
    <>
      {/* Soft Animated Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 w-[1000px] h-[1000px]
                     -translate-x-1/2 -translate-y-1/2
                     bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20
                     blur-[160px] opacity-60 animate-pulse"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        /* 1. Removed 'max-w-4xl mx-auto' and 'py-28'
           2. Added 'pt-20' for top spacing
           3. Added 'flex flex-col items-center' to keep heading & content centered 
        */
        className="relative z-10 pt-2 flex flex-col items-center text-center px-4"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Ready to Bring Your Project to Life?
        </h2>

        <p className="mt-6 text-slate-400 max-w-2xl text-lg md:text-xl leading-relaxed">
          Let’s turn your idea into a polished, professional solution.
          Get a clear quote, timeline, and expert support from day one.
        </p>

        <div className="mt-12">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2
                       px-12 py-5 rounded-full
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-bold text-lg
                       overflow-hidden
                       transition-all duration-300
                       hover:-translate-y-1"
          >
            {/* Hover Glow */}
            <span className="absolute inset-0 rounded-full
                             bg-gradient-to-r from-blue-500 to-indigo-500
                             blur-xl opacity-0
                             group-hover:opacity-40
                             transition-opacity duration-500" />

            {/* Shimmer Sweep */}
            <span className="absolute inset-0
                             bg-gradient-to-r from-transparent via-white/30 to-transparent
                             -translate-x-full
                             group-hover:translate-x-full
                             transition-transform duration-1000 ease-out" />

            <span className="relative z-10 flex items-center gap-2">
              Request a Quote
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}