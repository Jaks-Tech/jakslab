import Link from "next/link";

interface Props {
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image?: string;
}

export default function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  date,
  author,
  readTime,
  image,
}: Props) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-56 bg-slate-100">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        )}

        <span className="absolute bottom-4 left-4 px-4 py-1 bg-blue-600 text-white text-xs rounded-full">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition">
          {title}
        </h3>

        {excerpt && (
          <p className="text-slate-800 text-sm mt-4 line-clamp-3">
            {excerpt}
          </p>
        )}

        <div className="text-sm text-slate-700 mt-6">
          {author} • {date} • {readTime}
        </div>
      </div>
    </Link>
  );
}