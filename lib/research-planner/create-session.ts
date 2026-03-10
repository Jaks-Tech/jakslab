import { supabase } from "@/lib/supabase";

export async function createResearchSession(topic: string, userId?: string) {
  const { data, error } = await supabase
    .from("research_sessions")
    .insert({
      user_id: userId ?? null,
      title: topic.slice(0, 80),
      topic,
    })
    .select()
    .single();

  if (error) {
    throw new Error("Failed to create research session");
  }

  return data;
}