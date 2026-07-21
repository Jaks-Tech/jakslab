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
    <section className="relative mx-auto w-full max-w-3xl">
      <h3 className="mb-7 text-center text-2xl font-semibold text-white">
        FQAs...?
      </h3>

      <div className="border-t border-white/10">
        {faqs.map((faq, i) => {
          const isOpen = open === i;

          return (
            <div
              key={i}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group cursor-pointer overflow-hidden border-b border-white/10"
            >
              <div className="flex items-center justify-between py-5">
                <h4 className="pr-5 text-base font-medium text-white sm:text-lg">
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
                    <div className="pb-5 pr-10 leading-relaxed text-slate-400">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>
    </section>
  );
}
