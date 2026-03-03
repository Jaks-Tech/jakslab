"use client";

import { Code, Globe, BarChart, Cpu, Database, Plug } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const techServices = [
  { 
    icon: Code, 
    title: "Programming Assignments", 
    desc: "Expert-level solutions in Java, Python, and C++. We provide clean, documented code with a focus on algorithm optimization and performance metrics.", 
    price: "From $40",
    cta: "Start Coding"
  },
  { 
    icon: Globe, 
    title: "Website Development", 
    desc: "High-performance, responsive web applications built with modern stacks. From custom dashboards to full-scale SaaS platforms and e-commerce.", 
    price: "From $299",
    cta: "Build Site"
  },
  { 
    icon: Cpu, 
    title: "Machine Learning", 
    desc: "Custom AI model development and predictive analytics. We handle the full pipeline from data preprocessing to architectural design and training.", 
    price: "Custom",
    cta: "Develop AI"
  },
  { 
    icon: Database, 
    title: "Model Optimization", 
    desc: "Fine-tuning and hyperparameter optimization for existing models. We improve accuracy and reduce latency for production-ready deployments.", 
    price: "Custom",
    cta: "Optimize Now"
  },
  { 
    icon: Plug, 
    title: "API & Integrations", 
    desc: "Secure third-party API connectivity and workflow automation. We build robust bridges between your systems to streamline business logic.", 
    price: "Custom",
    cta: "Connect Apps"
  },
  { 
    icon: BarChart, 
    title: "Technical Reports", 
    desc: "Professional documentation and research summaries. We translate complex technical data into clear, actionable executive insights.", 
    price: "From $70",
    cta: "Order Report"
  },
];

export function TechServices() {
  return (
    <>
      {/* 1. Header Section - Centered with Top Spacing */}
      <div className="relative pt-10 flex flex-col items-center text-center px-4 mb-5">
        <div className="inline-flex px-4 py-1 mb-4 text-sm font-medium text-indigo-300 bg-indigo-900/30 border border-indigo-500/20 rounded-full backdrop-blur-sm">
          Technical Expertise
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          High-Quality Technical Services
        </h2>
        <p className="mt-4 text-slate-400 text-lg max-w-2xl">
          From academic programming to advanced AI systems, we deliver 
          reliable, scalable, and professionally engineered solutions.
        </p>
      </div>

      {/* 2. SaaS Pillar Grid (No outer wrap) */}
      <div className="relative w-full max-w-[1400px] mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-white/[0.03] border border-white/10 p-8 rounded-3xl flex flex-col transition-all duration-500 hover:bg-white/[0.07] hover:border-indigo-500/30"
            >
              {/* Top: Icon & Heading - Centered */}
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-indigo-400 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Middle: Expanded Description - Centered */}
              <div className="flex-grow text-center">
                <p className="text-slate-400 leading-relaxed text-sm md:text-base mb-6">
                  {service.desc}
                </p>
              </div>

              {/* Bottom: Price & CTA Row */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                <div className="text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">Starting At</span>
                  <span className="text-white font-bold">{service.price}</span>
                </div>
                
                <Link 
                  href="/contact"
                  className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-indigo-400 hover:text-white transition-colors group/link"
                >
                  {service.cta}
                  <div className="w-7 h-7 rounded-full border border-indigo-500/20 flex items-center justify-center group-hover/link:bg-indigo-600 group-hover/link:border-indigo-600 transition-all">
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