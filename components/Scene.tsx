"use client";

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-transparent">
      {/* Base deep anime night gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(59,130,246,0.22),transparent_55%),radial-gradient(900px_circle_at_80%_25%,rgba(99,102,241,0.20),transparent_55%),radial-gradient(1000px_circle_at_40%_90%,rgba(59,130,246,0.16),transparent_60%),linear-gradient(180deg,rgba(4,7,16,1)_0%,rgba(6,10,24,1)_50%,rgba(3,6,14,1)_100%)]" />

      {/* Anime aurora ribbons */}
      <div className="absolute -top-24 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rotate-12 rounded-full bg-gradient-to-r from-blue-600/20 via-indigo-600/16 to-blue-600/20 blur-[90px] animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute top-24 left-1/2 h-[420px] w-[900px] -translate-x-1/2 -rotate-12 rounded-full bg-gradient-to-r from-indigo-600/16 via-blue-600/14 to-indigo-600/16 blur-[90px] animate-[float_12s_ease-in-out_infinite_reverse]" />

      {/* Neon skyline glow band */}
      <div className="absolute -bottom-20 left-1/2 h-[420px] w-[1400px] -translate-x-1/2 rounded-full bg-blue-600/12 blur-[140px]" />
      <div className="absolute -bottom-28 left-1/2 h-[520px] w-[1200px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[170px]" />

      {/* Stars / sparkles */}
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:28px_28px] [background-position:0_0] animate-[twinkle_6s_ease-in-out_infinite]" />
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(147,197,253,0.9)_1px,transparent_1px)] [background-size:46px_46px] [background-position:12px_18px] animate-[twinkle_8s_ease-in-out_infinite_reverse]" />

      {/* Subtle scanlines (anime/cinematic) */}
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:100%_6px] mix-blend-overlay" />

      {/* Soft vignette for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_40%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

      {/* Dark overlay (keeps text readable, still transparent vibe) */}
      <div className="absolute inset-0 bg-black/35" />

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateX(-50%) translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateX(-50%) translateY(18px) rotate(12deg);
          }
          100% {
            transform: translateX(-50%) translateY(0px) rotate(12deg);
          }
        }
        @keyframes twinkle {
          0% {
            opacity: 0.22;
            transform: translateY(0px);
          }
          50% {
            opacity: 0.55;
            transform: translateY(-6px);
          }
          100% {
            opacity: 0.22;
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}