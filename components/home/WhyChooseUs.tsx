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
    <section className="py-5 px-4 sm:px-6 relative bg-transparent">

      <div className="max-w-[1400px] mx-auto">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why Choose JaksLab
          </h2>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
            We combine precision, professionalism, and reliability to deliver exceptional results every time.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group relative p-10 rounded-3xl 
                         bg-white/5 backdrop-blur-xl
                         border border-white/10
                         hover:border-blue-500/40
                         hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]
                         transition-all duration-500
                         text-center flex flex-col items-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl 
                              bg-gradient-to-br from-blue-500/20 to-indigo-500/20
                              flex items-center justify-center 
                              mb-8 
                              group-hover:scale-110 transition duration-300">
                <r.icon className="w-7 h-7 text-blue-400" />
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-white">
                {r.title}
              </h4>

              {/* Description */}
              <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}