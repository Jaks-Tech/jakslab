"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, Loader2, ShieldCheck } from "lucide-react";

type Props = {
  onUploaded: (documentId: string) => void;
};

export default function UploadDoc({ onUploaded }: Props) {
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;

    const validTypes = [
      "application/pdf", 
      "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or Word document.");
      return;
    }

    const form = new FormData();
    form.append("file", file);
    setLoading(true);

    try {
      const res = await fetch("/api/chat-doc/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "Upload failed");
        return;
      }
      onUploaded(data.documentId);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div className="relative group">
        
        {/* --- DYNAMIC GLOW LAYERS --- */}
        
        {/* 1. Static Outer Ambient Glow */}
        <div 
          className={`absolute -inset-2 rounded-[40px] bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl transition-opacity duration-500 
          ${isDragging || loading ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
        />

        {/* 2. Pulsing Glow (Inline Animation) */}
        {(isDragging || loading) && (
          <div 
            className="absolute -inset-1 rounded-[32px] bg-blue-500/10 blur-xl animate-pulse pointer-events-none" 
            style={{ animationDuration: '2s' }}
          />
        )}

        {/* --- MAIN CARD --- */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files?.[0]; if (file) handleUpload(file); }}
          onClick={() => !loading && fileInputRef.current?.click()}
          className={`relative z-20 overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300 p-8 sm:p-16 text-center backdrop-blur-md
            ${isDragging 
              ? "border-blue-500 bg-blue-900/20 scale-[1.01] shadow-[0_0_40px_rgba(59,130,246,0.1)]" 
              : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
            }
            ${loading ? "pointer-events-none opacity-60" : "cursor-pointer"}
          `}
        >
          {/* 3. Moving Shimmer (CSS-in-JS Animation) */}
          {(isDragging || loading) && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.05), transparent)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite linear',
              }}
            />
          )}

          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.doc,.docx"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            className="hidden"
          />

          <div className="flex flex-col items-center relative z-10">
            <div className="mb-6">
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ${
                loading ? "bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "bg-white/5"
              }`}>
                {loading ? (
                  <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                ) : (
                  <UploadCloud className={`h-8 w-8 ${isDragging ? "text-blue-400" : "text-zinc-400"}`} />
                )}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              {loading ? "Processing Document" : "Upload to Analyze"}
            </h2>
            
            <p className="text-sm sm:text-base text-zinc-400 max-w-xs mx-auto leading-relaxed mb-8">
              {loading 
                ? "Our neural engine is indexing your file..." 
                : "Drop your PDF or Word document here to start a secure chat."}
            </p>

            {!loading && (
              <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                  <FileText size={12} /> PDF/DOCX
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <ShieldCheck size={12} /> Encrypted
                </div>
              </div>
            )}
          </div>

          {/* Inline Styles for Shimmer Animation */}
          <style jsx>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}</style>
        </div>
      </div>
      
      <p className="mt-6 text-center text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-medium opacity-60">
        AI Document Terminal • v2.0
      </p>
    </div>
  );
}