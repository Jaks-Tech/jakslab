"use client";

import { Code, Globe, BarChart, Cpu, Database, Plug } from "lucide-react";
import Link from "next/link";

const techServices = [
  { icon: Code, title: "Programming Assignments", desc: "Java, Python, C++, debugging, optimization & performance improvements.", price: "From $40" },
  { icon: Globe, title: "Website Development", desc: "Modern responsive websites, dashboards & full-stack applications.", price: "From $299" },
  { icon: Cpu, title: "Machine Learning Solutions", desc: "Model development, training, evaluation & AI-powered systems.", price: "Custom Pricing" },
  { icon: Database, title: "Model Training & Optimization", desc: "Dataset preparation, hyperparameter tuning & deployment pipelines.", price: "Custom Pricing" },
  { icon: Plug, title: "API & Service Integration", desc: "Secure third-party API integrations & workflow automation.", price: "Custom Pricing" },
  { icon: BarChart, title: "Technical Reports", desc: "Professional documentation, research summaries & analysis reports.", price: "From $70" },
];

export function TechServices() {
  return (
    /* CHANGED: Removed bg-gradient and set to bg-transparent to let the 3D scene shine through */
    <section className="relative py-16 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <div className="inline-flex justify-center px-4 py-1 mb-4 text-sm font-medium text-indigo-300 bg-indigo-900/30 border border-indigo-500/20 rounded-full backdrop-blur-sm">
            Technical Expertise
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            High-Quality Technical Services
          </h2>

          <p className="mt-4 text-slate-300 text-lg">
            From academic programming to advanced AI systems, we deliver 
            reliable, scalable, and professionally engineered solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {techServices.map((service, i) => (
            <div
              key={i}
              /* CHANGED: 
                 - Switched to bg-white/5 + backdrop-blur for a tech-focused glass look
                 - border-white/10 for sharp contrast on dark background
              */
              className="group bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 
                         shadow-sm hover:shadow-indigo-500/10 hover:-translate-y-3 
                         transition-all duration-300 text-center flex flex-col items-center"
            >
              {/* Icon - Using Indigo accents to differentiate from Academic services */}
              <div className="w-14 h-14 rounded-2xl 
                              bg-indigo-600/20 border border-indigo-500/20
                              flex items-center justify-center mb-6
                              group-hover:scale-110 group-hover:bg-indigo-600/30 transition-all duration-300">
                <service.icon className="text-indigo-400 w-7 h-7" />
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-white">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-sm text-slate-400 mt-3 leading-relaxed max-w-xs">
                {service.desc}
              </p>

              {/* Price + CTA */}
              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="text-indigo-400 font-semibold text-lg">
                  {service.price}
                </span>

                <Link
                  href="/contact"
                  className="text-sm font-medium text-slate-400 
                             group-hover:text-indigo-400 transition-colors"
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