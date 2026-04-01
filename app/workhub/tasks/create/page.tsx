import CreateTaskForm from "@/components/workhub/tasks/create-task-form";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";

type Props = {
  params: Promise<{ teamId: string }>;
};

export default async function CreateTaskPage({ params }: Props) {
  const { teamId } = await params;

  // 1. Verify Team and get its name for the header
  const { data: team } = await supabaseAdmin
    .from("workhub_teams")
    .select("name, id")
    .eq("id", teamId)
    .single();

  if (!team) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* BREADCRUMB NAVIGATION */}
        <Link 
          href={`/workhub/teams/${teamId}`}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to {team.name}
        </Link>

        {/* PAGE HEADER */}
        <div className="space-y-3 border-b border-gray-100 dark:border-gray-900 pb-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-600 rounded-full animate-pulse"></span>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
              Deploy Mission
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            You are initiating a new **Mother Task** for team <span className="text-blue-600 font-bold px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 rounded-md">{team.name}</span>. 
            All sub-objectives and team communications will be linked to this primary ID.
          </p>
        </div>

        {/* THE FORM CONTAINER */}
        <div className="relative group">
          {/* Subtle Glow Effect behind the form */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative">
            <CreateTaskForm teamId={teamId} />
          </div>
        </div>

        {/* FOOTER GUIDANCE */}
        <div className="pt-4 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
           <div className="flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase tracking-[0.1em]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Secure Deployment
           </div>
           <div className="flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase tracking-[0.1em]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.5 8.5 0 0 1 4.7 1.4L21 1.5v10z"/></svg>
              Team Broadcast
           </div>
        </div>
      </div>
    </div>
  );
}