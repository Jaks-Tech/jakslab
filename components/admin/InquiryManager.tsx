"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Mail,
  Trash2,
  User,
  MessageSquare,
  Reply,
  Clock,
  AlertCircle,
  Phone // 1. Imported Phone icon
} from "lucide-react";

interface InquiryManagerProps {
  searchTerm: string;
}

// 2. Updated Interface to include new fields
interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  platform?: string;
  subject: string;
  message: string;
  created_at: string;
}

export function InquiryManager({ searchTerm }: InquiryManagerProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setInquiries(data || []);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- DELETE INQUIRY ---------------- */

  async function deleteInquiry(id: string) {
    try {
      setIsDeleting(true);

      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Delete failed:", error);
        throw error;
      }

      setInquiries(prev => prev.filter(iq => iq.id !== id));
      setShowConfirm(null);

    } catch (err) {
      console.error("Deletion error:", err);
      alert("Failed to delete inquiry.");
    } finally {
      setIsDeleting(false);
    }
  }

  /* ---------------- SEARCH FILTER ---------------- */

  const filtered = inquiries.filter(
    iq =>
      iq.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.phone?.includes(searchTerm) // Also allow searching by phone number
  );

  if (loading)
    return (
      <div className="py-24 text-center">
        <div className="relative h-12 w-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
        </div>
        <p className="text-slate-500 text-sm font-medium italic animate-pulse">
          Scanning encrypted frequency...
        </p>
      </div>
    );

  return (
    <div className="space-y-4 p-1">

      {/* CONFIRM DELETE MODAL */}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">

          <div className="bg-slate-900 border border-white/10 p-8 rounded-[2rem] w-full max-w-sm text-center shadow-2xl">

            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} />
            </div>

            <h3 className="text-white font-black uppercase tracking-tight text-lg mb-2">
              Confirm Delete
            </h3>

            <p className="text-slate-400 text-sm mb-8">
              This will permanently remove the inquiry from the database.
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 py-3 rounded-xl bg-white/5 text-white text-sm font-bold"
              >
                Cancel
              </button>

              <button
                disabled={isDeleting}
                onClick={() => deleteInquiry(showConfirm)}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white text-sm font-bold disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* EMPTY STATE */}

      {filtered.length === 0 ? (
        <div className="p-20 text-center border border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
          <MessageSquare className="mx-auto text-slate-800 mb-4" size={48} />
          <p className="text-slate-500 font-bold tracking-tight">
            {searchTerm
              ? `No inquiries match "${searchTerm}"`
              : "The message vault is empty."}
          </p>
        </div>
      ) : (
        filtered.map(iq => (
          <div
            key={iq.id}
            className="group relative bg-white/[0.01] border border-white/5 p-6 lg:p-8 rounded-[2.5rem] hover:bg-white/[0.03] hover:border-blue-500/20 transition-all duration-500 shadow-2xl overflow-hidden"
          >

            {/* Hover Glow */}

            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full group-hover:bg-blue-600/10 transition-all duration-700"></div>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">

              <div className="flex gap-5 flex-1">

                <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-blue-500 shadow-inner group-hover:text-white group-hover:bg-blue-600 transition-all duration-500">
                  <User size={24} />
                </div>

                <div className="space-y-2 min-w-0">

                  <h4 className="text-xl font-black text-white tracking-tighter uppercase italic">
                    {iq.subject || "No Subject"}
                  </h4>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-400 font-medium">

                    <span className="flex items-center gap-2 text-slate-200">
                      {iq.name}
                    </span>

                    <span className="flex items-center gap-2 opacity-60">
                      <Mail size={14} /> {iq.email}
                    </span>

                    {/* 3. Added Phone & Platform display */}
                    {iq.phone && (
                      <span className="flex items-center gap-2 opacity-60">
                        <Phone size={14} /> +{iq.phone} {iq.platform ? `(${iq.platform})` : ""}
                      </span>
                    )}

                    <span className="flex items-center gap-2 opacity-60">
                      <Clock size={14} />
                      {new Date(iq.created_at).toLocaleDateString()}
                    </span>

                  </div>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex items-center gap-3 w-full lg:w-auto justify-end">

                <a
                  href={`mailto:${iq.email}?subject=Re: ${iq.subject}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white rounded-2xl hover:bg-blue-600 transition-all font-black text-[10px] uppercase tracking-widest"
                >
                  <Reply size={14} /> Reply
                </a>

                <button
                  onClick={() => setShowConfirm(iq.id)}
                  className="p-3.5 bg-red-500/5 text-red-500/40 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

            {/* MESSAGE */}

            <div className="mt-8 bg-black/40 p-6 rounded-[1.8rem] border border-white/5 text-slate-300 leading-relaxed text-[15px] whitespace-pre-wrap">
              {iq.message}
            </div>

          </div>
        ))
      )}
    </div>
  );
}