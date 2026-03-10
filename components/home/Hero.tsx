import { Star, ThumbsUp, Clock } from "lucide-react";
import HeroCTA from "./HeroCTA";

export default function Hero() {
  return (
    <section className="relative pt-20 sm:pt-20 pb-16 sm:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden bg-transparent">
      
      <div className="max-w-7xl mx-auto text-center">

        {/* Micro Label */}
        <div
          className="inline-flex items-center gap-2 
          px-5 py-2 rounded-full 
          bg-blue-500/10 
          border border-blue-500/20 
          text-blue-400 
          text-xs sm:text-sm font-medium mb-8"
        >
          AI-Powered Academic & Dev Platform
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          font-bold tracking-tight text-white 
          leading-tight max-w-5xl mx-auto"
        >
          Build Better Projects With{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Expert Academic & Technical Support
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="mt-8 text-lg md:text-xl 
          text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          A modern platform helping students and developers complete
          assignments, research, and software projects faster - with
          expert guidance, reliable delivery, and zero stress.
        </p>

        {/* CTA (keeps your original link logic) */}
        <div className="mt-10 flex justify-center">
          <HeroCTA />
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">

          <div className="flex items-center gap-2">
            <Star className="text-yellow-400" size={16} />
            <span>4.9 Average Rating</span>
          </div>

          <div className="flex items-center gap-2">
            <ThumbsUp className="text-green-400" size={16} />
            <span>150+ Projects Completed</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="text-blue-400" size={16} />
            <span>24/7 Expert Support</span>
          </div>

        </div>

      </div>
    </section>
  );
}