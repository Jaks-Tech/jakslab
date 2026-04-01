"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateTaskForm({ teamId }: { teamId: string }) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTaskId, setNewTaskId] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    created_by: "",
  });

  // Auto-expand description logic
// Auto-expand and shrink description logic
    useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
        // 1. Reset height to 'auto' or '0px' to force the browser 
        // to recalculate the actual content height (this allows shrinking)
        textarea.style.height = "auto";

        // 2. Capture the new scrollHeight
        const nextHeight = textarea.scrollHeight;

        // 3. Apply the new height (respecting your 100px minimum)
        textarea.style.height = `${Math.max(nextHeight, 100)}px`;
    }
    }, [form.description]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.created_by) {
      alert("Title and Your Name are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/workhub/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          team_id: teamId,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.error || "Failed to create task");
        return;
      }

      setNewTaskId(data.task.id);
      setShowModal(true);
      setForm({ title: "", description: "", deadline: "", created_by: "" });
    } catch (err) {
      setLoading(false);
      alert("Network error. Please try again.");
    }
  };

  const closeAndRefresh = () => {
    setShowModal(false);
    router.refresh();
  };

  return (
    <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-black mb-6 flex items-center gap-2 dark:text-white">
        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
        Create New Task
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-[15px] font-bold titlecase text-gray-400 tracking-widest ml-1">Task Title</label>
          <input
            className="w-full bg-gray-50 dark:bg-transparent border border-gray-100 dark:border-gray-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            placeholder="e.g., Final Year Research Project"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Admin Name */}
        <div className="space-y-1">
          <label className="text-[15px] font-bold titlecase text-gray-400 tracking-widest ml-1">Task Admin (Your Name)</label>
          <input
            className="w-full bg-gray-50 dark:bg-transparent border border-gray-100 dark:border-gray-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            placeholder="Who is managing this task?"
            value={form.created_by}
            onChange={(e) => setForm({ ...form, created_by: e.target.value })}
          />
        </div>

        {/* Expanding Description */}
        <div className="space-y-1">
          <label className="text-[15px] font-bold titlecase text-gray-400 tracking-widest ml-1">Description</label>
          <textarea
            ref={textareaRef}
            className="w-full bg-gray-50 dark:bg-transparent border border-gray-100 dark:border-gray-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[100px] resize-none overflow-hidden dark:text-white"
            placeholder="Describe the main goal of this project..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Deadline */}
        <div className="space-y-1">
          <label className="text-[13px] font-bold titlecase text-gray-400 tracking-widest ml-1">Global Deadline</label>
          <input
            type="date"
            className="w-full bg-gray-50 dark:bg-transparent border border-gray-500 dark:border-gray-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-green-600 dark:text-green-400 text-4xl font-bold">✓</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">Task Created!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Branded ID assigned:</p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-mono font-bold rounded-xl tracking-widest border border-blue-100 dark:border-blue-800">
              {newTaskId}
            </div>
            <button
              onClick={closeAndRefresh}
              className="mt-8 w-full py-4 bg-gray-900 dark:bg-blue-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}