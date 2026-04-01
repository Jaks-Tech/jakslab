import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const team_id = searchParams.get("team_id");

    if (!team_id) {
      return NextResponse.json({ error: "Missing team_id" }, { status: 400 });
    }

    // Matching the logic from your Server Component
    const { data, error } = await supabaseAdmin
      .from("workhub_team_members")
      .select("user_name, user_email")
      .eq("team_id", team_id)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ members: data });
  } catch (err: any) {
    console.error("Member Fetch Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}