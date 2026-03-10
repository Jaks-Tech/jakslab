"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  result: string;
  onClear: () => void;
};

export default function ResultViewer({ result, onClear }: Props) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  async function handleCopy() {
    try {
      // Use standard API with fallback for broad compatibility
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(result);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = result;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  return (
    <div className="relative z-0 rounded-xl border border-white/10 bg-white/5 p-6 mt-10 shadow-lg">
      
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <h3 className="text-xl font-semibold text-white truncate mr-4">
          Research Plan
        </h3>

        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="text-sm px-4 py-2 rounded-lg border border-white/30 bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all flex items-center gap-2"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>

          <button
            onClick={onClear}
            className="text-sm px-4 py-2 rounded-lg border border-red-500/50 bg-red-500/10 text-red-200 hover:bg-red-500/20 active:scale-95 transition-all"
          >
            Clear
          </button>
        </div>
      </div>

      {/* HTML Rendering Container */}
      <div className="prose prose-invert max-w-none 
        prose-headings:text-white prose-headings:font-bold
        prose-p:text-slate-300 prose-p:leading-relaxed
        prose-li:text-slate-300
        prose-strong:text-blue-400
        prose-code:text-pink-400
        prose-hr:border-white/10
        prose-blockquote:border-blue-500/50 prose-blockquote:bg-blue-500/5 prose-blockquote:py-1 prose-blockquote:px-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {result}
        </ReactMarkdown>
      </div>
    </div>
  );
}