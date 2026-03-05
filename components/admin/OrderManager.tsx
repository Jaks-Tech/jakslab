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
  CheckSquare
} from "lucide-react";

interface Order {
  id: string;
  project_title?: string;
  project_type?: string;
  full_name: string;
  email: string;
  deadline?: string;
  file_url?: string;
  fileName?: string;
  attachments?: { fileUrl: string; fileName: string }[];
  created_at: string;
}

interface OrderManagerProps {
  searchTerm: string;
}

function DeadlineCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isOverdue, setIsOverdue] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const calculateTime = useCallback(() => {
    const destination = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const distance = destination - now;

    if (distance < 0) {
      setIsOverdue(true);
      return "00:00:00:00";
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 3600000) setIsUrgent(true);

    return `${String(days).padStart(2, "0")}:${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [targetDate]);

  useEffect(() => {
    setTimeLeft(calculateTime());
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(timer);
  }, [calculateTime]);

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border font-mono text-sm ${
        isOverdue
          ? "bg-red-500/10 border-red-500/30 text-red-500"
          : isUrgent
          ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
          : "bg-slate-900/50 border-white/5 text-blue-400"
      }`}
    >
      {isOverdue ? <AlertCircle size={14} /> : <Clock size={14} />}
      <span>{isOverdue ? "EXPIRED" : timeLeft}</span>
    </div>
  );
}

export function OrderManager({ searchTerm }: OrderManagerProps) {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState<{ show: boolean; id: string | "bulk" }>({
    show: false,
    id: ""
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

  /* ---------------------- DELETE LOGIC ---------------------- */

  const extractStoragePath = (url: string) => {
    try {
      const parts = url.split("/project-files/");
      return parts[1] || null;
    } catch {
      return null;
    }
  };

  const performDeletion = async (ids: string[]) => {
    setIsDeleting(true);

    try {
      const ordersToDelete = orders.filter(o => ids.includes(o.id));

      const filePaths: string[] = [];

      ordersToDelete.forEach(order => {
        if (order.file_url) {
          const path = extractStoragePath(order.file_url);
          if (path) filePaths.push(path);
        }

        order.attachments?.forEach(att => {
          const path = extractStoragePath(att.fileUrl);
          if (path) filePaths.push(path);
        });
      });

      /* DELETE FILES FROM STORAGE */

      if (filePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("project-files")
          .remove(filePaths);

        if (storageError) {
          console.error("Storage deletion error:", storageError);
        }
      }

      /* DELETE DATABASE ROWS */

      const { error } = await supabase
        .from("orders")
        .delete()
        .in("id", ids);

      if (error) {
        console.error("Database deletion error:", error);
        throw error;
      }

      setShowConfirm({ show: false, id: "" });
      setSelectedIds([]);

      await fetchOrders();
      router.refresh();
    } catch (err) {
      console.error("Deletion failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  /* ---------------------- SELECTION ---------------------- */

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  /* ---------------------- DOWNLOAD ---------------------- */

  const handleDownload = async (
    url: string,
    title?: string,
    type?: string,
    dbFileName?: string
  ) => {
    try {
      const name =
        dbFileName ||
        `${(title || type || "file").replace(/\s+/g, "_").toLowerCase()}`;

      const res = await fetch(url);
      const blob = await res.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = name;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  /* ---------------------- FILTER ---------------------- */

  const filtered = orders.filter(
    o =>
      o.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.project_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 animate-pulse">
        Loading orders...
      </div>
    );
  }

  /* ---------------------- UI ---------------------- */

  return (
    <div className="space-y-4 relative">

      {/* CONFIRM MODAL */}

      {showConfirm.show && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-96 text-center">

            <AlertCircle className="mx-auto text-red-500 mb-4" size={36} />

            <h3 className="text-white font-bold text-lg mb-3">
              Confirm Delete
            </h3>

            <p className="text-slate-400 text-sm mb-6">
              This will permanently delete the order and all uploaded files.
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => setShowConfirm({ show: false, id: "" })}
                className="flex-1 bg-white/10 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                disabled={isDeleting}
                onClick={() =>
                  performDeletion(
                    showConfirm.id === "bulk"
                      ? selectedIds
                      : [showConfirm.id as string]
                  )
                }
                className="flex-1 bg-red-600 py-2 rounded-xl text-white"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>

            </div>
          </div>
        </div>
      )}

      {/* BULK BAR */}

      {selectedIds.length > 0 && (
        <div className="sticky top-4 bg-blue-600 p-3 rounded-xl flex justify-between text-white">
          <span>{selectedIds.length} selected</span>

          <button
            onClick={() => setShowConfirm({ show: true, id: "bulk" })}
            className="bg-white text-blue-600 px-4 py-1 rounded"
          >
            Bulk Delete
          </button>
        </div>
      )}

      {/* ORDERS */}

      {filtered.map(order => {

        const downloadUrl = order.file_url || order.attachments?.[0]?.fileUrl;
        const selected = selectedIds.includes(order.id);

        return (
          <div
            key={order.id}
            className={`grid grid-cols-12 p-4 rounded-xl border ${
              selected ? "border-blue-500 bg-blue-600/10" : "border-white/5"
            }`}
          >

            <div className="col-span-1 flex justify-center">
              <button onClick={() => toggleSelect(order.id)}>
                {selected ? <CheckSquare /> : <Square />}
              </button>
            </div>

            <div className="col-span-5 flex items-center gap-3">
              <FileText className="text-blue-400" />

              <div>
                <h4 className="text-white font-bold">
                  {order.project_title || order.project_type}
                </h4>

                <p className="text-slate-400 text-sm flex gap-2 items-center">
                  <User size={12} /> {order.full_name}
                </p>
              </div>
            </div>

            <div className="col-span-3 flex justify-center">
              {order.deadline ? (
                <DeadlineCountdown targetDate={order.deadline} />
              ) : (
                <span className="text-slate-500 text-xs">Flexible</span>
              )}
            </div>

            <div className="col-span-3 flex justify-end gap-2">

              <Link
                href={`/admin/orders/${order.id}`}
                className="bg-white/10 px-3 py-2 rounded"
              >
                Manage
              </Link>

              {downloadUrl && (
                <button
                  onClick={() =>
                    handleDownload(
                      downloadUrl,
                      order.project_title,
                      order.project_type,
                      order.fileName
                    )
                  }
                  className="bg-blue-600 px-3 py-2 rounded text-white flex gap-1"
                >
                  <Download size={16} /> Download
                </button>
              )}

              <button
                onClick={() => setShowConfirm({ show: true, id: order.id })}
                className="bg-red-600 px-3 py-2 rounded text-white"
              >
                <Trash2 size={16} />
              </button>

            </div>
          </div>
        );
      })}
    </div>
  );
}