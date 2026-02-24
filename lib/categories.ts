export const CATEGORIES = [
  {
    name: "Academic Writing",
    theme: "blue",
  },
  {
    name: "Research & Methodology",
    theme: "indigo",
  },
  {
    name: "Programming & Development",
    theme: "emerald",
  },
  {
    name: "AI & Machine Learning",
    theme: "purple",
  },
  {
    name: "Tools & Productivity",
    theme: "orange",
  },
  {
    name: "Career & Skill Growth",
    theme: "pink",
  },
] as const;

export type Category =
  (typeof CATEGORIES)[number]["name"];

export function getCategoryTheme(category: Category) {
  return CATEGORIES.find((c) => c.name === category)?.theme;
}