"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  FileText,
  Download,
  User,
  Clock,
  AlertCircle,
  Trash2,
  Square,
  CheckSquare,
  Hash,
  ExternalLink
} from "lucide-react";

interface Order {
  id: string; // JL-Format (JL001-140326)
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

interface OrderManagerProps {
  searchTerm: string;
}

/**
 * COUNTDOWN COMPONENT
 */
function DeadlineCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isOverdue, setIsOverdue] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const calculateTime = useCallback(() => {
    const destination = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const distance = destination - now;

    if (isNaN(destination)) return "INVALID";

    if (distance < 0) {
      setIsOverdue(true);
      return "00:00:00:00";
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 86400000) setIsUrgent(true); // Urgent if < 24h

    return `${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [targetDate]);

  useEffect(() => {
    setTimeLeft(calculateTime());
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(timer);
  }, [calculateTime]);

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border font-mono text-xs tracking-widest transition-colors ${
        isOverdue
          ? "bg-red-500/10 border-red-500/30 text-red-500"
          : isUrgent
          ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
          : "bg-zinc-900/50 border-white/5 text-blue-400"
      }`}
    >
      {isOverdue ? (
        <AlertCircle size={14} className="animate-pulse" />
      ) : (
        <Clock size={14} className={isUrgent ? "animate-pulse" : ""} />
      )}
      <div className="flex flex-col items-center">
        <span className="font-black">{isOverdue ? "EXPIRED" : timeLeft}</span>
        <span className="text-[7px] uppercase tracking-[0.4em] opacity-40 -mt-1">
          {isOverdue ? "Overdue" : "DD:HH:MM:SS"}
        </span>
      </div>
    </div>
  );
}

/**
 * MAIN ORDER MANAGER
 */
export function OrderManager({ searchTerm }: OrderManagerProps) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState<{ show: boolean; id: string | "bulk" }>({
    show: false,
    id: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  }

  const performDeletion = async (ids: string[]) => {
    setIsDeleting(true);
    try {
      for (const id of ids) {
        const orderToDelete = orders.find((o) => o.id === id);
        if (!orderToDelete) continue;

        // 1. Collect file paths from attachments for storage purge
        const storagePaths: string[] = [];
        if (orderToDelete.attachments && Array.isArray(orderToDelete.attachments)) {
          orderToDelete.attachments.forEach((att) => {
            if (att.filePath) storagePaths.push(att.filePath);
          });
        }

        // 2. Scrub Supabase Storage (order-files bucket)
        if (storagePaths.length > 0) {
          await supabase.storage.from("order-files").remove(storagePaths);
        }

        // 3. Delete Database Record
        const { error } = await supabase.from("orders").delete().eq("id", id);
        if (error) throw error;
      }

      setShowConfirm({ show: false, id: "" });
      setSelectedIds([]);
      await fetchOrders();
      router.refresh();
    } catch (err) {
      console.error("Neural Purge failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDownload = async (url: string, fileName?: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "attachment";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  // Search Logic: Filters by Name, Title, and Personalized ID (JL-format)
  const filtered = orders.filter((o) =>
    o.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.custom_project || o.project_type || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-24 text-center animate-pulse text-zinc-600 font-black uppercase tracking-[0.4em] text-xs">
        Syncing Project Vault...
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 relative">
      {/* 1. PURGE CONFIRMATION MODAL */}
      {showConfirm.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/40 animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">
              Confirm Purge
            </h3>
            <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
              This will permanently delete the database record and scrub all associated cloud storage files.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm({ show: false, id: "" })}
                className="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  performDeletion(showConfirm.id === "bulk" ? selectedIds : [showConfirm.id as string])
                }
                disabled={isDeleting}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold text-[10px] uppercase tracking-widest disabled:opacity-50 active:scale-95"
              >
                {isDeleting ? "Purging..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. BULK ACTIONS BAR */}
      {selectedIds.length > 0 && (
        <div className="sticky top-4 z-40 flex items-center justify-between bg-blue-600 px-6 py-4 rounded-2xl shadow-2xl shadow-blue-600/20 animate-in slide-in-from-top-4 duration-500">
          <span className="text-[10px] font-black uppercase tracking-widest text-white">
            {selectedIds.length} Projects Selected
          </span>
          <div className="flex gap-6 items-center">
            <button
              onClick={() => setSelectedIds([])}
              className="text-[10px] font-bold uppercase text-white/70 hover:text-white transition-colors"
            >
              Clear selection
            </button>
            <button
              onClick={() => setShowConfirm({ show: true, id: "bulk" })}
              className="bg-white text-blue-600 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Bulk Purge
            </button>
          </div>
        </div>
      )}

      {/* 3. TABLE HEADER */}
      <div className="hidden lg:grid grid-cols-12 px-8 py-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 border-b border-white/5">
        <div className="col-span-1">Select</div>
        <div className="col-span-4">Identifier & Client</div>
        <div className="col-span-3 text-center">Deadline Countdown</div>
        <div className="col-span-4 text-right pr-12">System_Operations</div>
      </div>

      {/* 4. ORDERS LIST */}
      <div className="space-y-3 p-1">
        {filtered.length > 0 ? (
          filtered.map((order) => {
            const isSelected = selectedIds.includes(order.id);
            const displayTitle = order.custom_project || order.project_type || "Custom Project";
            const downloadUrl = order.attachments?.[0]?.fileUrl || order.file_url;

            return (
              <div
                key={order.id}
                className={`group flex flex-col lg:grid lg:grid-cols-12 items-start lg:items-center p-5 rounded-[2.2rem] border transition-all duration-500 ${
                  isSelected
                    ? "bg-blue-600/10 border-blue-500/40 shadow-xl"
                    : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10"
                }`}
              >
                {/* Selection Checkbox */}
                <div className="col-span-1 flex justify-center mb-4 lg:mb-0">
                  <button onClick={() => toggleSelect(order.id)} className="transition-transform active:scale-90">
                    {isSelected ? (
                      <CheckSquare size={22} className="text-blue-500" />
                    ) : (
                      <Square size={22} className="text-zinc-800" />
                    )}
                  </button>
                </div>

                {/* Info Section */}
                <div className="col-span-4 flex items-center gap-4 w-full">
                  <div className="p-3.5 bg-blue-600/10 text-blue-400 rounded-2xl border border-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] font-bold text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded border border-blue-400/10">
                        {order.id}
                      </span>
                      <h4 className="text-sm font-bold text-white truncate uppercase tracking-tight">
                        {displayTitle}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 truncate">
                      <User size={10} className="text-blue-500/50" />
                      {order.full_name}
                      <span className="opacity-20">|</span>
                      <span className="font-mono text-[10px] opacity-40">{order.email}</span>
                    </div>
                  </div>
                </div>

                {/* Deadline Section */}
                <div className="col-span-3 mt-4 lg:mt-0 flex justify-center w-full">
                  {order.deadline ? (
                    <DeadlineCountdown targetDate={order.deadline} />
                  ) : (
                    <span className="text-[10px] text-zinc-700 font-black uppercase tracking-widest px-4 py-2 border border-dashed border-white/5 rounded-xl italic">
                      No Deadline Set
                    </span>
                  )}
                </div>

                {/* Actions Section */}
                <div className="col-span-4 mt-6 lg:mt-0 flex flex-wrap lg:flex-nowrap items-center justify-start lg:justify-end gap-3 w-full">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="h-10 px-5 flex items-center gap-2 bg-white/5 text-white rounded-xl border border-white/10 font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-blue-500/30 transition-all"
                  >
                    Manage
                  </Link>

                  {downloadUrl && (
                    <button
                      onClick={() => handleDownload(downloadUrl, order.fileName || "attachment")}
                      className="h-10 px-4 flex items-center gap-2 bg-blue-600/10 text-blue-400 rounded-xl border border-blue-600/20 font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Download size={16} />
                    </button>
                  )}

                  <button
                    onClick={() => setShowConfirm({ show: true, id: order.id })}
                    className="h-10 w-11 flex items-center justify-center bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-500/10"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-24 text-center text-zinc-800 font-black uppercase tracking-[0.3em] text-xs italic">
            No matching vault records found.
          </div>
        )}
      </div>
    </div>
  );
}