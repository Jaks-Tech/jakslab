"use client";
import { useRef } from "react";

export function ContactOrbit() {
  const scene = useRef<HTMLDivElement>(null);
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = scene.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--contact-ry", `${((event.clientX - rect.left) / rect.width - .5) * 20}deg`);
    node.style.setProperty("--contact-rx", `${((event.clientY - rect.top) / rect.height - .5) * -14}deg`);
  };
  const reset = () => { scene.current?.style.setProperty("--contact-ry", "0deg"); scene.current?.style.setProperty("--contact-rx", "0deg"); };
  return <div ref={scene} onPointerMove={move} onPointerLeave={reset} className="contact-orbit-scene relative h-[330px] w-full [perspective:1000px]" aria-hidden="true"><div className="contact-orbit-stage absolute inset-0 [transform-style:preserve-3d]"><div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-[#08182b]/80 shadow-[0_0_70px_rgba(37,99,235,.25)] backdrop-blur-xl" /><div className="contact-ring contact-ring-one absolute left-1/2 top-1/2 h-64 w-64 rounded-full border border-blue-300/25" /><div className="contact-ring contact-ring-two absolute left-1/2 top-1/2 h-48 w-72 rounded-full border border-indigo-300/20" /><div className="contact-node contact-node-one">Brief</div><div className="contact-node contact-node-two">Reply</div><div className="contact-node contact-node-three">Plan</div></div></div>;
}
