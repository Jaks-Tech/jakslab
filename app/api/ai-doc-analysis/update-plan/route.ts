import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { sessionId, content } = await req.json();

    if (!sessionId || !content?.trim()) {
      return NextResponse.json(
        { error: "sessionId and content required" },
        { status: 400 }
      );
    }

    const { data: versions } = await supabase
      .from("research_versions")
      .select("version_number")
      .eq("session_id", sessionId)
      .order("version_number", { ascending: false });

    const nextVersion = (versions?.[0]?.version_number ?? 0) + 1;

    await supabase
      .from("research_versions")
      .update({ is_current: false })
      .eq("session_id", sessionId)
      .eq("is_current", true);

    await supabase.from("research_versions").insert({
      session_id: sessionId,
      content,
      version_number: nextVersion,
      is_current: true,
    });

    return NextResponse.json({
      success: true,
      version: nextVersion,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to save plan version" },
      { status: 500 }
    );
  }
}