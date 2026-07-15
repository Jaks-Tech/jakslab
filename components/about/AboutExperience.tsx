import Link from "next/link";
import type { CSSProperties } from "react";

const capabilities = [
  ["Research and writing", "Essays, research papers, literature reviews, reports and careful editing."],
  ["Software development", "Web products, APIs, databases and full-stack applications."],
  ["Programming and data", "Python, Java, C++, machine learning, analysis and technical documentation."],
  ["Project support", "Clear planning, implementation and delivery for academic and professional work."],
];

export function AboutExperience() {
  return <main className="about-page overflow-hidden pb-24 text-white">
    <section className="mx-auto grid min-h-[650px] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_.92fr]">
      <div><p className="mb-5 text-sm tracking-wide text-slate-400">About JaksLab</p><h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Serious work deserves careful thinking.</h1><p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">JaksLab brings research, writing and software development together for students, researchers, professionals and businesses working on demanding projects.</p><Link href="/order" className="mt-9 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500">Start a project</Link></div>
      <div className="about-orbit-scene relative hidden h-[350px] [perspective:1000px] lg:block" aria-hidden="true"><div className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-blue-300/20 bg-[#08172b]/85 text-sm tracking-wider shadow-[0_0_70px_rgba(37,99,235,.24)]">JAKSLAB</div><div className="about-orbit absolute inset-0 [transform-style:preserve-3d]">{["Research", "Build", "Deliver"].map((item, index) => <div key={item} className="about-orbit-card absolute left-1/2 top-1/2 -ml-12 -mt-5 grid h-10 w-24 place-items-center rounded-lg border border-white/10 bg-[#07101f]/90 text-[11px] text-slate-300" style={{ "--about-index": index } as CSSProperties}>{item}</div>)}</div></div>
    </section>
    <div className="mx-auto max-w-6xl space-y-24 px-5 sm:px-8">
      <section className="grid gap-10 border-y border-white/10 py-16 md:grid-cols-[.8fr_1.2fr]"><h2 className="text-3xl font-semibold tracking-tight">Why we exist</h2><div className="space-y-5 text-base leading-8 text-slate-400"><p>Good ideas often stall because the right technical or research support is difficult to find. JaksLab exists to close that gap.</p><p>We work from the actual brief—not a template—so the result reflects the problem, audience and standard expected of it.</p></div></section>
      <section><div className="mx-auto mb-12 max-w-2xl text-center"><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What we work on</h2><p className="mt-4 leading-7 text-slate-400">A practical mix of academic, research and technical capability.</p></div><div className="grid gap-4 md:grid-cols-2 [perspective:1200px]">{capabilities.map(([title, text], index) => <article key={title} className="about-depth-card rounded-2xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-md" style={{ transform: `translateZ(${index % 2 ? 8 : 16}px)` }}><p className="text-xs tracking-widest text-slate-600">0{index + 1}</p><h3 className="mt-7 text-xl font-medium">{title}</h3><p className="mt-3 leading-7 text-slate-400">{text}</p></article>)}</div></section>
      <section><div className="mx-auto mb-12 max-w-2xl text-center"><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How we work</h2><p className="mt-4 leading-7 text-slate-400">Three principles guide every request.</p></div><div className="grid gap-8 text-center md:grid-cols-3">{[["Confidentiality","Your work and information stay private."],["Reliability","Clear expectations, communication and deadlines."],["Quality","Careful work shaped around the required standard."]].map(([title,text]) => <div key={title} className="border-t border-white/10 px-4 pt-7"><h3 className="font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></div>)}</div></section>
      <section className="grid grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/[0.025] p-7 text-center sm:grid-cols-4 sm:p-10">{[["5+","Years"],["150+","Projects"],["90+","Specialists"],["99%","Satisfaction"]].map(([value,label]) => <div key={label}><p className="text-3xl font-semibold text-blue-300 sm:text-4xl">{value}</p><p className="mt-2 text-xs tracking-wide text-slate-500">{label}</p></div>)}</section>
    </div>
  </main>;
}
