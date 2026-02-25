import Link from "next/link";
import { Send } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center text-center overflow-hidden px-8">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/about-bg.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-[900px] mx-auto">

        {/* Badge */}
        <span className="inline-block px-4 py-1.5 text-sm font-semibold 
                         bg-white/10 text-white border border-white/20 
                         backdrop-blur-md rounded-full mb-8">
          Who We Are
        </span>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
          About{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            JaksLab
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 text-xl text-slate-200 leading-relaxed">
          Your trusted partner in academic excellence and advanced technical
          innovation - delivering precision-driven solutions with integrity,
          expertise, and measurable impact.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <Link
            href="/order"
            className="inline-flex items-center justify-center gap-3
                       px-10 py-4 rounded-full
                       bg-gradient-to-r from-cyan-500 to-indigo-500
                       text-white font-semibold text-lg
                       shadow-lg hover:shadow-cyan-500/40
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