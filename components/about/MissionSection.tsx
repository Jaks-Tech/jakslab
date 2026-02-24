import { CheckCircle } from "lucide-react";

export function MissionSection() {
  return (
    <section className="relative py-5 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-8 lg:px-12 grid md:grid-cols-2 gap-20 items-center">

        {/* Left Content */}
        <div>
          <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full mb-6">
            Our Purpose
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            Empowering Excellence <br className="hidden lg:block" />
            Through Precision & Innovation
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            JaksLab delivers high-quality academic and advanced technical
            solutions with precision, integrity, and an unwavering commitment
            to exceptional results for every client we serve.
          </p>

          <ul className="mt-10 space-y-5">
            {[
              "Premium quality guaranteed",
              "Strict on-time delivery",
              "24/7 dedicated client support",
              "Transparent & competitive pricing",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-4 text-slate-800 group"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-600 transition-colors duration-300">
                  <CheckCircle className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </span>
                <span className="text-base font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Card */}
        <div className="relative">
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-12 text-center transition-transform duration-500 hover:scale-105">

            <h3 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              5+
            </h3>

            <p className="mt-4 text-lg font-medium text-slate-700">
              Years of Excellence
            </p>

            <div className="mt-6 h-1 w-16 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />

            <p className="mt-6 text-slate-600 text-sm leading-relaxed">
              Delivering consistent, reliable, and results-driven solutions
              trusted by clients worldwide.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}