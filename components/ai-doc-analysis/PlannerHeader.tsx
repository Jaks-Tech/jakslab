export default function PlannerHeader() {
  return (
    <div className="mb-16 relative text-center">
      {/* Centered Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -z-10" />
      
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400/80">
          Research Intelligence v3.0
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
        AI Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Planner</span>
      </h1>

      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Transform your initial sparks into a structured execution roadmap. 
        Generate deep strategies, refine through interactive dialogue, and 
        iterate on your vision as your project evolves.
      </p>

      {/* Centered Border separator */}
      <div className="mt-10 h-[1px] max-w-md mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}