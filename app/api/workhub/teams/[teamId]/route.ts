import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// 1. GET - Fetch a single team's details
export async function GET(
  req: Request,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;

  const { data, error } = await supabaseAdmin
    .from("workhub_teams")
    .select("*")
    .eq("id", teamId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  return NextResponse.json({ team: data });
}

// 2. DELETE - Verify owner and remove team
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ teamId: string }> }
) {
  try {
    const { teamId } = await params;
    const { userName } = await req.json(); // Name entered in the prompt

    if (!userName) {
      return NextResponse.json({ error: "Verification name required" }, { status: 400 });
    }

    // First, find the "Secret" creator name in the DB
    const { data: team, error: fetchError } = await supabaseAdmin
      .from("workhub_teams")
      .select("created_by")
      .eq("id", teamId)
      .single();

    if (fetchError || !team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // THE SECURITY CHECK
    // Compare what was typed in the prompt vs what is in the DB
    if (team.created_by.trim().toLowerCase() !== userName.trim().toLowerCase()) {
      return NextResponse.json(
        { error: "Incorrect Creator Name. Deletion denied." },
        { status: 403 }
      );
    }

    // If it matches, delete the team
    const { error: deleteError } = await supabaseAdmin
      .from("workhub_teams")
      .delete()
      .eq("id", teamId);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Team deleted successfully" });

  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}