"use client";

import { useState, useRef, useEffect } from "react";

type Props = {
  sessionId: string;
  onReply: (reply: string) => void;
};

export default function ResearchChat({ sessionId, onReply }: Props) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
    }
  }, [question]);

  async function askQuestion() {
    if (!question.trim() || loading) return;

    try {
      setLoading(true);
      const res = await fetch("/api/ai-doc-analysis/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, question }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      onReply(data.answer);
      setQuestion("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-12 group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 sm:p-8 transition-all hover:border-blue-500/30">
      <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
        Refine Strategy
      </h3>

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a follow-up question to refine the research..."
          className="w-full min-h-[100px] max-h-[300px] rounded-2xl border border-white/10 bg-black/40 p-5 pl-6 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none custom-scrollbar leading-relaxed"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              askQuestion();
            }
          }}
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
          Press Enter to ask
        </p>
        <button
          onClick={askQuestion}
          disabled={loading || !question.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-500/10"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Thinking...
            </>
          ) : (
            "Ask AI"
          )}
        </button>
      </div>
    </div>
  );
}