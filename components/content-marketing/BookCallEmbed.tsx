"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function BookCallEmbed() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleCalendlyMessage(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return;
      if (event.data?.event === "calendly.event_scheduled") {
        setIsConfirmed(true);
      }
    }

    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, []);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_24px_70px_rgba(0,0,0,.28)] sm:rounded-3xl">
        <iframe
          src="https://calendly.com/jeremy-jakslab/30min?embed_domain=www.jakslab.work&embed_type=Inline"
          title="Book a 30-minute call with JaksLab"
          className="block h-[calc(100vh-155px)] min-h-[680px] w-full"
          loading="eager"
        />
      </div>

      {isConfirmed && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-slate-950/80 px-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-confirmation-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#07101f] p-7 text-center shadow-2xl sm:rounded-3xl sm:p-9">
            <p className="text-sm text-emerald-300">Booking confirmed</p>
            <h2 id="booking-confirmation-title" className="mt-3 text-2xl font-semibold text-white">
              Your call has been scheduled.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Thank you. A calendar invitation and meeting details will be sent to your email address.
            </p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Close and return home
            </button>
          </div>
        </div>
      )}
    </>
  );
}
