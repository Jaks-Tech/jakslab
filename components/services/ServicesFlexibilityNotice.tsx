"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ServicesFlexibilityNotice() {
  return (
    <>
      {/* Soft Animated Radial Glow (no grid) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 w-[900px] h-[900px]
                     -translate-x-1/2 -translate-y-1/2
                     bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20
                     blur-[160px] opacity-60 animate-pulse"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        /* - Removed 'max-w-4xl mx-auto' and 'py-24'
           - Added 'pt-20' for top space
           - Added 'flex flex-col items-center' for centering
        */
        className="relative z-10 pt-2 flex flex-col items-center text-center px-4"
      >
        {/* Glass Badge */}
        <div className="inline-block px-4 py-1 mb-6 text-sm font-medium
                        text-blue-300 bg-blue-900/30
                        border border-blue-500/20
                        rounded-full backdrop-blur-md
                        shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          Flexible Solutions
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Have a Unique Project in Mind?
        </h3>

        {/* Content widths controlled locally for readability */}
        <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">
          Our expertise goes beyond predefined service categories.
          We design and deliver custom academic, technical, AI, and
          software solutions tailored precisely to your goals.
        </p>

        <p className="mt-4 text-slate-400 max-w-2xl">
          If your project isn’t listed, that doesn’t mean we can’t build it.
          Let’s discuss your vision and craft a solution that fits perfectly.
        </p>

        <Link
          href="/contact"
          className="group relative inline-flex items-center gap-2 mt-12
                     px-10 py-4 rounded-full
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white font-semibold text-lg
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
            Enquire About Your Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </motion.div>
    </>
  );
}