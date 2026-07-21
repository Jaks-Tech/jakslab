"use client";

import HeroCTA from "./HeroCTA";
import Home3DScene from "./Home3DScene";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[720px] sm:min-h-[680px] lg:min-h-[720px] px-5 sm:px-8 lg:px-12 overflow-hidden bg-transparent flex items-center">
      <Home3DScene />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#03050c]/35 sm:bg-[radial-gradient(circle_at_75%_48%,rgba(37,99,235,0.17),transparent_32%)]" />
      <div className="absolute left-[8%] top-28 h-48 w-48 rounded-full border border-cyan-400/10 [transform:rotateX(65deg)]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[1.08fr_.92fr] items-center gap-8 lg:gap-10 py-14 sm:pb-28 sm:pt-20 lg:py-24">
        <div className="text-center lg:text-left">

        <p className="mb-7 text-sm tracking-wide text-slate-400">
          Academic · Research · Technology
        </p>

        {/* Headline */}
        <h1
          className="text-[2.55rem] sm:text-5xl md:text-6xl lg:text-[4.25rem]
          font-bold tracking-tight text-white 
          leading-[1.04] max-w-4xl mx-auto lg:mx-0"
        >
          Academic and technology solutions.
        </h1>

        {/* Subheading */}
        <p
          className="mt-8 text-lg md:text-xl 
          text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
        >
          From academic projects to software solutions, we turn complex work into clear results.
        </p>

        {/* CTA (keeps your original link logic) */}
        <div className="mt-10 flex justify-center lg:justify-start">
          <HeroCTA />
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-400">
          <span>150+ projects completed</span>
          <span>4.9 average rating</span>
        </div>
      </div>

      </div>
    </section>
  );
}
