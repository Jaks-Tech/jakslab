import { getAllArticles } from "@/lib/articles";
import { getHomepagePillars } from "@/lib/homepage-pillars";

const BASE_URL = "https://www.jakslab.work";

export async function GET() {
  const articles = getAllArticles();
  const insights = await getHomepagePillars();
  const articleLinks = articles
    .map(
      (article) =>
        `- [${article.title}](${BASE_URL}/portfolio/${article.slug}): ${article.excerpt || `${article.category || "Insight"} article by JaksLab.`}`,
    )
    .join("\n");
  const insightLinks = insights
    .map(
      (insight) =>
        `- [${insight.title}](${BASE_URL}/insights/${insight.slug}): ${insight.summary} Author: ${insight.author}. Updated: ${insight.updatedAt}.`,
    )
    .join("\n");

  const markdown = `# JaksLab

> JaksLab helps companies generate qualified traffic through SEO, AEO, content optimization and company-specific technical content. We also research projects before development and build digital products.

JaksLab is based in Nairobi, Kenya and works with clients internationally. We turn a company's technical expertise, documentation, services and customer questions into useful content built for search visibility, AI answers and conversion.

## Main services

- [Content Optimization](${BASE_URL}/services#content-marketing): Blog setup and improvement, SEO, AEO, technical articles, content planning and company-specific content developed from internal expertise.
- [Pre-project Research](${BASE_URL}/services#research-academic): Requirements discovery, critical analysis, feasibility, framework and technology comparison, architecture recommendations, risks and delivery roadmaps.
- [Product Development](${BASE_URL}/services#technology-development): Business websites, web applications, internal tools, APIs, integrations, data systems and existing product improvement.
- [Academic Tutoring](${BASE_URL}/services#research-academic): Guided support for research planning, literature reviews, methodology, analysis, academic writing, referencing and presentations.

## Important pages

- [Home](${BASE_URL}/): JaksLab positioning across content optimization, pre-project research and product development.
- [Services](${BASE_URL}/services): Detailed descriptions, examples and enquiry routes.
- [About](${BASE_URL}/about): Mission, working principles and areas of experience.
- [Our Insights](${BASE_URL}/portfolio): Articles about SEO, AEO, technical content, digital products and research.
- [Contact](${BASE_URL}/contact): General enquiries.
- [Book a call](${BASE_URL}/book-call): 30-minute content optimization discussion.
- [Request a service](${BASE_URL}/order): Pre-project research and product development requests.

## JaksLab research insights

These evidence-led articles explain JaksLab's approach to technical content, SEO, AEO, GEO visibility, qualified traffic and measurement. Each article includes inline source links and an original explanatory illustration.

${insightLinks}

## Published articles

${articleLinks}

## Discovery and indexing

- [XML sitemap](${BASE_URL}/sitemap.xml): Canonical public pages, research insights, portfolio articles and their primary images.
- [Robots policy](${BASE_URL}/robots.txt): Public crawling rules and private application paths.
- Canonical domain: ${BASE_URL}
- Content language: English
- Publisher and author: JaksLab
- Primary location: Nairobi, Kenya

## Contact

- Email: hello@jakslab.work
- Location: Nairobi, Kenya
- Website: ${BASE_URL}
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
