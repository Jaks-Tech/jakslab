import { Lock, Calendar, Users, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Lock,
    title: "100% Confidential",
    desc: "Your projects and data are handled with complete privacy and discretion.",
  },
  {
    icon: Calendar,
    title: "On-Time Delivery",
    desc: "We respect deadlines and deliver precisely when promised.",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Specialists across academic and technical disciplines.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    desc: "Every project undergoes thorough review and refinement.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 sm:px-6 relative">
      
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-white -z-10" />

      <div className="max-w-[1400px] mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Why Choose JaksLab
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            We combine precision, professionalism, and reliability to deliver exceptional results every time.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group relative p-8 sm:p-10 rounded-3xl 
                         bg-white/70 backdrop-blur border border-slate-200 
                         shadow-sm hover:shadow-2xl hover:-translate-y-3 
                         transition-all duration-500 
                         text-center flex flex-col items-center"
            >
              {/* Gradient Hover Glow */}
              <div className="absolute inset-0 rounded-3xl 
                              bg-gradient-to-br from-blue-600/0 to-indigo-600/0 
                              group-hover:from-blue-600/5 
                              group-hover:to-indigo-600/10 
                              transition-all duration-500 
                              pointer-events-none" />

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl 
                              bg-gradient-to-br from-blue-100 to-indigo-100 
                              flex items-center justify-center 
                              mb-6 sm:mb-8 
                              group-hover:scale-110 transition duration-300">
                <r.icon className="w-7 h-7 text-blue-600" />
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-slate-900">
                {r.title}
              </h4>

              {/* Description */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xs">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}