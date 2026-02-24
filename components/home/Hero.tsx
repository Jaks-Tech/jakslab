import { Star, ThumbsUp, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-16 sm:pt-15 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
    
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 
                    w-[500px] sm:w-[800px] lg:w-[1000px] 
                    h-[500px] sm:h-[800px] lg:h-[1000px] 
                    bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />

    <div className="max-w-7xl mx-auto text-center">

        {/* Micro Label */}
        <div className="inline-flex items-center gap-2 
                        px-4 sm:px-5 py-2 rounded-full 
                        bg-blue-50 border border-blue-100 
                        text-blue-600 text-xs sm:text-sm font-medium mb-8 sm:mb-10">
        Trusted Academic & Technical Lab
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                    font-bold tracking-tight text-slate-900 
                    leading-tight sm:leading-[1.05] 
                    max-w-5xl mx-auto">
        Precision Academic &{" "}
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Technical Solutions
        </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl 
                    text-slate-600 max-w-3xl mx-auto leading-relaxed">
        Get expert support for assignments, research, programming, and development projects -
        delivered on time, confidentially, and with uncompromising quality.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 sm:mt-14 
                        flex flex-col sm:flex-row 
                        items-center justify-center 
                        gap-4 sm:gap-6">

        <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl 
                    bg-slate-900 text-white font-semibold 
                    hover:bg-slate-800 transition-all duration-200 text-center"
        >
            Request a Quote
        </Link>

        <Link
            href="/services"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl 
                    border border-slate-300 text-slate-700 font-semibold 
                    hover:bg-slate-50 transition-all duration-200 text-center"
        >
            Explore Services
        </Link>

        <Link
            href="/order"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl 
                    bg-gradient-to-r from-blue-600 to-indigo-600 
                    text-white font-semibold shadow-lg 
                    hover:shadow-xl hover:scale-[1.02] 
                    transition-all duration-200 
                    flex items-center justify-center gap-2"
        >
            Submit Your Project
            <ArrowRight className="w-4 h-4" />
        </Link>

        </div>


    </div>
    </section>
  );
}