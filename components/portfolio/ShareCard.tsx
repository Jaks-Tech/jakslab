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
    <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] p-8 text-center hover:border-blue-500/40 transition-all duration-500">
      {/* Ambient Glow */}
      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <div className="w-[400px] h-[400px] bg-blue-600/10 blur-[160px] rounded-full" />
      </div>

      <h3 className="text-lg font-bold text-white">
        Share This Article
      </h3>

      <div className="mt-3 mb-8 h-1 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto" />

      <div className="flex justify-center gap-6">
        <button
          onClick={shareTwitter}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-blue-500/40 hover:text-blue-400 transition-all duration-300"
        >
          <Twitter size={18} strokeWidth={1.8} />
        </button>

        <button
          onClick={shareFacebook}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-blue-500/40 hover:text-blue-400 transition-all duration-300"
        >
          <Facebook size={18} strokeWidth={1.8} />
        </button>

        <button
          onClick={handleCopy}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-blue-500/40 hover:text-blue-400 transition-all duration-300"
        >
          <LinkIcon size={18} strokeWidth={1.8} />
        </button>
      </div>

      <p className="text-xs text-slate-500 mt-6">
        {copied
          ? "Link copied to clipboard!"
          : "Help others discover this content"}
      </p>
    </div>
  );
}