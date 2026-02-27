"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Globe, ShieldCheck, Zap, ChevronDown } from "lucide-react";

export function ContactBusinessHours() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Clickable Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group w-full flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 rounded-2xl bg-blue-600/20 text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <Clock size={28} />
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-white">View Business Hours & Global Coverage</h4>
              <p className="text-sm md:text-base text-slate-400 mt-1">Available 24/7 for remote services worldwide</p>
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0, y: isOpen ? 10 : 20 }}
            initial={{ y: 20 }}
            transition={{ duration: 0.3 }}
            className="text-slate-500 group-hover:text-blue-400 mt-2"
          >
            <ChevronDown size={32} />
          </motion.div>
        </button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 24 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: Clock,
                      title: "24/7 Availability",
                      desc: "Submit requests anytime - we’re always online.",
                    },
                    {
                      icon: Zap,
                      title: "Fast Response",
                      desc: "Quick turnaround on quotes and communication.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Secure & Private",
                      desc: "Your information and files remain protected.",
                    },
                    {
                      icon: Globe,
                      title: "Global Service",
                      desc: "Serving students and professionals worldwide.",
                    },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-blue-500/30"
                    >
                      <feature.icon className="w-7 h-7 text-blue-400" />
                      <div>
                        <h5 className="font-semibold text-white text-base">
                          {feature.title}
                        </h5>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Status Indicator */}
                <div className="mt-10 pt-10 border-t border-white/5 flex justify-center">
                  <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-600/10 border border-blue-500/20">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                    </span>
                    <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">System Status: Fully Operational</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}