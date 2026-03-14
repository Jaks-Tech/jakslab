"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Cpu, FileSearch, Quote, ArrowRight, Plus, Library } from "lucide-react";
import { cn } from "@/lib/utils";

const productItems = [
  { 
    label: "Chat-Your-Doc", 
    path: "/chat-doc", // Pointing to exact personal page
    description: "Deep document analysis", 
    icon: <FileSearch size={16} /> 
  },
  { 
    label: "Research Planner", 
    path: "/ai-doc-analysis", // Pointing to exact personal page
    description: "Strategic project architect", 
    icon: <Cpu size={16} /> 
  },
{ 
  label: "Generate Literature Sources", 
  path: "/literature-planner", 
  description: "Comprehensive synthesis matrix", 
  icon: <Library size={16} /> // Or <ListChecks size={16} /> for a roadmap feel
},

  { 
    label: "Citation Generator", 
    path: "/citation-generator", // Pointing to exact personal page
    description: "Universal referencing", 
    icon: <Quote size={16} /> 
  },
];

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products", hasDropdown: true },
  { label: "Contact", path: "/contact" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/portfolio" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
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
    setIsProductsOpen(false);
  }, [pathname]);

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
                className="relative h-20 flex items-center" // Height matches header to prevent gap
                onMouseEnter={() => item.hasDropdown && setIsProductsOpen(true)} 
                onMouseLeave={() => item.hasDropdown && setIsProductsOpen(false)}
              >
                {item.hasDropdown ? (
                  <div className="relative">
                    <button className={cn(
                      "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all",
                      isProductsOpen || pathname.includes('products') ? "text-white bg-white/10" : "text-slate-400 hover:text-white"
                    )}>
                      {item.label} <ChevronDown size={14} className={cn("transition-transform duration-300", isProductsOpen && "rotate-180")} />
                    </button>

                    {/* Desktop Dropdown - Fixed "Flicker" with pt-6 bridge */}
                    <div className={cn(
                      "absolute top-[100%] left-1/2 -translate-x-1/2 pt-4 w-72 transition-all duration-300 origin-top",
                      isProductsOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    )}>
                      <div className="p-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl">
                        {productItems.map((p) => (
                          <Link 
                            key={p.path} 
                            href={p.path} 
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 group/item"
                          >
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                              {p.icon}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{p.label}</div>
                              <p className="text-[10px] text-slate-500 line-clamp-1">{p.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={item.path} 
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all", 
                      pathname === item.path ? "text-white bg-white/10" : "text-slate-400 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 z-[110]">
            <Link href="/order" className="hidden md:flex px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all shadow-lg shadow-blue-500/20">
              Create Task
            </Link>
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
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                      className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-slate-300 bg-white/[0.02] mb-1"
                    >
                      <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                      <ChevronDown size={18} className={cn("transition-transform duration-300", isProductsOpen && "rotate-180")} />
                    </button>
                    {isProductsOpen && (
                      <div className="grid gap-2 mb-2 px-2 animate-in fade-in slide-in-from-top-2">
                        {productItems.map((p) => (
                          <Link
                            key={p.path}
                            href={p.path}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/5 text-slate-400"
                          >
                            <div className="text-blue-400">{p.icon}</div>
                            <span className="text-xs font-bold uppercase tracking-widest">{p.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      "block px-4 py-4 rounded-xl text-sm font-semibold transition-all mb-1",
                      pathname === item.path ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" : "text-slate-300 hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            <Link
              href="/order"
              className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold"
            >
              <Plus size={18} />
              Create Task
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}