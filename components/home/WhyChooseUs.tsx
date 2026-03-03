"use client";

import {
  Lock,
  Calendar,
  Users,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const reasons = [
  {
    icon: Lock,
    title: "100% Confidential",
    desc: "Your projects and data are handled with complete privacy and discretion. We prioritize your intellectual property above all else.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Calendar,
    title: "On-Time Delivery",
    desc: "We respect deadlines and deliver precisely when promised. Our workflow is optimized to handle urgent academic and technical requirements.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Specialists across academic and technical disciplines. You work with engineers and researchers who are masters of their specific crafts.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    desc: "Every project undergoes thorough review and refinement. We ensure all outputs meet or exceed professional and university standards.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

interface WhyChooseUsProps {
  spacing?: string;        // outer vertical spacing
  headerSpacing?: string;  // space below header
  contentSpacing?: string; // bottom spacing of content
}

export default function WhyChooseUs({
  spacing = "py-1",
  headerSpacing = "mb-1",
  contentSpacing = "pb-1",
}: WhyChooseUsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reasons.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextStep = () =>
    setActiveIndex((prev) => (prev + 1) % reasons.length);
  const prevStep = () =>
    setActiveIndex((prev) => (prev - 1 + reasons.length) % reasons.length);

  return (
    <div className={`w-full ${spacing}`}>
      {/* Header */}
      <div
        className={`flex flex-col items-center text-center px-4 ${headerSpacing}`}
      >
        <div className="inline-flex px-4 py-1 mb-4 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-full backdrop-blur-sm">
          Our Values
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Why Choose JaksLab
        </h2>

        <p className="mt-4 text-slate-400 text-lg max-w-2xl">
          We combine precision, professionalism, and reliability to deliver
          exceptional results every time.
        </p>
      </div>

      {/* Desktop Grid */}
      <div
        className={`hidden lg:grid relative w-full max-w-[1400px] mx-auto px-6 ${contentSpacing} grid-cols-4 gap-6`}
      >
        {reasons.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-white/[0.03] border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-500 hover:bg-white/[0.07] hover:border-blue-500/30"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${r.bg} border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}
              >
                <Icon className={`w-7 h-7 ${r.color}`} />
              </div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {r.title}
              </h3>

              <p className="text-slate-400 leading-relaxed text-sm">
                {r.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Slider */}
      <div
        className={`lg:hidden relative w-full px-6 ${contentSpacing} flex flex-col items-center`}
      >
        <div className="relative w-full min-h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full max-w-sm bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center"
            >
              <div
                className={`w-20 h-20 rounded-2xl ${reasons[activeIndex].bg} border border-white/10 flex items-center justify-center mb-6 shadow-lg`}
              >
                {(() => {
                  const Icon = reasons[activeIndex].icon;
                  return (
                    <Icon
                      className={`w-10 h-10 ${reasons[activeIndex].color}`}
                    />
                  );
                })()}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {reasons[activeIndex].title}
              </h3>

              <p className="text-slate-400 text-base leading-relaxed">
                {reasons[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-6 mt-6">
          <button
            onClick={prevStep}
            className="p-3 rounded-full border border-white/10 bg-white/5 text-white active:scale-95 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-2">
            {reasons.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-8 bg-blue-500" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            className="p-3 rounded-full border border-white/10 bg-white/5 text-white active:scale-95 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}