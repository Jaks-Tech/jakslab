"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, FileText } from "lucide-react";

export type Props = {
  files: File[];
  open: boolean;
  onClose: () => void;
};

export type SupportedKind = "image" | "pdf" | "docx" | "unsupported";

/**
 * Utility to detect file type
 * Exported so other components (FileUpload / OrderForm)
 * can reuse it.
 */
export function getKind(file: File): SupportedKind {
  const name = file.name.toLowerCase();

  if (file.type.startsWith("image/")) return "image";

  if (file.type === "application/pdf" || name.endsWith(".pdf"))
    return "pdf";

  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx")
  ) {
    return "docx";
  }

  return "unsupported";
}

export function FilePreviewModal({ files, open, onClose }: Props) {
  const supportedFiles = useMemo(
    () => files.filter((f) => getKind(f) !== "unsupported"),
    [files]
  );

  const [index, setIndex] = useState(0);
  const current = supportedFiles[index];

  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const docxContainerRef = useRef<HTMLDivElement | null>(null);

  /**
   * Reset index when modal opens
   */
  useEffect(() => {
    if (open) setIndex(0);
  }, [open, files.length]);

  /**
   * Create object URLs for images & PDFs
   */
  useEffect(() => {
    if (!open) return;

    if (!current) {
      setObjectUrl(null);
      return;
    }

    const kind = getKind(current);

    if (kind === "image" || kind === "pdf") {
      const url = URL.createObjectURL(current);
      setObjectUrl(url);

      return () => URL.revokeObjectURL(url);
    }

    setObjectUrl(null);
  }, [open, current]);

  /**
   * Render DOCX files
   */
  useEffect(() => {
    if (!open || !current) return;

    const kind = getKind(current);
    if (kind !== "docx") return;

    let cancelled = false;

    (async () => {
      const container = docxContainerRef.current;
      if (!container) return;

      container.innerHTML = "";

      const arrayBuffer = await current.arrayBuffer();
      if (cancelled) return;

      const docx = await import("docx-preview");
      if (cancelled) return;

      await docx.renderAsync(arrayBuffer, container, container, {
        className: "docx",
      });
    })();

    return () => {
      cancelled = true;
      if (docxContainerRef.current)
        docxContainerRef.current.innerHTML = "";
    };
  }, [open, current]);

  /**
   * Keyboard navigation
   */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, supportedFiles.length]);

  if (!open) return null;

  const total = supportedFiles.length;
  const hasPrev = index > 0;
  const hasNext = index < total - 1;

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function next() {
    setIndex((i) => Math.min(total - 1, i + 1));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="min-w-0">
            <p className="text-white font-semibold truncate">
              {total > 0 ? current?.name : "No previewable files"}
            </p>

            <p className="text-slate-400 text-sm">
              {total > 0
                ? `Preview ${index + 1} of ${total}`
                : "Supported: PDF, DOCX, Images"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="relative p-4 bg-black/20">

          {total === 0 ? (
            <div className="p-10 text-center">
              <FileText className="w-10 h-10 text-slate-400 mx-auto mb-4" />

              <p className="text-white font-medium">
                No preview available
              </p>

              <p className="text-slate-400 text-sm mt-2">
                Only PDF, DOCX, and image files can be previewed.
              </p>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">

              {getKind(current) === "image" && objectUrl && (
                <img
                  src={objectUrl}
                  alt={current.name}
                  className="w-full max-h-[70vh] object-contain bg-black"
                />
              )}

              {getKind(current) === "pdf" && objectUrl && (
                <iframe
                  src={objectUrl}
                  className="w-full h-[70vh] bg-black"
                  title="PDF preview"
                />
              )}

              {getKind(current) === "docx" && (
                <div className="h-[70vh] overflow-auto bg-white p-4">
                  <div ref={docxContainerRef} />
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                disabled={!hasPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 disabled:opacity-40 transition"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={next}
                disabled={!hasNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 disabled:opacity-40 transition"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-slate-400 text-sm">
            Tip: Use ← → arrow keys to navigate.
          </p>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}