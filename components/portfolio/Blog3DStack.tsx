"use client";

import { useRef } from "react";

export default function Blog3DStack() {
  const scene = useRef<HTMLDivElement>(null);

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = scene.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--blog-rotate-y", `${x * 24}deg`);
    node.style.setProperty("--blog-rotate-x", `${y * -18}deg`);
  };

  const reset = () => {
    scene.current?.style.setProperty("--blog-rotate-y", "0deg");
    scene.current?.style.setProperty("--blog-rotate-x", "0deg");
  };

  return (
    <div ref={scene} onPointerMove={move} onPointerLeave={reset} className="blog-stack-scene relative hidden h-80 [perspective:1000px] lg:block" aria-hidden="true">
      <div className="blog-stack-stage absolute inset-0 [transform-style:preserve-3d]">
        <div className="blog-sheet blog-sheet-back absolute left-16 top-12 h-52 w-40 rounded-xl border border-white/10 bg-[#091426]/90" />
        <div className="blog-sheet blog-sheet-middle absolute left-28 top-7 h-52 w-40 rounded-xl border border-indigo-300/10 bg-[#0a1629]/95 p-5 shadow-xl"><div className="h-1.5 w-12 rounded bg-indigo-300/20"/><div className="mt-8 space-y-3"><div className="h-1.5 w-full rounded bg-white/10"/><div className="h-1.5 w-3/4 rounded bg-white/10"/><div className="h-1.5 w-full rounded bg-white/10"/></div></div>
        <div className="blog-sheet blog-sheet-front absolute left-40 top-2 h-52 w-40 rounded-xl border border-blue-300/15 bg-[#0b172a]/95 p-5 shadow-[0_25px_60px_rgba(0,0,0,.45)]"><p className="text-[9px] tracking-[.18em] text-blue-300/60">JAKSLAB JOURNAL</p><div className="mt-9 h-2 w-20 rounded bg-white/20"/><div className="mt-5 space-y-3"><div className="h-1.5 w-full rounded bg-white/10"/><div className="h-1.5 w-4/5 rounded bg-white/10"/><div className="h-1.5 w-full rounded bg-white/10"/><div className="h-1.5 w-2/3 rounded bg-white/10"/></div></div>
        <div className="blog-orbit-dot blog-orbit-dot-one" />
        <div className="blog-orbit-dot blog-orbit-dot-two" />
      </div>
    </div>
  );
}
