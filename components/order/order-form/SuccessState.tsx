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
      className="border border-slate-300 bg-white px-6 py-10 text-center sm:px-12 sm:py-12"
    >
      <div className="mx-auto max-w-lg">
        {/* Success mark */}
        <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-slate-500 bg-slate-50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-slate-800"
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
            <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium tracking-wide text-slate-600">
              Request&nbsp;
              <span className="text-slate-950">#{orderId}</span>
            </span>
          </div>
        )}

        {/* Main confirmation */}
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          Request received.
        </h3>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-700 sm:text-base">
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
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#202733] px-5 py-3 text-sm font-semibold text-[#fff] transition hover:bg-[#111827]"
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
            className="min-h-12 rounded-lg border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-800"
          >
            Submit another request
          </button>
        </div>
      </div>
    </div>
  );
}
