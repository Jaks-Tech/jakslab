"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  { title: "Programming Help", price: "$259+", desc: "Debugging, algorithms and clean implementation across modern languages.", cta: "Get Help" },
  { title: "Web Development", price: "$299+", desc: "Responsive websites and full-stack applications built for real users.", cta: "Build App" },
  { title: "Technical Reports", price: "$179+", desc: "Professional documentation and analysis written with technical clarity.", cta: "Order Report" },
  { title: "Final Year Projects", price: "$399+", desc: "End-to-end support spanning architecture, development and documentation.", cta: "Start Project" },
];

export default function ServicesEditorial() {
  return (
    <div className="relative mx-auto grid w-full max-w-[1400px] gap-9 sm:gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-400">What we do</p>
        <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight text-white sm:mt-5 sm:text-4xl md:text-5xl">Support for ambitious work.</h2>
        <p className="mt-4 max-w-md text-base leading-7 text-slate-400 sm:mt-6 sm:text-lg sm:leading-8">Academic, research and technical expertise - all in one place.</p>
        <Link href="/services" className="group mt-6 inline-flex items-center gap-3 text-sm font-bold text-white sm:mt-9">
          Explore all services
          <ArrowUpRight className="h-4 w-4 text-blue-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="border-t border-white/15">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
            className="group grid grid-cols-[2rem_1fr] gap-x-3 gap-y-4 border-b border-white/15 py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-6 sm:py-9"
          >
            <span className="font-mono text-xs text-slate-600">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-blue-300 sm:text-2xl">{service.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-3 sm:text-base sm:leading-7">{service.desc}</p>
            </div>
            <div className="col-start-2 flex items-center justify-between gap-5 sm:col-start-auto sm:flex-col sm:items-end">
              <span className="whitespace-nowrap text-xs font-semibold text-slate-300 sm:text-sm">From {service.price}</span>
              <Link href="/contact" aria-label={`${service.cta}: ${service.title}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-blue-400 transition group-hover:border-blue-500/50 group-hover:bg-blue-600 group-hover:text-white sm:h-10 sm:w-10">
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
