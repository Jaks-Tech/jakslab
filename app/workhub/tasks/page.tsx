import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";
import TaskCard from "@/components/workhub/tasks/task-card";

export default async function TasksPage() {
  const { data: tasks } = await supabaseAdmin
    .from("workhub_tasks")
    .select("*, workhub_teams(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-10 max-w-6xl mx-auto space-y-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
            Parent Tasks
          </h1>
          <p className="text-sm text-gray-500 font-medium italic">
            Monitoring {tasks?.length || 0} active Mother Tasks across all teams
          </p>
        </div>

        <Link
          href="/workhub/teams"
          className="group flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-xl sm:rounded-2xl shadow-xl hover:scale-[1.02] transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          Create/Manage a Team
        </Link>
      </div>

      {/* TASK GRID */}
      {(!tasks || tasks.length === 0) ? (
        <div className="p-10 sm:p-16 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-[3rem] text-center">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/>
            </svg>
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
            No Active Tasks Found
          </p>
          <p className="text-[10px] text-gray-500 mt-1 uppercase">
            Create a team to deploy tasks
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="relative">
              {/* TEAM LABEL */}
              <div className="absolute -top-2 left-4 sm:left-6 z-10">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-gray-900 text-white px-2 sm:px-3 py-1 rounded-full shadow-lg">
                  Team: {task.workhub_teams?.name || "Unknown"}
                </span>
              </div>
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}