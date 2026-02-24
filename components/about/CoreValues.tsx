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
    <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-8 lg:px-12">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full mb-6">
            What We Stand For
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900">
            Our Core Values
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            The principles that guide our work, shape our culture,
            and define the quality of service we deliver.
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {values.map((value, i) => (
            <div
              key={i}
              className="group relative p-10 rounded-3xl backdrop-blur-xl bg-white/70 border border-white/40 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-7 h-7" />
              </div>

              {/* Title */}
              <h4 className="mt-6 text-xl font-bold text-slate-900">
                {value.title}
              </h4>

              {/* Description */}
              <p className="mt-4 text-slate-600 leading-relaxed">
                {value.desc}
              </p>

              {/* Subtle Hover Accent Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}