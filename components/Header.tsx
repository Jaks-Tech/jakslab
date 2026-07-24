"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, CalendarDays, ClipboardList, Mail, Menu, MessageSquareText, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },

  { label: "Contact", path: "/contact" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/portfolio" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActionPanelOpen, setIsActionPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync state to close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsActionPanelOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsActionPanelOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = isActionPanelOpen ? "hidden" : "";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isActionPanelOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/5 py-0" : "bg-transparent py-4"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className={cn(
          "flex items-center justify-between h-20 px-4 transition-all duration-500 rounded-2xl",
          !isScrolled && "bg-slate-900/40 backdrop-blur-md border border-white/5"
        )}>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-[110]">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-700">
              <Image src="/jakslab.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">JaksLab</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="relative flex h-20 items-center"
              >
                <Link
                  href={item.path}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    pathname === item.path ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 z-[110]">
            <button
              type="button"
              onClick={() => setIsActionPanelOpen(true)}
              className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 md:flex"
            >
              <MessageSquareText size={17} aria-hidden="true" />
              Book or Request
            </button>
            <button
              type="button"
              onClick={() => setIsActionPanelOpen(true)}
              aria-label="Open booking and enquiry options"
              className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-800 md:hidden"
            >
              <MessageSquareText size={18} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white/5 text-slate-300 border border-white/10"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden fixed inset-x-0 top-[90px] mx-6 p-4 bg-slate-950 border border-white/10 rounded-3xl transition-all duration-500 shadow-2xl z-[105] overflow-y-auto max-h-[80vh]",
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-10 pointer-events-none"
        )}>
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "mb-1 block rounded-xl px-4 py-4 text-sm font-semibold transition-all",
                    pathname === item.path ? "border border-blue-500/20 bg-blue-600/10 text-blue-400" : "text-slate-300 hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            
            <Link
              href="/order"
              className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold"
            >
              <Plus size={18} />
              Get your work done
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[190] bg-slate-950/35 transition-opacity duration-300 ${
          isActionPanelOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsActionPanelOpen(false)}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Contact and booking options"
        className={`fixed right-0 top-0 z-[200] flex h-dvh w-full max-w-[470px] flex-col overflow-y-auto border-l border-slate-300 bg-white text-slate-950 shadow-[-24px_0_60px_rgba(15,23,42,.16)] transition-transform duration-300 ease-out ${
          isActionPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 sm:px-8">
          <Link href="/" onClick={() => setIsActionPanelOpen(false)} className="flex items-center gap-3">
            <span className="relative size-11 overflow-hidden rounded-full border border-slate-300 bg-white">
              <Image src="/jakslab.png" alt="JaksLab logo" fill className="object-cover" />
            </span>
            <span>
              <span className="block font-semibold text-slate-950">JaksLab</span>
              <span className="block text-xs text-slate-600">Content, technology and research</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsActionPanelOpen(false)}
            aria-label="Close contact options"
            className="grid size-11 place-items-center rounded-full border border-slate-300 text-slate-950 hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-1 flex-col px-6 pb-10 pt-5 sm:px-10">
          <div className="mb-7">
            <h1 className="text-3xl font-semibold leading-tight text-slate-950">How can we help?</h1>
            <p className="mt-2 text-sm leading-6 text-slate-700">Choose the closest option. You can provide details on the next page.</p>
          </div>

          <div className="space-y-7">
            <section>
              <span className="grid size-11 place-items-center rounded-2xl bg-[#f3f4f2] text-slate-900"><CalendarDays size={20} /></span>
              <h2 className="mt-4 text-xl font-semibold">Content Marketing</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">Discuss articles, blog work, SEO or AEO in a focused 30-minute call.</p>
              <Link onClick={() => setIsActionPanelOpen(false)} href="/book-call" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#202733] px-5 py-3 text-sm font-semibold text-[#fff]">
                <CalendarDays size={17} aria-hidden="true" />
                Book a 30-minute call
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </section>

            <section className="rounded-2xl bg-[#f3f4f2] p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-slate-900"><ClipboardList size={20} /></span>
              <h2 className="mt-4 text-xl font-semibold">Technology or Research</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">Send the brief, expected result, deadline and any useful files.</p>
              <Link onClick={() => setIsActionPanelOpen(false)} href="/order" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-500 bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                <ClipboardList size={17} aria-hidden="true" />
                Request service
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </section>

            <section>
              <span className="grid size-11 place-items-center rounded-2xl bg-[#f3f4f2] text-slate-900"><Mail size={20} /></span>
              <h2 className="mt-4 text-xl font-semibold">General enquiry</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">Send a short message if you are unsure which route fits.</p>
              <Link onClick={() => setIsActionPanelOpen(false)} href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-500 bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                <Mail size={17} aria-hidden="true" />
                Send an enquiry
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </section>
          </div>
        </div>
      </aside>
    </header>
  );
}
