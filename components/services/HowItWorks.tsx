"use client";

import { MessageSquare, Settings, ShieldCheck, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const steps = [
  {
    icon: MessageSquare,
    title: "1. Consultation",
    desc: "Share your project requirements via our secure enquiry form. We discuss your goals, technical constraints, and academic standards to align perfectly.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Settings,
    title: "2. Strategic Planning",
    desc: "Our experts draft a roadmap including technical architecture or research methodology, clear timelines, and a transparent quote tailored to your budget.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: ShieldCheck,
    title: "3. Precision Execution",
    desc: "Work begins with iterative updates. Every line of code or paragraph of research undergoes rigorous quality checks and plagiarism scanning.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Rocket,
    title: "4. Final Delivery",
    desc: "Receive your polished, high-performance solution. We provide a full walkthrough and support to ensure you are 100% satisfied with the results.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextStep = () => setActiveIndex((prev) => (prev + 1) % steps.length);
  const prevStep = () => setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);

  // Auto-transition logic: Switches cards every 4 seconds
  useEffect(() => {
    const autoPlay = setInterval(() => {
      nextStep();
    }, 4000);
    return () => clearInterval(autoPlay);
  }, [activeIndex]);

  return (
    <section id="how-it-works" className="relative scroll-mt-20 pt-2 pb-2 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center text-center px-4 mb-12 md:mb-16">
        <div className="inline-flex px-4 py-1 mb-4 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-full backdrop-blur-sm">
          The Process
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          How We Bring Your Vision to Life
        </h2>
      </div>

      {/* Desktop Layout (Standard Grid) */}
      <div className="hidden lg:grid relative w-full max-w-6xl mx-auto px-6 grid-cols-4 gap-8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-2xl ${step.bg} border border-white/10 flex items-center justify-center mb-6`}>
                <Icon className={`w-8 h-8 ${step.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Mobile & Tablet Layout (Auto-Transitioning Cards) */}
      <div className="lg:hidden relative w-full px-4 flex flex-col items-center">
        <div className="relative w-full min-h-[420px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-sm bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center"
            >
              {/* Icon Circle */}
              <div className={`w-20 h-20 rounded-2xl ${steps[activeIndex].bg} border border-white/10 flex items-center justify-center mb-6 shadow-lg`}>
                {(() => {
                  const StepIcon = steps[activeIndex].icon;
                  return <StepIcon className={`w-10 h-10 ${steps[activeIndex].color}`} />;
                })()}
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {steps[activeIndex].title}
              </h3>
              
              <p className="text-slate-400 text-base leading-relaxed">
                {steps[activeIndex].desc}
              </p>

              <div className="mt-6 text-[10px] font-bold tracking-widest text-blue-500/40 uppercase">
                Step {activeIndex + 1} of {steps.length}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-6 mt-8">
          <button 
            onClick={prevStep}
            className="p-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-8 bg-blue-600" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextStep}
            className="p-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}