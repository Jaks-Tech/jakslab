import Image from "next/image";
// ❌ Do NOT import from public in Next.js
// import logo from "/public/jakslab.png";

// ✅ Use direct path instead
import Link from "next/link";

export default function SitemapDashboard() {
  const mapNodes = [
    {
      id: "01",
      label: "Registry",
      title: "Teams",
      desc: "Manage collaborators and structure your workspace.",
      href: "/workhub/teams",
      color: "bg-amber-500",
      glow: "shadow-amber-500/20",
    },
    {
      id: "02",
      label: "Command",
      title: "Tasks",
      desc: "Create, assign, and control all operations.",
      href: "/workhub/tasks",
      color: "bg-blue-600",
      glow: "shadow-blue-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent from-black via-zinc-900 to-black flex flex-col items-center justify-start px-6 pt-20 pb-12 text-white">
      
      {/* HEADER */}
      {/* LOGO ABOVE HEADER */}
      <div className="flex justify-center mb-6">
        <Image src="/jakslab.png" alt="Jakslab Logo" width={70} height={70} priority className="rounded-full" />
      </div>

      {/* HEADER */}
      <header className="text-center mb-12 space-y-2">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
         Jakslab WorkHub<span className="text-blue-600">.</span>
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
          Command your workflow
        </p>
      </header>

      {/* GRID */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* CONNECTOR */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[60%] h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          </div>
        </div>

        {mapNodes.map((node) => (
          <Link
            key={node.id}
            href={node.href}
            className={`group relative p-8 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl transition-all duration-500 hover:border-blue-500/40 hover:-translate-y-2 ${node.glow}`}
          >
            {/* TOP BAR */}
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-2">
                <span
                  className={`text-[9px] font-black px-2 py-1 rounded text-white uppercase tracking-widest ${node.color}`}
                >
                  Step {node.id}
                </span>

                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">
                  {node.label}
                </p>
              </div>

              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
            </div>

            {/* CONTENT */}
            <div className="space-y-3 relative z-10">
              <h2 className="text-2xl font-black tracking-tight group-hover:text-blue-400 transition-colors uppercase">
                {node.title}
              </h2>

              <p className="text-xs text-zinc-500 leading-relaxed max-w-[240px] font-medium">
                {node.desc}
              </p>
            </div>

            {/* BIG NUMBER ACCENT */}
            <span className="absolute -bottom-6 -right-2 text-[100px] font-black text-white/[0.02] group-hover:text-blue-500/5 transition-all select-none">
              {node.id}
            </span>
          </Link>
        ))}
      </div>

      {/* PRIMARY CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/workhub/teams"
          className="group inline-flex items-center gap-6 px-10 py-5 rounded-full bg-blue-600 hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20 active:scale-95"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
            Create a Team
          </span>

          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </Link>

        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-6">
          Start by creating a team, enroll members, create a project and assign sub-tasks
        </p>
      </div>
    </div>
  );
}
