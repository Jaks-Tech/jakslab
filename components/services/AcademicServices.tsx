"use client";

import {
  PenTool,
  FileText,
  BookOpen,
  Search,
  GraduationCap,
  ClipboardList,
  FileCheck,
  Presentation,
  ScrollText,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  { 
    icon: PenTool, 
    title: "Essay Writing", 
    desc: "Custom-crafted essays tailored to your specific prompts. We focus on critical arguments, logical flow, and academic rigor across all disciplines.", 
    price: "From $25",
    cta: "Start Writing"
  },
  { 
    icon: FileText, 
    title: "Research Papers", 
    desc: "In-depth investigative papers featuring evidence-based analysis and exhaustive data synthesis from peer-reviewed, credible academic sources.", 
    price: "From $75",
    cta: "Order Paper"
  },
  { 
    icon: BookOpen, 
    title: "Formatting & Editing", 
    desc: "Precision alignment with APA, MLA, Chicago, or Harvard styles. We refine your citations and structure to ensure technical perfection.", 
    price: "From $15",
    cta: "Refine Work"
  },
  { 
    icon: Search, 
    title: "Case Studies", 
    desc: "Detailed analytical reports focusing on real-world scenarios. We apply theoretical frameworks to practical problems for actionable insights.", 
    price: "From $50",
    cta: "Analyze Now"
  },
  { 
    icon: GraduationCap, 
    title: "Thesis & Dissertation", 
    desc: "End-to-end guidance for your capstone projects. From proposal development to final defense preparation, we ensure your research stands out.", 
    price: "Custom",
    cta: "Consult Expert"
  },
  { 
    icon: ScrollText, 
    title: "Literature Reviews", 
    desc: "Comprehensive synthesis of existing scholarly works. We identify research gaps and provide a critical roadmap for your own academic inquiry.", 
    price: "From $60",
    cta: "Explore Research"
  },
  { 
    icon: ClipboardList, 
    title: "Lab Reports", 
    desc: "Scientific documentation featuring precise methodology, data visualization, and professional interpretation of experimental results.", 
    price: "From $35",
    cta: "Document Lab"
  },
  { 
    icon: FileCheck, 
    title: "Proofreading & Plagiarism", 
    desc: "Advanced grammar checks and AI-driven originality verification to protect your academic integrity and ensure a polished final voice.", 
    price: "From $20",
    cta: "Check Scan"
  },
  { 
    icon: Presentation, 
    title: "Academic Slides", 
    desc: "Professional, high-impact PowerPoint decks. We turn complex data into visual stories that effectively communicate your findings to any panel.", 
    price: "From $30",
    cta: "Design Deck"
  },
];

export function AcademicServices() {
  return (
    <>
      {/* 1. Header Section - Centered with Top Spacing */}
      <div className="relative pt-10 flex flex-col items-center text-center px-4 mb-16">
        <div className="inline-flex px-4 py-1 mb-4 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-full backdrop-blur-sm">
          Academic Support
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Professional Academic Services
        </h2>
        <p className="mt-4 text-slate-400 text-lg max-w-2xl">
          High-quality, well-structured academic work tailored to meet 
          rigorous university standards and strict deadlines.
        </p>
      </div>

      {/* 2. SaaS Pillar Grid (No outer wrap) */}
      <div className="relative w-full max-w-[1400px] mx-auto px-6 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-white/[0.03] border border-white/10 p-8 rounded-3xl flex flex-col transition-all duration-500 hover:bg-white/[0.07] hover:border-blue-500/30"
            >
              {/* Top: Icon & Heading - Centered */}
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-blue-400 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Middle: Expanded Description - Centered to match header */}
              <div className="flex-grow text-center">
                <p className="text-slate-400 leading-relaxed text-sm md:text-base mb-6">
                  {service.desc}
                </p>
              </div>

              {/* Bottom: Price & CTA Row */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                <div className="text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Starting At</span>
                  <span className="text-white font-bold">{service.price}</span>
                </div>
                
                <Link 
                  href="/contact"
                  className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-400 hover:text-white transition-colors group/link"
                >
                  {service.cta}
                  <div className="w-7 h-7 rounded-full border border-blue-500/20 flex items-center justify-center group-hover/link:bg-blue-600 group-hover/link:border-blue-600 transition-all">
                    <span className="text-sm">→</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}