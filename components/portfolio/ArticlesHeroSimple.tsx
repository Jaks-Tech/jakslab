import Blog3DStack from "./Blog3DStack";

export default function ArticlesHeroSimple() {
  return <section className="mx-auto grid max-w-6xl items-center gap-5 px-5 pb-2 pt-12 sm:px-8 sm:pb-3 sm:pt-16 lg:grid-cols-[1fr_.7fr]"><div><h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">Research, academic and technology insights.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">Practical ideas and useful tools.</p></div><Blog3DStack /></section>;
}
