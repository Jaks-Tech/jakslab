export default function Statistics() {
  const stats = [
    { label: "Projects Delivered", val: "500+" },
    { label: "Happy Clients", val: "300+" },
    { label: "Solutions Built", val: "50+" },
    { label: "Client Satisfaction", val: "98%" },
  ];

  return (
    <section className="py-5 sm:py-16 lg:py-20 px-4 sm:px-6 relative">
      
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/40 to-white -z-10" />

      <div className="max-w-[1400px] mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Proven Performance
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Numbers that reflect our consistency, reliability, and commitment to excellence.
          </p>
        </div>

        {/* Premium Gradient Card */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
          
          {/* Main Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600" />

          {/* Soft Glow Overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

          {/* Content */}
          <div className="relative px-6 sm:px-10 md:px-16 lg:px-20 py-10 sm:py-14 md:py-16 lg:py-20 text-white">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-14 text-center">

              {stats.map((stat, i) => (
                <div key={i} className="relative">
                  
                  {/* Value */}
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    {stat.val}
                  </div>

                  {/* Divider Line */}
                  <div className="w-10 sm:w-12 h-[2px] bg-white/30 mx-auto my-3 sm:my-4" />

                  {/* Label */}
                  <div className="text-xs sm:text-sm uppercase tracking-widest text-white/80">
                    {stat.label}
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}