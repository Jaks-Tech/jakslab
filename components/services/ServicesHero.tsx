"use client";

import Link from "next/link";
import { Send } from "lucide-react";

export function ServicesHero() {
  return (
    <section className="relative pt-30 pb-28 text-center overflow-hidden 
                        bg-gradient-to-b from-blue-50 via-white to-white">

      {/* Background Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 
                      w-[500px] h-[500px] bg-blue-400/20 
                      rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-8">

        {/* Badge */}
        <div className="inline-block px-4 py-1 mb-6 text-sm font-medium 
                        text-blue-600 bg-blue-100 rounded-full">
          Academic & Technical Solutions
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
          Our Services
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-lg md:text-xl text-slate-700 
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
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-semibold text-lg
                       shadow-lg hover:shadow-2xl
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