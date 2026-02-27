export function OrderHero() {
  return (
    <section className="relative py-32 px-6 text-center bg-transparent overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <div className="w-[900px] h-[900px] bg-blue-600/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-block px-5 py-2 mb-6 text-sm font-medium 
                        text-blue-400 bg-white/10 border border-white/20 
                        rounded-full backdrop-blur-md">
          Fast • Confidential • Professional
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Submit Your{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Assignment
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-lg md:text-xl text-slate-400 
                      max-w-2xl mx-auto leading-relaxed">
          Tell us what you need, upload your materials, and receive a
          personalized quote from our expert team.
          We ensure quality, clarity, and timely delivery.
        </p>
      </div>
    </section>
  );
}