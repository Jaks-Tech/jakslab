"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

export default function HeroCTA() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* Main CTA Button */}
      <div className="mt-10 sm:mt-14 flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="px-10 py-4 rounded-2xl 
                     bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white font-semibold 
                     shadow-lg shadow-blue-600/20
                     hover:shadow-blue-600/40 
                     hover:scale-[1.03] 
                     transition-all duration-300 
                     flex items-center gap-2"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          {/* Dark Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* Glass Modal Card */}
          <div className="relative w-full max-w-md rounded-3xl
                          bg-white/5 backdrop-blur-xl
                          border border-white/10
                          shadow-[0_0_60px_rgba(59,130,246,0.15)]
                          p-8
                          animate-in fade-in zoom-in-95 duration-200">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo + Title */}
            <div className="flex flex-col items-center mb-8">

              <img
                src="/jakslab.png"
                alt="JaksLab Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4"
              />

              <h3 className="text-2xl font-bold text-white text-center">
                JaksLab Here...
              </h3>

              <p className="text-slate-400 text-sm mt-2 text-center">
                Choose how you'd like to proceed
              </p>

            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">

              <Link
                href="/order"
                className="px-6 py-4 rounded-xl 
                           bg-gradient-to-r from-blue-600 to-indigo-600 
                           text-white text-center font-semibold 
                           shadow-lg shadow-blue-600/20
                           hover:shadow-blue-600/40
                           transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                Hire a Service
              </Link>

              <Link
                href="/contact"
                className="px-6 py-4 rounded-xl 
                           bg-white/10 backdrop-blur
                           border border-white/10
                           text-white text-center font-semibold 
                           hover:border-blue-500/40
                           transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                Request a Quote
              </Link>

              <Link
                href="/services"
                className="px-6 py-4 rounded-xl 
                           bg-white/5
                           border border-white/10 
                           text-slate-300 
                           text-center font-semibold 
                           hover:text-white hover:border-blue-500/40
                           transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                Explore Services
              </Link>

            </div>
          </div>
        </div>
      )}
    </>
  );
}