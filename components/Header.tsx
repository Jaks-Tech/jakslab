"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, CalendarDays, ClipboardList, Mail, Menu, MessageSquareText, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResponsiveContainer } from "@/components/layout/ResponsiveLayout";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },

  { label: "Contact", path: "/contact" },
  { label: "Our Insights", path: "/portfolio" },
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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsActionPanelOpen(false);
    };
    const handleOpenActionPanel = () => setIsActionPanelOpen(true);

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("jakslab:open-action-panel", handleOpenActionPanel);
    document.body.style.overflow = isActionPanelOpen ? "hidden" : "";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("jakslab:open-action-panel", handleOpenActionPanel);
      document.body.style.overflow = "";
    };
  }, [isActionPanelOpen]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] bg-transparent py-4 transition-all duration-500",
        isScrolled && "backdrop-blur-md"
      )}
    >
      <ResponsiveContainer>
        <div className={cn(
          "site-header-surface flex h-20 items-center justify-between rounded-2xl border border-white/60 bg-transparent px-4 shadow-[0_8px_30px_rgba(15,23,42,.07)] backdrop-blur-md transition-all duration-500",
          isScrolled && "border-slate-300/70 shadow-[0_10px_35px_rgba(15,23,42,.1)]"
        )}>
          
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 z-[110]">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-700">
              <Image src="/jakslab.png" alt="Logo" fill className="header-color-logo object-cover" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-950">JaksLab</span>
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
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    pathname === item.path ? "bg-white/55 text-slate-950" : "text-slate-700 hover:bg-white/35 hover:text-slate-950"
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
              Start a project
            </button>
            <button
              type="button"
              onClick={() => setIsActionPanelOpen(true)}
              aria-label="Open booking and enquiry options"
              className="grid size-10 place-items-center rounded-xl border border-slate-300/70 bg-white/35 text-slate-800 md:hidden"
            >
              <MessageSquareText size={18} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl border border-slate-300/70 bg-white/35 p-2.5 text-slate-800 md:hidden"
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
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold"
            >
              <Plus size={18} />
              Get your work done
            </Link>
          </div>
        </div>
      </ResponsiveContainer>

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
        className={`fixed right-4 top-28 z-[200] max-h-[calc(100dvh-8rem)] w-[calc(100%-2rem)] max-w-[430px] overflow-y-auto rounded-[2rem] border border-white/70 bg-white/90 text-slate-950 shadow-[0_28px_90px_rgba(15,23,42,.22)] backdrop-blur-xl transition-all duration-300 ease-out sm:right-6 ${
          isActionPanelOpen
            ? "translate-x-0 scale-100 opacity-100"
            : "pointer-events-none translate-x-[calc(100%+2rem)] scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 sm:px-6">
          <Link href="/" onClick={() => setIsActionPanelOpen(false)} className="flex items-center gap-3">
            <span className="relative size-9 overflow-hidden rounded-full border border-slate-300 bg-white">
              <Image src="/jakslab.png" alt="JaksLab logo" fill className="header-color-logo object-cover" />
            </span>
            <span>
              <span className="block font-semibold text-slate-950">JaksLab</span>
              <span className="block text-[11px] text-slate-600">Search growth, research and digital products</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsActionPanelOpen(false)}
            aria-label="Close contact options"
            className="grid size-9 place-items-center rounded-full border border-slate-300 bg-transparent text-slate-950 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pb-6 pt-1 sm:px-6">
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#8a5a3b]">Start here</p>
            <h1 className="mt-2 font-serif text-[2rem] font-normal leading-tight text-slate-950">What would you like to move forward?</h1>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">Book a short call to clarify the need, or send the work directly for review.</p>
          </div>

          <div className="grid gap-4">
            <section className="rounded-[2rem_3rem_2rem_2rem] bg-[#ead8c5] p-5">
              <span className="grid size-10 place-items-center rounded-full bg-white/55 text-[#4a3021]"><CalendarDays size={19} /></span>
              <h2 className="mt-4 font-serif text-xl font-normal">Content and Search Growth</h2>
              <p className="mt-2 text-sm leading-6 text-[#604d40]">Improve useful content, organic visibility, SEO and answer-engine reach around your real expertise.</p>
              <Link onClick={() => setIsActionPanelOpen(false)} href="/book-call" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#3f2b20] px-5 py-2.5 text-sm font-semibold text-[#fff] transition hover:bg-[#563b2b]">
                <CalendarDays size={17} aria-hidden="true" />
                Book a 30-minute strategy call
              </Link>
            </section>

            <section className="rounded-[3rem_2rem_2rem_2rem] bg-[#e2e0da] p-5">
              <span className="grid size-10 place-items-center rounded-full bg-white/60 text-slate-800"><ClipboardList size={19} /></span>
              <h2 className="mt-4 font-serif text-xl font-normal">Research or Product Delivery</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Send us the problem, requirements, or existing brief. We can research the direction or deliver the working product.</p>
              <Link onClick={() => setIsActionPanelOpen(false)} href="/order" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-500/40 bg-white/65 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white">
                <ClipboardList size={17} aria-hidden="true" />
                Request a service
              </Link>
            </section>

            <section className="rounded-[2rem_2rem_3rem_2rem] bg-[#f2eee6] p-5">
              <span className="grid size-10 place-items-center rounded-full bg-white/70 text-slate-800"><Mail size={19} /></span>
              <h2 className="mt-4 font-serif text-xl font-normal">Academic Research Tutoring</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Get structured guidance on research questions, literature, methods, analysis, writing and presentation.</p>
              <Link onClick={() => setIsActionPanelOpen(false)} href="/contact" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-2 py-2.5 text-sm font-semibold text-[#5a3a27] underline decoration-[#9c6844]/45 underline-offset-8">
                <Mail size={17} aria-hidden="true" />
                Ask about tutoring
              </Link>
            </section>
          </div>
        </div>
      </aside>
    </header>
  );
}
