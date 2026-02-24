"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";
import {
  CATEGORIES,
  Category,
  getCategoryTheme,
} from "@/lib/categories";

interface Article {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: Category;
  excerpt?: string;
  readTime: string;
}

export default function PortfolioClient({
  articles,
}: {
  articles: Article[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory =
    (searchParams.get("category") as Category | null) ?? null;

  const filteredArticles = useMemo(() => {
    if (!activeCategory) return articles;
    return articles.filter(
      (a) => a.category === activeCategory
    );
  }, [activeCategory, articles]);

  const handleCategoryChange = (category: Category | null) => {
    if (!category) {
      router.push("/portfolio");
    } else {
      router.push(
        `/portfolio?category=${encodeURIComponent(category)}`
      );
    }
  };

  const handleSelectChange = (value: string) => {
    if (!value) {
      router.push("/portfolio");
    } else {
      router.push(`/portfolio?category=${encodeURIComponent(value)}`);
    }
  };

  const getCategoryClasses = (category: Category) => {
    const theme = getCategoryTheme(category);

    const themes: Record<string, string> = {
      blue: "bg-blue-50 text-blue-700 border-blue-200",
      indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
      emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
      purple: "bg-purple-50 text-purple-700 border-purple-200",
      orange: "bg-orange-50 text-orange-700 border-orange-200",
      pink: "bg-pink-50 text-pink-700 border-pink-200",
    };

    return (
      themes[theme ?? ""] ??
      "bg-slate-100 text-slate-700 border-slate-200"
    );
  };

  const getActiveCategoryClasses = (category: Category) => {
    const theme = getCategoryTheme(category);

    const themes: Record<string, string> = {
      blue: "bg-blue-600 text-white border-transparent",
      indigo: "bg-indigo-600 text-white border-transparent",
      emerald: "bg-emerald-600 text-white border-transparent",
      purple: "bg-purple-600 text-white border-transparent",
      orange: "bg-orange-600 text-white border-transparent",
      pink: "bg-pink-600 text-white border-transparent",
    };

    return (
      themes[theme ?? ""] ??
      "bg-slate-900 text-white border-transparent"
    );
  };

  return (
    <>
      {/* FILTER SECTION */}
      <div className="mb-14">

        {/* 🔹 MOBILE DROPDOWN */}
        <div className="md:hidden">
          <select
            value={activeCategory ?? ""}
            onChange={(e) => handleSelectChange(e.target.value)}
            className="w-full appearance-none bg-white border border-slate-300 rounded-2xl px-5 py-3 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 DESKTOP BUTTONS */}
        <div className="hidden md:flex flex-wrap gap-4">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
              !activeCategory
                ? "bg-slate-900 text-white border-slate-900 shadow"
                : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
            }`}
          >
            All
          </button>

          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryChange(cat.name)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
                  isActive
                    ? `${getActiveCategoryClasses(cat.name)} shadow`
                    : `${getCategoryClasses(cat.name)} hover:opacity-80`
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* RESULTS COUNT */}
        <div className="mt-6 text-sm text-slate-600">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredArticles.length}
          </span>{" "}
          article{filteredArticles.length !== 1 && "s"}
        </div>
      </div>

      {/* ARTICLES GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/portfolio/${article.slug}`}
            className="group p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <span
              className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border ${getCategoryClasses(
                article.category
              )}`}
            >
              {article.category}
            </span>

            <h2 className="text-xl font-semibold mt-4 text-slate-900 group-hover:text-blue-600 transition">
              {article.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mt-3">
              <div className="flex items-center gap-1.5">
                <User size={16} className="opacity-70" />
                <span>{article.author}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="opacity-70" />
                <span>{article.date}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock size={16} className="opacity-70" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {article.excerpt && (
              <p className="text-slate-800 mt-4 text-sm line-clamp-3">
                {article.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}