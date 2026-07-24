import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

const BASE_URL = "https://www.jakslab.work";

const publicPages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.95 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.75 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.75 },
  { path: "/book-call", changeFrequency: "monthly", priority: 0.7 },
  { path: "/order", changeFrequency: "monthly", priority: 0.65 },
  { path: "/products", changeFrequency: "monthly", priority: 0.65 },
  { path: "/ai-doc-analysis", changeFrequency: "monthly", priority: 0.6 },
  { path: "/chat-doc", changeFrequency: "monthly", priority: 0.6 },
  { path: "/citation-generator", changeFrequency: "monthly", priority: 0.6 },
  { path: "/literature-planner", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/site-map", changeFrequency: "monthly", priority: 0.25 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const generatedAt = new Date();

  const pages: MetadataRoute.Sitemap = publicPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: generatedAt,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const articles: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${BASE_URL}/portfolio/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...pages, ...articles];
}
