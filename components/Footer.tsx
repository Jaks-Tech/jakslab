import Link from "next/link";
import {
  GraduationCap,
  Mail,
  Phone,
  Clock,
  Building2,
  Sparkles,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/20 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12 py-24">

        {/* Card Grid */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* JaksLab Card */}
          <div className="group relative p-8 rounded-3xl bg-slate-900/60 backdrop-blur border border-slate-800 hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-2xl tracking-tight">
                JaksLab
              </h3>
            </div>

            <p className="text-slate-400 leading-relaxed">
              Precision-driven academic and technical solutions engineered
              for excellence, confidentiality, and reliability.
            </p>

            {/* Soft Glow Overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/10 transition duration-500 pointer-events-none" />
          </div>

          {/* Company Card */}
          <div className="group relative p-8 rounded-3xl bg-slate-900/60 backdrop-blur border border-slate-800 hover:border-indigo-500/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]">

            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-indigo-400" />
              <h3 className="text-white font-semibold text-xl">
                Company
              </h3>
            </div>

            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/10 transition duration-500 pointer-events-none" />
          </div>

          {/* Contact Card */}
          <div className="group relative p-8 rounded-3xl bg-slate-900/60 backdrop-blur border border-slate-800 hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">

            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <h3 className="text-white font-semibold text-xl">
                Contact
              </h3>
            </div>

            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>jakslab.services@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+254 (113) 178-912</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Open 24 Hours, 7 Days a Week</span>
              </div>
            </div>

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/10 transition duration-500 pointer-events-none" />
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">

          <span>
            © {new Date().getFullYear()} JaksLab. All rights reserved.
          </span>

          <div className="flex gap-6">
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