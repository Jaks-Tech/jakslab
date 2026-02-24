export function OrderHero() {
  return (
    <section className="relative pt-36 pb-24 text-center overflow-hidden 
                        bg-gradient-to-b from-blue-50 via-white to-white">

      {/* Background Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 
                      w-[500px] h-[500px] bg-blue-400/20 
                      rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-8">

        {/* Badge */}
        <div className="inline-block px-4 py-1 mb-6 text-sm font-medium 
                        text-blue-600 bg-blue-100 rounded-full">
          Fast • Confidential • Professional
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
          Submit Your Assignment
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-lg md:text-xl text-slate-600 
                      max-w-2xl mx-auto leading-relaxed">
          Tell us what you need, upload your materials, and receive a 
          personalized quote from our expert team.  
          We ensure quality, clarity, and timely delivery.
        </p>

      </div>
    </section>
  );
}