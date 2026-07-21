"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PersonalInfo from "@/components/order/order-form/PersonalInfo";

const fieldClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/15";

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
      <div className="rounded-2xl border border-white/10 bg-[#07101f]/80 p-8 text-center shadow-[0_25px_70px_rgba(0,0,0,.3)] backdrop-blur-xl">
        <h2 className="text-2xl font-semibold text-white">Message sent</h2>
        <p className="mt-2 text-slate-400">We&apos;ll reply shortly.</p>
        <button type="button" onClick={reset} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-[#07101f]/80 p-4 shadow-[0_25px_70px_rgba(0,0,0,.3)] backdrop-blur-xl sm:p-6">
      {step === 1 ? (
        <div className="space-y-3">
          <input required value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="What is this about?" className={fieldClass} />
          <textarea required rows={6} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write your message..." className={`${fieldClass} resize-none`} />
          <button type="button" onClick={() => { if (!subject.trim() || !message.trim()) { setError("Add a subject and message before continuing."); return; } setError(null); setStep(2); }} className="ml-auto flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500">
            Continue <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <button type="button" onClick={() => setStep(1)} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white" aria-label="Back"><ArrowLeft size={19} /></button>
          <PersonalInfo fullName={fullName} setFullName={setFullName} email={email} setEmail={setEmail} platform={platform} setPlatform={setPlatform} phone={phone} setPhone={setPhone} />
          <button disabled={loading} type="submit" className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white hover:bg-blue-500 disabled:opacity-50">{loading ? "Sending..." : "Send message"}</button>
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </form>
  );
}
