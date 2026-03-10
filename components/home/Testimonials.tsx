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
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const review = reviews[activeIndex];

  return (
    <section className="relative py-24 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE MESSAGE */}
        <div>

          <div className="inline-flex px-4 py-1 mb-6 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-full backdrop-blur-sm">
            Testimonials
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Trusted by Students
            <br />
            & Professionals
          </h2>

          <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-md">
            Thousands of clients trust Jakslab for academic assistance,
            programming solutions, and technical research.
            Our experts deliver quality results on time.
          </p>

        </div>

        {/* RIGHT SIDE CARD */}
        <div className="relative">

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500">

            {/* Stars */}
            <div className="flex text-yellow-400 mb-6 gap-1">
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={18} fill="currentColor" />
              ))}
            </div>

            {/* Content */}
            <p className="text-slate-300 italic text-lg leading-relaxed mb-8">
              "{review.content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full overflow-hidden">
                <div
                  className={`w-full h-full bg-gradient-to-br ${review.color}`}
                />
              </div>

              <div>
                <p className="font-semibold text-white">
                  {review.name}
                </p>
                <p className="text-sm text-slate-400">
                  {review.role}
                </p>
              </div>

            </div>

          </div>

          {/* Dots */}
          <div className="flex mt-6 gap-3">
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

        </div>

      </div>

    </section>
  );
}