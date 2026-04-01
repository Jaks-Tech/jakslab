import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const { subtask_id, user_id, content, file_url } = await req.json();

  if (!subtask_id || !user_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("submissions")
    .insert({
      subtask_id,
      user_id,
      content,
      file_url,
      status: "submitted",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ submission: data });
}