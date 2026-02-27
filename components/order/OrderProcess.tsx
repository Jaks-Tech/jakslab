"use client";

import { useState, useEffect } from "react";
import { FileText, MessageCircle, Settings, CheckCircle } from "lucide-react";
import Link from 'next/link';
const steps = [
  {
    icon: FileText,
    title: "1. We Review Your Submission",
    desc: "Our team carefully analyzes your requirements and attached files.",
  },
  {
    icon: MessageCircle,
    title: "2. You Receive a Personalized Quote",
    desc: "We contact you with pricing, timeline, and clarification if needed.",
  },
  {
    icon: Settings,
    title: "3. Work Begins",
    desc: "Once confirmed, our experts begin working on your project.",
  },
  {
    icon: CheckCircle,
    title: "4. Delivery & Revisions",
    desc: "You receive the final work with free revisions if necessary.",
  },
];

export function OrderProcess() {
  const [active, setActive] = useState(0);

  // Auto rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 flex justify-center -z-10">
        <div className="w-full max-w-5xl h-full bg-blue-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
        {/* Header */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            What Happens After You <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Submit?</span>
          </h2>

          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We follow a structured and transparent process to ensure
            quality, speed, and complete satisfaction.
          </p>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid mt-20 grid-cols-4 gap-10">
          {steps.map((step, index) => {
            const isActive = active === index;

            return (
              <div
                key={index}
                className={`group p-10 rounded-3xl transition-all duration-500 backdrop-blur-xl border
                  ${
                    isActive
                      ? "bg-white/10 border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.2)] scale-105"
                      : "bg-white/5 border-white/10 hover:border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                  }`}
              >
                <div className="flex justify-center mb-6">
                  <step.icon
                    size={36}
                    className={`transition-colors duration-300 ${isActive ? "text-blue-400" : "text-white/70"}`}
                  />
                </div>

                <h4 className="text-lg font-semibold text-white">
                  {step.title}
                </h4>

                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* MOBILE SLIDER */}
        <div className="md:hidden mt-16 relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {steps.map((step, index) => (
              <div key={index} className="min-w-full px-4">
                <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                  <div className="flex justify-center mb-6">
                    <step.icon size={36} className="text-blue-400" />
                  </div>

                  <h4 className="text-lg font-semibold text-white">
                    {step.title}
                  </h4>

                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all duration-300
                  ${active === index
                    ? "w-8 bg-gradient-to-r from-blue-600 to-indigo-600"
                    : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>

          {/* Secondary Action */}
        <div className="mt-16">
          <Link 
            href="/contact"
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          >
            Have Questions? Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}