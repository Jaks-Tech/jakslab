"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface OrderSuccessProps {
  onReset?: () => void;
}

export function OrderSuccess({ onReset }: OrderSuccessProps) {
  return (
    <div className="relative max-w-2xl mx-auto p-14 
                    bg-gradient-to-b from-white to-slate-50 
                    rounded-3xl border border-slate-200 
                    shadow-2xl text-center overflow-hidden">

      {/* Subtle Glow Background */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 
                      w-72 h-72 bg-green-400/10 
                      rounded-full blur-3xl"></div>

      <div className="relative">

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-100 
                          flex items-center justify-center shadow-inner">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Order Submitted Successfully
        </h2>

        {/* Message */}
        <p className="mt-5 text-slate-600 leading-relaxed max-w-lg mx-auto text-lg">
          Thank you for your submission. Our team is reviewing your project
          requirements and will contact you shortly with a personalized quote.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">

          {onReset && (
            <button
              onClick={onReset}
              className="px-7 py-3 rounded-full border border-slate-300 
                         text-slate-800 font-semibold 
                         hover:bg-slate-100 hover:-translate-y-1
                         transition-all duration-300"
            >
              Submit Another Request
            </button>
          )}

          <Link
            href="/"
            className="px-8 py-3 rounded-full 
                       bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white font-semibold shadow-lg 
                       hover:shadow-2xl hover:-translate-y-1 
                       transition-all duration-300"
          >
            Return to Home
          </Link>

        </div>

      </div>
    </div>
  );
}