import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { calculateReadTime } from "@/lib/readTime";

export type HomepagePillar = {
  slug: string;
  legacySlug: string;
  title: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  imageAlt: string;
  label: string;
  sectionLabel: string;
  ctaLabel: string;
  brief: string;
  summary: string;
  order: number;
  image: string;
  readTime: string;
  contentHtml: string;
};

const pillarDirectory = path.join(process.cwd(), "content", "homepage-insights");

export async function getHomepagePillars(): Promise<HomepagePillar[]> {
  if (!fs.existsSync(pillarDirectory)) return [];

  const files = fs.readdirSync(pillarDirectory).filter((file) => file.endsWith(".md"));
  const pillars = await Promise.all(files.map(async (file) => {
    const legacySlug = file.replace(/\.md$/, "");
    const source = fs.readFileSync(path.join(pillarDirectory, file), "utf8");
    const { data, content } = matter(source);
    const rendered = await remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .process(content);

    return {
      slug: String(data.slug || legacySlug),
      legacySlug,
      title: String(data.title),
      author: String(data.author || "JaksLab"),
      publishedAt: String(data.publishedAt),
      updatedAt: String(data.updatedAt),
      keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
      imageAlt: String(data.imageAlt),
      label: String(data.label),
      sectionLabel: String(data.sectionLabel),
      ctaLabel: String(data.ctaLabel),
      brief: String(data.brief),
      summary: String(data.summary),
      order: Number(data.order),
      image: String(data.image),
      readTime: calculateReadTime(content),
      contentHtml: rendered.toString(),
    };
  }));

  return pillars.sort((a, b) => a.order - b.order);
}

export async function getHomepagePillarBySlug(slug: string) {
  const pillars = await getHomepagePillars();
  return pillars.find((pillar) => pillar.slug === slug || pillar.legacySlug === slug);
}
