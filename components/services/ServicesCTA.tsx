import Link from "next/link";

export function ServicesCTA() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white overflow-hidden rounded-t-3xl">
      
      {/* Background Glow Effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-black/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-8 text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Ready to Bring Your Project to Life?
        </h2>

        <p className="mt-5 text-blue-100 max-w-2xl mx-auto text-lg">
          Let’s turn your idea into a polished, professional solution. 
          Get a clear quote, timeline, and expert support from day one.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 mt-10 px-10 py-4 
                     bg-white text-blue-600 font-semibold text-lg 
                     rounded-full shadow-lg 
                     hover:shadow-2xl hover:-translate-y-1 
                     active:translate-y-0 
                     transition-all duration-300"
        >
          Request a Quote →
        </Link>

      </div>
    </section>
  );
}