"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

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
    <section className="relative py-28 px-6 overflow-hidden">

      {/* SAME background system as Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 -z-10" />
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      <div className="relative max-w-4xl mx-auto p-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl">

        <h3 className="text-3xl font-bold text-slate-800 mb-12 text-center">
          Frequently Asked Questions
        </h3>

        <div className="space-y-6">
          {faqs.map((faq, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white/80 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className="flex items-center justify-between p-6">
                  <h4 className="text-slate-800 font-medium text-lg">
                    {faq.q}
                  </h4>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-slate-500"
                  >
                    <Plus size={20} />
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
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isOpen && (
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-b-2xl" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}