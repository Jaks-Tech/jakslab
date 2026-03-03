"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const review = reviews[activeIndex];

  return (
    <section className="relative pt-20 pb-24 px-4">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex px-4 py-1 mb-4 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-full backdrop-blur-sm">
          Testimonials
        </div>

        <h2 className="text-2xl md:text-5xl font-bold text-white leading-tight">
          What Our Clients Say
        </h2>

      </div>

      {/* Slider */}
      <div className="relative max-w-3xl mx-auto transition-opacity duration-700 ease-in-out">
        <div className="text-center">
          {/* Stars */}
          <div className="flex justify-center text-yellow-400 mb-6 gap-1">
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={18} fill="currentColor" />
            ))}
          </div>

          {/* Content */}
          <p className="text-slate-300 italic text-lg leading-relaxed mb-8">
            "{review.content}"
          </p>

          {/* Author */}
          <div className="flex justify-center items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <div
                className={`w-full h-full bg-gradient-to-br ${review.color}`}
              />
            </div>

            <div className="text-left">
              <p className="font-semibold text-white">
                {review.name}
              </p>
              <p className="text-sm text-slate-400">
                {review.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-10 gap-3">
        {reviews.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-6 bg-blue-500"
                : "w-2 bg-slate-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}