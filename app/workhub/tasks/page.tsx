import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";
import TaskCard from "@/components/workhub/tasks/task-card";

export default async function TasksPage() {
  // 1. Fetch all Mother Tasks directly from the DB
  const { data: tasks, error } = await supabaseAdmin
    .from("workhub_tasks")
    .select("*, workhub_teams(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="p-20 max-w-6xl mx-auto space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
            Parent Tasks
          </h1>
          <p className="text-sm text-gray-500 font-medium italic">
            Monitoring {tasks?.length || 0} active Mother Tasks across all sectors
          </p>
        </div>

        <Link
          href="/workhub/teams" // Usually, we want people to pick a team first
          className="group flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:scale-[1.02] transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          Create/Manage a Team
        </Link>
      </div>

      {/* TASK GRID */}
      <div className="grid gap-6">
        {(!tasks || tasks.length === 0) ? (
          <div className="p-20 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] text-center">
            <div className="w-16 h-16 bg-transparent dark:bg-transparent rounded-full flex items-center justify-center mx-auto mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No Active Missions Found</p>
            <p className="text-[10px] text-gray-500 mt-1 uppercase">Initialize a team to deploy tasks</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="relative">
                {/* Team Label Overlay */}
                <div className="absolute -top-2 left-6 z-10">
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-gray-900 text-white px-3 py-1 rounded-full shadow-lg">
                     Team: {task.workhub_teams?.name || "Unknown"}
                   </span>
                </div>
                <TaskCard task={task} />
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
}