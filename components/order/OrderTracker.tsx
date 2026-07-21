"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function OrderTracker() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const response = await fetch("/api/orders/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, email }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) return setError(result.error || "Unable to find that request.");
    router.push(result.portalUrl);
  }

  return (
    <section id="track-order" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-white/10 bg-[#07101f]/65 p-6 shadow-[0_30px_90px_rgba(0,0,0,.3)] backdrop-blur-xl sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm text-blue-300">Returning client</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Open your project workspace.</h2>
          <p className="mt-4 max-w-md leading-7 text-slate-400">Check progress and download submitted solutions using the reference sent to your email.</p>
        </div>
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
          <input required value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="Order reference" className="rounded-lg border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none placeholder:text-slate-600 focus:border-blue-400/40" />
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email used for the order" className="rounded-lg border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none placeholder:text-slate-600 focus:border-blue-400/40" />
          {error && <p className="text-sm text-red-300 sm:col-span-2">{error}</p>}
          <button disabled={loading} className="rounded-lg bg-white px-5 py-3.5 text-sm font-medium text-slate-950 hover:bg-blue-50 disabled:opacity-60 sm:col-span-2">{loading ? "Opening workspace..." : "Continue securely"}</button>
        </form>
      </div>
    </section>
  );
}
