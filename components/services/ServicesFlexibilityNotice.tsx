import Link from "next/link";

export function ServicesFlexibilityNotice() {
  return (
    <section className="relative py-5 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto text-center px-8">
        
        <div className="inline-block px-4 py-1 mb-6 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          Flexible Solutions
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          Have a Unique Project in Mind?
        </h3>

        <p className="mt-6 text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
          Our expertise goes beyond predefined service categories. 
          We design and deliver custom academic, technical, AI, and 
          software solutions tailored precisely to your goals.
        </p>

        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          If your project isn’t listed, that doesn’t mean we can’t build it. 
          Let’s discuss your vision and craft a solution that fits perfectly.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 mt-10 px-10 py-4 rounded-full 
                     bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white font-semibold text-lg
                     shadow-lg shadow-blue-500/20
                     hover:shadow-xl hover:shadow-blue-500/30 
                     hover:scale-105 active:scale-100 
                     transition-all duration-300"
        >
          Enquire About Your Project →
        </Link>

      </div>
    </section>
  );
}