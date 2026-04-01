import { supabaseAdmin } from "@/lib/supabase-admin";

export async function createSubtask(data: {
  task_id: string;
  title: string;
  instructions?: string;
  order_index?: number;
}) {
  const { data: subtask, error } = await supabaseAdmin
    .from("subtasks")
    .insert({
      ...data,
      status: "pending",
    })
    .select()
    .single();

  if (error) throw error;

  return subtask;
}

export async function assignSubtask(subtaskId: string, userId: string) {
  const { data, error } = await supabaseAdmin
    .from("subtasks")
    .update({ assigned_to: userId })
    .eq("id", subtaskId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function selfAssignSubtask(
  subtaskId: string,
  userId: string
) {
  const { data, error } = await supabaseAdmin
    .from("subtasks")
    .update({ assigned_to: userId })
    .eq("id", subtaskId)
    .is("assigned_to", null) // 🔥 race-safe
    .select()
    .single();

  if (!data) throw new Error("Subtask already taken");
  if (error) throw error;

  return data;
}