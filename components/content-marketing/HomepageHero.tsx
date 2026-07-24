import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function HomepageHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid w-full max-w-[1500px] gap-10 px-5 pb-12 pt-16 sm:px-8 sm:pb-14 sm:pt-20 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-12 lg:px-12 lg:pb-16 lg:pt-24 xl:px-16 2xl:px-20">
        <div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.06] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Turn what your company knows into content customers can use.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
            We write useful technical articles from documentation, Confluence pages, internal reports and conversations with the people who know the work.
          </p>

          <div className="mt-8">
            <Link href="/services#content-marketing" className="hero-learn-link inline-flex items-center gap-2 text-sm font-semibold text-[#315f72]">
              Explore our work
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

        </div>

        <aside className="hero-audience-panel rounded-3xl border border-slate-300 bg-white p-5 shadow-[0_20px_55px_rgba(15,23,42,.09)] sm:p-6 lg:mt-16 lg:w-[88%] lg:justify-self-center lg:p-7">
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
