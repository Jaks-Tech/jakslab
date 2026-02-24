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
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[400px] sm:w-[700px] h-[350px] sm:h-[500px] bg-blue-500/10 blur-[100px] sm:blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold bg-blue-100 text-blue-700 rounded-full mb-5 sm:mb-6">
            What We Stand For
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Our Core Values
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
            The principles that guide our work, shape our culture,
            and define the quality of service we deliver.
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 text-center">
          {values.map((value, i) => (
            <div
              key={i}
              className="group relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl backdrop-blur-xl bg-white/70 border border-white/40 shadow-md hover:shadow-xl sm:hover:shadow-2xl sm:hover:-translate-y-2 transition-all duration-500 flex flex-col items-center"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              {/* Title */}
              <h4 className="mt-5 sm:mt-6 text-lg sm:text-xl font-bold text-slate-900">
                {value.title}
              </h4>

              {/* Description */}
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xs">
                {value.desc}
              </p>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 mx-auto h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}