import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// GET: Retrieve Chat History
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const task_id = searchParams.get("task_id");

    if (!task_id) return NextResponse.json({ error: "Missing task_id" }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from("workhub_messages")
      .select("*")
      .eq("task_id", task_id)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Send New Transmission
// app/api/workhub/messages/route.ts
export async function POST(req: Request) {
  try {
    const { task_id, sender_id, message } = await req.json(); // Matches your ChatBox

    const { data, error } = await supabaseAdmin
      .from("workhub_messages")
      .insert([{ 
        task_id, 
        user_name: sender_id, // Map sender_id to user_name column
        content: message      // Map message to content column
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}