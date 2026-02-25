"use client";

import Link from "next/link";
import { Send } from "lucide-react";

export function ServicesHero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center text-center overflow-hidden px-8">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/services-bg.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Badge */}
        <div className="inline-block px-4 py-1 mb-6 text-sm font-medium 
                        bg-white/10 text-white border border-white/20 
                        backdrop-blur-md rounded-full">
          Academic & Technical Solutions
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
          Our{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Services
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-lg md:text-xl text-slate-200 
                      max-w-2xl mx-auto leading-relaxed">
          Comprehensive academic and technical solutions crafted with precision,
          professionalism, and a commitment to outstanding results.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <Link
            href="/order"
            className="inline-flex items-center justify-center gap-3
                       px-10 py-4 rounded-full
                       bg-gradient-to-r from-cyan-500 to-indigo-500
                       text-white font-semibold text-lg
                       shadow-lg hover:shadow-cyan-500/40
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