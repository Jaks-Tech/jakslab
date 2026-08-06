import { ResponsiveSection } from "@/components/layout/ResponsiveLayout";

export default function ArticlesHeroSimple() {
  return (
    <ResponsiveSection className="border-b border-[#d9d2c8] bg-[#f7f5ef] !py-[clamp(3.5rem,8vw,7rem)]">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#9e443a]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a8076]">
              Articles and insights
            </p>

            <span className="h-px w-10 bg-[#9e443a]" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#625950] sm:text-base">
            Practical thinking for teams building useful products, publishing
            technical knowledge, and improving how their work gets discovered.
          </p>
        </div>
      </div>
    </ResponsiveSection>
  );
}