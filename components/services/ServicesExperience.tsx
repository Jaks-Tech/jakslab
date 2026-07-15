import Link from "next/link";
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

function ServiceGrid({ items }: { items: string[][] }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 [perspective:1300px]">{items.map(([title, description, price], index) => <article key={title} className="service-depth-card flex min-h-56 flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md" style={{ transform: `translateZ(${index % 3 === 1 ? 8 : 16}px)` }}><p className="text-xs tracking-[.18em] text-slate-600">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-7 text-xl font-medium text-white">{title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{description}</p><div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-sm text-slate-300">{price}</span><Link href="/order" className="text-sm text-blue-300 hover:text-white">Request</Link></div></article>)}</div>;
}

export function ServicesExperience() {
  return <main className="services-page overflow-hidden text-white">
    <section className="mx-auto grid min-h-[650px] max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_.92fr]">
      <div><p className="mb-5 text-sm tracking-wide text-slate-400">JaksLab services</p><h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Useful expertise for demanding work.</h1><p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">Research, writing and technical development brought together in one place. Choose a starting point below or send us a custom brief.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/order" className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium hover:bg-blue-500">Start a project</Link><a href="#services-catalogue" className="rounded-lg border border-white/10 px-6 py-3 text-sm text-slate-300 hover:bg-white/5">View services</a></div></div>
      <div className="services-orbit-scene relative hidden h-[360px] [perspective:1000px] lg:block" aria-hidden="true"><div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-blue-300/20 bg-[#08172b]/85 text-sm font-medium tracking-wider shadow-[0_0_65px_rgba(37,99,235,.22)]">JAKSLAB</div><div className="services-orbit absolute inset-0 [transform-style:preserve-3d]">{["Research", "Software", "Writing", "Data"].map((label, index) => <div key={label} className="services-orbit-card absolute left-1/2 top-1/2 -ml-14 -mt-6 grid h-12 w-28 place-items-center rounded-xl border border-white/10 bg-[#07101f]/90 text-xs text-slate-300 shadow-xl" style={{ "--service-index": index } as CSSProperties}>{label}</div>)}</div></div>
    </section>

    <div id="services-catalogue" className="mx-auto max-w-6xl space-y-24 px-5 py-20 sm:px-8 sm:py-24">
      <section><div className="mx-auto mb-10 max-w-2xl text-center"><p className="text-sm text-slate-500">Research and academic work</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Support for serious study</h2><p className="mt-4 leading-7 text-slate-400">Help with research, structure, analysis, presentation and the details that make work clear and credible.</p></div><ServiceGrid items={academic} /></section>
      <section><div className="mx-auto mb-10 max-w-2xl text-center"><p className="text-sm text-slate-500">Technology and development</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Products and technical work</h2><p className="mt-4 leading-7 text-slate-400">Practical engineering for student projects, research teams, professionals and businesses.</p></div><ServiceGrid items={technical} /></section>
      <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-10"><div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-semibold tracking-tight">A simple working process</h2><p className="mt-4 leading-7 text-slate-400">No complicated onboarding. Start with the information you already have.</p></div><div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{process.map(([number, title, description]) => <div key={number}><p className="text-xs tracking-widest text-slate-600">{number}</p><h3 className="mt-5 font-medium text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></div>)}</div></section>
      <section className="flex flex-col items-center gap-7 border-t border-white/10 py-6 text-center"><div><h2 className="text-3xl font-semibold">Something different?</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-400">If your work does not fit a category, send the brief anyway. We handle custom research, software and technical requests.</p></div><Link href="/order" className="w-fit rounded-lg bg-blue-600 px-7 py-3.5 font-medium hover:bg-blue-500">Send your brief</Link></section>
    </div>
  </main>;
}
