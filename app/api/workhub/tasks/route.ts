import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Helper to generate branded IDs: TSK-XXXXXX
function generateBrandedId() {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TSK-${result}`;
}

export async function POST(req: Request) {
  try {
    const { title, description, team_id, created_by, deadline } = await req.json();

    // 1. Validation
    if (!title || !team_id || !created_by) {
      return NextResponse.json(
        { error: "Missing required fields (Title, Team, or Admin Name)" },
        { status: 400 }
      );
    }

    // 2. Generate the Branded ID
    const newTaskId = generateBrandedId();

    // 3. Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("workhub_tasks")
      .insert({
        id: newTaskId,
        title,
        description,
        team_id,
        created_by, // This is the person who launched the task
        deadline: deadline || null,
        status: "active",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase Task Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      message: "Mother Task launched successfully!", 
      task: data 
    });

  } catch (err) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// Optional: GET handler to fetch all tasks for a specific team
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teamId = searchParams.get("teamId");

  if (!teamId) {
    return NextResponse.json({ error: "teamId is required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("workhub_tasks")
    .select("*")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ tasks: data });
}