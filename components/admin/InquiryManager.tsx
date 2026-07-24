"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AlertCircle, Clock, Mail, MessageSquare, Phone, Reply, Trash2 } from "lucide-react";

interface InquiryManagerProps { searchTerm: string; }
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

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteInquiry(id: string) {
    try {
      setIsDeleting(true);
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
      setInquiries((current) => current.filter((inquiry) => inquiry.id !== id));
      setShowConfirm(null);
    } catch (error) {
      console.error("Deletion error:", error);
      alert("Failed to delete inquiry.");
    } finally {
      setIsDeleting(false);
    }
  }

  const query = searchTerm.toLowerCase();
  const filtered = inquiries.filter((inquiry) =>
    inquiry.name?.toLowerCase().includes(query) ||
    inquiry.subject?.toLowerCase().includes(query) ||
    inquiry.email?.toLowerCase().includes(query) ||
    inquiry.phone?.includes(searchTerm)
  );

  if (loading) return <div className="py-20 text-center text-sm text-slate-500">Loading inquiries...</div>;

  return (
    <div className="space-y-4">
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-7 text-center shadow-xl">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700"><AlertCircle size={25} /></div>
            <h3 className="text-xl font-semibold">Delete inquiry</h3>
            <p className="mt-2 text-sm text-slate-600">This permanently removes the inquiry from the database.</p>
            <div className="mt-7 flex gap-3">
              <button onClick={() => setShowConfirm(null)} className="flex-1 rounded-lg border border-slate-300 py-2.5 text-sm font-medium hover:bg-slate-50">Cancel</button>
              <button disabled={isDeleting} onClick={() => deleteInquiry(showConfirm)} className="flex-1 rounded-lg bg-red-700 py-2.5 text-sm font-medium text-white disabled:opacity-50">{isDeleting ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-5 py-16 text-center">
          <MessageSquare className="mx-auto mb-3 text-slate-400" size={30} />
          <p className="text-sm text-slate-600">{searchTerm ? `No inquiries match "${searchTerm}"` : "No inquiries yet."}</p>
        </div>
      ) : filtered.map((inquiry) => (
        <article key={inquiry.id} className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold">{inquiry.subject || "No subject"}</h2>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                <span>{inquiry.name}</span>
                <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-1.5 hover:text-slate-950"><Mail size={14} />{inquiry.email}</a>
                {inquiry.phone && <span className="inline-flex items-center gap-1.5"><Phone size={14} />+{inquiry.phone}{inquiry.platform ? ` (${inquiry.platform})` : ""}</span>}
                <span className="inline-flex items-center gap-1.5"><Clock size={14} />{new Date(inquiry.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"><Reply size={15} />Reply</a>
              <button onClick={() => setShowConfirm(inquiry.id)} aria-label="Delete inquiry" title="Delete inquiry" className="admin-delete-action inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold"><Trash2 size={16} /><span className="hidden sm:inline">Delete</span></button>
            </div>
          </div>
          <div className="mt-5 whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-[15px] leading-7 text-slate-800">{inquiry.message}</div>
        </article>
      ))}
    </div>
  );
}
