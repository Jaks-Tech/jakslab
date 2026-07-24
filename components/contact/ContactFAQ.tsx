"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "Should I book a call or send an enquiry?",
    a: "Book a 30-minute call for Content Marketing. For Technology, Development, Research or Academic Work, use the enquiry form or request the service directly.",
  },
  {
    q: "What can I send for Content Marketing work?",
    a: "You can share product documentation, Confluence pages, reports, presentations, support questions or access to people who understand the subject.",
  },
  {
    q: "Do I need to have an existing blog?",
    a: "No. We can improve an existing blog or help add and organize an articles section when the website does not have one.",
  },
  {
    q: "What should I include in a technical or academic request?",
    a: "Describe the expected result, current material, technical requirements, required standard and deadline. Attachments can be shared after we reply.",
  },
  {
    q: "Is my information confidential?",
    a: "Yes. Your enquiry, documents and project information are treated as confidential.",
  },
];

export function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative w-full">
      <h2 className="mb-7 text-center text-2xl font-semibold text-slate-950">Frequently asked questions</h2>
      <div className="border-t border-slate-300">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div
              key={faq.q}
              className="group cursor-pointer overflow-hidden border-b border-slate-300"
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <div className="flex items-center justify-between py-5">
                <h3 className="pr-5 text-base font-medium text-slate-950 sm:text-lg">{faq.q}</h3>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl leading-none text-slate-700"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pr-10 leading-relaxed text-slate-700">{faq.a}</div>
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
