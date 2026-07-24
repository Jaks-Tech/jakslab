import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { hashPortalToken, orderStatuses } from "@/lib/order-portal";

type FileRecord = { fileName: string; filePath?: string; fileUrl?: string };

export default async function ClientOrderPortal({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const { data: access } = await supabaseAdmin
    .from("order_portal_access")
    .select("order_id")
    .eq("access_token_hash", hashPortalToken(token))
    .maybeSingle();

  if (!access) notFound();

  await supabaseAdmin.from("order_portal_access")
    .update({ last_accessed_at: new Date().toISOString() }).eq("order_id", access.order_id);

  const [{ data: order }, { data: deliveries }] = await Promise.all([
    supabaseAdmin.from("orders").select("*").eq("id", access.order_id).single(),
    supabaseAdmin.from("order_deliveries").select("*").eq("order_id", access.order_id).order("version", { ascending: false }),
  ]);
  if (!order) notFound();

  const preparedDeliveries = await Promise.all((deliveries ?? []).map(async (delivery) => ({
    ...delivery,
    files: await Promise.all(((delivery.files ?? []) as FileRecord[]).map(async (file) => {
      if (!file.filePath) return file;
      const { data } = await supabaseAdmin.storage.from("order-deliveries").createSignedUrl(file.filePath, 3600);
      return { ...file, fileUrl: data?.signedUrl };
    })),
  })));
  const status = (order.status || "submitted") as keyof typeof orderStatuses;

  return (
    <main className="min-h-screen bg-white px-5 pb-20 pt-20 [font-family:Arial,Helvetica,sans-serif] text-slate-800 sm:px-8 sm:pt-24 lg:px-12 xl:px-16 2xl:px-20">
      <div className="w-full">
        <div className="flex flex-col gap-6 border-b border-slate-300 pb-9 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-sm font-semibold text-slate-600">Private project workspace</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{order.custom_project || order.project_type}</h1><p className="mt-3 text-sm text-slate-600">Reference {order.id}</p></div>
          <span className="w-fit rounded-full border border-slate-400 bg-white px-4 py-2 text-sm font-semibold text-slate-800">{orderStatuses[status] || "In review"}</span>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <aside className="space-y-4">
            <PortalCard label="Deadline" value={order.deadline || "To be confirmed"} />
            <PortalCard label="Preferred contact" value={order.contact_method || "Email"} />
            <div className="border border-slate-300 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[.14em] text-slate-600">Original brief</p><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">{order.description}</p></div>
          </aside>
          <section className="border border-slate-300 bg-white p-6 sm:p-8">
            <div className="flex items-end justify-between gap-4"><h2 className="text-2xl font-semibold text-slate-950">Deliveries and revisions</h2><span className="text-sm text-slate-600">{preparedDeliveries.length} delivered</span></div>
            {preparedDeliveries.length ? <div className="mt-8 space-y-4">{preparedDeliveries.map((delivery) => (
              <article key={delivery.id} className="border border-slate-300 bg-slate-50 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs text-slate-600">Version {delivery.version}</p><h3 className="mt-1 font-medium text-slate-950">{delivery.title}</h3></div><time className="text-xs text-slate-600">{new Date(delivery.created_at).toLocaleDateString()}</time></div>
                {delivery.notes && <p className="mt-4 text-sm leading-6 text-slate-700">{delivery.notes}</p>}
                <div className="mt-5 flex flex-wrap gap-2">{(delivery.files as FileRecord[]).map((file, index) => file.fileUrl && <a key={`${file.fileName}-${index}`} href={file.fileUrl} className="rounded-lg border border-slate-400 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-slate-800">Download {file.fileName}</a>)}</div>
              </article>
            ))}</div> : <div className="mt-8 border border-dashed border-slate-400 px-6 py-12 text-center"><p className="text-slate-800">No solution has been submitted yet.</p><p className="mt-2 text-sm text-slate-600">Your completed files and delivery notes will appear here.</p></div>}
          </section>
        </div>
        <div className="mt-8 flex flex-wrap gap-3"><a href="mailto:hello@jakslab.work" className="rounded-lg bg-[#202733] px-5 py-3 text-sm font-medium text-[#fff] hover:bg-[#111827]">Contact JaksLab</a><Link href="/order" className="rounded-lg border border-slate-400 bg-white px-5 py-3 text-sm text-slate-900 hover:border-slate-800">Start another request</Link></div>
      </div>
    </main>
  );
}

function PortalCard({ label, value }: { label: string; value: string }) {
  return <div className="border border-slate-300 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[.14em] text-slate-600">{label}</p><p className="mt-3 text-slate-900">{value}</p></div>;
}
