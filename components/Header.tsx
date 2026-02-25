"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/portfolio" },
  
  
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-slate-800"
              : "bg-slate-900/70 backdrop-blur-md"
          }`}
        >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Logo Image */}
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-700 group-hover:border-blue-500 transition duration-300">
                <Image
                  src="/jakslab.png"
                  alt="JaksLab Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <span className="text-white font-bold text-xl tracking-tight group-hover:text-blue-400 transition duration-300">
              JaksLab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="relative text-sm font-medium text-slate-300 hover:text-white transition duration-300"
              >
                {item.label}

                {/* Animated Underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ${
                    isActive(item.path)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex">
            <Link
              href="/order"
              className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-md hover:shadow-blue-500/30 hover:scale-[1.05] transition-all duration-300"
            >
              Submit Assignment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 transition"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-slate-800 bg-slate-900">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive(item.path)
                      ? "text-white bg-slate-800"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-center"
              >
                Submit Assignment
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}