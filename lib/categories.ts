export const CATEGORIES = [
  {
    name: "Academic Writing",
    theme: "blue",
    color: "#60a5fa",
    gradient: "from-blue-500/20 to-indigo-500/20",
    glow: "shadow-blue-500/40",
    text: "text-blue-400"
  },
  {
    name: "Research & Methodology",
    theme: "indigo",
    color: "#818cf8",
    gradient: "from-indigo-500/20 to-purple-500/20",
    glow: "shadow-indigo-500/40",
    text: "text-indigo-400"
  },
  {
    name: "Programming & Development",
    theme: "emerald",
    color: "#34d399",
    gradient: "from-emerald-500/20 to-teal-500/20",
    glow: "shadow-emerald-500/40",
    text: "text-emerald-400"
  },
  {
    name: "AI & Machine Learning",
    theme: "purple",
    color: "#c084fc",
    gradient: "from-purple-500/20 to-pink-500/20",
    glow: "shadow-purple-500/40",
    text: "text-purple-400"
  },
  {
    name: "Tools & Productivity",
    theme: "orange",
    color: "#fb923c",
    gradient: "from-orange-500/20 to-amber-500/20",
    glow: "shadow-orange-500/40",
    text: "text-orange-400"
  },
  {
    name: "Career & Skill Growth",
    theme: "pink",
    color: "#f472b6",
    gradient: "from-pink-500/20 to-rose-500/20",
    glow: "shadow-pink-500/40",
    text: "text-pink-400"
  },
] as const;

export type Category = (typeof CATEGORIES)[number]["name"];

/**
 * Returns the theme string (e.g., "blue", "emerald") for a given category.
 * Optimized for logic that depends on the base theme name.
 */
export function getCategoryTheme(category: Category) {
  return CATEGORIES.find((c) => c.name === category)?.theme;
}

/**
 * Returns comprehensive 3D glass styles for a given category.
 * Use this for rendering UI elements that need to pop against dark backgrounds.
 */
export function getCategoryStyles(category: Category) {
  const theme = CATEGORIES.find((c) => c.name === category);
  
  if (!theme) return {
    badge: "bg-white/5 backdrop-blur-md border border-white/10 text-white",
    dot: "bg-white",
    text: "text-white"
  };

  return {
    badge: `bg-white/5 backdrop-blur-md border border-white/10 ${theme.text} ${theme.glow} shadow-[0_0_15px_rgba(0,0,0,0.1)]`,
    dot: `w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] bg-current`,
    bgGradient: `bg-gradient-to-br ${theme.gradient}`,
    text: theme.text
  };
}