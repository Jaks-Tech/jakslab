import { supabaseAdmin } from "@/lib/supabase-admin";

export async function getMessages(taskId: string) {
  const { data, error } = await supabaseAdmin
    .from("messages")
    .select("*")
    .eq("task_id", taskId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data;
}

export async function sendMessage(data: {
  task_id: string;
  sender_id: string;
  message: string;
}) {
  const { data: msg, error } = await supabaseAdmin
    .from("messages")
    .insert(data)
    .select()
    .single();

  if (error) throw error;

  return msg;
}