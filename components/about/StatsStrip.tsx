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
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-[1100px] mx-auto px-8 lg:px-12">

        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-xl p-10 lg:p-14">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="group">

                {/* Icon */}
                <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>

                {/* Value */}
                <h4 className="mt-6 text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {stat.value}
                </h4>

                {/* Divider */}
                <div className="h-1 w-10 mx-auto mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover:w-16 transition-all duration-300" />

                {/* Label */}
                <p className="mt-4 text-slate-600 font-medium text-sm tracking-wide uppercase">
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