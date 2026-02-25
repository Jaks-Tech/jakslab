export function ContactHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/contact-bg.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl px-6">

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-lg">
          Let’s Talk About Your{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Project
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
          Whether you have questions, need a quote, or want to get started right away -
          our team is available{" "}
          <span className="font-semibold text-white">24/7</span> to assist you.
        </p>

      </div>
    </section>
  );
}