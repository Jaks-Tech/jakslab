"use client";

import { useState, useEffect } from "react";
import { FileText, MessageCircle, Settings, CheckCircle } from "lucide-react";

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
    <section className="py-28 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">

        {/* Header */}
        <h2 className="text-4xl font-bold text-slate-900">
          What Happens After You Submit?
        </h2>

        <p className="mt-5 text-lg text-slate-800 max-w-2xl mx-auto leading-relaxed">
          We follow a structured and transparent process to ensure
          quality, speed, and complete satisfaction.
        </p>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid mt-20 grid-cols-4 gap-10">
          {steps.map((step, index) => {
            const isActive = active === index;

            return (
              <div
                key={index}
                className={`p-10 rounded-3xl border transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl scale-105"
                      : "bg-white border-slate-200 shadow-md"
                  }`}
              >
                <div className="flex justify-center mb-6">
                  <step.icon
                    size={36}
                    className={isActive ? "text-white" : "text-blue-600"}
                  />
                </div>

                <h4 className={`text-lg font-semibold ${isActive ? "text-white" : "text-slate-900"}`}>
                  {step.title}
                </h4>

                <p className={`mt-4 text-sm leading-relaxed ${isActive ? "text-blue-100" : "text-slate-800"}`}>
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
              <div
                key={index}
                className="min-w-full px-4"
              >
                <div className="p-10 rounded-3xl border bg-gradient-to-br 
                                from-blue-600 to-indigo-600 text-white shadow-2xl">

                  <div className="flex justify-center mb-6">
                    <step.icon size={36} className="text-white" />
                  </div>

                  <h4 className="text-lg font-semibold">
                    {step.title}
                  </h4>

                  <p className="mt-4 text-sm text-blue-100 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300
                  ${active === index
                    ? "bg-blue-600 scale-125"
                    : "bg-slate-300"
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}