"use client";

import { useState } from "react";
import { Twitter, Facebook, Link as LinkIcon } from "lucide-react";

export default function ShareCard() {
  const [copied, setCopied] = useState(false);

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareTwitter = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(
      `https://twitter.com/intent/tweet?url=${url}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center">

      <h3 className="text-lg font-bold text-slate-900">
        Share This Article
      </h3>

      <div className="mt-2 mb-8 h-1 w-16 bg-blue-600 rounded-full mx-auto" />

        <div className="flex justify-center gap-6">

        <button
            onClick={shareTwitter}
            className="p-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition"
        >
            <Twitter size={18} strokeWidth={1.8} />
        </button>

        <button
            onClick={shareFacebook}
            className="p-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition"
        >
            <Facebook size={18} strokeWidth={1.8} />
        </button>

        <button
            onClick={handleCopy}
            className="p-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition"
        >
            <LinkIcon size={18} strokeWidth={1.8} />
        </button>

        </div>

      <p className="text-xs text-slate-400 mt-6">
        {copied ? "Link copied to clipboard!" : "Help others discover this content"}
      </p>
    </div>
  );
}