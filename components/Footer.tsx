import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-32 text-slate-400 overflow-hidden w-full">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-black" />

      {/* Center Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Accent Line */}
      <div className="relative h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* Logo + Brand */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.35)]">
                <Image
                  src="/jakslab.png"
                  alt="JaksLab Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
                JaksLab
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              Precision-driven academic and technical solutions engineered
              for excellence, confidentiality, and reliability.
            </p>

            {/* Service Notice */}
            <div className="flex gap-4 items-start max-w-md bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 hover:border-blue-500/50">
              <ShieldCheck className="text-blue-400 shrink-0" size={20} />

              <div className="text-xs leading-relaxed italic">
                <span className="text-slate-200 font-semibold block mb-2 tracking-wide">
                  Service Notice
                </span>
                All consultations and academic services are handled with strict confidentiality.
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col md:items-end gap-8">

            {/* Icons */}
            <div className="flex gap-6 items-center">
              <a
                href="https://github.com/Jaks-Tech"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all"
              >
                <FaGithub size={20} className="hover:text-blue-400 transition-colors" />
              </a>

              <a
                href="mailto:jakslab.services@gmail.com"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all"
              >
                <Mail size={20} className="hover:text-blue-400 transition-colors" />
              </a>

              <a
                href="tel:+254113178912"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all"
              >
                <Phone size={20} className="hover:text-blue-400 transition-colors" />
              </a>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-8 uppercase tracking-wide text-xs font-medium text-slate-500">
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/portfolio" className="hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>

            {/* Tagline */}
            <p className="text-[11px] tracking-[0.35em] uppercase text-slate-600 font-semibold">
              Engineered for Excellence
            </p>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs">

          <p className="text-slate-500">
            © {currentYear}{" "}
            <span className="text-slate-300 font-medium">JaksLab</span>. All rights reserved.
          </p>

          <div className="flex gap-8 uppercase tracking-wide font-medium text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}