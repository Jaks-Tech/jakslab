"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
  type MouseEvent,
} from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";

type ServiceDetailModalProps = {
  title: string;
  children: ReactNode;
  onClose?: () => void;
};

export function ServiceDetailModal({
  title,
  children,
  onClose,
}: ServiceDetailModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleDismiss = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  // --- Body Scroll Lock, Auto-Focus & Escape Key Listener ---
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // --- Safe Backdrop Click Dismissal ---
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleDismiss();
    }
  };

  return (
    <div
      role="presentation"
      onClick={handleBackdropClick}
      className="svc-modal-backdrop fixed inset-0 z-50 overflow-y-auto bg-[#1d1d1a]/55 backdrop-blur-xl animate-in fade-in duration-200"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Tightened outer padding: small, consistent margins around the edges while clearing the header */}
      <div
        onClick={handleBackdropClick}
        className="flex min-h-full w-full items-start justify-center pt-24 pb-8 px-3 sm:px-6 md:pt-28 md:px-8 lg:px-10"
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} service details`}
          tabIndex={-1}
          className="svc-modal-panel relative w-full max-w-6xl overflow-hidden rounded-3xl sm:rounded-tl-[80px] lg:rounded-tl-[100px] border-2 border-white/80 bg-[#f7f5ef] shadow-[0_25px_70px_rgba(0,0,0,0.45)] outline-none animate-in zoom-in-95 duration-200"
        >
          {/* --- Sticky Modal Navigation Bar --- */}
          <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#d9d2c8]/80 bg-[#f7f5ef]/95 px-6 py-4 backdrop-blur-md sm:px-8">
            <button
              type="button"
              onClick={handleDismiss}
              className="group inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[#3f3934] transition-colors hover:bg-[#ebe6de] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1d1a]"
            >
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              <span>Back to services</span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close service details"
              className="inline-grid size-10 place-items-center rounded-full border border-[#cfc7bd] bg-white/80 text-[#3f3934] shadow-sm transition-all duration-200 hover:border-[#1d1d1a] hover:bg-[#1d1d1a] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1d1a]"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* --- Modal Content Area --- */}
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
}