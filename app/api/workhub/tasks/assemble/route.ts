import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const { task_id } = await req.json();

  if (!task_id) {
    return NextResponse.json({ error: "task_id required" }, { status: 400 });
  }

  const { data: subtasks } = await supabaseAdmin
    .from("subtasks")
    .select("id, order_index")
    .eq("task_id", task_id)
    .order("order_index", { ascending: true });

  const ids = subtasks?.map((s) => s.id) || [];

  const { data: submissions } = await supabaseAdmin
    .from("submissions")
    .select("*")
    .in("subtask_id", ids);

  const merged = submissions
    ?.map((s) => s.content || "")
    .join("\n\n");

  return NextResponse.json({ output: merged || "" });
}