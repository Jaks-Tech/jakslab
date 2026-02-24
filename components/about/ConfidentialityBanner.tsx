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
    <section className="relative py-28 bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-800 overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-400/20 blur-[150px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-400/20 blur-[150px] rounded-full" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-8 lg:px-12 text-center">

        {/* Section Title */}
        <h3 className="text-3xl lg:text-5xl font-extrabold text-white mb-16">
          Our Confidentiality Promise
        </h3>

        {/* Promises Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((item, i) => (
            <div
              key={i}
              className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl transition-all duration-500 hover:-translate-y-3"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

              {/* Icon Container */}
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-white/20 border border-white/30 shadow-md group-hover:shadow-blue-400/40 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h4 className="mt-6 text-lg font-semibold text-white">
                {item.title}
              </h4>

              {/* Description */}
              <p className="mt-4 text-blue-100 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}