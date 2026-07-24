import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function HomepageHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] overflow-hidden bg-transparent">
      <div className="mx-auto grid w-full max-w-[1500px] flex-1 content-center gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-12 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
        <div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.06] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Turn company knowledge into content customers can use.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-800 sm:text-lg">
            We turn documentation, Confluence pages, product knowledge, customer questions and expert interviews into clear articles that explain your services and improve search visibility.
          </p>

          <div className="mt-8">
            <Link href="/services#content-marketing" className="hero-learn-link inline-flex items-center gap-2 text-sm font-semibold text-[#315f72]">
              Explore our work
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <aside className="hero-audience-panel rounded-3xl border border-white/70 bg-white/55 p-5 shadow-[0_20px_55px_rgba(15,23,42,.09)] backdrop-blur-md sm:p-6 lg:mt-10 lg:w-[88%] lg:justify-self-center lg:p-7">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-slate-700">Who we work with</p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
            Technical teams with useful knowledge customers rarely see.
          </h2>
          <ul className="mt-5 space-y-2.5">
            {[
              "Software and SaaS",
              "IT and engineering firms",
              "Documentation-led teams",
            ].map((item) => (
              <li key={item} className="hero-audience-item flex items-start gap-3 text-sm leading-6 text-slate-900">
                <Check className="mt-1 shrink-0" size={16} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
