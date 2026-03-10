import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Await the params to extract the documentId
    const { id: documentId } = await context.params;

    const { data: messages } = await supabase
      .from("document_messages")
      .select("*")
      .eq("document_id", documentId)
      .order("created_at");

    return NextResponse.json({
      success: true,
      messages,
    });

  } catch (error) {
    console.error("Chat Doc Load Error:", error);

    return NextResponse.json(
      { error: "Failed to load document" },
      { status: 500 }
    );
  }
}