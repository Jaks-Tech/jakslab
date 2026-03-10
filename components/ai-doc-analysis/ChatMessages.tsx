"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessages({ messages }: { messages: Message[] }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState("");
  
  // Use a collection of refs to target specific message bubbles
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (!messages.length) return null;

  async function handleCopy(index: number) {
    const element = messageRefs.current[index];
    if (element) {
      try {
        // .innerText captures only the visible text, removing #, *, etc.
        const cleanText = element.innerText;
        await navigator.clipboard.writeText(cleanText);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (err) {
        console.error("Copy failed", err);
      }
    }
  }

  function startEditing(index: number, content: string) {
    setEditingIndex(index);
    setEditDraft(content);
  }

  function saveEdit(index: number) {
    messages[index].content = editDraft;
    setEditingIndex(null);
  }

  return (
    <div className="mt-10 space-y-8">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`group relative flex flex-col ${
            msg.role === "user" ? "items-end" : "items-start"
          } animate-in fade-in slide-in-from-bottom-3 duration-500`}
        >
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 px-6">
            {msg.role === "user" ? "Researcher" : "Assistant Insight"}
          </span>

          <div
            className={`relative w-full max-w-3xl min-h-[120px] rounded-[2rem] border transition-all duration-300 ${
              msg.role === "user"
                ? "bg-blue-600/10 border-blue-500/20 text-blue-50 ml-auto"
                : "bg-white/5 border-white/10"
            }`}
          >
            {/* Toolbar - Persistent only during copy/edit feedback */}
            <div className="absolute -top-4 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={() => handleCopy(i)}
                className="px-4 py-1.5 bg-[#0a0a0a] border border-white/10 rounded-full text-[10px] font-bold text-slate-400 hover:text-white hover:border-blue-500/50 transition-all flex items-center gap-2 shadow-xl"
              >
                {copiedIndex === i ? "✅ COPIED TEXT" : "📋 COPY"}
              </button>
              
              {editingIndex !== i && (
                <button
                  onClick={() => startEditing(i, msg.content)}
                  className="px-4 py-1.5 bg-[#0a0a0a] border border-white/10 rounded-full text-[10px] font-bold text-slate-400 hover:text-white hover:border-blue-500/50 transition-all shadow-xl"
                >
                  ✏️ EDIT
                </button>
              )}
            </div>

            <div className="p-8">
              {editingIndex === i ? (
                <div className="flex flex-col gap-4">
                  <textarea
                    value={editDraft}
                    onChange={(e) => setEditDraft(e.target.value)}
                    autoFocus
                    className="w-full min-h-[200px] bg-black/40 border border-white/10 rounded-2xl p-6 text-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none custom-scrollbar leading-relaxed"
                  />
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => setEditingIndex(null)}
                      className="text-xs text-slate-500 hover:text-white font-medium"
                    >
                      Discard
                    </button>
                    <button 
                      onClick={() => saveEdit(i)}
                      className="text-xs bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl font-bold text-white transition-all active:scale-95"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                // Wrap in braces to ensure the function returns 'void'
                ref={(el) => { messageRefs.current[i] = el; }}
                className={`prose prose-invert max-w-none 
                prose-p:leading-relaxed prose-p:text-base
                prose-strong:text-blue-400
                prose-code:text-pink-400 prose-code:bg-pink-400/10 prose-code:px-1.5 prose-code:rounded
                ${msg.role === 'user' ? 'prose-p:text-blue-100/90' : 'prose-p:text-slate-300'}`}
                >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}