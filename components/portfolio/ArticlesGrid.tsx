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
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
      {articles.map((article) => (
        <ArticleCard key={article.slug} {...article} />
      ))}
    </div>
  );
}