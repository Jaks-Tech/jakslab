export function ExpertiseSection() {
  const categories = [
    {
      title: "Academic Writing",
      items: ["Essays", "Research Papers", "Thesis", "Literature Reviews"],
    },
    {
      title: "Web Development",
      items: ["React", "Next.js", "Node.js", "Full-Stack Apps"],
    },
    {
      title: "Programming",
      items: ["Python", "Java", "C++", "Machine Learning"],
    },
    {
      title: "Data & Design",
      items: ["Data Analysis", "Power BI", "Figma", "UI/UX"],
    },
  ];

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none -z-10">
        <div className="w-[900px] h-[600px] bg-indigo-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-8 lg:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-20">

          <span className="inline-block px-4 py-1.5 text-sm font-semibold 
                           bg-white/10 backdrop-blur 
                           border border-white/20 
                           text-indigo-400 
                           rounded-full mb-6">
            What We Do Best
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Our Expertise
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Delivering specialized knowledge and advanced technical solutions
            across multiple disciplines with precision and excellence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-3xl 
                         bg-white/5 backdrop-blur-xl
                         border border-white/10
                         hover:border-indigo-500/40
                         hover:shadow-[0_0_50px_rgba(99,102,241,0.15)]
                         transition-all duration-500"
            >
              {/* Category Title */}
              <h4 className="text-xl font-bold text-white mb-6">
                {cat.title}
              </h4>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-3">
                {cat.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 text-sm font-medium 
                               bg-white/5 border border-white/10
                               text-slate-300 rounded-full 
                               transition-all duration-300
                               hover:border-indigo-500/40 
                               hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 
                              bg-gradient-to-r from-indigo-500 to-blue-500 
                              rounded-full group-hover:w-full 
                              transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}