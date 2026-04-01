import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import ChatBox from "@/components/workhub/chat/chat-box";
import Link from "next/link";

type Props = {
  params: Promise<{ taskId: string }>;
};

export default async function TaskChatPage({ params }: Props) {
  const { taskId } = await params;

  // Fetch Task and the nested Team Name
  const { data: task } = await supabaseAdmin
    .from("workhub_tasks")
    .select(`
      title,
      id,
      workhub_teams (
        name
      )
    `)
    .eq("id", taskId)
    .single();

  if (!task) return notFound();

  const teamName = (task.workhub_teams as any)?.name || "Unknown Team";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 space-y-6">
      
      {/* HEADER NAVIGATION */}
      <div className="w-full max-w-2xl flex items-center justify-between px-2">
        <Link 
          href={`/workhub/tasks/${taskId}`}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-blue-600 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          Back to {task.title}
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">Live Sync</span>
        </div>
      </div>

      {/* THE CHAT HUB */}
      <div className="w-full max-w-4xl h-[80vh] relative group">
        {/* Ambient Glow */}
        <div className="absolute -inset-1 bg-blue-500/10 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative h-full">
          <ChatBox 
            taskId={taskId} 
            teamname={teamName} 
          />
        </div>
      </div>

      {/* FOOTER VERIFICATION */}
      <p className="text-[9px] text-gray-600 uppercase font-bold tracking-[0.4em] opacity-40 text-center">
        Protocol: {task.title} • Secure Handshake Verified
      </p>
    </div>
  );
}