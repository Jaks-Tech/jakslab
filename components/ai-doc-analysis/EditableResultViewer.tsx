"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  sessionId: string;
  content: string;
  onSaved?: (value: string) => void;
  onClear: () => void;
};

export default function EditableResultViewer({
  sessionId,
  content,
  onSaved,
  onClear,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(content);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Ref to capture clean rendered text
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  async function handleCopy() {
    try {
      // Use displayRef to get clean text, fallback to draft if editing
      const textToCopy = isEditing ? draft : (displayRef.current?.innerText || draft);
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      const res = await fetch("/api/ai-doc-analysis/update-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, content: draft }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setIsEditing(false);
      onSaved?.(draft);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl relative overflow-hidden min-h-[600px]">


            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/5 pb-6">
            <h3 className="text-xl sm:text-2xl text-white font-bold tracking-tight">
                Research Plan
            </h3>

            {/* Button container: wraps on mobile, stays in line on desktop */}
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none text-[12px] sm:text-sm border border-white/10 px-3 sm:px-4 py-2 rounded-xl text-slate-300 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                {copied ? "✅ Copied" : "📋 Copy"}
                </button>

                {!isEditing ? (
                <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 sm:flex-none text-[12px] sm:text-sm border border-white/10 px-3 sm:px-4 py-2 rounded-xl text-slate-300 hover:bg-white/10 transition-all text-center"
                >
                    ✏️ Edit
                </button>
                ) : (
                <div className="flex flex-1 sm:flex-none gap-2">
                    <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 text-[12px] sm:text-sm px-3 sm:px-4 py-2 border border-white/10 rounded-xl text-slate-400"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 text-[12px] sm:text-sm bg-blue-600 hover:bg-blue-500 px-4 sm:px-5 py-2 rounded-xl text-white font-bold transition-all"
                    >
                    {saving ? "..." : "💾 Save"}
                    </button>
                </div>
                )}

                <button
                onClick={onClear}
                className="flex-1 sm:flex-none text-[12px] sm:text-sm border border-red-500/30 px-3 sm:px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-center"
                >
                Clear
                </button>
            </div>
            </div>

      <div className="relative">
        {isEditing ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            className="w-full min-h-[500px] bg-black/40 border border-white/10 rounded-2xl p-6 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-sm leading-relaxed resize-none custom-scrollbar"
          />
        ) : (
          <div 
            ref={displayRef}
            className="prose prose-invert max-w-none 
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
              prose-li:text-slate-300 prose-li:mb-2
              prose-strong:text-blue-400 prose-strong:font-semibold
              prose-code:text-pink-400 prose-code:bg-pink-400/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
              prose-hr:border-white/10
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500/50 prose-blockquote:bg-blue-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}