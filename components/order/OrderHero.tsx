"use client";

import React, { useEffect, useState } from "react";

// --- Live Badge ---
function LiveBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs text-slate-400 font-medium tracking-wide mb-8 backdrop-blur-sm">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
      </span>
      Experts online now · avg. response 4 min
    </div>
  );
}

// --- Discount Badge ---
function DiscountBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-300 mt-8">
      First order?{" "}
      <span className="font-semibold text-white">10% off</span>{" "}
      with code{" "}
      <code className="bg-emerald-500/20 text-emerald-200 font-mono px-2 py-0.5 rounded text-xs tracking-widest">
        FIRST10
      </code>
    </div>
  );
}

// --- Word Rotator ---
const subjects = ["Essay", "Code", "Research", "Report", "Thesis", "Problem Set"];

function RotatingWord() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % subjects.length);
        setVisible(true);
      }, 300);
    }, 2200);

    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="inline-block min-w-[6ch] text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
      }}
    >
      {subjects[idx]}
    </span>
  );
}

// --- Main Hero ---
export function OrderHero() {
  return (
    <section className="relative py-24 px-6 text-center overflow-hidden bg-transparent">
      {/* Radial glow */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,189,248,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4">
        <LiveBadge />

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight">
          Get your <RotatingWord />
          <br />
          <span className="text-slate-400 font-light">done right.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Upload your brief, receive a personalized quote within minutes,
          and work with vetted experts who deliver on time - every time
        </p>

        <DiscountBadge />
      </div>
    </section>
  );
}
