export function ContactHero() {
  return (
    <div className="relative max-w-4xl mx-auto py-12">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
        Let’s Talk About Your{" "}
        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Project
        </span>
      </h1>

      <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Whether you have questions, need a quote, or want to get started right away -
        our team is available{" "}
        <span className="text-white font-semibold">24/7</span> to assist you.
      </p>
    </div>
  );
}