export default function Statistics() {
  const stats = [
    { label: "Projects Delivered", val: "500+" },
    { label: "Happy Clients", val: "300+" },
    { label: "Solutions Built", val: "50+" },
    { label: "Client Satisfaction", val: "98%" },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 relative bg-transparent">

      <div className="max-w-[1400px] mx-auto">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Proven Performance
          </h2>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
            Numbers that reflect our consistency, reliability, and commitment to excellence.
          </p>
        </div>

        {/* Glass Container */}
        <div className="relative rounded-3xl 
                        bg-white/5 backdrop-blur-xl
                        border border-white/10
                        hover:border-blue-500/40
                        transition-all duration-500
                        px-10 sm:px-16 py-16">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 text-center">

            {stats.map((stat, i) => (
              <div key={i} className="relative">

                {/* Value */}
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                  {stat.val}
                </div>

                {/* Soft Divider */}
                <div className="w-12 h-[2px] bg-blue-500/40 mx-auto my-4" />

                {/* Label */}
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {stat.label}
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}