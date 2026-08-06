import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Globe2, LockKeyhole, Search } from "lucide-react";
import { ResponsiveContainer } from "@/components/layout/ResponsiveLayout";

export const metadata: Metadata = {
  title: "Analyze Your Technical Expertise",
  description: "Review the technical expertise your company has documented and identify evidence-backed content opportunities.",
  robots: { index: false, follow: false },
};

export default async function AnalyzePage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const { source = "" } = await searchParams;

  return (
    <main className="min-h-screen bg-[#f7f5ef] pb-20 pt-32 text-[#1d1d1a]">
      <ResponsiveContainer>
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#625950]">
            <ArrowLeft size={16} aria-hidden="true" /> Back to JaksLab
          </Link>

          <header className="mt-10 max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#a94318]">Analysis setup</p>
            <h1 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4.5rem)] font-normal leading-[1.02] tracking-[-.04em]">
              Review what JaksLab may analyze.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#625950]">
              A complete report compares demonstrated technical expertise with what buyers can already find publicly.
            </p>
          </header>

          <form action="/analyze" className="mt-8 max-w-xl">
            <div className="flex items-center gap-3 rounded-full border border-[#cbc2b8] bg-white/70 px-5 py-3 transition-colors focus-within:border-[#a94318]">
              <Search size={18} className="shrink-0 text-[#8a7e73]" aria-hidden="true" />
              <input
                type="text"
                name="source"
                defaultValue={source}
                placeholder="Enter a website, domain, or document link"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#1d1d1a] placeholder:text-[#a39a8f] focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[#1d1d1a] px-4 py-2 text-xs font-semibold text-white"
              >
                Analyze
              </button>
            </div>
          </form>

          {source && (
            <section className="mt-10 rounded-[2.5rem] border border-[#d7cec4] bg-white/50 p-6 sm:p-8">
              <p className="text-[10px] uppercase tracking-[.16em] text-[#8a7e73]">Source received</p>
              <p className="mt-3 break-all font-medium">{source}</p>
              <p className="mt-3 text-xs leading-6 text-[#6b6259]">The source type and accessible pages will be detected before any analysis begins.</p>
            </section>
          )}

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <section className="rounded-[2.5rem_4rem_2rem_3rem] bg-[#eee6db] p-7">
              <FileText size={21} className="text-[#a94318]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-2xl font-normal">Technical expertise sources</h2>
              <p className="mt-3 text-sm leading-7 text-[#625950]">Documentation, reports, specifications, project material and approved files show what the company knows and has built.</p>
            </section>
            <section className="rounded-[4rem_2rem_3rem_2.5rem] bg-[#e7e8e3] p-7">
              <Globe2 size={21} className="text-[#526b84]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-2xl font-normal">Public visibility sources</h2>
              <p className="mt-3 text-sm leading-7 text-[#625950]">The company website, services, products, cases and articles show what potential buyers can currently discover.</p>
            </section>
          </div>

          <div className="mt-8 flex flex-col gap-5 border-t border-[#cbc2b8] pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex max-w-xl items-start gap-3 text-xs leading-6 text-[#6b6259]">
              <LockKeyhole size={17} className="mt-1 shrink-0" aria-hidden="true" />
              No JaksLab sign-in is required. Private sources will require temporary, read-only authorization from their platform.
            </p>
            <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#1d1d1a] px-6 py-3 text-sm font-semibold text-white">
              Continue with JaksLab
            </Link>
          </div>
        </div>
      </ResponsiveContainer>
    </main>
  );
}