"use client";

import { useState, useRef, useEffect } from "react";

type Props = {
  onResult: (sessionId: string, result: string) => void;
};

export default function TopicInput({ onResult }: Props) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle auto-expanding height
  useEffect(() => {
    if (!mounted) return;
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = textarea.scrollHeight;
      // Scrollable after 400px
      if (newHeight <= 400) {
        textarea.style.height = `${newHeight}px`;
        textarea.style.overflowY = "hidden";
      } else {
        textarea.style.height = "400px";
        textarea.style.overflowY = "auto";
      }
    }
  }, [topic, mounted]);

  async function handleSubmit() {
    if (!topic.trim() || loading) return;

    try {
      setLoading(true);
      const res = await fetch("/api/ai-doc-analysis/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to start session");

      // Sending result to parent Page.tsx
      // Once this is called, Page.tsx updates sessionId, 
      // which causes TopicInput to be unmounted and ResultViewer to show.
      onResult(data.sessionId, data.result);
      
    } catch (error) {
      console.error("Submission error:", error);
      setLoading(false); // Only reset loading if there's an error so the button stays disabled during transition
    }
  }

  if (!mounted) return <div className="min-h-[300px] animate-pulse bg-white/5 rounded-[2.5rem]" />;

  const suggestions = [
    "Impact of AI on Modern Healthcare",
    "Zero-Knowledge Proofs in Blockchain",
    "Sustainable Urban Architecture",
  ];

  return (
    <div className="group relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 sm:p-10 transition-all hover:border-blue-500/40 overflow-hidden">
      <div className="mb-8 px-2">
        <h3 className="text-2xl font-bold text-white tracking-tight">Research Engine</h3>
        <p className="text-slate-400 text-sm mt-1">Define your objective to build a strategic roadmap.</p>
      </div>

      <div className="relative px-2">
        <textarea
          ref={textareaRef}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a research topic..."
          className="w-full min-h-[140px] rounded-2xl border border-white/10 bg-black/40 p-6 pl-8 text-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none custom-scrollbar leading-relaxed"
        />

        {!topic && (
          <div className="mt-8 space-y-4 animate-in fade-in duration-500">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">Suggestions</p>
            <div className="flex flex-wrap gap-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setTopic(s)}
                  className="text-xs px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:bg-blue-500/10 hover:text-blue-300 transition-all active:scale-95"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-between border-t border-white/5 pt-8 px-2">
        <div className="flex gap-4 items-center">
            <span className={`flex h-2 w-2 rounded-full ${loading ? 'bg-yellow-500 animate-spin' : 'bg-blue-500 animate-pulse'}`} />
            <span className="text-xs text-slate-500 font-medium">
              {loading ? "Generating Plan..." : "Ready for input"}
            </span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !topic.trim()}
          className="relative w-full sm:w-auto px-10 py-4 rounded-2xl font-bold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          {loading ? "Processing..." : "Analyze Topic"}
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
            background: rgba(255, 255, 255, 0.1); 
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
        }
      `}</style>
    </div>
  );
}