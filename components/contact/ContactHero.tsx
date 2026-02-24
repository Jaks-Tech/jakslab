export function ContactHero() {
  return (
    <section className="relative pt-20 pb-28 px-6 text-center overflow-hidden">

      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 -z-10" />
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
          Let’s Talk About Your{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Project
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Whether you have questions, need a quote, or want to get started right away -
          our team is available <span className="font-semibold text-slate-800">24/7</span> to assist you.
        </p>

      </div>
    </section>
  );
}