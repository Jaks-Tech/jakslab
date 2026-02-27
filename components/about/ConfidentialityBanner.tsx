import { Shield, Lock, FileCheck, EyeOff } from "lucide-react";

export function ConfidentialityBanner() {
  const promises = [
    {
      icon: Shield,
      title: "Strict Confidentiality",
      desc: "All client information is handled with complete discretion and privacy.",
    },
    {
      icon: Lock,
      title: "Secure Communication",
      desc: "Encrypted channels and protected workflows safeguard every interaction.",
    },
    {
      icon: FileCheck,
      title: "Data Protection",
      desc: "Your files and intellectual property remain fully secure and exclusively yours.",
    },
    {
      icon: EyeOff,
      title: "Anonymous Handling",
      desc: "Projects are processed without exposure of personal identity or sensitive details.",
    },
  ];

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <div className="w-[700px] h-[700px] bg-blue-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-8 lg:px-12 text-center">
        {/* Section Title */}
        <h3 className="text-3xl lg:text-5xl font-extrabold text-white mb-16">
          Our Confidentiality Promise
        </h3>

        {/* Promises Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:border-blue-500/40 hover:-translate-y-2 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
            >
              {/* Icon Container */}
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 transition-all duration-300 group-hover:border-blue-500/40">
                <item.icon className="w-8 h-8 text-blue-400" />
              </div>

              {/* Title */}
              <h4 className="mt-6 text-lg font-semibold text-white">
                {item.title}
              </h4>

              {/* Description */}
              <p className="mt-4 text-slate-400 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}