import { supabaseAdmin } from "@/lib/supabase-admin";

export async function createTeam(name: string, userId: string) {
  const { data: team, error } = await supabaseAdmin
    .from("teams")
    .insert({
      name,
      created_by: userId,
    })
    .select()
    .single();

  if (error) throw error;

  // Add creator as admin
  await supabaseAdmin.from("team_members").insert({
    team_id: team.id,
    user_id: userId,
    role: "admin",
  });

  return team;
}

export async function getTeams() {
  const { data, error } = await supabaseAdmin
    .from("teams")
    .select("*");

  if (error) throw error;

  return data;
}