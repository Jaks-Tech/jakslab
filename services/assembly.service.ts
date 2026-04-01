import { supabaseAdmin } from "@/lib/supabase-admin";

export async function assembleTask(taskId: string) {
  const { data: subtasks } = await supabaseAdmin
    .from("subtasks")
    .select("id, order_index")
    .eq("task_id", taskId)
    .order("order_index", { ascending: true });

  const ids = subtasks?.map((s) => s.id) || [];

  const { data: submissions } = await supabaseAdmin
    .from("submissions")
    .select("*")
    .in("subtask_id", ids);

  const merged = submissions
    ?.map((s) => s.content || "")
    .join("\n\n");

  return merged || "";
}