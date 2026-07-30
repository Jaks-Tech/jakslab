import { ResponsiveSection } from "@/components/layout/ResponsiveLayout";

export default function ArticlesHeroSimple() {
  return (
    <ResponsiveSection className="border-b border-slate-300 bg-transparent !py-[clamp(2rem,4vw,3.5rem)] text-center">
      <div className="mx-auto max-w-4xl">
        <h1 className="mx-auto max-w-4xl font-serif text-[clamp(2rem,4vw,3.75rem)] font-normal leading-[1.08] tracking-[-.03em] text-slate-950">
          Our research on technical content, search growth, digital products, and research.
        </h1>
      </div>
    </ResponsiveSection>
  );
}
