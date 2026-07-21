import type { CSSProperties } from "react";

export function OrderHeroSimple() {
  return (
    <section className="relative px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="mb-5 text-sm tracking-wide text-slate-400">JaksLab project desk</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">From a clear brief to a finished solution.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">Submit technical, research or learning work, follow its progress and receive every delivery in one private workspace.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#order-form" className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium hover:bg-blue-500">Start a request</a><a href="#track-order" className="rounded-lg border border-white/10 px-5 py-3 text-sm text-slate-300 hover:bg-white/5">Track a request</a></div>
        </div>
        <div className="order-orbit-scene relative hidden min-h-[310px] [perspective:1100px] lg:block" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/10 [transform:translateX(-50%)_translateY(-50%)_rotateX(68deg)]" />
          <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-blue-300/20 bg-[#08172b]/90 text-center shadow-[0_0_55px_rgba(37,99,235,.22)] backdrop-blur-xl">
            <span className="text-xs text-slate-500">Your</span>
            <span className="mt-1 font-medium text-white">project</span>
          </div>
          <div className="order-orbit absolute inset-0 [transform-style:preserve-3d]">
            {[
              ["01", "Brief"],
              ["02", "Review"],
              ["03", "Build"],
              ["04", "Deliver"],
            ].map(([number, label], index) => (
              <div
                key={number}
                className="order-orbit-card absolute left-1/2 top-1/2 flex h-20 w-28 -ml-14 -mt-10 flex-col justify-center rounded-xl border border-white/10 bg-[#07101f]/90 px-4 shadow-[0_18px_45px_rgba(0,0,0,.4)] backdrop-blur-xl"
                style={{ "--orbit-index": index } as CSSProperties}
              >
                <span className="text-[10px] tracking-widest text-slate-600">{number}</span>
                <span className="mt-1 text-sm text-slate-200">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
