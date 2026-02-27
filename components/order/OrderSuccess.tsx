"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface OrderSuccessProps {
  onReset?: () => void;
}

export function OrderSuccess({ onReset }: OrderSuccessProps) {
  return (
    <div className="relative max-w-2xl mx-auto p-14 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] text-center overflow-hidden">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute inset-0 flex justify-center -z-10">
        <div className="w-full h-full bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <CheckCircle className="w-12 h-12 text-blue-400" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Order Submitted <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Successfully</span>
        </h2>

        {/* Message */}
        <p className="mt-5 text-slate-400 leading-relaxed max-w-lg mx-auto text-lg">
          Thank you for your submission. Our team is reviewing your project
          requirements and will contact you shortly with a personalized quote.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {onReset && (
            <button
              onClick={onReset}
              className="px-8 py-3 rounded-2xl bg-white/10 border border-white/10 text-white font-semibold transition-all hover:bg-white/20 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
            >
              Submit Another Request
            </button>
          )}

          <Link
            href="/"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}