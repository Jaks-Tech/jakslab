import type { Metadata } from "next";
import { BookCallEmbed } from "@/components/content-marketing/BookCallEmbed";

export const metadata: Metadata = {
  title: "Book a 30-Minute Call | JaksLab",
  description: "Choose a convenient time for a 30-minute content marketing call with JaksLab.",
};

export default function BookCallPage() {
  return (
    <main className="text-white">
      <section className="px-4 pb-5 pt-8 text-center sm:px-6">
        <h1 className="text-base font-semibold text-white sm:text-lg">
          Book a 30-minute content call — choose a suitable time below.
        </h1>
      </section>

      <section className="w-full px-2 pb-8 sm:px-4">
        <BookCallEmbed />
        <p className="mt-4 text-center text-xs text-slate-500">
          If the calendar does not load,{" "}
          <a
            href="https://calendly.com/jeremy-jakslab/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-slate-500 text-slate-300"
          >
            open the booking page directly
          </a>
          .
        </p>
      </section>
    </main>
  );
}
