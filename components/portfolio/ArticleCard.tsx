import Link from "next/link";
import { getCategoryStyles, Category } from "@/lib/categories"; // Adjust path as needed

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
  // Fetch the dynamic 3D glow styles based on the category
  const styles = getCategoryStyles(category as Category);

  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-56 bg-white/5 overflow-hidden">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        
        {/* Subtle Overlay for better text legibility on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03050c]/60 to-transparent opacity-60" />

        {/* Improved Dynamic Category Badge */}
        <div className={`absolute bottom-4 left-4 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold backdrop-blur-xl transition-all duration-300 ${styles.badge}`}>
          <span className={styles.dot} />
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400 leading-snug">
          {title}
        </h3>

        {excerpt && (
          <p className="text-slate-400 text-sm mt-4 line-clamp-3 leading-relaxed flex-grow">
            {excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-white text-xs font-medium">{author}</span>
            <span className="text-slate-500 text-[11px] uppercase tracking-wider mt-1">{date}</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-[11px] font-medium">
            {readTime}
          </div>
        </div>
      </div>

      {/* Interactive Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
         <div className="absolute -inset-px rounded-3xl border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]" />
      </div>
    </Link>
  );
}