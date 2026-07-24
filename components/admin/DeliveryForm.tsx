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
    <form onSubmit={submit} className="rounded-xl border border-slate-200 bg-white p-5 sm:p-7">
      <p className="text-sm text-slate-600">Client delivery</p>
      <h2 className="mt-1 text-xl font-semibold text-slate-950">Add files to the client workspace</h2>
      <div className="mt-6 space-y-3">
        <input name="title" required placeholder="Delivery title" className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none placeholder:text-slate-500 focus:border-slate-700" />
        <textarea name="notes" rows={4} placeholder="Explain what is included and anything the client should know." className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none placeholder:text-slate-500 focus:border-slate-700" />
        <input name="files" type="file" multiple required className="block w-full rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600 file:mr-4 file:rounded-md file:border file:border-slate-300 file:bg-white file:px-4 file:py-2 file:text-slate-900" />
        {message && <p className="text-sm text-slate-700">{message}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800 disabled:opacity-60">{loading ? "Uploading..." : "Deliver to client workspace"}</button>
      </div>
    </form>
  );
}
