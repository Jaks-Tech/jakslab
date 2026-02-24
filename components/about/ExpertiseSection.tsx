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
    <section className="relative py-20 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-8 lg:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-indigo-100 text-indigo-700 rounded-full mb-6">
            What We Do Best
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Our Expertise
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Delivering specialized knowledge and advanced technical solutions
            across multiple disciplines with precision and excellence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-3xl backdrop-blur-xl bg-white/70 border border-white/40 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >
              {/* Category Title */}
              <h4 className="text-xl font-bold text-slate-900 mb-6">
                {cat.title}
              </h4>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-3">
                {cat.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 text-sm font-medium bg-slate-100 text-slate-700 rounded-full transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}