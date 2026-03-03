"use client";

import { HeroActions } from "./HeroActions"; 

export function ServicesHero() {
  return (
    <>
      {/* Background Glow - Contained width to prevent horizontal scroll */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
                      w-full max-w-[800px] h-[500px] bg-blue-500/10 
                      rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* 1. Removed overflow-hidden to keep Navbar visible.
         2. Removed max-w-7xl wrap to prevent phantom width issues.
      */}
      <section className="relative pt-32 sm:pt-40 pb-12 bg-transparent">
        <div className="w-full flex flex-col items-center text-center px-4">
          
          {/* Micro Label / Badge */}
          <div className="inline-flex items-center gap-2 
                          px-4 py-2 rounded-full 
                          bg-white/10 border border-white/20 
                          text-blue-400 text-xs sm:text-sm font-medium mb-8
                          backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            Elevating Academic & Technical Standards
          </div>

          {/* Headline - Responsive sizing with controlled max-width */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                         font-bold tracking-tight text-white 
                         leading-tight sm:leading-[1.1] 
                         max-w-5xl mx-auto px-2">
            Precision-Engineered <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Solutions for Success
            </span>
          </h1>

          {/* Subtext - Tightened width for better readability */}
          <p className="mt-8 text-base sm:text-lg md:text-xl 
                        text-slate-300 max-w-3xl mx-auto leading-relaxed px-2">
            From complex algorithmic development to high-stakes academic research, we provide 
            the expertise required to bridge the gap between ambitious goals and 
            outstanding reality.
          </p>

          {/* Actions Wrapper: 
              Ensures the HeroActions (and its columns) stay 
              properly centered and don't push the page wide.
          */}
          <div className="w-full max-w-4xl mt-10">
            <HeroActions />
          </div>
        </div>
      </section>
    </>
  );
}