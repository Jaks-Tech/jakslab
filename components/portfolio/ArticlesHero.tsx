import Image from "next/image";
import SearchBar from "./SearchBar";

export default function ArticlesHero() {
  return (
    <div className="relative mx-auto max-w-4xl text-center flex flex-col items-center rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-16 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500">
      
      {/* Logo */}
      <div className="mb-6">
        <div className="relative w-16 h-16 mx-auto">
          <Image
            src="/jakslab.png"
            alt="Jakslab Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-blue-400">
        Academic & Technology Blog
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
        Explore Academic &{" "}
        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Tech Insights
        </span>
      </h1>

      {/* Description */}
      <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
        Discover professional, research-driven articles crafted by experts
        to expand your knowledge in academia and emerging technologies.
      </p>

      {/* Search */}
      <div className="mt-10 w-full max-w-xl">
        <SearchBar />
      </div>
    </div>
  );
}