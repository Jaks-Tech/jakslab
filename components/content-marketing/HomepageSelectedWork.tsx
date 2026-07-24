import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const selectedWork = [
  {
    name: "XposiGuide",
    type: "Product we built",
    description: "Radiographic positioning guide and learning product.",
    href: "https://www.xposiguide.co.ke",
    logo: "/work-logos/xposiguide.svg",
    logoClass: "bg-[#172033] p-4",
    imageClass: "object-contain",
  },
  {
    name: "PaceFlow",
    type: "Content we run",
    description: "Technical articles and guides for engineering managers.",
    href: "https://www.paceflow.io",
    logo: "/work-logos/paceflow.svg",
    logoClass: "bg-white p-5",
    imageClass: "object-contain",
  },
  {
    name: "AAI Labs",
    type: "Content we run",
    description: "Applied AI articles, service content and research communication.",
    href: "https://www.aai-labs.com",
    logo: "/work-logos/aai-labs.png",
    logoClass: "bg-[#536f78] p-5",
    imageClass: "object-contain",
  },
];

export function HomepageSelectedWork() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">Current work</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Companies working with us.</h2>
        </div>
        <p className="max-w-lg text-sm leading-6 text-slate-700">We built XposiGuide and run technical content for PaceFlow and AAI Labs.</p>
      </div>

      <div className="mt-8 divide-y divide-slate-300 border-y border-slate-300">
        {selectedWork.map((item, index) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-5 py-6 sm:grid-cols-[3rem_12rem_1fr_auto] sm:items-center lg:grid-cols-[4rem_15rem_1fr_auto]"
          >
            <span className="text-xs font-semibold text-slate-500">{String(index + 1).padStart(2, "0")}</span>
            <span className={`flex h-20 items-center justify-center overflow-hidden ${item.logoClass}`}>
              <Image src={item.logo} alt={`${item.name} logo`} width={240} height={80} className={`h-full w-full ${item.imageClass}`} />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[.12em] text-slate-600">{item.type}</span>
              <span className="mt-1 block text-xl font-semibold text-slate-950">{item.name}</span>
              <span className="mt-1 block text-sm leading-6 text-slate-700">{item.description}</span>
            </span>
            <span className="grid size-10 place-items-center rounded-full border border-slate-400 text-slate-900 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-slate-900">
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
