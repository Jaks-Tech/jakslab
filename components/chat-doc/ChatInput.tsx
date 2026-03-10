"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, Command } from "lucide-react";

type Props = {
  documentId: string;
  onAnswer: (question: string, answer: string) => void;
};

export default function ChatInput({ documentId, onAnswer }: Props) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [question]);

  async function handleAsk() {
    if (!question.trim() || loading) return;

    setLoading(true);
    const currentQuestion = question;
    setQuestion(""); // Clear immediately for better UX

    try {
      const res = await fetch("/api/chat-doc/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId, question: currentQuestion }),
      });

      const data = await res.json();

      if (!data.success) {
        setQuestion(currentQuestion); // Restore question on fail
        alert(data.error || "Something went wrong");
        return;
      }

      onAnswer(currentQuestion, data.answer);
    } catch (err) {
      console.error(err);
      setQuestion(currentQuestion);
      alert("Error asking question");
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      <div className="relative group">
        {/* Animated ambient glow when focused */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-700" />

        <div className="relative flex items-end gap-2 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2 transition-all focus-within:border-white/20 shadow-2xl">
          
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask the AI anything..."
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-zinc-500 py-3 pl-4 pr-12 resize-none max-h-48 text-sm sm:text-base leading-relaxed scrollbar-hide"
            />
            
            {/* Visual Sparkle (SaaS touch) */}
            <div className="absolute left-0 -top-6 flex items-center gap-1.5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500">
              <Sparkles size={12} className="text-blue-400" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">AI Context Active</span>
            </div>
          </div>

          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl transition-all duration-300 shadow-lg
              ${loading || !question.trim() 
                ? "bg-zinc-800 text-zinc-600 scale-95" 
                : "bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 active:scale-90"
              }
            `}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Footer info for desktop */}
        <div className="hidden sm:flex items-center justify-between mt-3 px-2">
          <div className="flex items-center gap-4 text-[10px] font-medium text-zinc-600">
            <span className="flex items-center gap-1 uppercase tracking-widest">
              <Command size={10} /> + Enter to send
            </span>
            <span className="flex items-center gap-1 uppercase tracking-widest">
              Shift + Enter for new line
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}