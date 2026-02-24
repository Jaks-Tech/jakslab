import Image from "next/image";
import SearchBar from "./SearchBar";

export default function ArticlesHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-8 py-20 lg:px-16 shadow-sm">
      
      {/* Soft Background Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center flex flex-col items-center">

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
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-slate-200 text-sm font-medium text-slate-700 shadow-sm">
          Academic & Technology Blog
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
          Explore Academic &
          <span className="text-blue-600"> Tech Insights</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg text-slate-700 leading-relaxed max-w-2xl">
          Discover professional, research-driven articles crafted by experts
          to expand your knowledge in academia and emerging technologies.
        </p>

        {/* Search */}
        <div className="mt-10 w-full max-w-xl">
          <SearchBar />
        </div>

      </div>
    </section>
  );
}