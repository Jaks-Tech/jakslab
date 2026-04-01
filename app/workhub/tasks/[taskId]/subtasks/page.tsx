import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import Link from "next/link";

// Components
import SubtaskBuilder from "@/components/workhub/subtasks/subtask-builder";
import SubtaskCard from "@/components/workhub/subtasks/subtask-card";
import ChatBox from "@/components/workhub/chat/chat-box";

type Props = {
  params: Promise<{ taskId: string }>;
};

export default async function TaskDetailPage({ params }: Props) {
  const { taskId } = await params;

  // 1. Fetch Mother Task and its Team context
  const { data: task } = await supabaseAdmin
    .from("workhub_tasks")
    .select(`*, team_id, workhub_teams(name)`)
    .eq("id", taskId)
    .single();

  if (!task) return notFound();

  // 2. Fetch associated Subtasks
  const { data: subtasks } = await supabaseAdmin
    .from("workhub_subtasks")
    .select("*")
    .eq("task_id", taskId)
    .order("order_index", { ascending: true });

  const teamName = (task.workhub_teams as any)?.name || "Unknown Sector";
  const teamId = task.team_id;

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER: MISSION IDENTITY */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <Link 
              href={`/workhub/teams/${teamId}`} 
              className="text-[10px] font-black titlecase tracking-[0.3em] text-gray-400 hover:text-blue-600 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Back to {teamName}
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-blue-600 text-white px-2 py-0.5 rounded">
                {task.id}
              </span>
              <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white titlecase">
                {task.title}
              </h1>
            </div>
            <p className="text-sm text-gray-500 font-medium italic">
              Team: <span className="text-blue-600 font-bold px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 rounded titlecase tracking-tighter">{teamName}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
             <div className="text-right hidden md:block">
                <p className="text-[10px] font-black titlecase text-gray-400 tracking-widest">Registry Status</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white titlecase">{task.status || "Active"}</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             </div>
          </div>
        </header>

        {/* MAIN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-8">
            <SubtaskBuilder taskId={taskId} teamId={teamId} />

            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Substasks Created</h3>
              </div>

              <div className="grid gap-4">
                {(!subtasks || subtasks.length === 0) ? (
                  <div className="p-12 border-2 border-dashed border-white/10 rounded-[2rem] text-center bg-white/5">
                    <p className="text-gray-500 text-[10px] font-black titlecase tracking-widest italic opacity-40">Awaiting Sub-tasks...</p>
                  </div>
                ) : (
                  subtasks.map((st) => (
                    <SubtaskCard 
                      key={st.id} 
                      subtask={st} 
                      teamId={teamId} 
                      // currentUserId removed to match the new SubtaskCard component signature
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:h-[calc(100vh-160px)] lg:sticky lg:top-8">
            <div className="h-full flex flex-col">
               <div className="flex items-center gap-2 mb-4 px-2">
                  <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Chat your Team</h3>
               </div>
               <div className="flex-1 min-h-[500px] lg:min-h-0 bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                  <ChatBox taskId={taskId} teamname={teamName} />
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}