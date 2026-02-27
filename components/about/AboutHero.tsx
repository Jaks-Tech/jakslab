import Link from "next/link";
import { Send } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-24 bg-transparent overflow-hidden">

      {/* Subtle Ambient Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none -z-10">
        <div className="w-[900px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-[900px] mx-auto px-8 text-center">

        {/* Micro Label */}
        <span className="inline-block px-4 py-1.5 text-sm font-semibold 
                         bg-white/10 backdrop-blur
                         border border-white/20
                         text-blue-400 
                         rounded-full mb-8">
          Who We Are
        </span>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
          About{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            JaksLab
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 text-xl text-slate-300 leading-relaxed">
          Your trusted partner in academic excellence and advanced technical
          innovation - delivering precision-driven solutions with integrity,
          expertise, and measurable impact.
        </p>

        {/* CTA */}
        <div className="mt-12">
          <Link
            href="/order"
            className="inline-flex items-center justify-center gap-3
                       px-10 py-4 rounded-full
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-semibold text-lg
                       shadow-lg shadow-blue-600/20
                       hover:shadow-blue-600/40
                       hover:scale-[1.03]
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