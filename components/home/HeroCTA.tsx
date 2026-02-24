"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

export default function HeroCTA() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when modal is open
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
                     text-white font-semibold shadow-lg 
                     hover:shadow-xl hover:scale-[1.02] 
                     transition-all duration-200 
                     flex items-center gap-2"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Pop-Up */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal Card */}
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

                <div className="flex flex-col items-center mb-6">

                <img
                    src="/jakslab.png"
                    alt="JaksLab Logo"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4"
                />

                <h3 className="text-2xl font-bold text-slate-900 text-center">
                    Jakslabs Here...
                </h3>

                </div>

            <div className="flex flex-col gap-4">

              <Link
                href="/order"
                className="px-6 py-4 rounded-xl 
                           bg-gradient-to-r from-blue-600 to-indigo-600 
                           text-white text-center font-semibold 
                           hover:shadow-lg transition"
                onClick={() => setOpen(false)}
              >
                Hire a Service
              </Link>

              <Link
                href="/contact"
                className="px-6 py-4 rounded-xl 
                           bg-slate-900 text-white text-center font-semibold 
                           hover:bg-slate-800 transition"
                onClick={() => setOpen(false)}
              >
                Request a Quote
              </Link>

              <Link
                href="/services"
                className="px-6 py-4 rounded-xl 
                           border border-slate-300 text-slate-700 
                           text-center font-semibold 
                           hover:bg-slate-50 transition"
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