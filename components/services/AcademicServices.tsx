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

const services = [
  { icon: PenTool, title: "Essay Writing", desc: "Well-researched, structured, and academically sound essays.", price: "From $25" },
  { icon: FileText, title: "Research Papers", desc: "Comprehensive research papers with credible sources.", price: "From $75" },
  { icon: BookOpen, title: "Formatting & Editing", desc: "APA, MLA, Chicago formatting and professional editing.", price: "From $15" },
  { icon: Search, title: "Case Studies", desc: "In-depth analytical and structured case study reports.", price: "From $50" },
  { icon: GraduationCap, title: "Thesis & Dissertation", desc: "Undergraduate & postgraduate research guidance and writing.", price: "Custom Pricing" },
  { icon: ScrollText, title: "Literature Reviews", desc: "Critical and structured literature synthesis.", price: "From $60" },
  { icon: ClipboardList, title: "Lab Reports", desc: "Detailed scientific and technical lab documentation.", price: "From $35" },
  { icon: FileCheck, title: "Proofreading & Plagiarism Check", desc: "Grammar refinement and originality verification.", price: "From $20" },
  { icon: Presentation, title: "PowerPoint Presentations", desc: "Professional, well-designed academic slide decks.", price: "From $30" },
];

export function AcademicServices() {
  return (
    /* CHANGED: Removed bg-gradient (white/slate-50). Set to bg-transparent. */
    <section className="relative py-16 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex justify-center px-4 py-1 mb-4 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-full backdrop-blur-sm">
            Academic Support
          </div>

          {/* CHANGED: text-slate-900 -> text-white */}
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Professional Academic Services
          </h2>

          {/* CHANGED: text-slate-600 -> text-slate-300 */}
          <p className="mt-4 text-slate-300 text-lg">
            High-quality, well-structured academic work tailored to meet
            university standards and deadlines.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, i) => (
            <div
              key={i}
              /* CHANGED: 
                 - bg-white -> bg-white/5 (Glass effect)
                 - Added backdrop-blur-md
                 - border-slate-200 -> border-white/10
              */
              className="group bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 
                         shadow-sm hover:shadow-blue-500/10 hover:-translate-y-3 
                         transition-all duration-300 text-center flex flex-col items-center"
            >
              {/* Icon Wrapper */}
              <div className="w-14 h-14 rounded-2xl 
                              bg-blue-600/20 border border-blue-500/20
                              flex items-center justify-center mb-6
                              group-hover:scale-110 group-hover:bg-blue-600/30 transition-all duration-300">
                <service.icon className="text-blue-400 w-7 h-7" />
              </div>

              {/* Title: Changed to white */}
              <h4 className="text-lg font-semibold text-white">
                {service.title}
              </h4>

              {/* Description: Changed to light gray */}
              <p className="text-sm text-slate-400 mt-3 leading-relaxed max-w-xs">
                {service.desc}
              </p>

              {/* Price + CTA */}
              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="text-blue-400 font-semibold text-lg">
                  {service.price}
                </span>

                <Link
                  href="/contact"
                  className="text-sm font-medium text-slate-400 
                             group-hover:text-blue-400 transition-colors"
                >
                  Enquire →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}