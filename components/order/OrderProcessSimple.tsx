import Link from "next/link";

const steps = [
  ["01", "Review", "We read your brief, files and deadline before asking any necessary questions."],
  ["02", "Quote", "You receive a clear price, scope and delivery timeline before committing."],
  ["03", "Work", "Once confirmed, the right person begins work and keeps you updated."],
  ["04", "Delivery", "We deliver the completed work and handle agreed revisions."],
];

export function OrderProcessSimple() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto max-w-6xl">
      <div className="max-w-2xl"><h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">What happens next</h2><p className="mt-4 leading-7 text-slate-400">A straightforward process from the first brief to final delivery.</p></div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 [perspective:1200px]">
        {steps.map(([number, title, description], index) => <article key={number} className="order-process-card rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md" style={{ transform: `translateZ(${index % 2 ? 8 : 18}px)` }}><p className="text-xs tracking-[.2em] text-slate-600">{number}</p><h3 className="mt-8 text-lg font-medium text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{description}</p></article>)}
      </div>
      <p className="mt-10 text-sm text-slate-500">Not sure what to include? <Link href="/contact" className="text-slate-300 underline underline-offset-4 hover:text-white">Talk to us first.</Link></p>
    </div></section>
  );
}
