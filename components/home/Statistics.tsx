"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Projects Delivered", val: "150+", color: "text-blue-400" },
  { label: "Years Experience", val: "5+", color: "text-indigo-400" },
  { label: "Brilliant Minds", val: "90+", color: "text-purple-400" },
  { label: "Satisfaction Rate", val: "99%", color: "text-emerald-400" },
];

interface StatisticsProps {
  spacing?: string;        // controls outer vertical spacing
  headerSpacing?: string;  // controls spacing below header
  innerPadding?: string;   // controls card padding
}

export default function Statistics({
  spacing = "py-0",
  headerSpacing = "mb-8 sm:mb-10",
  innerPadding = "p-6 sm:p-10 lg:p-12",
}: StatisticsProps) {
  return (
    <div className={`w-full ${spacing}`}>
      {/* Header */}
      <div className={`flex flex-col items-center text-center px-4 ${headerSpacing}`}>
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
          The Global Hub for Excellence
        </h2>
      </div>

      {/* Stats Section */}
      <div className="w-full px-0 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`relative w-full overflow-hidden bg-white/[0.02] backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl sm:rounded-3xl ${innerPadding}`}
        >
          {/* Ambient Glows */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 items-center">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center px-4 ${
                  i !== stats.length - 1 ? "lg:border-r border-white/10" : ""
                }`}
              >
                <div
                  className={`text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight ${stat.color}`}
                >
                  {stat.val}
                </div>

                <div className="mt-4 text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] text-slate-400 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
