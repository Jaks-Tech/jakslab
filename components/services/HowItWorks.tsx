"use client";

import { useState, useEffect } from "react";

export function HowItWorks() {
  const steps = [
    {
      title: "Submit Request",
      description:
        "Tell us about your project requirements and goals through our contact form.",
    },
    {
      title: "Receive Quote",
      description:
        "We review your request and provide a clear timeline and pricing.",
    },
    {
      title: "Work Begins",
      description:
        "Our team starts building your solution with regular updates.",
    },
    {
      title: "Project Delivery",
      description:
        "Receive the completed project, polished and ready to use.",
    },
  ];

  const [active, setActive] = useState(0);

  // Auto rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-5 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 mb-5 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            Simple Process
          </div>

          <h2 className="text-4xl font-bold text-slate-900">
            How It Works
          </h2>

          <p className="mt-5 text-lg text-slate-800 max-w-2xl mx-auto leading-relaxed">
            A streamlined process designed to deliver quality, clarity, and speed.
          </p>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid relative grid-cols-4 gap-10">

          {/* Connector Line */}
          <div className="absolute top-10 left-0 w-full h-[2px] bg-slate-200"></div>

          {steps.map((step, i) => {
            const isActive = active === i;

            return (
              <div
                key={i}
                className={`relative bg-white rounded-2xl p-8 text-center
                  transition-all duration-500
                  ${
                    isActive
                      ? "shadow-2xl -translate-y-3 scale-105"
                      : "shadow-md"
                  }`}
              >
                <div
                  className={`relative z-10 mx-auto w-16 h-16 rounded-full 
                  flex items-center justify-center font-semibold text-lg shadow-md
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                      : "bg-slate-200 text-slate-800"
                  }`}
                >
                  {i + 1}
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm text-slate-800 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* MOBILE SLIDER */}
        <div className="md:hidden mt-10">

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {steps.map((step, i) => (
              <div key={i} className="min-w-full px-2">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 
                                text-white p-10 rounded-3xl shadow-2xl text-center">

                  <div className="mx-auto w-16 h-16 rounded-full 
                                  bg-white/20 flex items-center justify-center 
                                  font-semibold text-lg mb-6">
                    {i + 1}
                  </div>

                  <h3 className="text-lg font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-blue-100 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300
                  ${
                    active === i
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