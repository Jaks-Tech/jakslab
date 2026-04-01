"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteTeamButton({ teamId }: { teamId: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [inputName, setInputName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!inputName.trim()) {
      setError("Please enter the creator's name.");
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const res = await fetch(`/api/workhub/teams/${teamId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: inputName }),
      });

      const result = await res.json();

      if (res.ok) {
        setIsOpen(false);
        router.push("/workhub/teams");
        router.refresh();
      } else {
        setError(result.error || "Verification failed.");
        setIsDeleting(false);
      }
    } catch (err) {
      setError("A connection error occurred.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* IMPROVED TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-500 hover:text-white border border-red-200 hover:border-red-600 hover:bg-red-600 rounded-lg transition-all duration-200 group"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="14" height="14" 
          viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" strokeWidth="2.5" 
          strokeLinecap="round" strokeLinejoin="round"
          className="group-hover:scale-110 transition-transform"
        >
          <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
        Delete Team
      </button>

      {/* REFINED MODAL OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-md p-4">
          <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Warning Icon Container */}
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>

            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Are you absolutely sure?</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              This action cannot be undone. This will permanently delete the team and all associated data.
              <br/><br/>
              To verify ownership, please enter the <span className="font-bold text-gray-900 dark:text-gray-200 underline decoration-red-500/30">original Creator Name</span>.
            </p>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                autoFocus
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 rounded-xl dark:text-white outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all placeholder:text-gray-400"
                placeholder="Type creator name..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleDelete()}
              />

              {error && (
                <div className="flex items-center gap-2 text-xs text-red-600 font-bold bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                  <span className="shrink-0 text-lg">⚠️</span> {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setError("");
                    setInputName("");
                  }}
                  className="flex-1 px-4 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800/50 rounded-xl transition-all"
                >
                  No, Keep it
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-xl shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] transition-all disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete Team"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}