"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-xl group">

      {/* Icon */}
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />

      {/* Input */}
      <input
        type="text"
        placeholder="Search articles..."
        className="
          w-full
          pl-14 pr-5 py-4
          rounded-2xl
          border border-slate-200
          bg-white/80 backdrop-blur
          shadow-sm
          text-slate-800
          placeholder:text-slate-400
          transition-all duration-300
          focus:outline-none
          focus:border-blue-500
          focus:ring-4 focus:ring-blue-100
          hover:shadow-md
        "
      />

    </div>
  );
}