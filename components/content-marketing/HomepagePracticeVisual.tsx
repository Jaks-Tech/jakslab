"use client";

import { useEffect, useState } from "react";

const practices = [
  { title: "Content Marketing", caption: "Company knowledge becoming a useful article" },
  { title: "Technology & Development", caption: "Digital parts working as one product" },
  { title: "Research & Academic", caption: "Sources and evidence becoming a clear report" },
];

export function HomepagePracticeVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % practices.length), 4400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-transparent">
      <div className="flex flex-col gap-4 px-6 pb-2 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-slate-600">Our work in view</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">{practices[active].title}</h2>
        </div>
        <div className="flex gap-2">
          {practices.map((practice, index) => (
            <button key={practice.title} type="button" onClick={() => setActive(index)} aria-label={`Show ${practice.title}`} aria-pressed={active === index} className={`h-2 rounded-full transition-all duration-500 ${active === index ? "w-12 bg-[#202733]" : "w-5 bg-slate-300"}`} />
          ))}
        </div>
      </div>
      <figure className="pt-4 sm:pt-6">
        <svg key={active} viewBox="0 0 1100 430" role="img" aria-labelledby={`practice-title-${active} practice-desc-${active}`} className="homepage-svg-visual h-auto w-full">
          <title id={`practice-title-${active}`}>{practices[active].title}</title>
          <desc id={`practice-desc-${active}`}>{practices[active].caption}</desc>
          <rect x="1" y="1" width="1098" height="428" rx="26" fill="#fff" stroke="#94a3b8" />
          {active === 0 && <ContentDiagram />}
          {active === 1 && <TechnologyDiagram />}
          {active === 2 && <ResearchDiagram />}
        </svg>
        <figcaption className="mt-3 text-center text-sm text-slate-700">{practices[active].caption}</figcaption>
      </figure>
    </div>
  );
}

function MovingMarker({ path }: { path: string }) {
  return <circle r="7" fill="#1f2937" className="homepage-svg-marker"><animateMotion dur="2.8s" repeatCount="indefinite" path={path} /></circle>;
}

function ContentDiagram() {
  return (
    <>
      <rect x="78" y="78" width="190" height="68" rx="10" fill="#f3f4f2" stroke="#475569" />
      <path d="M105 100 H223 M105 120 H195" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
      <text x="173" y="170" textAnchor="middle" fill="#334155" fontSize="16">Documentation</text>
      <circle cx="173" cy="255" r="53" fill="#f3f4f2" stroke="#475569" />
      <circle cx="173" cy="239" r="15" fill="none" stroke="#475569" strokeWidth="4" />
      <path d="M143 281 C148 253 198 253 203 281" fill="none" stroke="#475569" strokeWidth="4" />
      <text x="173" y="330" textAnchor="middle" fill="#334155" fontSize="16">Interviews</text>
      <path d="M270 112 H440 M226 255 H440" fill="none" stroke="#64748b" strokeWidth="2" className="homepage-svg-line" />
      <rect x="440" y="135" width="210" height="120" rx="18" fill="#e5e7eb" stroke="#334155" strokeWidth="2" />
      <path d="M480 177 H610 M480 202 H585 M480 227 H620" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
      <text x="545" y="288" textAnchor="middle" fill="#334155" fontSize="16">Editorial work</text>
      <path d="M650 195 H790" stroke="#64748b" strokeWidth="2" className="homepage-svg-line" />
      <rect x="790" y="62" width="230" height="260" rx="18" fill="#fff" stroke="#334155" strokeWidth="2" />
      <rect x="818" y="90" width="174" height="64" rx="8" fill="#e5e7eb" />
      <path d="M818 184 H975 M818 210 H955 M818 236 H980 M818 262 H925" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
      <text x="905" y="300" textAnchor="middle" fill="#334155" fontSize="16">Published article</text>
      <MovingMarker path="M270 112 H440 M650 195 H790" />
    </>
  );
}

function TechnologyDiagram() {
  return (
    <>
      <rect x="72" y="82" width="280" height="210" rx="18" fill="#fff" stroke="#334155" strokeWidth="2" />
      <path d="M72 126 H352" stroke="#64748b" strokeWidth="2" />
      <circle cx="99" cy="104" r="6" fill="#64748b" /><circle cx="119" cy="104" r="6" fill="#94a3b8" />
      <rect x="104" y="158" width="94" height="92" rx="10" fill="#e5e7eb" />
      <path d="M224 168 H318 M224 196 H300 M224 224 H314" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
      <text x="212" y="323" textAnchor="middle" fill="#334155" fontSize="16">Web product</text>
      <path d="M352 187 H493" stroke="#64748b" strokeWidth="2" className="homepage-svg-line" />
      <circle cx="550" cy="187" r="57" fill="#e5e7eb" stroke="#334155" strokeWidth="2" />
      <path d="M520 187 H580 M550 157 V217" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
      <text x="550" y="279" textAnchor="middle" fill="#334155" fontSize="16">API</text>
      <path d="M607 187 H750" stroke="#64748b" strokeWidth="2" className="homepage-svg-line" />
      <ellipse cx="880" cy="112" rx="128" ry="38" fill="#fff" stroke="#334155" strokeWidth="2" />
      <path d="M752 112 V254 C752 275 809 292 880 292 C951 292 1008 275 1008 254 V112" fill="#f3f4f2" stroke="#334155" strokeWidth="2" />
      <ellipse cx="880" cy="254" rx="128" ry="38" fill="none" stroke="#94a3b8" />
      <text x="880" y="205" textAnchor="middle" fill="#334155" fontSize="16">Business data</text>
      <MovingMarker path="M352 187 H493 M607 187 H750" />
    </>
  );
}

function ResearchDiagram() {
  return (
    <>
      {[80, 165, 250].map((y, index) => <g key={y}><rect x="78" y={y} width="210" height="58" rx="10" fill={index === 1 ? "#e5e7eb" : "#f3f4f2"} stroke="#64748b" /><path d={`M103 ${y + 21} H258 M103 ${y + 38} H222`} stroke="#64748b" strokeWidth="4" strokeLinecap="round" /></g>)}
      <text x="183" y="337" textAnchor="middle" fill="#334155" fontSize="16">Sources</text>
      <path d="M288 194 H440" stroke="#64748b" strokeWidth="2" className="homepage-svg-line" />
      <g transform="translate(440 92)">
        {[0, 1, 2].map((row) => [0, 1, 2].map((column) => <rect key={`${row}-${column}`} x={column * 70} y={row * 70} width="52" height="52" rx="8" fill={(row + column) % 2 ? "#e5e7eb" : "#fff"} stroke="#64748b" />))}
      </g>
      <text x="536" y="337" textAnchor="middle" fill="#334155" fontSize="16">Analysis</text>
      <path d="M650 194 H790" stroke="#64748b" strokeWidth="2" className="homepage-svg-line" />
      <path d="M808 62 H974 L1020 108 V320 H808 Z" fill="#fff" stroke="#334155" strokeWidth="2" />
      <path d="M974 62 V108 H1020" fill="#e5e7eb" stroke="#334155" strokeWidth="2" />
      <path d="M844 150 H980 M844 180 H964 M844 210 H984 M844 240 H940" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
      <text x="914" y="300" textAnchor="middle" fill="#334155" fontSize="16">Research report</text>
      <MovingMarker path="M288 194 H440 M650 194 H790" />
    </>
  );
}
