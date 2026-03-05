import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, ShieldCheck, ChevronRight, MapPin } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-24 pb-10 text-slate-400 overflow-hidden w-full border-t border-white/5 bg-[#030712]">
      
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/10 pointer-events-none" />
      
      {/* Center Top Glow */}
      <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-[100%] pointer-events-none" />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* --- Main Footer Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* COLUMN 1: Brand & Socials (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer w-fit">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:ring-blue-500/50 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-500">
                <Image
                  src="/jakslab.png"
                  alt="JaksLab Logo"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight text-white">
                  JaksLab
                </h3>
                <p className="text-[10px] tracking-[0.3em] uppercase text-blue-400 font-bold mt-1">
                  Engineered Excellence
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Precision-driven academic and technical solutions delivered with uncompromising quality, total confidentiality, and absolute reliability.
            </p>

            <div className="flex gap-4 items-center pt-2">
              <SocialIcon href="https://github.com/Jaks-Tech" icon={<FaGithub size={18} />} />
              <SocialIcon href="mailto:hello@jakslab.work" icon={<Mail size={18} />} />
              <SocialIcon href="tel:+254113178912" icon={<Phone size={18} />} />
            </div>
          </div>

          {/* COLUMN 2: Quick Links (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm">Navigation</h4>
            <ul className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/portfolio">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* COLUMN 3: Legal & Support (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm">Legal</h4>
            <ul className="space-y-3">
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/return">Refund Policy</FooterLink>
              <FooterLink href="/sitemap">Sitemap</FooterLink>
            </ul>
          </div>

          {/* COLUMN 4: Trust Badge & Location (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:pl-8">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm">Commitment</h4>
            
            {/* Elegant Trust Badge */}
            <div className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full group-hover:bg-blue-500/20 transition-colors" />
              
              <div className="relative z-10 flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h5 className="text-slate-200 font-bold mb-1">100% Confidentiality</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    All consultations, projects, and academic services are handled with strict privacy protocols and secure encryption.
                  </p>
                </div>
              </div>
            </div>

            {/* Location/Contact snippet */}
            <div className="flex items-center gap-3 text-sm text-slate-500 pt-2">
              <MapPin size={16} className="text-blue-500/70" />
              <span>Nairobi, Kenya • Global Reach</span>
            </div>
          </div>

        </div>

        {/* --- Bottom Strip --- */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} <span className="text-slate-300 font-semibold">JaksLab</span>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">All systems operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* --- Helper Components for clean code --- */

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="group flex items-center text-sm text-slate-400 hover:text-white transition-colors w-fit"
      >
        <ChevronRight size={14} className="text-blue-500/0 -ml-4 group-hover:text-blue-500 group-hover:ml-0 transition-all duration-300" />
        <span className="transform transition-transform duration-300 group-hover:translate-x-1">
          {children}
        </span>
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
    >
      {icon}
    </a>
  );
}