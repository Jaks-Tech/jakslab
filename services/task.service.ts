import { supabaseAdmin } from "@/lib/supabase-admin";

export async function createTask(data: {
  title: string;
  description?: string;
  deadline?: string;
  team_id: string;
  created_by: string;
  order_id?: string | null;
}) {
  const { data: task, error } = await supabaseAdmin
    .from("tasks")
    .insert(data)
    .select()
    .single();

  if (error) throw error;

  return task;
}

export async function getTasks() {
  const { data, error } = await supabaseAdmin
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getTaskById(taskId: string) {
  const { data, error } = await supabaseAdmin
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .single();

  if (error) throw error;

  return data;
}