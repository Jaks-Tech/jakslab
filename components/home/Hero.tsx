import { Star, ThumbsUp, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroCTA from "./HeroCTA";

export default function Hero() {
  return (
    <section className="relative pt-20 sm:pt-10 pb-10 sm:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden bg-transparent">

      <div className="max-w-7xl mx-auto text-center">

        {/* Micro Label */}
        <div className="inline-flex items-center gap-2 
                        px-4 sm:px-5 py-2 rounded-full 
                        bg-white/10 
                        border border-white/20 
                        text-blue-400 
                        text-xs sm:text-sm font-medium mb-8 sm:mb-10">
          Trusted Academic & Technical Lab
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                       font-bold tracking-tight text-white 
                       leading-tight sm:leading-[1.05] 
                       max-w-5xl mx-auto">
          Precision Academic &{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Technical Solutions
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl 
                      text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Get expert support for assignments, research, programming, and development projects -
          delivered on time, confidentially, and with uncompromising quality.
        </p>

        {/* CTA */}
        <HeroCTA />

      </div>
    </section>
  );
}