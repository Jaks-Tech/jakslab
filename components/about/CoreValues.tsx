import { ShieldCheck, Clock, Star } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Confidentiality",
    desc: "Your privacy and data security are handled with the highest level of protection and discretion.",
  },
  {
    icon: Clock,
    title: "Reliability",
    desc: "We honor every deadline with precision, consistency, and uncompromising quality.",
  },
  {
    icon: Star,
    title: "Excellence",
    desc: "Every project is executed with professional mastery and attention to detail.",
  },
];

export function CoreValues() {
  return (
    <section className="relative py-24 bg-transparent overflow-hidden">

      {/* Subtle Ambient Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none -z-10">
        <div className="w-[800px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">

          <span className="inline-block px-4 py-1.5 text-sm font-semibold 
                           bg-white/10 backdrop-blur 
                           border border-white/20 
                           text-blue-400 
                           rounded-full mb-6">
            What We Stand For
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Our Core Values
          </h2>

          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            The principles that guide our work, shape our culture,
            and define the quality of service we deliver.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-3 text-center">
          {values.map((value, i) => (
            <div
              key={i}
              className="group relative p-10 rounded-3xl 
                         bg-white/5 backdrop-blur-xl
                         border border-white/10
                         hover:border-blue-500/40
                         hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]
                         transition-all duration-500
                         flex flex-col items-center"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center 
                              rounded-2xl 
                              bg-gradient-to-br from-blue-500/20 to-indigo-500/20 
                              text-blue-400 
                              group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-7 h-7" />
              </div>

              {/* Title */}
              <h4 className="mt-6 text-xl font-bold text-white">
                {value.title}
              </h4>

              {/* Description */}
              <p className="mt-4 text-base text-slate-400 leading-relaxed max-w-xs">
                {value.desc}
              </p>

              {/* Bottom Accent Glow */}
              <div className="absolute bottom-0 left-0 right-0 mx-auto h-[2px] w-0 
                              bg-gradient-to-r from-blue-500 to-indigo-500 
                              rounded-full group-hover:w-full 
                              transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}