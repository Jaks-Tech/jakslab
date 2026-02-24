import Link from "next/link";
import { Send } from "lucide-react";
export function AboutHero() {
  return (
    <section className="relative pt-30 pb-28 bg-gradient-to-b from-blue-50/60 to-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-[900px] mx-auto px-8 text-center">

        {/* Badge */}
        <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-indigo-100 text-indigo-700 rounded-full mb-8">
          Who We Are
        </span>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
          About{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            JaksLab
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 text-xl text-slate-600 leading-relaxed">
          Your trusted partner in academic excellence and advanced technical
          innovation — delivering precision-driven solutions with integrity,
          expertise, and measurable impact.
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