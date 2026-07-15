import SearchBar from "./SearchBar";
import Blog3DStack from "./Blog3DStack";

export default function ArticlesHeroSimple() {
  return <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-10 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1fr_.7fr] lg:pt-28"><div><p className="mb-5 text-sm tracking-wide text-slate-400">JaksLab journal</p><h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">Ideas for better research and better products.</h1><p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">Practical writing on research, technology, academic work and the tools behind them.</p><div className="mt-9 max-w-xl"><SearchBar /></div></div><Blog3DStack /></section>;
}
