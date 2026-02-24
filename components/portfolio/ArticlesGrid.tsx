import ArticleCard from "./ArticleCard";
import { ArticleMeta } from "@/lib/articles";

interface ArticleListItem extends ArticleMeta {
  slug: string;
  readTime: string;
}

interface Props {
  articles: ArticleListItem[];
}

export default function ArticlesGrid({ articles }: Props) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
      {articles.map((article) => (
        <ArticleCard key={article.slug} {...article} />
      ))}
    </div>
  );
}