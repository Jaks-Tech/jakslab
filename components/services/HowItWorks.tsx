"use client";

import { useState, useEffect } from "react";

export function HowItWorks() {
  const steps = [
    {
      title: "Submit Request",
      description: "Tell us about your project requirements and goals through our contact form.",
    },
    {
      title: "Receive Quote",
      description: "We review your request and provide a clear timeline and pricing.",
    },
    {
      title: "Work Begins",
      description: "Our team starts building your solution with regular updates.",
    },
    {
      title: "Project Delivery",
      description: "Receive the completed project, polished and ready to use.",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    /* CHANGED: Switched bg-gradient to bg-transparent */
    <section className="relative py-20 bg-transparent overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 mb-5 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-full backdrop-blur-sm">
            Simple Process
          </div>

          <h2 className="text-4xl font-bold text-white">
            How It Works
          </h2>

          <p className="mt-5 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A streamlined process designed to deliver quality, clarity, and speed.
          </p>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid relative grid-cols-4 gap-10">

          {/* Connector Line: Changed to semi-transparent white */}
          <div className="absolute top-16 left-0 w-full h-[1px] bg-white/10"></div>

          {steps.map((step, i) => {
            const isActive = active === i;

            return (
              <div
                key={i}
                /* CHANGED: 
                   - bg-white -> bg-white/5 
                   - Added backdrop-blur-md 
                   - border-slate-200 -> border-white/10
                */
                className={`relative bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border
                  transition-all duration-500
                  ${
                    isActive
                      ? "shadow-[0_0_30px_rgba(59,130,246,0.2)] -translate-y-3 scale-105 border-blue-500/50"
                      : "shadow-md border-white/10"
                  }`}
              >
                <div
                  className={`relative z-10 mx-auto w-16 h-16 rounded-full 
                  flex items-center justify-center font-semibold text-lg shadow-md
                  transition-all duration-500
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-110"
                      : "bg-white/10 text-slate-300 border border-white/10"
                  }`}
                >
                  {i + 1}
                </div>

                <h3 className={`mt-6 text-lg font-semibold transition-colors duration-500 ${isActive ? 'text-white' : 'text-slate-200'}`}>
                  {step.title}
                </h3>

                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
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
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 
                                text-white p-10 rounded-3xl shadow-2xl text-center">

                  <div className="mx-auto w-16 h-16 rounded-full 
                                  bg-blue-600 flex items-center justify-center 
                                  font-semibold text-lg mb-6 shadow-lg shadow-blue-500/30">
                    {i + 1}
                  </div>

                  <h3 className="text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-slate-300 text-sm leading-relaxed">
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
                      ? "bg-blue-500 w-8"
                      : "bg-white/20"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}