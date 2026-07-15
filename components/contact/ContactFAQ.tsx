"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How quickly will I receive a quote?",
    a: "You’ll receive a detailed quote immediately you submit your request.",
  },
  {
    q: "Are revisions included?",
    a: "Yes - we include free revisions to ensure you're completely satisfied.",
  },
  {
    q: "Is my information confidential?",
    a: "Absolutely. Your information is handled with 100% confidentiality and security.",
  },
  {
    q: "Do you offer rush services?",
    a: "Yes, rush services are available upon request depending on availability.",
  },
];

export function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="relative w-full p-5 sm:p-8 rounded-2xl bg-white/[0.035] backdrop-blur-xl border border-white/10">
      <h3 className="text-2xl font-semibold text-white mb-9">
        Common questions
      </h3>

      <div className="space-y-6">
        {faqs.map((faq, i) => {
          const isOpen = open === i;

          return (
            <div
              key={i}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 hover:border-blue-500/40 transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-center justify-between p-6">
                <h4 className="text-white font-medium text-lg">
                  {faq.q}
                </h4>

                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-blue-400"
                >
                  <span className="text-xl leading-none">+</span>
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>
    </div>
  );
}
