import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionId = params.id;

    const { data: session } = await supabase
      .from("research_sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    const { data: messages } = await supabase
      .from("research_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at");

    const { data: version } = await supabase
      .from("research_versions")
      .select("*")
      .eq("session_id", sessionId)
      .eq("is_current", true)
      .single();

    return NextResponse.json({
      success: true,
      session,
      messages,
      plan: version,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}