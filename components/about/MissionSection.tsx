import { CheckCircle } from "lucide-react";

export function MissionSection() {
  return (
    <section className="relative py-24 bg-transparent overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
                      w-[800px] h-[600px] 
                      bg-blue-600/10 blur-[160px] 
                      rounded-full pointer-events-none -z-10" />

      <div className="relative max-w-[1200px] mx-auto px-8 lg:px-12 grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT CONTENT */}
        <div>

          <span className="inline-block px-4 py-1.5 text-sm font-semibold 
                           bg-white/10 backdrop-blur 
                           border border-white/20 
                           text-blue-400 
                           rounded-full mb-6">
            Our Purpose
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
            Empowering Excellence <br className="hidden lg:block" />
            Through Precision & Innovation
          </h2>

          <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
            JaksLab delivers high-quality academic and advanced technical
            solutions with precision, integrity, and an unwavering commitment
            to exceptional results for every client we serve.
          </p>

          <ul className="mt-10 space-y-6">
            {[
              "Premium quality guaranteed",
              "Strict on-time delivery",
              "24/7 dedicated client support",
              "Transparent & competitive pricing",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-4 text-slate-300 group"
              >
                <span className="flex items-center justify-center 
                                 w-10 h-10 rounded-2xl 
                                 bg-white/5 border border-white/10
                                 group-hover:border-blue-500/40
                                 transition-all duration-300">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                </span>

                <span className="text-base font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT GLASS CARD */}
        <div className="relative">
          <div className="backdrop-blur-xl 
                          bg-white/5 
                          border border-white/10 
                          rounded-3xl 
                          p-12 text-center
                          hover:border-blue-500/40
                          hover:shadow-[0_0_60px_rgba(59,130,246,0.15)]
                          transition-all duration-500">

            <h3 className="text-6xl font-extrabold 
                           bg-gradient-to-r from-blue-400 to-indigo-400 
                           bg-clip-text text-transparent">
              5+
            </h3>

            <p className="mt-4 text-lg font-medium text-white">
              Years of Excellence
            </p>

            <div className="mt-6 h-[2px] w-16 mx-auto 
                            bg-gradient-to-r from-blue-500 to-indigo-500 
                            rounded-full" />

            <p className="mt-6 text-slate-400 text-sm leading-relaxed">
              Delivering consistent, reliable, and results-driven solutions
              trusted by clients worldwide.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}