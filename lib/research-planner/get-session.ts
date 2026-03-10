import { supabase } from "@/lib/supabase";

export async function getResearchSession(sessionId: string) {
  const { data: session } = await supabase
    .from("research_sessions")
    .select("*")
    .eq("id", sessionId)
    .single();

  const { data: messages } = await supabase
    .from("research_messages")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at");

  const { data: plan } = await supabase
    .from("research_versions")
    .select("*")
    .eq("session_id", sessionId)
    .eq("is_current", true)
    .single();

  return {
    session,
    messages,
    plan,
  };
}