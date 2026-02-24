import { Star, ThumbsUp, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-30 pb-24 px-8 lg:px-12 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />

      <div className="max-w-7xl mx-auto text-center">

        {/* Micro Label */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-10">
          Trusted Academic & Technical Lab
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-slate-900 leading-[1.05] max-w-5xl mx-auto">
          Precision Academic &{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Technical Solutions
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-10 text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Get expert support for assignments, research, programming, and development projects -
          delivered on time, confidentially, and with uncompromising quality.
        </p>

        {/* CTA Buttons */}
        <div className="mt-14 flex flex-wrap justify-center gap-6">


        {/* Secondary */}
        <Link
            href="/contact"
            className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all duration-200"
        >
            Request a Quote
        </Link>

        {/* Tertiary */}
        <Link
            href="/services"
            className="px-10 py-4 rounded-2xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-200"
        >
            Explore Services
        </Link>

        {/* Primary */}
        <Link
            href="/order"
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200 flex items-center gap-2"
        >
            Submit Your Project
            <ArrowRight className="w-4 h-4" />
        </Link>

        </div>

        {/* Trust Indicators */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-600">

          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
            <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
            500+ Completed Projects
          </div>

          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
            <ThumbsUp className="w-4 h-4 text-blue-600 fill-blue-600" />
            98% Client Satisfaction
          </div>

          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
            <Clock className="w-4 h-4 text-blue-600 fill-blue-600" />
            24/7 Fast Response
          </div>

        </div>

      </div>
    </section>
  );
}