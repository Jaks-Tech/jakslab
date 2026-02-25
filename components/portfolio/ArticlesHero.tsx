import Image from "next/image";
import SearchBar from "./SearchBar";

export default function ArticlesHero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center text-center overflow-hidden px-8">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/blog-bg.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center">

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
        <div className="inline-flex items-center px-4 py-1.5 rounded-full 
                        bg-white/10 backdrop-blur-md 
                        border border-white/20 
                        text-sm font-medium text-white shadow-sm">
          Academic & Technology Blog
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
          Explore Academic &
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {" "}Tech Insights
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg text-slate-200 leading-relaxed max-w-2xl">
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