import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

const navigation = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Products", "/products"],
  ["Blog", "/portfolio"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const services = [
  ["Content Marketing", "/services#content-marketing"],
  ["Technology & Development", "/services#technology-development"],
  ["Research & Academic Work", "/services#research-academic"],
];

const legal = [
  ["Terms & Conditions", "/terms"],
  ["Privacy Policy", "/privacy"],
  ["Refund Policy", "/return"],
];

function FooterLinks({ items }: { items: string[][] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map(([label, href]) => (
        <li key={href}>
          <Link href={href} className="text-sm text-slate-700 transition hover:text-blue-800">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const contactIconClass =
  "grid size-10 place-items-center rounded-full border border-slate-400 bg-white text-slate-800 transition hover:border-blue-700 hover:text-blue-700";

export function LightFooter() {
  return (
    <footer className="border-t border-slate-300 bg-white text-slate-800">
      <div className="grid w-full gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.25fr_.75fr_.9fr_.8fr] lg:px-12 xl:px-16 2xl:px-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-950">
            <span className="relative size-11 overflow-hidden rounded-full border border-slate-300 bg-white">
              <Image src="/jakslab.png" alt="" fill sizes="44px" className="object-cover" />
            </span>
            <span>JaksLab</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-700">
            Technical content, digital products and research support.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="mailto:hello@jakslab.work"
              aria-label="Email JaksLab"
              title="Email JaksLab"
              className={contactIconClass}
            >
              <Mail size={18} aria-hidden="true" />
            </a>
            <a
              href="tel:+254113178912"
              aria-label="Call JaksLab"
              title="Call JaksLab"
              className={contactIconClass}
            >
              <Phone size={18} aria-hidden="true" />
            </a>
            <span
              aria-label="Nairobi, Kenya — working globally"
              title="Nairobi, Kenya — working globally"
              className="grid size-10 place-items-center rounded-full border border-slate-400 bg-white text-slate-800"
            >
              <MapPin size={18} aria-hidden="true" />
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[.14em] text-slate-950">Navigation</h2>
          <FooterLinks items={navigation} />
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[.14em] text-slate-950">Services</h2>
          <FooterLinks items={services} />
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[.14em] text-slate-950">Legal</h2>
          <FooterLinks items={legal} />
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 border-t border-slate-400 px-5 py-6 text-xs text-slate-700 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <p>© {new Date().getFullYear()} JaksLab. All rights reserved.</p>
        <Link href="/book-call" className="font-semibold text-blue-700 hover:text-blue-900">
          Book a 30-minute call
        </Link>
      </div>
    </footer>
  );
}
