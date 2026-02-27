"use client";

import { Star } from "lucide-react";
import { useEffect, useRef } from "react";

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "CS Student",
    content:
      "JaksLab saved my grades! The code was clean and delivered way ahead of schedule.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "James Chen",
    role: "Engineering Lead",
    content:
      "The technical research provided was top-tier. Extremely professional and thorough.",
    color: "from-purple-400 to-pink-500",
  },
  {
    name: "Elena Rodriguez",
    role: "Graduate Student",
    content:
      "The best essay writing service I've used. They actually follow instructions perfectly.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    name: "Michael Grant",
    role: "Software Developer",
    content:
      "Exceptional attention to detail. Their development work exceeded expectations.",
    color: "from-orange-400 to-red-500",
  },
  {
    name: "Amina Hassan",
    role: "MBA Student",
    content:
      "Professional, responsive, and very reliable. Highly recommended!",
    color: "from-cyan-400 to-blue-500",
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const speed = 0.5;

    const animate = () => {
      scrollAmount += speed;
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }
      container.scrollLeft = scrollAmount;
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <section className="py-24 px-6 bg-transparent relative">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Our Clients Say
          </h2>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
            Trusted by students and professionals across disciplines.
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-hidden"
          >
            {[...reviews, ...reviews].map((review, i) => (
              <div
                key={i}
                className="min-w-[320px] md:min-w-[380px] lg:min-w-[420px] 
                           bg-white/5 backdrop-blur-xl
                           border border-white/10
                           hover:border-blue-500/40
                           hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]
                           p-8 rounded-3xl
                           transition-all duration-500"
              >
                {/* Stars */}
                <div className="flex text-yellow-400 mb-4 gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} size={16} fill="currentColor" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-slate-300 italic text-sm leading-relaxed">
                  "{review.content}"
                </p>

                {/* Profile */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${review.color}`}
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-white text-sm">
                      {review.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dark Fade Edges */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}