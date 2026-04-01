"use client";

import { useState, useEffect } from "react";
import AssignButton from "./assign-button";

type Subtask = {
  id: string;
  title: string;
  status?: string;
  assigned_to?: string | null;
  instructions?: string | null;
};

export default function SubtaskCard({ 
  subtask, 
  teamId 
}: { 
  subtask: Subtask, 
  teamId: string 
}) {
  const [registry, setRegistry] = useState<{user_name: string}[]>([]);
  const [selectedOperative, setSelectedOperative] = useState("");
  const isAssigned = !!subtask.assigned_to;

  // Fetch the registry so the user can "find themselves" in the dropdown
  useEffect(() => {
    async function loadRegistry() {
      const res = await fetch(`/api/workhub/teams/members?team_id=${teamId}`);
      if (res.ok) {
        const data = await res.json();
        setRegistry(data.members || []);
      }
    }
    if (!isAssigned) loadRegistry();
  }, [teamId, isAssigned]);

  return (
    <div className={`p-5 border transition-all duration-300 relative rounded-[1.5rem] ${
      isAssigned ? "bg-white/[0.03] border-white/5" : "bg-transparent border-white/10 shadow-xl"
    }`}>
      
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
            {subtask.id}
          </span>
          <h4 className="font-black text-lg text-white uppercase tracking-tight">{subtask.title}</h4>
          {subtask.instructions && <p className="text-[11px] text-gray-500 italic mt-1">{subtask.instructions}</p>}
        </div>
        
        <span className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest border ${
          subtask.status === "completed" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
        }`}>
          {subtask.status || "pending"}
        </span>
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between border-t border-white/5 pt-4 gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black border ${
            isAssigned ? "bg-blue-600 text-white border-blue-400" : "bg-white/5 text-gray-600 border-white/10"
          }`}>
            {isAssigned ? subtask.assigned_to?.substring(0, 2).toUpperCase() : "?"}
          </div>
          
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
              {isAssigned ? "Secured By" : "Identify to Claim"}
            </p>
            {isAssigned ? (
              <p className="text-sm font-black text-blue-400 uppercase mt-1">{subtask.assigned_to}</p>
            ) : (
              /* THE IDENTITY DROPDOWN: Allows user to pick themselves */
              <select 
                className="bg-transparent text-white font-black text-xs uppercase outline-none cursor-pointer hover:text-blue-400 transition-colors mt-1"
                value={selectedOperative}
                onChange={(e) => setSelectedOperative(e.target.value)}
              >
                <option value="" className="bg-black text-gray-500">Select Operative...</option>
                {registry.map(m => (
                  <option key={m.user_name} value={m.user_name} className="bg-black text-white">
                    {m.user_name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Action Button: Disabled until an operative is selected in the dropdown */}
        {!isAssigned && (
          <AssignButton 
            subtaskId={subtask.id} 
            userId={selectedOperative} 
            teamId={teamId}
          />
        )}
      </div>
    </div>
  );
}