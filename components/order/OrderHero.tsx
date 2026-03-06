import React from "react";

// --- Discount Badge Component ---
function DiscountBadge() {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 mt-8 text-sm font-semibold 
                    text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 
                    rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]
                    hover:bg-emerald-500/20 transition-colors duration-300 cursor-default">
      {/* Pulsing Dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      
      <span>
        First time? Get <span className="text-white font-bold">10% OFF</span> your order with code: <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-white font-mono tracking-wider ml-1">FIRST10</span>
      </span>
    </div>
  );
}

// --- Main Hero Component ---
export function OrderHero() {
  return (
    <section className="relative py-32 px-6 text-center bg-transparent overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <div className="w-[900px] h-[900px] bg-blue-600/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Original Badge */}
        <div className="inline-block px-5 py-2 mb-6 text-sm font-medium 
                        text-blue-400 bg-white/10 border border-white/20 
                        rounded-full backdrop-blur-md">
          Fast • Confidential • Professional
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Submit Your{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Assignment
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-lg md:text-xl text-slate-400 
                      max-w-2xl mx-auto leading-relaxed">
          Tell us what you need, upload your materials, and receive a
          personalized quote from our expert team.
          We ensure quality, clarity, and timely delivery.
        </p>

        {/* Discount Component */}
        <DiscountBadge />
        
      </div>
    </section>
  );
}