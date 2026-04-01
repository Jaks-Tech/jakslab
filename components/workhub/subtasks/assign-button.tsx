"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AssignButtonProps {
  subtaskId: string;
  userId: string;
  teamId: string;
}

export default function AssignButton({ 
  subtaskId, 
  userId, 
  teamId 
}: AssignButtonProps) {
  const [loading, setLoading] = useState(false);
  const [isSuccessfullyAssigned, setIsSuccessfullyAssigned] = useState(false);
  const router = useRouter();

  const handleAssign = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/workhub/subtasks/self-assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          subtask_id: subtaskId, 
          user_id: userId,
          team_id: teamId
        }),
      });

      if (res.ok) {
        // 1. Set local success state for instant visual feedback
        setIsSuccessfullyAssigned(true);
        // 2. Refresh the server components in the background
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to secure node.");
      }
    } catch (err) {
      console.error("Assignment failed", err);
    } finally {
      setLoading(false);
    }
  };

  // If the user just claimed it, show the confirmation immediately
  if (isSuccessfullyAssigned) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl animate-in fade-in zoom-in duration-300">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">
          Secured by {userId}
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={handleAssign}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20 flex items-center gap-2"
    >
      {loading ? (
        <>
          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Securing...
        </>
      ) : (
        "Claim Node"
      )}
    </button>
  );
}