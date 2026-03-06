"use client";

import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { inputClasses } from "./styles";
import AIAnalyzeButton from "./AIAnalyzeButton";

type ProjectDescriptionProps = {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};

export default function ProjectDescription({
  description,
  setDescription,
}: ProjectDescriptionProps) {
  const [proposedVersion, setProposedVersion] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Optional plain-text cleanup for inserting into textarea
  const stripMarkdownToPlainText = (text: string) => {
    return text
      .replace(/^#{1,6}\s+/gm, "") // headings
      .replace(/\*\*(.*?)\*\*/g, "$1") // bold
      .replace(/\*(.*?)\*/g, "$1") // italic
      .replace(/`{1,3}([^`]+)`{1,3}/g, "$1") // inline code
      .replace(/^\s*[-*+]\s+/gm, "• ") // bullet lists
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // links
      .trim();
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [description]);

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <h3 className="text-xl font-semibold text-white">Project Description</h3>
      </div>

      <div className="flex flex-col gap-3">
        <textarea
          ref={textareaRef}
          required
          placeholder="Describe your project goals and timeline..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClasses} w-full resize-none overflow-hidden min-h-[150px] transition-[height] duration-200`}
        />

        <div className="flex justify-start">
          <AIAnalyzeButton
            description={description}
            onAnalysisReceived={(val) => setProposedVersion(val)}
          />
        </div>
      </div>

      {proposedVersion && (
        <div className="mt-4 p-5 rounded-xl border border-purple-500/20 bg-purple-900/10 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-purple-400 font-bold text-xs uppercase tracking-widest">
              AI Suggestion
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setProposedVersion("")}
                className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 text-white rounded border border-white/10"
              >
                Discard
              </button>

              <button
                type="button"
                onClick={() => {
                  setDescription(stripMarkdownToPlainText(proposedVersion));
                  setProposedVersion("");
                }}
                className="px-3 py-1 text-xs bg-purple-600 hover:bg-purple-500 text-white rounded"
              >
                Accept & Replace
              </button>
            </div>
          </div>

          <div className="prose prose-invert prose-sm max-w-none text-gray-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {proposedVersion}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </section>
  );
}