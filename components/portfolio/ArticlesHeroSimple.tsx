import { ResponsiveSection } from "@/components/layout/ResponsiveLayout";

export default function ArticlesHeroSimple() {
  return (
    <ResponsiveSection className="border-b border-slate-300 bg-transparent text-center">
      <div className="mx-auto max-w-4xl">
        <h1 className="fluid-h1 max-w-4xl font-semibold leading-[1.08] tracking-tight text-slate-950">
          Our Insights.
        </h1>
        <p className="fluid-body mx-auto mt-6 max-w-2xl leading-8 text-slate-700">
          Articles on technical communication, software, research methods and the practical work behind complex projects.
        </p>
      </div>
    </ResponsiveSection>
  );
}
