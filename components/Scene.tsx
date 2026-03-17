"use client";

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">

      {/* ══════════════════════════════════════════
          DARK THEME  (default)
          Abyssal ocean · bioluminescent pulses
      ══════════════════════════════════════════ */}
      <div className="dark:block hidden absolute inset-0">
        {/* Base */}
        <div className="absolute inset-0 bg-[#030912]" />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#04101f_0%,#020810_45%,#030712_100%)]" />

        {/* Teal bloom — top left */}
        <div
          className="absolute -top-[20%] -left-[15%] w-[70%] h-[70%] rounded-full opacity-50"
          style={{
            background: "radial-gradient(ellipse at 38% 38%, #00e5c8 0%, #007aa8 32%, #003a6e 55%, transparent 72%)",
            filter: "blur(80px)",
            animation: "driftA 20s ease-in-out infinite",
          }}
        />
        {/* Violet bloom — top right */}
        <div
          className="absolute -top-[5%] -right-[5%] w-[55%] h-[60%] rounded-full opacity-40"
          style={{
            background: "radial-gradient(ellipse at 68% 28%, #5b42f3 0%, #2a2a9e 35%, transparent 65%)",
            filter: "blur(95px)",
            animation: "driftB 24s ease-in-out infinite reverse",
          }}
        />
        {/* Cyan-green — bottom center */}
        <div
          className="absolute -bottom-[10%] left-[20%] w-[60%] h-[55%] rounded-full opacity-35"
          style={{
            background: "radial-gradient(ellipse at 50% 72%, #00c9a7 0%, #008e82 28%, #004455 52%, transparent 70%)",
            filter: "blur(105px)",
            animation: "driftC 28s ease-in-out infinite",
          }}
        />
        {/* Magenta rift — right */}
        <div
          className="absolute top-[30%] -right-[12%] w-[45%] h-[50%] rounded-full opacity-[0.28]"
          style={{
            background: "radial-gradient(ellipse at 75% 50%, #d946ef 0%, #7c3aed 35%, transparent 65%)",
            filter: "blur(110px)",
            animation: "driftD 22s ease-in-out infinite reverse",
          }}
        />
        {/* Plankton sparkles */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,229,200,0.85) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            opacity: 0.18,
            animation: "twinkle 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(147,197,253,0.9) 1px, transparent 1px)",
            backgroundSize: "62px 62px",
            backgroundPosition: "19px 27px",
            opacity: 0.12,
            animation: "twinkle 10s ease-in-out infinite reverse",
          }}
        />
        {/* Caustic grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(0,229,200,0.8) 1px, transparent 1px), linear-gradient(45deg, rgba(0,229,200,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px, 80px 80px",
          }}
        />
        {/* Depth vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(1300px_circle_at_50%_45%,transparent_35%,rgba(0,0,0,0.70)_100%)]" />
      </div>

    </div>
  );
}