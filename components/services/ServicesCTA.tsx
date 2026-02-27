"use client";

import Link from "next/link";

export function ServicesCTA() {
  return (
    /* CHANGED: 
       - Switched from solid gradient to a glass panel (bg-white/5 + backdrop-blur)
       - Kept rounded-t-3xl for the 'footer-up' design feel
       - Added a subtle top border to define the section transition
    */
    <section className="relative py-24 bg-white/5 backdrop-blur-xl border-t border-white/10 text-white overflow-hidden rounded-t-[3rem]">
      
      {/* Background Glow Effects - Reduced opacity to blend with the 3D stars */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px]"></div>

      <div className="relative max-w-4xl mx-auto px-8 text-center z-10">
        
        <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
          Ready to Bring Your Project to Life?
        </h2>

        <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-lg md:text-xl">
          Let’s turn your idea into a polished, professional solution. 
          Get a clear quote, timeline, and expert support from day one.
        </p>

        <div className="mt-12">
          <Link
            href="/contact"
            /* CHANGED: 
               - Switched button to a gradient for higher 'Call to Action' priority
               - Added shadow-blue to make it pop against the dark 3D scene
            */
            className="inline-flex items-center gap-2 px-12 py-5 
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-bold text-lg 
                       rounded-full shadow-[0_10px_40px_-10px_rgba(37,99,235,0.4)]
                       hover:shadow-[0_15px_50px_-10px_rgba(37,99,235,0.6)]
                       hover:-translate-y-1.5
                       active:translate-y-0 
                       transition-all duration-400"
          >
            Request a Quote
            <span className="text-xl">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}