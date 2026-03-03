"use client";

import { HeroActions } from "./HeroActions";

export function ServicesHero() {
  return (
    <>
      {/* Background Glow - Expanded */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
                      w-[1400px] h-[700px] bg-blue-500/10 
                      rounded-full blur-[140px] -z-10 pointer-events-none" />

      <section className="relative pt-20 sm:pt-10 pb-2 overflow-hidden bg-transparent">
        
        {/* Wider Container */}
        <div className="max-w-[1500px] mx-auto flex flex-col items-center text-center px-6 lg:px-16">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 
                          px-5 py-2 rounded-full 
                          bg-white/10 border border-white/20 
                          text-blue-400 text-sm font-medium mb-10
                          backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            Elevating Academic & Technical Standards
          </div>

          {/* Headline - Wider */}
          <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-7xl 
                         font-bold tracking-tight text-white 
                         leading-tight lg:leading-[1.05] 
                         max-w-6xl">
            Precision-Engineered{" "}
            <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Solutions for Success
            </span>
          </h1>

          {/* Paragraph - Wider */}
          <p className="mt-8 text-lg md:text-xl 
                        text-slate-300 max-w-4xl leading-relaxed">
            From complex algorithmic development to high-stakes academic research, we provide 
            the expertise required to bridge the gap between ambitious goals and 
            outstanding reality. Trusted by students and professionals worldwide.
          </p>

          {/* Actions */}
          <div className="w-full mt-10">
            <HeroActions />
          </div>
        </div>
      </section>
    </>
  );
}