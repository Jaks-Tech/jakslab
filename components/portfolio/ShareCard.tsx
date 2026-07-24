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
    <div className="border border-slate-300 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-950">Share this article</h2>
      <div className="mt-5 flex gap-3">
        <button
          onClick={shareTwitter}
          className="grid size-10 place-items-center rounded-full border border-slate-400 bg-white text-slate-800 transition hover:border-slate-900"
          aria-label="Share on X"
        >
          <Twitter size={18} strokeWidth={1.8} />
        </button>

        <button
          onClick={shareFacebook}
          className="grid size-10 place-items-center rounded-full border border-slate-400 bg-white text-slate-800 transition hover:border-slate-900"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} strokeWidth={1.8} />
        </button>

        <button
          onClick={handleCopy}
          className="grid size-10 place-items-center rounded-full border border-slate-400 bg-white text-slate-800 transition hover:border-slate-900"
          aria-label="Copy article link"
        >
          <LinkIcon size={18} strokeWidth={1.8} />
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-600">
        {copied
          ? "Link copied."
          : "Share or copy the link."}
      </p>
    </div>
  );
}
