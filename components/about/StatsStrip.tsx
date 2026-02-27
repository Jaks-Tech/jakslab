import {
  Users,
  FileCheck,
  Smile,
  TrendingUp,
} from "lucide-react";

export function StatsStrip() {
  const stats = [
    {
      label: "Expert Writers",
      value: "50+",
      icon: Users,
    },
    {
      label: "Projects Completed",
      value: "500+",
      icon: FileCheck,
    },
    {
      label: "Happy Clients",
      value: "300+",
      icon: Smile,
    },
    {
      label: "Client Satisfaction",
      value: "98%",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <div className="w-[700px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-[1100px] mx-auto px-8 lg:px-12">
        <div className="rounded-3xl p-10 lg:p-14 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="group">
                {/* Icon */}
                <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-blue-400 transition-all duration-300 group-hover:border-blue-500/40 group-hover:scale-110">
                  <stat.icon className="w-6 h-6" />
                </div>

                {/* Value */}
                <h4 className="mt-6 text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.value}
                </h4>

                {/* Divider */}
                <div className="h-1 w-10 mx-auto mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full group-hover:w-16 transition-all duration-300" />

                {/* Label */}
                <p className="mt-4 text-slate-400 font-medium text-sm tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}