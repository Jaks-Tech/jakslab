"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error if user starts typing again
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  if (submitted) {
    return (
      <div className="relative w-full p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600">
          <Check className="text-white" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-slate-400 mb-6">
          Thank you for contacting us. We'll reply shortly.
        </p>

        <button
          onClick={resetForm}
          className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500">
      <h3 className="text-3xl font-bold text-white mb-2 text-center">Get in Touch</h3>
      <p className="text-slate-400 text-center mb-10">
        We'd love to hear from you. Fill out the form below.
      </p>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <FloatingInput
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={(v) => handleChange("name", v)}
        />

        <FloatingInput
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(v) => handleChange("email", v)}
        />

        <FloatingInput
          label="Subject"
          type="text"
          value={formData.subject}
          onChange={(v) => handleChange("subject", v)}
        />

        <FloatingTextarea
          label="Message"
          value={formData.message}
          onChange={(v) => handleChange("message", v)}
        />

        {error && (
          <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          type="submit"
          className="group w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Message"}
          {!loading && (
            <Send
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          )}
        </button>

        <p className="text-xs text-slate-500 text-center">
          🔒 Your information is kept private and secure.
        </p>
      </form>
    </div>
  );
}


/* ---------- Reusable Components ---------- */

function FloatingInput({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-blue-500/40 focus:outline-none transition backdrop-blur-md"
      />

      <label
        className="absolute left-4 top-3 text-slate-400 text-sm transition-all
        peer-placeholder-shown:top-4
        peer-placeholder-shown:text-base
        peer-placeholder-shown:text-slate-500
        peer-focus:top-3
        peer-focus:text-sm
        peer-focus:text-blue-400"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <textarea
        rows={5}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-blue-500/40 focus:outline-none transition resize-none backdrop-blur-md"
      />

      <label
        className="absolute left-4 top-3 text-slate-400 text-sm transition-all
        peer-placeholder-shown:top-4
        peer-placeholder-shown:text-base
        peer-placeholder-shown:text-slate-500
        peer-focus:top-3
        peer-focus:text-sm
        peer-focus:text-blue-400"
      >
        {label}
      </label>
    </div>
  );
}