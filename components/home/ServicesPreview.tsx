"use client";

import {
  PenTool,
  Search,
  Globe,
  Code,
  FileText,
  Database,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    icon: PenTool,
    title: "Essay Writing",
    price: "$99+",
    desc: "Compelling, well-structured academic essays crafted with analytical depth and focused on clear, persuasive arguments.",
    cta: "Start Writing",
  },
  {
    icon: Search,
    title: "Research Papers",
    price: "$149+",
    desc: "In-depth investigative research utilizing peer-reviewed sources and proper citations (APA, MLA, Harvard, etc.).",
    cta: "Order Paper",
  },
  {
    icon: Code,
    title: "Programming Help",
    price: "$259+",
    desc: "Professional debugging, algorithm optimization, and clean-code implementation across Java, Python, C++, and more.",
    cta: "Get Help",
  },
  {
    icon: Globe,
    title: "Web Development",
    price: "$299+",
    desc: "Custom modern websites and full-stack applications engineered for speed, responsiveness, and seamless user experience.",
    cta: "Build App",
  },
  {
    icon: FileText,
    title: "Technical Reports",
    price: "$179+",
    desc: "Structured professional documentation and analysis reports designed for technical clarity and executive decision-making.",
    cta: "Order Report",
  },
  {
    icon: Database,
    title: "Final Year Projects",
    price: "$399+",
    desc: "Complete end-to-end project implementation, including architecture design, coding, and comprehensive documentation.",
    cta: "Start Project",
  },
];

export default function ServicesPreview() {
  return (
    <>
      {/* 1. Header Section - Centered with Top Spacing */}
      <div className="relative pt-2 flex flex-col items-center text-center px-2 mb-16">
        <div className="inline-flex px-2 py-1 mb-2 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-full backdrop-blur-sm">
          Core Expertise
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Our Core Services
        </h2>
        <p className="mt-4 text-slate-400 text-lg max-w-2xl">
          Comprehensive academic and technical solutions engineered for 
          precision, scalability, and excellence.
        </p>
      </div>

      {/* 2. SaaS Pillar Grid */}
      <div className="relative w-full max-w-[1400px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.1, 
                  ease: "easeOut" 
                }}
                viewport={{ once: true }}
                className="group relative bg-white/[0.03] border border-white/10 p-8 rounded-3xl flex flex-col transition-all duration-500 hover:bg-white/[0.07] hover:border-blue-500/30"
              >
                {/* Top: Icon & Heading - Centered */}
                <div className="mb-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                    <Icon className="w-6 h-6 text-blue-400 group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {s.title}
                  </h3>
                </div>

                {/* Middle: Description - Centered */}
                <div className="flex-grow text-center">
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base mb-6">
                    {s.desc}
                  </p>
                </div>

                {/* Bottom: Price & CTA Row */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div className="text-left">
                    <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">
                      Starting At
                    </span>
                    <span className="text-white font-bold">{s.price}</span>
                  </div>
                  
                  <Link 
                    href="/contact"
                    className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-400 hover:text-white transition-colors group/link"
                  >
                    {s.cta}
                    <div className="w-7 h-7 rounded-full border border-blue-500/20 flex items-center justify-center group-hover/link:bg-blue-600 group-hover/link:border-blue-600 transition-all">
                      <span className="text-sm">→</span>
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center
                       px-12 py-4 rounded-full
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-bold text-lg
                       shadow-lg hover:shadow-blue-600/25
                       hover:-translate-y-1 transition-all duration-300"
          >
            View All Services
          </Link>
        </div>
      </div>
    </>
  );
}