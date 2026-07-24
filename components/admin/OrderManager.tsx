"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AlertCircle, CheckSquare, Clock, Download, FileText, Square, Trash2 } from "lucide-react";

interface Order {
  id: string;
  project_title?: string;
  project_type?: string;
  custom_project?: string;
  full_name: string;
  email: string;
  deadline?: string;
  file_url?: string;
  fileName?: string;
  attachments?: { fileUrl: string; fileName: string; filePath: string }[];
  created_at: string;
}

function DeadlineCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isOverdue, setIsOverdue] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const calculateTime = useCallback(() => {
    const destination = new Date(targetDate).getTime();
    const distance = destination - Date.now();
    if (isNaN(destination)) return "Invalid date";
    if (distance < 0) {
      setIsOverdue(true);
      return "Overdue";
    }
    setIsOverdue(false);
    setIsUrgent(distance < 86400000);
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    return `${days}d ${hours}h ${minutes}m`;
  }, [targetDate]);

  useEffect(() => {
    setTimeLeft(calculateTime());
    const timer = setInterval(() => setTimeLeft(calculateTime()), 60000);
    return () => clearInterval(timer);
  }, [calculateTime]);

  return (
    <span className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold ${isOverdue ? "border-red-500 bg-red-50 text-red-800" : isUrgent ? "border-amber-500 bg-amber-50 text-amber-900" : "border-slate-400 text-slate-900"}`}>
      {isOverdue ? <AlertCircle size={14} /> : <Clock size={14} />}
      {timeLeft}
    </span>
  );
}

export function OrderManager({ searchTerm }: { searchTerm: string }) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState<{ show: boolean; id: string | "bulk" }>({ show: false, id: "" });

  useEffect(() => { fetchOrders(); }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  }

  async function performDeletion(ids: string[]) {
    setIsDeleting(true);
    try {
      for (const id of ids) {
        const order = orders.find((item) => item.id === id);
        if (!order) continue;
        const storagePaths = order.attachments?.map((file) => file.filePath).filter(Boolean) || [];
        if (storagePaths.length) await supabase.storage.from("order-files").remove(storagePaths);
        const { error } = await supabase.from("orders").delete().eq("id", id);
        if (error) throw error;
      }
      setShowConfirm({ show: false, id: "" });
      setSelectedIds([]);
      await fetchOrders();
      router.refresh();
    } catch (error) {
      console.error("Order deletion failed:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  async function handleDownload(url: string, fileName?: string) {
    try {
      const response = await fetch(url);
      const blobUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "attachment";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  }

  const query = searchTerm.toLowerCase();
  const filtered = orders.filter((order) =>
    order.full_name?.toLowerCase().includes(query) ||
    order.id?.toLowerCase().includes(query) ||
    (order.custom_project || order.project_type || "").toLowerCase().includes(query)
  );

  if (loading) return <div className="py-20 text-center text-sm text-slate-500">Loading orders...</div>;

  return (
    <div className="space-y-4">
      {showConfirm.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-7 text-center shadow-xl">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700"><AlertCircle size={25} /></div>
            <h3 className="text-xl font-semibold">Delete {showConfirm.id === "bulk" ? "selected orders" : "order"}</h3>
            <p className="mt-2 text-sm text-slate-600">This permanently removes the database record and uploaded files.</p>
            <div className="mt-7 flex gap-3">
              <button onClick={() => setShowConfirm({ show: false, id: "" })} className="flex-1 rounded-lg border border-slate-300 py-2.5 text-sm font-medium hover:bg-slate-50">Cancel</button>
              <button disabled={isDeleting} onClick={() => performDeletion(showConfirm.id === "bulk" ? selectedIds : [showConfirm.id])} className="flex-1 rounded-lg bg-red-700 py-2.5 text-sm font-medium text-white disabled:opacity-50">{isDeleting ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {selectedIds.length > 0 && (
        <div className="sticky top-20 z-30 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-5 py-4 shadow-md">
          <span className="text-sm font-medium">{selectedIds.length} orders selected</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedIds([])} className="text-sm text-slate-600 hover:text-slate-950">Clear selection</button>
            <button onClick={() => setShowConfirm({ show: true, id: "bulk" })} className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white">Delete selected</button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-5 py-16 text-center text-sm text-slate-600">No matching orders found.</div>
      ) : filtered.map((order) => {
        const selected = selectedIds.includes(order.id);
        const title = order.custom_project || order.project_type || "Custom project";
        const downloadUrl = order.attachments?.[0]?.fileUrl || order.file_url;
        return (
          <article key={order.id} className={`rounded-xl border p-5 ${selected ? "border-slate-950 bg-slate-100" : "border-slate-400 bg-white"}`}>
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
              <button onClick={() => toggleSelect(order.id)} aria-label={`Select order ${order.id}`} className="self-start text-slate-950">{selected ? <CheckSquare size={21} /> : <Square size={21} />}</button>
              <div className="flex min-w-0 flex-1 gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-400 text-slate-950"><FileText size={18} /></span>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">{order.id}</p>
                  <p className="mt-1 truncate text-sm text-slate-600">{order.full_name} · {order.email}</p>
                </div>
              </div>
              <div>{order.deadline ? <DeadlineCountdown targetDate={order.deadline} /> : <span className="text-xs font-medium text-slate-700">No deadline</span>}</div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/admin/orders/${order.id}`} className="admin-primary-action rounded-lg px-4 py-2.5 text-sm font-semibold">Manage</Link>
                {downloadUrl && <button onClick={() => handleDownload(downloadUrl, order.fileName)} className="inline-flex items-center gap-2 rounded-lg border border-slate-500 px-3 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-100"><Download size={16} /><span className="hidden sm:inline">Download</span></button>}
                <button onClick={() => setShowConfirm({ show: true, id: order.id })} className="admin-delete-action inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold"><Trash2 size={16} /><span className="hidden sm:inline">Delete</span></button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
