import { supabase } from "@/lib/supabase";

export async function saveMessage(
  sessionId: string,
  role: "user" | "assistant" | "system",
  content: string
) {
  const { error } = await supabase
    .from("research_messages")
    .insert({
      session_id: sessionId,
      role,
      content,
    });

  if (error) {
    throw new Error("Failed to save message");
  }
}