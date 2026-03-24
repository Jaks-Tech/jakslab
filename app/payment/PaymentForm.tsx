"use client";

import { useState } from "react";
import { 
  Hash, DollarSign, User, FileText, ChevronDown, 
  Loader2, CheckCircle2, X, Download 
} from "lucide-react";
import { jsPDF } from "jspdf";

// Constants
const LOGO_URL = "https://www.jakslab.work/jakslab.png";
const CURRENCIES = ["AUD", "USD", "KES", "EUR", "GBP", "CAD"];

export default function PaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
  const [lastSubmittedData, setLastSubmittedData] = useState<any>(null);

  const [form, setForm] = useState({
    senderName: "",
    referenceNumber: "",
    amountSent: "",
    currency: "AUD",
    notes: "",
  });

  // Helper: Convert Image URL to Base64 for jsPDF
  const getBase64ImageFromURL = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  };

  const handleDownloadReceipt = async () => {
    if (!lastSubmittedData) return;

    const doc = new jsPDF();
    const margin = 20;
    let y = 25;

    try {
      // --- Logo & Branding ---
      const imgData = await getBase64ImageFromURL(LOGO_URL);
      doc.addImage(imgData, "PNG", margin, y - 12, 15, 15);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(37, 99, 235); // JaksLab Blue
      doc.text("Jakslab", margin + 18, y);
    } catch (e) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(37, 99, 235);
      doc.text("Jakslab", margin, y);
    }

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont("helvetica", "normal");
    doc.text("PAYMENT RECEIPT", 145, y);
    
    y += 10;
    doc.setDrawColor(230);
    doc.line(margin, y, 190, y);
    
    y += 20;

    // --- Status Section ---
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("Status:", margin, y);
    doc.setTextColor(16, 185, 129); // Success Green
    doc.text("Payment Received", margin + 18, y);

    doc.setTextColor(100);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Issued: ${new Date().toLocaleString()}`, 135, y);

    y += 15;

    // --- Content Box ---
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, y, 170, 65, "F");
    
    y += 15;
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("Internal ID:", margin + 10, y);
    doc.setFont("helvetica", "normal");
    doc.text(submittedId, margin + 45, y);

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Remitly Ref:", margin + 10, y);
    doc.setFont("helvetica", "normal");
    doc.text(lastSubmittedData.referenceNumber, margin + 45, y);

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Sender:", margin + 10, y);
    doc.setFont("helvetica", "normal");
    doc.text(lastSubmittedData.senderName, margin + 45, y);

    y += 12;
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount:", margin + 10, y);
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text(`${Number(lastSubmittedData.amountSent).toFixed(2)} ${lastSubmittedData.currency}`, margin + 45, y);

    y += 35;

    // --- Notes Section ---
    if (lastSubmittedData.notes) {
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.setFont("helvetica", "bold");
      doc.text("Notes:", margin, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.text(lastSubmittedData.notes, margin, y, { maxWidth: 170 });
    }

    // --- Footer ---
    doc.setFontSize(8);
    doc.setTextColor(160);
    doc.text("This receipt is an automated record of your payment submission. Official verification follows bank clearance.", margin, 280);

    doc.save(`JaksLab_Receipt_${submittedId}.pdf`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Submission failed");

      setSubmittedId(result.paymentId);
      setLastSubmittedData({ ...form });
      setShowSuccess(true);
      setForm({ senderName: "", referenceNumber: "", amountSent: "", currency: "AUD", notes: "" });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Reference Number */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Reference Number</label>
          <div className="relative">
            <Hash className="absolute left-3 top-3.5 text-slate-500" size={18} />
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={form.referenceNumber}
              onChange={(e) => setForm({ ...form, referenceNumber: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 pl-10 text-white outline-none focus:border-blue-500 transition disabled:opacity-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Amount Sent */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Amount Sent</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3.5 text-slate-500" size={18} />
              <input
                type="number"
                step="0.01"
                required
                disabled={isSubmitting}
                placeholder="Enter exact amount"
                value={form.amountSent}
                onChange={(e) => setForm({ ...form, amountSent: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 pl-10 text-white outline-none focus:border-blue-500 transition placeholder:text-slate-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Currency Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Currency</label>
            <div className="relative">
              <select
                disabled={isSubmitting}
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500 transition appearance-none cursor-pointer disabled:opacity-50"
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr} value={curr} className="bg-slate-900 text-white">{curr}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 text-slate-500 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        {/* Sender Name */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Your Name (Sender)</label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={form.senderName}
              onChange={(e) => setForm({ ...form, senderName: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 pl-10 text-white outline-none focus:border-blue-500 transition disabled:opacity-50"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Notes (Optional)</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3.5 text-slate-500" size={18} />
            <textarea
              rows={3}
              disabled={isSubmitting}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 pl-10 text-white outline-none focus:border-blue-500 transition resize-none disabled:opacity-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Processing...
            </>
          ) : (
            "Confirm & Log Receipt"
          )}
        </button>
      </form>

      {/* --- SUCCESS MODAL OVERLAY --- */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
            onClick={() => setShowSuccess(false)}
          />
          
          <div className="relative w-full max-w-md bg-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowSuccess(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition"
            >
              <X size={24} />
            </button>

            <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 size={44} />
            </div>

            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-black text-white">Receipt Logged!</h3>
              <p className="text-slate-400 text-sm px-4">
                Your payment has been submitted for verification. Download your official PDF record below.
              </p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-1">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Internal Tracking ID</p>
              <p className="text-blue-400 font-mono text-lg font-bold tracking-tight">{submittedId}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleDownloadReceipt}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-500 transition shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Download size={20} />
                Download PDF Receipt
              </button>
              
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-white/5 text-white py-4 rounded-2xl font-bold hover:bg-white/10 transition active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}