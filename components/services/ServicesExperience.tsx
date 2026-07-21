import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

const academic = [
  ["Essay writing", "Structured writing shaped around your brief, argument and required style.", "From $25"],
  ["Research papers", "Source-led research, analysis and clear academic presentation.", "From $75"],
  ["Formatting and editing", "Careful editing, referencing and formatting across major citation styles.", "From $15"],
  ["Case studies", "Practical analysis connecting evidence, theory and real situations.", "From $50"],
  ["Thesis and dissertation", "Guidance across proposals, research structure, analysis and presentation.", "Custom"],
  ["Literature reviews", "Critical synthesis of existing research and the gaps around your subject.", "From $60"],
  ["Lab reports", "Clear documentation of methods, findings and interpretation.", "From $35"],
  ["Proofreading", "A detailed language, structure and consistency review before submission.", "From $20"],
  ["Academic presentations", "Focused slides that communicate complex work clearly.", "From $30"],
];

const technical = [
  ["Programming support", "Readable, documented work across Python, Java, C++ and related stacks.", "From $40"],
  ["Web development", "Responsive websites, dashboards and full-stack products.", "From $299"],
  ["Machine learning", "Data preparation, model development, evaluation and deployment support.", "Custom"],
  ["Model optimisation", "Practical improvements to accuracy, latency and production performance.", "Custom"],
  ["APIs and integrations", "Reliable connections between platforms, services and internal workflows.", "Custom"],
  ["Technical reports", "Documentation that turns complex technical work into useful decisions.", "From $70"],
];

const process = [
  ["01", "Brief", "Send the requirements, deadline and relevant files."],
  ["02", "Scope", "We review the work and provide a clear quote and timeline."],
  ["03", "Work", "The project is completed with updates where they are useful."],
  ["04", "Delivery", "You receive the work and any agreed revisions."],
];

function ServiceList({ items }: { items: string[][] }) {
  return <div className="border-t border-white/15">{items.map(([title, description, price], index) => <article key={title} className="group grid grid-cols-[2rem_1fr] gap-x-3 gap-y-4 border-b border-white/15 py-6 sm:grid-cols-[3rem_1fr_auto] sm:gap-6 sm:py-8"><p className="pt-1 font-mono text-xs tracking-[.16em] text-slate-600">{String(index + 1).padStart(2, "0")}</p><div><h3 className="text-lg font-medium text-white transition-colors group-hover:text-blue-300 sm:text-xl">{title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:leading-7">{description}</p></div><div className="col-start-2 flex items-center justify-between gap-5 sm:col-start-auto sm:flex-col sm:items-end"><span className="whitespace-nowrap text-sm text-slate-300">{price}</span><Link href="/order" aria-label={`Request ${title}`} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-blue-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"><ArrowUpRight className="h-4 w-4" /></Link></div></article>)}</div>;
}

export function ServicesExperience() {
  return <main className="services-page overflow-hidden text-white">
    <section className="mx-auto grid min-h-[560px] max-w-6xl items-center gap-8 px-5 py-12 sm:min-h-[600px] sm:px-8 sm:py-16 lg:grid-cols-[1.08fr_.92fr]">
      <div><h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Useful expertise for demanding work.</h1><p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">Research, writing and technical development brought together in one place. Choose a starting point below or send us a custom brief.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/order" className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium hover:bg-blue-500">Start a project</Link><a href="#services-catalogue" className="rounded-lg border border-white/10 px-6 py-3 text-sm text-slate-300 hover:bg-white/5">View services</a></div></div>
      <div className="services-orbit-scene relative hidden h-[360px] [perspective:1000px] lg:block" aria-hidden="true"><div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-blue-300/20 bg-[#08172b]/85 text-sm font-medium tracking-wider shadow-[0_0_65px_rgba(37,99,235,.22)]">JAKSLAB</div><div className="services-orbit absolute inset-0 [transform-style:preserve-3d]">{["Research", "Software", "Writing", "Data"].map((label, index) => <div key={label} className="services-orbit-card absolute left-1/2 top-1/2 -ml-14 -mt-6 grid h-12 w-28 place-items-center rounded-xl border border-white/10 bg-[#07101f]/90 text-xs text-slate-300 shadow-xl" style={{ "--service-index": index } as CSSProperties}>{label}</div>)}</div></div>
    </section>

    <div id="services-catalogue" className="mx-auto max-w-6xl space-y-16 px-5 py-12 sm:space-y-20 sm:px-8 sm:py-16">
      <section className="grid gap-7 lg:grid-cols-[.62fr_1.38fr] lg:gap-12"><div><p className="text-sm text-blue-400">Research and academic work</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Support for serious study</h2><p className="mt-4 max-w-md leading-7 text-slate-400">Research, structure, analysis and presentation support.</p></div><ServiceList items={academic} /></section>
      <section className="grid gap-7 lg:grid-cols-[.62fr_1.38fr] lg:gap-12"><div><p className="text-sm text-indigo-400">Technology and development</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Products and technical work</h2><p className="mt-4 max-w-md leading-7 text-slate-400">Practical engineering for students, teams and businesses.</p></div><ServiceList items={technical} /></section>
      <section className="border-y border-white/10 py-9 sm:py-12"><div className="max-w-2xl"><h2 className="text-3xl font-semibold tracking-tight">A simple working process</h2><p className="mt-3 leading-7 text-slate-400">Start with the information you already have.</p></div><div className="relative mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"><div className="absolute left-0 right-0 top-3 hidden h-px bg-white/10 lg:block" />{process.map(([number, title, description]) => <div key={number} className="relative"><p className="relative z-10 w-fit bg-[#03050c] pr-3 text-xs tracking-widest text-blue-400">{number}</p><h3 className="mt-4 font-medium text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></div>)}</div></section>
      <section className="flex flex-col items-center gap-5 border-t border-white/10 py-3 text-center"><div><h2 className="text-3xl font-semibold">Something different?</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-400">If your work does not fit a category, send the brief anyway. We handle custom research, software and technical requests.</p></div><Link href="/order" className="w-fit rounded-lg bg-blue-600 px-7 py-3.5 font-medium hover:bg-blue-500">Send your brief</Link></section>
    </div>
  </main>;
}
