import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{ taskId: string }>;
};

export default async function TaskDetailPage({ params }: Props) {
  const { taskId } = await params;

  // 1. Fetch Task Details directly for speed
  const { data: task } = await supabaseAdmin
    .from("workhub_tasks")
    .select("*, workhub_teams(name, id)")
    .eq("id", taskId)
    .single();

  if (!task) return notFound();

  // 2. Format the deadline long-style
  const formattedDeadline = task.deadline 
    ? new Date(task.deadline).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).replace(',', ' •')
    : "No deadline set";

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* NAVIGATION */}
      <Link 
        href={`/workhub/teams/${task.team_id}`}
        className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 flex items-center gap-2 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to {task.workhub_teams?.name}
      </Link>

      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-transparent border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full uppercase tracking-widest">
                ID: {task.id}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-1 border dark:border-gray-800 rounded-full">
                Status: {task.status}
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
              {task.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-2xl">
              {task.description || "The mission objective has not been detailed yet."}
            </p>
          </div>

          {/* DEADLINE WIDGET */}
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-5 rounded-2xl min-w-[200px]">
            <p className="text-[10px] font-black uppercase text-red-400 tracking-widest mb-2">Target Deadline</p>
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-black text-sm uppercase italic tracking-tighter">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {formattedDeadline}
            </div>
          </div>
        </div>
      </div>

      {/* ACTION HUB */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SUBTASKS CARD */}
        <Link href={`/workhub/tasks/${taskId}/subtasks`} className="group relative overflow-hidden bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all">
          <div className="relative z-10 flex justify-between items-end h-full">
            <div>
              <h2 className="text-2xl font-black text-white">Subtasks</h2>
              <p className="text-blue-100 text-sm mt-1">Breakdown & Assembly Line</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
        </Link>

        {/* CHAT CARD */}
        <Link href={`/workhub/tasks/${taskId}/chat`} className="group relative overflow-hidden bg-gray-900 dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:-translate-y-1 transition-all">
          <div className="relative z-10 flex justify-between items-end h-full">
            <div>
              <h2 className="text-2xl font-black text-white">Secure Chat</h2>
              <p className="text-gray-400 text-sm mt-1">Direct Task Communication</p>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
        </Link>
      </div>
      
      {/* FOOTER NOTE */}
      <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold pt-8">
        Strict Internal Verification Protocol Active
      </p>
    </div>
  );
}