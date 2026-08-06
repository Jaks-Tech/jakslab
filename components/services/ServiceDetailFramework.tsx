import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CircleAlert, Layers3, Route, Sparkles, Target } from "lucide-react";
import { serviceById, type Service } from "@/components/services/data";

type Props = { service: Service; variant?: "page" | "modal" };
const capabilityIcons = [Target, Layers3, Route, Sparkles, Check, CircleAlert];

export function ServiceDetailFramework({ service, variant = "page" }: Props) {
  const isModal = variant === "modal";
  const Heading = isModal ? "h2" : "h1";
  const shell = isModal
    ? "px-6 pb-12 pt-8 sm:px-10 lg:px-12"
    : "mx-auto w-full max-w-7xl px-5 pb-20 pt-[clamp(2rem,5vw,4rem)] sm:px-8 lg:px-12";

  return (
    <article className={`services-clean ${shell} text-[#1d1d1a]`}>
      <header className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-1 w-12 rounded-full" style={{ backgroundColor: service.accent }} />
            <p className="text-[10px] font-medium uppercase tracking-[.2em]" style={{ color: service.accent }}>{service.name}</p>
          </div>
          <Heading className="mt-5 max-w-[17ch] font-serif text-[clamp(2rem,4.2vw,3.65rem)] font-normal leading-[1.02] tracking-[-.04em]">
            {service.title}
          </Heading>
          <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#544a42]">{service.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={service.cta.href} className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[#1c1b19] px-6 py-3 text-sm font-semibold !text-white hover:bg-[#34312d]">
              {service.cta.label}<ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/book-call" className="inline-flex min-h-11 items-center rounded-full border border-[#c8beb2] px-6 py-3 text-sm font-semibold hover:bg-white/60">Book a call</Link>
          </div>
        </div>
        <figure className="overflow-hidden rounded-[3rem_7rem_4rem_5rem] bg-white/45 px-5 pb-5 pt-3 shadow-[0_1.5rem_4rem_rgba(59,49,41,.08)]">
          <div className="relative aspect-[4/3] w-full">
            <Image src={service.image.src} alt={service.image.alt} fill priority sizes="(max-width:1024px) 90vw, 44vw" className="object-contain p-3 [filter:none!important]" />
          </div>
          <figcaption className="mx-auto max-w-md text-center text-xs leading-6 text-[#756a60]">{service.framework.visualCaption}</figcaption>
        </figure>
      </header>

      <section aria-label="Service proof points" className="mt-12 grid gap-4 rounded-[2rem_4rem_2rem_3rem] border border-[#ded6cc] bg-white/35 p-5 sm:grid-cols-3 sm:p-7">
        {service.framework.proofPoints.map((point) => (
          <div key={point.label} className="sm:border-l sm:border-[#d8cfc4] sm:pl-6 first:border-l-0 first:pl-0">
            <strong className="block font-serif text-xl font-normal" style={{ color: service.accent }}>{point.value}</strong>
            <span className="mt-1 block text-xs leading-5 text-[#70665d]">{point.label}</span>
          </div>
        ))}
      </section>

      <Section label="The problem" icon={<CircleAlert size={17} />}>
        <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:gap-14">
          <h2 className="max-w-[20ch] font-serif text-[clamp(1.65rem,2.8vw,2.55rem)] font-normal leading-[1.12]">{service.framework.problem.heading}</h2>
          <p className="max-w-3xl text-[15px] leading-8 text-[#625950]">{service.framework.problem.body}</p>
        </div>
      </Section>

      <Section label="What is included" icon={<Layers3 size={17} />}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.included.map((item, index) => {
            const Icon = capabilityIcons[index % capabilityIcons.length];
            return <div key={item.label} className="rounded-[1.5rem_3rem_1.75rem_2.5rem] border border-[#ddd4ca] bg-white/38 p-6">
              <Icon size={19} strokeWidth={1.5} style={{ color: service.accent }} aria-hidden="true" />
              <h3 className="mt-5 text-sm font-semibold">{item.label}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6b6259]">{item.body}</p>
            </div>;
          })}
        </div>
      </Section>

      <Section label="How the work moves" icon={<Route size={17} />}>
        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <span className="absolute left-[8%] right-[8%] top-5 hidden h-px bg-[#d8cfc4] lg:block" aria-hidden="true" />
          {service.steps.map((step, index) => <li key={step.label} className="relative rounded-[2rem_1.5rem_3rem_1.75rem] bg-[#eee8df]/70 p-5">
            <span className="relative z-[1] inline-grid size-10 place-items-center rounded-full bg-[#f7f5ef] text-[11px] font-semibold" style={{ color: service.accent, boxShadow: `inset 0 0 0 1px ${service.accent}55` }}>0{index + 1}</span>
            <h3 className="mt-5 text-sm font-semibold">{step.label}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6b6259]">{step.body}</p>
          </li>)}
        </ol>
      </Section>

      <Section label="Useful outcomes" icon={<Target size={17} />}>
        <div className="grid overflow-hidden rounded-[3rem_6rem_3rem_4rem] sm:grid-cols-3" style={{ backgroundColor: `${service.accent}12` }}>
          {service.framework.outcomes.map((outcome, index) => <div key={outcome.label} className="p-7 sm:border-l sm:border-[#cfc5ba]/70 first:border-l-0">
            <span className="text-[10px] font-semibold" style={{ color: service.accent }}>0{index + 1}</span>
            <h3 className="mt-4 font-serif text-xl font-normal">{outcome.label}</h3>
            <p className="mt-3 text-sm leading-6 text-[#625950]">{outcome.body}</p>
          </div>)}
        </div>
      </Section>

      <Section label="Handover and fit" icon={<Check size={17} />}>
        <div className="grid gap-10 lg:grid-cols-2">
          <div><h2 className="font-serif text-2xl font-normal">What you receive</h2><ul className="mt-5 grid gap-3">
            {service.deliverables.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#504840]"><Check size={16} className="mt-1 shrink-0" style={{ color: service.accent }} />{item}</li>)}
          </ul></div>
          <div className="rounded-[2.5rem_4rem_2rem_3rem] bg-white/45 p-7">
            <h2 className="font-serif text-2xl font-normal">{service.framework.fitHeading}</h2>
            <p className="mt-3 text-sm leading-7 text-[#6b6259]">{service.fit}</p>
            <ul className="mt-5 grid gap-3">{service.framework.fitSignals.map((signal) => <li key={signal} className="flex gap-3 text-sm leading-6"><span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: service.accent }} />{signal}</li>)}</ul>
          </div>
        </div>
      </Section>

      <aside aria-label="Related services"><Section label="Works with" icon={<Sparkles size={17} />}>
        <div className="grid gap-4 sm:grid-cols-2">{service.bridges.map((bridge) => {
          const target = serviceById[bridge.to];
          return <Link key={bridge.to} href={`/services/${target.id}`} scroll={false} style={{ "--svc-accent": target.accent } as CSSProperties} className="group rounded-[2rem_3.5rem_2rem_2.5rem] border border-[#d9d2c8] bg-white/35 p-6 hover:border-[color:var(--svc-accent)]">
            <span className="flex items-center justify-between"><strong className="flex items-center gap-3 text-sm"><span className="size-2 rounded-full" style={{ backgroundColor: target.accent }} />{target.name}</strong><ArrowUpRight size={16} /></span>
            <span className="mt-4 block text-sm leading-6 text-[#6b6259]">{bridge.body}</span>
          </Link>;
        })}</div>
      </Section></aside>
    </article>
  );
}

function Section({ label, icon, children }: { label: string; icon: ReactNode; children: ReactNode }) {
  return <section className="mt-[clamp(3.5rem,7vw,6.5rem)]">
    <div className="mb-6 flex items-center gap-3 border-b border-[#d8cfc4] pb-3 text-[#8a7e73]">{icon}<p className="text-[10px] font-semibold uppercase tracking-[.2em]">{label}</p></div>
    {children}
  </section>;
}
