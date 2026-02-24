import Link from "next/link";
import Image from "next/image";
import { Building2, Mail, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/25 via-transparent to-indigo-900/25 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-20">

        {/* Grid */}
        <div className="grid gap-16 md:grid-cols-3 text-center md:text-left">

          {/* Brand Section */}
          <div className="space-y-6">

            <div className="flex items-center justify-center md:justify-start gap-4">
              
              {/* Rounded Glowing Logo */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.35)]">
                <Image
                  src="/jakslab.png"
                  alt="JaksLab Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-white font-bold text-2xl tracking-tight">
                JaksLab
              </h3>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Precision-driven academic and technical solutions engineered
              for excellence, confidentiality, and reliability.
            </p>

            <div className="h-px w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto md:mx-0" />
          </div>

          {/* Company */}
          <div className="space-y-6">

            <div className="flex items-center justify-center md:justify-start gap-2 text-white">
              <Building2 className="w-5 h-5 text-indigo-400" />
              <h4 className="font-semibold tracking-wide uppercase text-sm">
                Company
              </h4>
            </div>

            <ul className="space-y-3 text-slate-400">
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

          {/* Contact */}
          <div className="space-y-6">

            <h4 className="text-white font-semibold tracking-wide uppercase text-sm text-center md:text-left">
              Contact
            </h4>

            <div className="space-y-4 text-slate-400">

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

        </div>

        {/* Bottom Section */}
        <div className="mt-20 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-6 text-sm text-slate-500 text-center md:text-left">

          <p>
            © {new Date().getFullYear()} JaksLab. All rights reserved.
          </p>

          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}