"use client";

import Link from "next/link";

type SuccessStateProps = {
  onReset: () => void;
  orderId?: string;
  portalUrl?: string;
};

export default function SuccessState({
  onReset,
  orderId,
  portalUrl,
}: SuccessStateProps) {
  return (
    <div
      role="status"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-10 text-center shadow-2xl shadow-black/10 backdrop-blur-xl sm:px-12 sm:py-12"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-48 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-lg">
        {/* Success mark */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-emerald-400"
            aria-hidden="true"
          >
            <path
              d="M5 12.5L9.2 16.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Order reference */}
        {orderId && (
          <div className="mt-6">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium tracking-wide text-slate-400">
              Request&nbsp;
              <span className="text-slate-200">#{orderId}</span>
            </span>
          </div>
        )}

        {/* Main confirmation */}
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Work received.
        </h3>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
          Your request has been submitted successfully. Our team will review
          the brief and get back to you with the scope, and next steps.
        </p>


        {/* Actions */}
        <div
          className={`mt-9 grid gap-3 ${
            portalUrl ? "sm:grid-cols-2" : "mx-auto max-w-xs"
          }`}
        >
          {portalUrl && (
            <Link
              href={portalUrl}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Open workspace

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path
                  d="M5 12H19M14 7L19 12L14 17"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}

          <button
            type="button"
            onClick={onReset}
            className="min-h-12 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/15 hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Submit another request
          </button>
        </div>
      </div>
    </div>
  );
}