import { getAllArticles } from "@/lib/articles";

const BASE_URL = "https://www.jakslab.work";

export async function GET() {
  const articles = getAllArticles();
  const articleLinks = articles
    .map(
      (article) =>
        `- [${article.title}](${BASE_URL}/portfolio/${article.slug}): ${article.excerpt || `${article.category} article by JaksLab.`}`,
    )
    .join("\n");

  const markdown = `# JaksLab

> JaksLab provides technical content marketing, technology development, and research and academic support. We work from documentation, specialist knowledge, customer questions and defined project briefs.

JaksLab is based in Nairobi, Kenya and works with clients internationally. Content Marketing is a primary practice, supported by technology development and research expertise.

## Main services

- [Content Marketing](${BASE_URL}/services#content-marketing): Technical articles, content planning, documentation-to-article work, blog setup, existing blog improvement, SEO and AEO optimization.
- [Technology and Development](${BASE_URL}/services#technology-development): Business websites, web applications, internal tools, APIs, integrations, data systems and product improvement.
- [Research and Academic Support](${BASE_URL}/services#research-academic): Research planning, literature reviews, data analysis, reports, editing, referencing and presentations.

## Important pages

- [Home](${BASE_URL}/): Overview of JaksLab and its three connected areas of work.
- [Services](${BASE_URL}/services): Detailed descriptions, examples and enquiry routes.
- [About](${BASE_URL}/about): Mission, working principles and areas of experience.
- [Blog](${BASE_URL}/portfolio): Articles about content marketing, technical products and academic research.
- [Contact](${BASE_URL}/contact): General enquiries.
- [Book a call](${BASE_URL}/book-call): 30-minute content marketing discussion.
- [Request a service](${BASE_URL}/order): Technology and research project requests.

## Published articles

${articleLinks}

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
