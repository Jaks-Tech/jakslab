import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

import { calculateReadTime } from "@/lib/readTime";

/* =====================================
   TYPES
===================================== */

export interface ArticleMeta {
  title: string;
  date: string;
  author: string;
  category?: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
}

export interface Article extends ArticleMeta {
  slug: string;
  contentHtml: string;
  readTime: string;
}

/* =====================================
   DIRECTORY
===================================== */

const articlesDirectory = path.join(process.cwd(), "articles");

/* =====================================
   VALIDATE CATEGORY
===================================== */

/* =====================================
   GET ALL ARTICLES (LIST PAGE)
===================================== */

export function getAllArticles(): (ArticleMeta & {
  slug: string;
  readTime: string;
})[] {
  // 1. Safety check: Prevent build crashes if directory is missing
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  // 2. Safety check: Only process markdown files, ignore .DS_Store etc.
  const fileNames = fs.readdirSync(articlesDirectory).filter(
    (fileName) => fileName.endsWith(".md")
  );

  const articles = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(articlesDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const { title, date, author, category, excerpt } = data;
    const image = data.image || data.coverImage || data.thumbnail || "";
    const imageAlt = data.imageAlt || data.coverImageAlt || "";

    if (!title || !date || !author) {
      throw new Error(`Missing required metadata in article: ${fileName}`);
    }

    return {
      slug,
      title,
      date,
      author,
      category: category ? String(category) : undefined,
      excerpt: excerpt || "", // Fallback
      image,
      imageAlt,
      readTime: calculateReadTime(content),
    };
  });

  // 3. Sort articles by date descending (Newest first)
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/* =====================================
   GET SINGLE ARTICLE
===================================== */

export async function getArticleBySlug(slug: string): Promise<Article> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Article not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const { title, date, author, category, excerpt } = data;
  const image = data.image || data.coverImage || data.thumbnail || "";
  const imageAlt = data.imageAlt || data.coverImageAlt || "";

  if (!title || !date || !author) {
    throw new Error(`Missing required metadata in article: ${slug}`);
  }

  /* ✅ Modern Markdown → HTML pipeline */
  const processedContent = await remark()
    .use(remarkGfm) // tables, task lists, strikethrough
    .use(remarkRehype, { allowDangerousHtml: true }) // 4. Allows raw HTML inside markdown
    .use(rehypeSlug) // adds id to headings for anchor links
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    slug,
    title,
    date,
    author,
    category: category ? String(category) : undefined,
    excerpt: excerpt || "",
    image,
    imageAlt,
    contentHtml: processedContent.toString(),
    readTime: calculateReadTime(content),
  };
}

/* =====================================
   GROUP ARTICLES BY CATEGORY
===================================== */

export function groupArticlesByCategory(
  articles: ReturnType<typeof getAllArticles>
) {
  return articles.reduce((acc, article) => {
    const category = article.category || "Insight";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {} as Record<string, typeof articles>);
}

/* =====================================
   GET ARTICLES BY CATEGORY
===================================== */

export function getArticlesByCategory(category: string) {
  const articles = getAllArticles();
  return articles.filter((article) => article.category === category);
}
