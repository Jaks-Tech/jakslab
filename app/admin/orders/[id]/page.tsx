import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Calendar, ChevronLeft, FileText, Mail, MessageSquare, Phone, User } from "lucide-react";
import DownloadButton from "@/components/admin/DownloadButton";
import { DeliveryForm } from "@/components/admin/DeliveryForm";

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: order } = await supabase.from("orders").select("*").eq("id", id).single();

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-5 text-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Order not found</h1>
          <Link href="/admin" className="mt-4 inline-block text-sm underline underline-offset-4">Return to admin</Link>
        </div>
      </main>
    );
  }

  const displayTitle = order.custom_project || order.project_type || "Custom request";

  return (
    <main className="min-h-screen bg-white px-4 py-7 text-slate-950 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-[1400px]">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-950"><ChevronLeft size={16} />Back to admin</Link>
        <header className="mt-6 border-b border-slate-200 pb-7">
          <p className="text-sm text-slate-500">Order {order.id}</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">{displayTitle}</h1>
        </header>

        <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,.8fr)]">
          <div className="space-y-7">
            <DeliveryForm orderId={order.id} />
            <section className="rounded-xl border border-slate-200 p-5 sm:p-7">
              <h2 className="text-xl font-semibold">Client information</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Detail icon={<User size={17} />} label="Name" value={order.full_name} />
                <Detail icon={<Mail size={17} />} label="Email" value={order.email} />
                <Detail icon={<Phone size={17} />} label="Phone" value={order.phone || "Not provided"} />
                <Detail icon={<MessageSquare size={17} />} label="Preferred contact" value={order.contact_method || "Not provided"} />
              </div>
            </section>
            <section className="rounded-xl border border-slate-200 p-5 sm:p-7">
              <h2 className="text-xl font-semibold">Project brief</h2>
              <p className="mt-5 whitespace-pre-wrap rounded-lg bg-slate-50 p-5 leading-7 text-slate-800">{order.description || "No project brief was provided."}</p>
            </section>
          </div>

          <aside className="space-y-7">
            <section className="rounded-xl border border-slate-200 p-5 sm:p-6">
              <h2 className="flex items-center gap-2 font-semibold"><Calendar size={17} />Deadline</h2>
              <p className="mt-3 text-2xl font-semibold">{order.deadline || "Not set"}</p>
            </section>
            <section className="rounded-xl border border-slate-200 p-5 sm:p-6">
              <h2 className="flex items-center gap-2 font-semibold"><FileText size={17} />Attachments</h2>
              <div className="mt-4 space-y-3">
                {order.attachments?.length ? order.attachments.map((file: any, index: number) => (
                  <div key={index} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{file.fileName}</p>
                      {file.fileSize && <p className="mt-1 text-xs text-slate-500">{(file.fileSize / 1024 / 1024).toFixed(2)} MB</p>}
                    </div>
                    <DownloadButton url={file.fileUrl} projectTitle={displayTitle} originalFileName={file.fileName} />
                  </div>
                )) : <p className="rounded-lg border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500">No attachments</p>}
              </div>
            </section>
            <section className="rounded-xl border border-slate-200 p-5 text-sm">
              <p className="text-slate-500">Created</p>
              <p className="mt-1 font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-slate-500">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 break-words font-medium">{value}</p>
      </div>
    </div>
  );
}
