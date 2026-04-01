"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

export default function SubtaskBuilder({ taskId, teamId }: { taskId: string, teamId: string }) {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<{ user_name: string; user_email: string }[]>([]);
  
  // 1. Initial node state with unique client-side IDs
  const [nodes, setNodes] = useState([
    { id: nanoid(4), title: "", instructions: "", assigned_to: "" }
  ]);
  
  const router = useRouter();

  // 2. Fetch Team Registry on mount to populate the operative dropdown
  useEffect(() => {
    async function fetchRegistry() {
      try {
        const res = await fetch(`/api/workhub/teams/members?team_id=${teamId}`);
        if (res.ok) {
          const data = await res.json();
          setMembers(data.members || []);
        }
      } catch (err) {
        console.error("Registry Link Failure:", err);
      }
    }
    if (teamId) fetchRegistry();
  }, [teamId]);

  const addNode = () => {
    setNodes([...nodes, { id: nanoid(4), title: "", instructions: "", assigned_to: "" }]);
  };

  const removeNode = (index: number) => {
    if (nodes.length === 1) return;
    setNodes(nodes.filter((_, i) => i !== index));
  };

  const updateNode = (index: number, field: string, value: string) => {
    const updated = [...nodes];
    (updated[index] as any)[field] = value;
    setNodes(updated);
  };

const deployNodes = async () => {
    const validNodes = nodes.filter((n) => n.title.trim() !== "");
    if (validNodes.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/workhub/subtasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task_id: taskId,
          team_id: teamId, // 🔥 REQUIRED for Resend automation logic
          subtasks: validNodes.map((node, index) => ({
            title: node.title,
            instructions: node.instructions,
            assigned_to: node.assigned_to.trim() || null,
            order_index: index, 
            status: node.assigned_to ? "in_progress" : "pending" 
          })),
        }),
      });

      if (res.ok) {
        setNodes([{ id: nanoid(4), title: "", instructions: "", assigned_to: "" }]);
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(`Deployment Error: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Critical Deployment Failure:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-transparent border border-white/10 dark:border-gray-800 rounded-[2.5rem] p-6 space-y-6">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Create subtasks
          </h3>
        </div>
        <button 
          onClick={addNode}
          className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-500 transition-colors px-2 py-1 rounded-lg hover:bg-blue-900/20"
        >
          + Add
        </button>
      </div>

      {/* NODE INPUT LIST */}
      <div className="space-y-4">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex items-start gap-3 group animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                {/* TITLE INPUT */}
                <input
                  className="flex-[2] bg-white/5 border border-white/10 focus:border-blue-500/30 p-3 rounded-xl text-sm font-bold outline-none transition-all text-white placeholder:text-gray-600"
                  placeholder="Objective Title..."
                  value={node.title}
                  onChange={(e) => updateNode(index, "title", e.target.value)}
                />
                
                {/* REGISTRY DROPDOWN */}
                <select
                  className="flex-1 bg-white/5 border border-white/10 focus:border-blue-500/30 p-3 rounded-xl text-[10px] font-mono outline-none transition-all text-blue-400 appearance-none cursor-pointer"
                  value={node.assigned_to}
                  onChange={(e) => updateNode(index, "assigned_to", e.target.value)}
                >
                  <option value="" className="bg-black text-gray-500">Choose member</option>
                  {members.map((m) => (
                    <option key={m.user_email} value={m.user_name} className="bg-black text-white">
                      {m.user_name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* INSTRUCTIONS */}
              <textarea
                className="w-full bg-white/5 border border-white/10 focus:border-blue-500/30 p-3 rounded-xl text-[11px] outline-none transition-all text-gray-400 min-h-[50px] resize-none placeholder:text-gray-600"
                placeholder="Deployment parameters / description..."
                value={node.instructions}
                onChange={(e) => updateNode(index, "instructions", e.target.value)}
              />
            </div>
            
            {nodes.length > 1 && (
              <button 
                onClick={() => removeNode(index)}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors mt-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={deployNodes}
        disabled={loading || !nodes[0].title.trim()}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white font-black text-xs uppercase tracking-[0.4em] rounded-2xl shadow-lg shadow-blue-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
      >
        {loading ? "CREATING..." : "Create"}
      </button>

      {/* METADATA FOOTER */}
      <div className="flex justify-center gap-4 opacity-20">
        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">System: Batch-Sync v2</span>
        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Active Nodes: {nodes.length}</span>
      </div>
    </div>
  );
}