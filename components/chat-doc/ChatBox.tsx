"use client";

import { useState } from "react";
import { Trash2, FileText, Sparkles, User, Bot, Copy, Check } from "lucide-react";
import ChatInput from "./ChatInput";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  documentId: string;
  onReset: () => void;
};

export default function ChatBox({ documentId, onReset }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleAnswer = (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
      { role: "assistant", content: answer },
    ]);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-transparent text-zinc-300 selection:bg-blue-500/30">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/10 backdrop-blur-xl">
        <div className="w-full px-4 sm:px-6 lg:max-w-5xl lg:mx-auto flex items-center justify-between py-4">
          
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-white">Document Analysis</h2>
              <p className="text-[10px] text-zinc-500 font-mono uppercase">
                ID: {documentId.slice(0, 8)}
              </p>
            </div>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-medium hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </header>

      {/* Messages */}
      <main className="w-full px-4 sm:px-6 lg:max-w-5xl lg:mx-auto py-8 space-y-6">

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 opacity-40 text-center">
            <Sparkles className="w-12 h-12 mb-4 text-blue-400" />
            <p className="text-lg font-medium">
              Start a conversation to analyze the file.
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 sm:gap-5 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >

              {/* Avatar */}
              <div className="flex-shrink-0">
                <div
                  className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center border ${
                    msg.role === "user"
                      ? "bg-white/5 border-white/10"
                      : "bg-blue-600/10 border-blue-500/30"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} className="text-blue-400" />
                  )}
                </div>
              </div>

              {/* Message Bubble */}
              <div
                className={`relative group w-full sm:max-w-[85%] px-4 py-4 rounded-2xl border backdrop-blur-md ${
                  msg.role === "user"
                    ? "bg-white/[0.03] border-white/10 text-zinc-100"
                    : "bg-blue-500/[0.02] border-white/5 text-zinc-300"
                }`}
              >

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {msg.role === "user" ? "You" : "AI Intelligence"}
                  </span>

                  {msg.role === "assistant" && (
                    <button
                      onClick={() => copyToClipboard(msg.content, idx)}
                      className="p-1 hover:bg-white/10 rounded transition"
                    >
                      {copiedIndex === idx ? (
                        <Check size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} className="text-zinc-500" />
                      )}
                    </button>
                  )}
                </div>

                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Input */}
      <footer className="sticky bottom-0 w-full bg-gradient-to-t from-black/40 via-black/20 to-transparent pt-8 pb-6">
        <div className="w-full px-4 sm:px-6 lg:max-w-4xl lg:mx-auto">
          <ChatInput documentId={documentId} onAnswer={handleAnswer} />

          <p className="mt-4 text-center text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-semibold opacity-60">
            Secure Neural Engine • 2026
          </p>
        </div>
      </footer>
    </div>
  );
}