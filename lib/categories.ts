export const CATEGORIES = [
  {
    name: "Academic",
    theme: "slate",
    color: "#475569",
    gradient: "from-slate-100 to-slate-200",
    glow: "shadow-slate-300/30",
    text: "text-slate-700",
  },
  {
    name: "Technical Products",
    theme: "slate",
    color: "#334155",
    gradient: "from-slate-100 to-slate-200",
    glow: "shadow-slate-300/30",
    text: "text-slate-800",
  },
  {
    name: "Content Marketing",
    theme: "slate",
    color: "#64748b",
    gradient: "from-slate-100 to-slate-200",
    glow: "shadow-slate-300/30",
    text: "text-slate-700",
  },
] as const;

export type Category = (typeof CATEGORIES)[number]["name"];

export function getCategoryTheme(category: Category) {
  return CATEGORIES.find((item) => item.name === category)?.theme;
}

export function getCategoryStyles(category: Category) {
  const item = CATEGORIES.find((entry) => entry.name === category);

  if (!item) {
    return {
      badge: "border border-slate-300 bg-white text-slate-800",
      dot: "bg-slate-600",
      text: "text-slate-800",
    };
  }

  return {
    badge: `border border-slate-300 bg-white ${item.text}`,
    dot: "bg-slate-600",
    bgGradient: "bg-slate-100",
    text: item.text,
  };
}
