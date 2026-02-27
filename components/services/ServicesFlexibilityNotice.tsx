"use client";

import Link from "next/link";

export function ServicesFlexibilityNotice() {
  return (
    /* CHANGED: 
       - Removed 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
       - Set to 'bg-transparent' to maintain 3D background continuity
    */
    <section className="relative py-20 bg-transparent overflow-hidden">
      
      {/* Decorative Glow - Adjusted for dark theme depth */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px]"></div>

      <div className="relative max-w-4xl mx-auto text-center px-8 z-10">
        
        {/* Adjusted badge: Glass look with light blue text */}
        <div className="inline-block px-4 py-1 mb-6 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-full backdrop-blur-sm">
          Flexible Solutions
        </div>

        {/* CHANGED: text-slate-900 -> text-white */}
        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Have a Unique Project in Mind?
        </h3>

        {/* CHANGED: text-slate-700 -> text-slate-300 */}
        <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Our expertise goes beyond predefined service categories. 
          We design and deliver custom academic, technical, AI, and 
          software solutions tailored precisely to your goals.
        </p>

        {/* CHANGED: text-slate-600 -> text-slate-400 */}
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
          If your project isn’t listed, that doesn’t mean we can’t build it. 
          Let’s discuss your vision and craft a solution that fits perfectly.
        </p>

        <Link
          href="/contact"
          /* Button maintained as a strong anchor, scale-105 for subtle interaction */
          className="inline-flex items-center gap-2 mt-10 px-10 py-4 rounded-full 
                     bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white font-semibold text-lg
                     shadow-lg shadow-blue-900/40
                     hover:shadow-blue-500/40 
                     hover:scale-105 active:scale-100 
                     transition-all duration-300"
        >
          Enquire About Your Project →
        </Link>

      </div>
    </section>
  );
}