import Link from "next/link";
import Image from "next/image";
import { Building2, Mail, Phone, Clock, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/20 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-20">

        {/* 4 Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">

          {/* Brand Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 space-y-6 shadow-lg">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.35)]">
                <Image
                  src="/jakslab.png"
                  alt="JaksLab Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-white font-bold text-xl tracking-tight">
                JaksLab
              </h3>
            </div>

            <p className="text-slate-400 leading-relaxed text-sm">
              Precision-driven academic and technical solutions engineered
              for excellence, confidentiality, and reliability.
            </p>
          </div>

          {/* Company Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 space-y-6 shadow-lg">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white">
              <Building2 className="w-5 h-5 text-indigo-400" />
              <h4 className="font-semibold uppercase text-sm tracking-wide">
                Company
              </h4>
            </div>

            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 space-y-6 shadow-lg">
            <h4 className="text-white font-semibold uppercase text-sm tracking-wide text-center md:text-left">
              Contact
            </h4>

            <div className="space-y-4 text-slate-400 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>jakslab.services@gmail.com</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+254 (113) 178-912</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Open 24 Hours, 7 Days a Week</span>
              </div>
            </div>
          </div>

          {/* Legal Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 space-y-6 shadow-lg">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h4 className="font-semibold uppercase text-sm tracking-wide">
                Legal
              </h4>
            </div>

            <div className="space-y-3 text-slate-400 text-sm">
              <Link href="#" className="block hover:text-white transition">
                Privacy Policy
              </Link>

              <Link href="#" className="block hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>

        </div>

        {/* Centered Copyright Below Cards */}
        <div className="mt-16 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} JaksLab. All rights reserved.
        </div>

      </div>
    </footer>
  );
}