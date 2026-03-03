"use client";

import { HeroActions } from "./HeroActions"; 

export function ServicesHero() {
  return (
    <>
      {/* Background Glow - Expanded for wider layout */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
                      w-[1000px] h-[600px] bg-blue-500/10 
                      rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <section className="relative pt-20 sm:pt-10 pb-2 overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center px-4 sm:px-6 lg:px-12">
          
          {/* Micro Label / Badge */}
          <div className="inline-flex items-center gap-2 
                          px-4 sm:px-5 py-2 rounded-full 
                          bg-white/10 border border-white/20 
                          text-blue-400 text-xs sm:text-sm font-medium mb-8 sm:mb-10
                          backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            Elevating Academic & Technical Standards
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                         font-bold tracking-tight text-white 
                         leading-tight sm:leading-[1.05] 
                         max-w-5xl mx-auto">
            Precision-Engineered <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Solutions for Success
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl 
                        text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From complex algorithmic development to high-stakes academic research, we provide 
            the expertise required to bridge the gap between ambitious goals and 
            outstanding reality. Trusted by students and professionals worldwide.
          </p>

          {/* Actions */}
          <div className="w-full">
            <HeroActions />
          </div>
        </div>
      </section>
    </>
  );
}