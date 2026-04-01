import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import TeamDetailClientView from "./team-detail-client-view";

type Props = {
  params: Promise<{ teamId: string }>;
};

export default async function TeamDetailPage({ params }: Props) {
  const { teamId } = await params;

  // Fetch Data on Server (Safe to use supabaseAdmin here)
  const [teamRes, tasksRes, membersRes] = await Promise.all([
    supabaseAdmin.from("workhub_teams").select("*").eq("id", teamId).single(),
    supabaseAdmin.from("workhub_tasks").select("*").eq("team_id", teamId).order("created_at", { ascending: false }),
    supabaseAdmin.from("workhub_team_members").select("*").eq("team_id", teamId).order("created_at", { ascending: true })
  ]);

  if (!teamRes.data) notFound();

  return (
    <TeamDetailClientView 
      team={teamRes.data} 
      initialTasks={tasksRes.data || []} 
      initialMembers={membersRes.data || []} 
    />
  );
}