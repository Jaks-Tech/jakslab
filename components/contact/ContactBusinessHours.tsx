"use client";

import { Clock, Globe, ShieldCheck, Zap } from "lucide-react";

export function ContactBusinessHours() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 text-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 -z-10" />
      <div className="absolute top-[-80px] sm:top-[-120px] left-1/2 -translate-x-1/2 
                      w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] 
                      bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-100px] sm:bottom-[-150px] right-[-80px] sm:right-[-150px] 
                      w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] 
                      bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      <div className="relative max-w-4xl mx-auto 
                      p-6 sm:p-10 lg:p-12 
                      rounded-3xl bg-white/80 backdrop-blur-xl 
                      border border-white/40 shadow-2xl">

        {/* Title */}
        <h4 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Business Hours
        </h4>

        {/* Availability */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-800 leading-relaxed">
          Available{" "}
          <span className="inline-block px-3 sm:px-4 py-1.5 rounded-full 
                           bg-gradient-to-r from-blue-600 to-indigo-600 
                           text-white text-xs sm:text-sm font-semibold shadow-md">
            24/7
          </span>{" "}
          - Remote Services Worldwide.
        </p>

        {/* Feature Grid */}
        <div className="mt-10 sm:mt-14 
                        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                        gap-5 sm:gap-8 text-left">

          {/* Feature Card */}
          {[
            {
              icon: Clock,
              title: "24/7 Availability",
              desc: "Submit requests anytime - we’re always online.",
              color: "text-blue-600",
            },
            {
              icon: Zap,
              title: "Fast Response",
              desc: "Quick turnaround on quotes and communication.",
              color: "text-indigo-600",
            },
            {
              icon: ShieldCheck,
              title: "Secure & Confidential",
              desc: "Your information and files remain protected.",
              color: "text-green-600",
            },
            {
              icon: Globe,
              title: "Global Service",
              desc: "Serving students and professionals worldwide.",
              color: "text-blue-500",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-3 sm:gap-4 
                         p-4 sm:p-5 rounded-2xl 
                         bg-white/70 border border-slate-200 
                         shadow-sm hover:shadow-lg 
                         transition-all duration-300 
                         hover:-translate-y-1"
            >
              <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color} mt-1`} />

              <div>
                <h5 className="font-semibold text-slate-900 text-sm sm:text-base">
                  {feature.title}
                </h5>

                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}