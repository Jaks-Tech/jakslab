"use client";

import { ShieldCheck, Cpu, Globe, Plus } from "lucide-react";
import DocAI from "@/components/products/DocAI";
import ResearchPlannerCard from "@/components/products/ResearchPlannerCard";
import CitationHelperCard from "@/components/products/CitationHelperCard";

// Updated registry with the new Citation Synthesis module
const TOOLS_REGISTRY = [
  { id: "doc-ai", component: <DocAI /> },
  { id: "research-planner", component: <ResearchPlannerCard /> },
  { id: "citation-helper", component: <CitationHelperCard /> },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-transparent text-zinc-400 selection:bg-cyan-500/30">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-20">
        <div className="flex flex-col items-center text-center">
          
          {/* Logo Container - Maintained prominent size */}
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

      {/* Modules Grid - 2 Column Layout */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Active Tools */}
          {TOOLS_REGISTRY.map((tool) => (
            <div key={tool.id} className="h-full animate-in fade-in slide-in-from-bottom-6 duration-700">
              {tool.component}
            </div>
          ))}

          {/* Minimal Coming Soon State - Fills the 4th slot */}
          <div className="group relative flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/[0.01] p-8 min-h-[300px] transition-all hover:bg-white/[0.03] hover:border-white/20">
            <div className="p-3 rounded-full bg-zinc-900/50 border border-white/5 text-zinc-600 group-hover:text-zinc-400 transition-colors">
              <Plus size={20} strokeWidth={1.5} />
            </div>
            <div className="mt-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 group-hover:text-zinc-500">
                New Module Pending
              </p>
              <p className="text-[9px] text-zinc-800 mt-1 font-mono">Expansion_Node_0x4F</p>
            </div>
          </div>
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