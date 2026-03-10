"use client";

import { useState } from "react";
import { User, Bot, Copy, Check, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
};

export default function ChatMessages({ messages }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 px-2 sm:px-0 pb-10">
      {messages.map((m, i) => {
        const isUser = m.role === "user";
        
        return (
          <div
            key={i}
            className={`flex w-full gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
              isUser ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* SaaS Avatar Style */}
            <div className="flex-shrink-0">
              <div className={`h-9 w-9 sm:h-11 sm:w-11 rounded-2xl flex items-center justify-center border backdrop-blur-sm transition-all duration-300 ${
                isUser 
                  ? "bg-white/5 border-white/10 text-zinc-400" 
                  : "bg-blue-600/10 border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/5"
              }`}>
                {isUser ? <User size={18} /> : <Bot size={20} />}
              </div>
            </div>

            {/* Message Bubble: Glassmorphism */}
            <div className={`relative group w-full lg:max-w-[80%] px-5 sm:px-7 py-5 rounded-[2rem] border backdrop-blur-md transition-all ${
              isUser
                ? "bg-white/[0.04] border-white/10 text-zinc-100 rounded-tr-none shadow-xl shadow-black/5"
                : "bg-blue-500/[0.03] border-white/5 text-zinc-300 rounded-tl-none"
            }`}>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    {isUser ? "Client Terminal" : "Neural Response"}
                  </span>
                  {!isUser && (
                    <Sparkles size={10} className="text-blue-500/50" />
                  )}
                </div>

                {/* Inline Copy Button for AI */}
                {!isUser && (
                  <button 
                    onClick={() => copyToClipboard(m.content, i)}
                    className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-lg border border-transparent hover:border-white/10"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === i ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} className="text-zinc-600 hover:text-zinc-400" />
                    )}
                  </button>
                )}
              </div>

              <div className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap selection:bg-blue-500/30 font-medium tracking-tight">
                {m.content}
              </div>

              {/* Timestamp or Footer (Optional SaaS detail) */}
              {!isUser && (
                <div className="mt-4 pt-4 border-t border-white/[0.03] flex items-center justify-between">
                  <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold">
                    Verified Context
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}