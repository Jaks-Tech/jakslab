"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export function DeliveryForm({ orderId }: { orderId: string }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentForm = event.currentTarget;
    setMessage("");
    setLoading(true);
    const { data } = await supabase.auth.getSession();
    const form = new FormData(currentForm);
    form.set("orderId", orderId);
    const response = await fetch("/api/orders/deliver", {
      method: "POST",
      headers: { Authorization: `Bearer ${data.session?.access_token || ""}` },
      body: form,
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) return setMessage(result.error || "Delivery failed.");
    setMessage(`Version ${result.version} delivered successfully.`);
    currentForm.reset();
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-white/10 bg-white/[.02] p-7">
      <p className="text-xs uppercase tracking-[.2em] text-blue-400">Submit solution</p>
      <h2 className="mt-3 text-2xl font-semibold">Add a client delivery</h2>
      <div className="mt-6 space-y-3">
        <input name="title" required placeholder="Delivery title" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-blue-400/40" />
        <textarea name="notes" rows={4} placeholder="Explain what is included and anything the client should know." className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-blue-400/40" />
        <input name="files" type="file" multiple required className="block w-full rounded-xl border border-dashed border-white/15 p-5 text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white" />
        {message && <p className="text-sm text-slate-300">{message}</p>}
        <button disabled={loading} className="w-full rounded-xl bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500 disabled:opacity-60">{loading ? "Submitting solution..." : "Deliver to client workspace"}</button>
      </div>
    </form>
  );
}
