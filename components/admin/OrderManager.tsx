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

if (distance < 3600000) setIsUrgent(true);

return `${String(days).padStart(2,"0")}:${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;


}, [targetDate]);

useEffect(() => {
setTimeLeft(calculateTime());
const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);
return () => clearInterval(timer);
}, [calculateTime]);

return (
<div
className={`inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-xl border font-mono text-xs sm:text-sm tracking-widest ${
        isOverdue
          ? "bg-red-500/10 border-red-500/30 text-red-500"
          : isUrgent
          ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
          : "bg-slate-900/50 border-white/5 text-blue-400"
      }`}
>
{isOverdue ? ( <AlertCircle size={14} className="animate-pulse" />
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

export function OrderManager({ searchTerm }: OrderManagerProps) {
const router = useRouter();

const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);

const [selectedIds, setSelectedIds] = useState<string[]>([]);
const [isDeleting, setIsDeleting] = useState(false);

const [showConfirm, setShowConfirm] = useState<{show: boolean,id: string | "bulk"}>({
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

const performDeletion = async (ids: string[]) => {
setIsDeleting(true);


try {
  for (const id of ids) {
    const orderToDelete = orders.find(o => o.id === id);
    if (!orderToDelete) continue;

    const filePaths: string[] = [];

    if (orderToDelete.file_url) {
      const path = orderToDelete.file_url.split("/").pop();
      if (path) filePaths.push(path);
    }

    orderToDelete.attachments?.forEach(att => {
      const path = att.fileUrl.split("/").pop();
      if (path) filePaths.push(path);
    });

    if (filePaths.length > 0) {
      await supabase.storage.from("project-files").remove(filePaths);
    }

    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  setShowConfirm({ show:false,id:"" });
  setSelectedIds([]);

  router.refresh();
  await fetchOrders();

} catch (err) {
  console.error("Purge error:", err);
} finally {
  setIsDeleting(false);
}


};

const toggleSelect = (id: string) => {
setSelectedIds(prev =>
prev.includes(id)
? prev.filter(i => i !== id)
: [...prev, id]
);
};

const handleDownload = async (
url: string,
title?: string,
type?: string,
dbFileName?: string
) => {
try {
const finalName =
dbFileName ||
`${(title || type || "file")
          .replace(/\s+/g, "_")
          .toLowerCase()}_attachment`;


  const response = await fetch(url);
  const blob = await response.blob();

  const blobUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = finalName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(blobUrl);

} catch {
  window.open(url, "_blank");
}


};

const filtered = orders.filter(o =>
o.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
o.project_title?.toLowerCase().includes(searchTerm.toLowerCase())
);

if (loading)
return ( <div className="py-20 text-center animate-pulse text-slate-500 font-medium italic">
Syncing Project Vault... </div>
);

return ( <div className="w-full space-y-4 relative">


  {showConfirm.show && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">

      <div className="bg-slate-900 border border-white/10 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] max-w-sm w-full shadow-2xl text-center">

        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} />
        </div>

        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">
          Confirm Purge
        </h3>

        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          This will permanently delete the database record and all associated cloud storage files.
        </p>

        <div className="flex gap-3">

          <button
            onClick={() => setShowConfirm({ show:false,id:"" })}
            className="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold text-[10px] uppercase tracking-widest"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              performDeletion(
                showConfirm.id === "bulk"
                  ? selectedIds
                  : [showConfirm.id as string]
              )
            }
            disabled={isDeleting}
            className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold text-[10px] uppercase tracking-widest disabled:opacity-50"
          >
            {isDeleting ? "Purging..." : "Confirm"}
          </button>

        </div>
      </div>
    </div>
  )}

  {selectedIds.length > 0 && (
    <div className="sticky top-4 z-40 flex flex-wrap items-center justify-between bg-blue-600 px-4 sm:px-6 py-3 rounded-2xl shadow-2xl shadow-blue-600/20">

      <span className="text-[10px] font-black uppercase tracking-widest text-white">
        {selectedIds.length} Projects Selected
      </span>

      <div className="flex gap-4 items-center">

        <button
          onClick={() => setSelectedIds([])}
          className="text-[10px] font-bold uppercase text-white/70 hover:text-white"
        >
          Clear
        </button>

        <button
          onClick={() => setShowConfirm({ show:true,id:"bulk" })}
          className="bg-white text-blue-600 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
        >
          Bulk Delete
        </button>

      </div>
    </div>
  )}

  <div className="hidden lg:grid grid-cols-12 px-6 lg:px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black border-b border-white/5">
    <div className="col-span-1">Select</div>
    <div className="col-span-4">Project & Client</div>
    <div className="col-span-3 text-center">Time Remaining</div>
    <div className="col-span-4 text-right pr-12">Actions</div>
  </div>

  <div className="space-y-3 p-2 sm:p-1">

    {filtered.length > 0 ? (
      filtered.map(order => {

        const downloadUrl =
          order.file_url || order.attachments?.[0]?.fileUrl;

        const isSelected = selectedIds.includes(order.id);

        return (
          <div
            key={order.id}
            className={`group flex flex-col lg:grid lg:grid-cols-12 items-start lg:items-center p-4 sm:p-5 rounded-[1.2rem] sm:rounded-[1.5rem] border transition-all duration-500 ${
              isSelected
                ? "bg-blue-600/10 border-blue-500/40 shadow-lg"
                : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]"
            }`}
          >

            <div className="col-span-1 flex justify-center mb-4 lg:mb-0">
              <button onClick={() => toggleSelect(order.id)}>
                {isSelected
                  ? <CheckSquare size={22} />
                  : <Square size={22} className="opacity-20" />}
              </button>
            </div>

            <div className="col-span-4 flex items-center gap-4 w-full">

              <div className="p-3.5 bg-blue-600/10 text-blue-400 rounded-xl border border-blue-600/10">
                <FileText size={20}/>
              </div>

              <div className="min-w-0 flex-1">

                <h4 className="text-base sm:text-lg font-bold text-white truncate">
                  {order.project_title || order.project_type || "Custom Project"}
                </h4>

                <div className="flex items-center gap-2 mt-1 text-[13px] text-slate-400 truncate">
                  <User size={12} className="text-blue-500"/>
                  {order.full_name}
                  <span className="opacity-20">|</span>
                  <span className="font-mono opacity-50 text-[11px] truncate">
                    {order.email}
                  </span>
                </div>

              </div>
            </div>

            <div className="col-span-3 mt-4 lg:mt-0 flex justify-center w-full">
              {order.deadline
                ? <DeadlineCountdown targetDate={order.deadline}/>
                : <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest px-4 py-2 border border-dashed border-white/10 rounded-xl">Flexible</span>}
            </div>

            <div className="col-span-4 mt-6 lg:mt-0 flex flex-wrap lg:flex-nowrap items-center justify-start lg:justify-end gap-2.5 w-full">

              <Link
                href={`/admin/orders/${order.id}`}
                className="h-10 px-5 flex items-center bg-white/5 text-white rounded-xl border border-white/5 font-bold text-[10px] uppercase tracking-widest"
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
                  className="h-10 px-4 flex items-center gap-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-600/20 font-bold text-[10px] uppercase"
                >
                  <Download size={16}/>
                  <span className="hidden xl:inline">Download</span>
                </button>
              )}

              <button
                onClick={() => setShowConfirm({ show:true,id:order.id })}
                className="h-10 w-11 flex items-center justify-center bg-red-500/10 text-red-500 rounded-xl border border-red-500/10"
              >
                <Trash2 size={18}/>
              </button>

            </div>

          </div>
        );

      })
    ) : (
      <div className="py-20 text-center text-slate-600 font-bold italic">
        No matching results found.
      </div>
    )}

  </div>
</div>


);
}
