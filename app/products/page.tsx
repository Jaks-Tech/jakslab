"use client";

import { ShieldCheck, Cpu, Globe, Plus } from "lucide-react";
import DocAI from "@/components/products/DocAI";
import ResearchPlannerCard from "@/components/products/ResearchPlannerCard";
import CitationHelperCard from "@/components/products/CitationHelperCard";
import LiteratureReviewCard from "@/components/products/LiteratureReviewCard"; // New Module

const TOOLS_REGISTRY = [
  { id: "doc-ai", component: <DocAI /> },
  { id: "research-planner", component: <ResearchPlannerCard /> },
  { id: "citation-helper", component: <CitationHelperCard /> },
  { id: "literature-review", component: <LiteratureReviewCard /> }, // Added 4th Module
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-transparent text-zinc-400 selection:bg-cyan-500/30">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-20">
        <div className="flex flex-col items-center text-center">
          
          <div className="relative mb-10 animate-in fade-in zoom-in duration-1000">
             <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-full blur-2xl opacity-50" />
             <div className="relative p-1 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-950 border border-white/10 shadow-2xl">
                <img 
                  src="/jakslab.png" 
                  alt="Logo" 
                  className="h-24 w-24 rounded-full object-cover" 
                />
             </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6 leading-tight">
            System <span className="text-zinc-500">Modules</span>
          </h1>
          <p className="text-zinc-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Enterprise-grade AI utilities engineered for deep document 
            analysis, strategic planning, and academic synthesis.
          </p>
        </div>
      </section>

      {/* Modules Grid - Now a perfect 4-item grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {TOOLS_REGISTRY.map((tool) => (
            <div key={tool.id} className="h-full animate-in fade-in slide-in-from-bottom-6 duration-700">
              {tool.component}
            </div>
          ))}
        </div>

        {/* Subtle Trust Bar Footer */}
        <footer className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-between items-center gap-6">
          <div className="flex gap-8">
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
              <ShieldCheck size={14} className="text-zinc-700"/> ISO_SECURE
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
              <Cpu size={14} className="text-zinc-700"/> NEURAL_ENGINE
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
              <Globe size={14} className="text-zinc-700"/> GLOBAL_NODE
            </div>
          </div>
          <div className="text-[9px] font-mono text-zinc-800 tracking-tighter">
            © 2026 JAKSLAB_RESOURCES.SYS
          </div>
        </footer>
      </section>
    </div>
  );
}