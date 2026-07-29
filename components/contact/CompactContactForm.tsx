"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PersonalInfo from "@/components/order/order-form/PersonalInfo";

const fieldClass = "w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3.5 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-slate-700 focus:ring-2 focus:ring-slate-200";

export function CompactContactForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("WhatsApp");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, platform, phone, subject, message }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to send message");
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1); setSubmitted(false); setError(null); setFullName(""); setEmail("");
    setPlatform("WhatsApp"); setPhone(""); setSubject(""); setMessage("");
  };

  if (submitted) {
    return (
      <div className="border border-slate-300 bg-transparent p-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-950">Message sent</h2>
        <p className="mt-2 text-slate-700">We&apos;ll reply shortly.</p>
        <button type="button" onClick={reset} className="mt-6 rounded-lg bg-[#202733] px-6 py-3 text-sm font-semibold text-[#fff] hover:bg-[#111827]">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form-light">
      {step === 1 ? (
        <div className="space-y-5">
          <div>
            <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold text-slate-800">Subject</label>
            <input id="contact-subject" required value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="What is this about?" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-slate-800">Project or enquiry details</label>
            <textarea id="contact-message" required rows={7} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Describe what you need, the expected result and any deadline." className={`${fieldClass} resize-none`} />
          </div>
          <button type="button" onClick={() => { if (!subject.trim() || !message.trim()) { setError("Add a subject and message before continuing."); return; } setError(null); setStep(2); }} className="ml-auto flex items-center gap-2 rounded-lg bg-[#202733] px-6 py-3 text-sm font-bold text-[#fff] hover:bg-[#111827]">
            Continue <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <button type="button" onClick={() => setStep(1)} className="rounded-lg border border-slate-300 p-2 text-slate-700 hover:border-slate-600" aria-label="Back"><ArrowLeft size={19} /></button>
          <PersonalInfo fullName={fullName} setFullName={setFullName} email={email} setEmail={setEmail} platform={platform} setPlatform={setPlatform} phone={phone} setPhone={setPhone} />
          <button disabled={loading} type="submit" className="w-full rounded-lg bg-[#202733] py-3.5 text-sm font-bold text-[#fff] hover:bg-[#111827] disabled:opacity-50">{loading ? "Sending..." : "Send message"}</button>
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
    </form>
  );
}
