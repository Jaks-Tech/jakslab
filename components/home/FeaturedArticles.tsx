"use client";

import Link from "next/link";
import { Calendar, Clock, User, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Category, getCategoryStyles } from "@/lib/categories";

interface Article {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: Category;
  excerpt?: string;
  readTime: string;
}

interface FeaturedArticlesProps {
  articles: Article[];
  spacing?: string;
  headerSpacing?: string;
  contentSpacing?: string;
}

export default function FeaturedArticles({
  articles,
  spacing = "py-1",
  headerSpacing = "mb-1",
  contentSpacing = "pb-1",
}: FeaturedArticlesProps) {

  const displayArticles = articles.slice(0, 3);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!displayArticles.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayArticles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayArticles.length]);

  if (!displayArticles.length) return null;

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % displayArticles.length);

  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + displayArticles.length) % displayArticles.length);

  return (
    <div className={`w-full ${spacing}`}>
        {/* HEADER */}
        <div
        className={`flex flex-col items-center text-center px-4 ${headerSpacing}`}
        >
        <div className="inline-flex px-4 py-1 mb-4 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-full backdrop-blur-sm">
            Latest Insights
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Engineering Knowledge
        </h2>

        <p className="mt-4 text-slate-400 text-lg max-w-2xl">
            Explore our most recent articles, technical guides, and academic strategies engineered for excellence.
        </p>

        <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 mt-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors"
        >
            Explore More Insights
            <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
            />
        </Link>
        </div>

      {/* DESKTOP GRID */}
      <div
        className={`hidden lg:grid relative w-full max-w-[1400px] mx-auto px-6 ${contentSpacing} grid-cols-3 gap-8`}
      >
        {displayArticles.map((article, i) => {
          const styles = getCategoryStyles(article.category);

          return (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/portfolio/${article.slug}`}
                className="group block p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/40 hover:bg-white/[0.07]"
              >

                {/* CATEGORY */}
                <span
                  className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border backdrop-blur-md ${styles.badge}`}
                >
                  <span className={styles.dot} />
                  {article.category}
                </span>

                {/* TITLE */}
                <h3 className="text-xl font-bold mt-5 text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {article.title}
                </h3>

                {/* META */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[10px] font-medium text-slate-500 mt-3 uppercase tracking-wider">

                  <div className="flex items-center gap-1.5">
                    <User size={12} className="text-blue-500/60" />
                    {article.author}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-blue-500/60" />
                    {article.date}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-blue-500/60" />
                    {article.readTime}
                  </div>

                </div>

                {/* EXCERPT */}
                {article.excerpt && (
                  <p className="text-slate-400 mt-5 text-sm leading-relaxed line-clamp-3 border-t border-white/5 pt-4">
                    {article.excerpt}
                  </p>
                )}

              </Link>
            </motion.div>
          );
        })}
        
      </div>

      {/* MOBILE SLIDER */}
      <div
        className={`lg:hidden relative w-full px-6 ${contentSpacing} flex flex-col items-center`}
      >
        <div className="relative w-full min-h-[320px] flex items-center justify-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl"
            >
              {(() => {

                const article = displayArticles[activeIndex];
                const styles = getCategoryStyles(article.category);

                return (
                  <Link href={`/portfolio/${article.slug}`}>

                    <span
                      className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border backdrop-blur-md ${styles.badge}`}
                    >
                      <span className={styles.dot} />
                      {article.category}
                    </span>

                    <h3 className="text-xl font-bold mt-5 text-white leading-snug">
                      {article.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-3">

                      <div className="flex items-center gap-1">
                        <User size={12} />
                        {article.author}
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {article.date}
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {article.readTime}
                      </div>

                    </div>

                    {article.excerpt && (
                      <p className="text-slate-400 text-sm mt-4">
                        {article.excerpt}
                      </p>
                    )}

                  </Link>
                  
                );

              })()}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* NAVIGATION */}
        <div className="flex items-center gap-6 mt-6">

          <button
            onClick={prev}
            className="p-3 rounded-full border border-white/10 bg-white/5 text-white active:scale-95 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-2">
            {displayArticles.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-8 bg-blue-500" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 rounded-full border border-white/10 bg-white/5 text-white active:scale-95 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>

      </div>
    </div>
  );
}