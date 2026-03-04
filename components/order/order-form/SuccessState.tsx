"use client";

import { Check, Eye } from "lucide-react";
import Link from "next/link";

type SuccessStateProps = {
  onReset: () => void;
  orderId?: string;
};

export default function SuccessState({
  onReset,
  orderId,
}: SuccessStateProps) {
  return (
    <div className="relative p-8 sm:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">

      {/* Icon */}
      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-8">
        <Check className="w-10 h-10 text-white" />
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-white">
        Order Submitted!
      </h3>

      <p className="mt-4 text-slate-400 max-w-md mx-auto">
        Your request has been received.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 max-w-md mx-auto">

        {orderId && (
          <Link
            href={`/order/${orderId}`}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 rounded-full text-white"
          >
            <Eye className="w-4 h-4" />
            View Order
          </Link>
        )}

        <button
          onClick={onReset}
          className="px-4 py-3 bg-white/10 text-white rounded-full"
        >
          New Request
        </button>

      </div>

    </div>
  );
}