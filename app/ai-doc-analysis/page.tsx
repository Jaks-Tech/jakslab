"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Trash2, 
  BrainCircuit, 
  LineChart,
  ShieldAlert
} from "lucide-react";

// Components
import PlannerHeader from "@/components/ai-doc-analysis/PlannerHeader";
import TopicInput from "@/components/ai-doc-analysis/TopicInput";
import EditableResultViewer from "@/components/ai-doc-analysis/EditableResultViewer";
import ResearchChat from "@/components/ai-doc-analysis/ResearchChat";
import ChatMessages from "@/components/ai-doc-analysis/ChatMessages";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ResearchPlannerPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [plan, setPlan] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function handleNewPlan(newSessionId: string, result: string) {
    setSessionId(newSessionId);
    setPlan(result);
    setMessages([]); 
  }

  function handleFollowUp(answer: string) {
    setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
  }

  function handlePlanSaved(updated: string) {
    setPlan(updated);
  }

  function confirmClear() {
    setSessionId(null);
    setPlan("");
    setMessages([]);
    setIsConfirmOpen(false);
  }

  return (
    <div className="min-h-screen bg-transparent text-zinc-300 font-sans selection:bg-indigo-500/30">
      
      {/* 1. TOP NAVIGATION / BREADCRUMBS */}
      <nav className="sticky top-0 z-60 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-10 h-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Minimalist Logo for Navbar */}
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              <span>Intelligence</span>
              <span className="text-zinc-800">/</span>
              <span className={sessionId ? "text-zinc-500" : "text-indigo-400"}>Research Planner</span>
            </div>
          </div>

          {sessionId && (
            <button 
              onClick={() => setIsConfirmOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/10 bg-red-500/5 text-red-400 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-red-500/20"
            >
              <Trash2 size={12} />
              Reset Session
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
        
        {/* 2. INITIAL STATE: TOPIC SELECTION */}
        {!sessionId ? (
          <div className="flex flex-col items-center">
            
            {/* HERO BRANDING WITH ROUND LOGO */}
            <div className="relative mb-10 group">
              {/* Background Glow behind logo */}
              <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
              <div className="relative p-1 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/10">
                <img 
                  src="/research.png" 
                  alt="Organization Logo" 
                  className="h-24 w-24 rounded-full object-cover shadow-2xl"
                />
              </div>
            </div>

            <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Sparkles size={12} /> Neural Research Engine
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-6 leading-[1.1]">
                Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Knowledge Base</span>
              </h1>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed font-medium">
                Our autonomous agents synthesize complex data into actionable research roadmaps in seconds.
              </p>
            </div>
            
            <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 duration-700">
              <TopicInput onResult={handleNewPlan} />
            </div>

            {/* SaaS Trust Footer */}
            <div className="mt-24 flex flex-wrap justify-center gap-8 opacity-30 grayscale contrast-125">
              <div className="flex items-center gap-2 font-bold uppercase tracking-tighter"><LineChart size={16}/> Real-time Analytics</div>
              <div className="flex items-center gap-2 font-bold uppercase tracking-tighter"><BrainCircuit size={16}/> Vector Processing</div>
              <div className="flex items-center gap-2 font-bold uppercase tracking-tighter"><ShieldAlert size={16}/> ISO 27001 Secure</div>
            </div>
          </div>
        ) : (
          /* 3. ACTIVE STATE: ANALYSIS CANVAS */
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <EditableResultViewer
              key={sessionId}
              sessionId={sessionId}
              content={plan}
              onSaved={handlePlanSaved}
              onClear={() => setIsConfirmOpen(true)}
            />

            <div className="relative pt-12 border-t border-white/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#09090b] px-4">
                 <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Interactive Analysis</span>
              </div>

              {messages.length > 0 && (
                <div className="mb-10">
                  <ChatMessages messages={messages} />
                </div>
              )}

              <div className="sticky bottom-8 z-40">
                <ResearchChat
                  sessionId={sessionId}
                  onReply={handleFollowUp}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- SaaS CLEAR MODAL --- */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl animate-in fade-in" onClick={() => setIsConfirmOpen(false)} />
          <div className="relative bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full animate-in zoom-in-95">
            <h3 className="text-2xl font-bold text-white mb-3">Terminate Session?</h3>
            <p className="text-zinc-400 mb-8 text-sm">All generated research milestones for this session will be permanently erased from your workspace.</p>
            <div className="flex flex-col gap-3">
              <button onClick={confirmClear} className="w-full py-4 text-sm font-bold bg-red-600 text-white rounded-2xl hover:bg-red-500 transition-all">Clear All Data</button>
              <button onClick={() => setIsConfirmOpen(false)} className="w-full py-4 text-sm font-bold text-zinc-400 hover:text-white transition-colors">Keep Research</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}