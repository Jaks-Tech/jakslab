"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full group">
      {/* Icon */}
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors duration-300 group-focus-within:text-blue-400" />

      {/* Input */}
      <input
        type="text"
        placeholder="Search articles..."
        className="
          w-full
          pl-14 pr-5 py-4
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          text-white
          placeholder:text-slate-500
          transition-all duration-300
          focus:outline-none
          focus:border-blue-500/40
          hover:border-blue-500/40
        "
      />
    </div>
  );
}