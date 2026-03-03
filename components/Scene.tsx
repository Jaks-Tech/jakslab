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

      {/* ══════════════════════════════════════════
          LIGHT THEME  (.dark removed from <html>)
          Golden hour parchment · warm ink blooms
      ══════════════════════════════════════════ */}
      <div className="dark:hidden block absolute inset-0">
        {/* Warm ivory base */}
        <div className="absolute inset-0 bg-[#f5f0e8]" />

        {/* Paper grain texture */}
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* Golden-hour amber — top left */}
        <div
          className="absolute -top-[18%] -left-[12%] w-[72%] h-[72%] rounded-full opacity-55"
          style={{
            background: "radial-gradient(ellipse at 35% 40%, #f6c97a 0%, #e8955a 28%, #d4634a 52%, transparent 70%)",
            filter: "blur(88px)",
            animation: "driftA 18s ease-in-out infinite",
          }}
        />
        {/* Saffron — top right */}
        <div
          className="absolute -top-[10%] right-[0%] w-[55%] h-[60%] rounded-full opacity-40"
          style={{
            background: "radial-gradient(ellipse at 65% 30%, #f7d58b 0%, #f0a96b 35%, transparent 68%)",
            filter: "blur(100px)",
            animation: "driftB 22s ease-in-out infinite reverse",
          }}
        />
        {/* Sage green — bottom right */}
        <div
          className="absolute bottom-[0%] -right-[10%] w-[60%] h-[58%] rounded-full opacity-35"
          style={{
            background: "radial-gradient(ellipse at 60% 65%, #9dc5a0 0%, #7aabaa 35%, transparent 68%)",
            filter: "blur(110px)",
            animation: "driftC 26s ease-in-out infinite",
          }}
        />
        {/* Dusty rose — bottom left */}
        <div
          className="absolute -bottom-[15%] -left-[8%] w-[50%] h-[55%] rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse at 35% 70%, #e8a5b0 0%, #d4778a 30%, transparent 65%)",
            filter: "blur(95px)",
            animation: "driftD 20s ease-in-out infinite reverse",
          }}
        />
        {/* Centre luminance lift */}
        <div
          className="absolute top-[20%] left-[30%] w-[44%] h-[44%] rounded-full opacity-25"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, #fffbf0 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Ink dot texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #6b4226 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Ruled lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(to bottom, #8c6a4a 1px, transparent 1px)",
            backgroundSize: "100% 52px",
          }}
        />
        {/* Warm vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(1400px_circle_at_50%_40%,transparent_40%,rgba(100,55,20,0.18)_100%)]" />
      </div>

      {/* ══ Shared keyframes ══ */}
      <style jsx global>{`
        @keyframes driftA {
          0%   { transform: translate(0px,   0px)  scale(1);    }
          33%  { transform: translate(22px,  18px) scale(1.04); }
          66%  { transform: translate(-14px, 28px) scale(0.97); }
          100% { transform: translate(0px,   0px)  scale(1);    }
        }
        @keyframes driftB {
          0%   { transform: translate(0px,   0px)   scale(1);    }
          40%  { transform: translate(-20px, 24px)  scale(1.05); }
          75%  { transform: translate(16px,  -12px) scale(0.96); }
          100% { transform: translate(0px,   0px)   scale(1);    }
        }
        @keyframes driftC {
          0%   { transform: translate(0px,  0px)   scale(1);    }
          30%  { transform: translate(18px, -20px) scale(1.03); }
          70%  { transform: translate(-22px, 14px) scale(0.98); }
          100% { transform: translate(0px,  0px)   scale(1);    }
        }
        @keyframes driftD {
          0%   { transform: translate(0px,   0px)   scale(1);    }
          45%  { transform: translate(-16px, 22px)  scale(1.06); }
          80%  { transform: translate(20px,  -10px) scale(0.95); }
          100% { transform: translate(0px,   0px)   scale(1);    }
        }
        @keyframes twinkle {
          0%   { opacity: 0.10; }
          50%  { opacity: 0.22; }
          100% { opacity: 0.10; }
        }
      `}</style>
    </div>
  );
}