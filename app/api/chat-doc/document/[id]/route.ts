import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {

    const documentId = params.id;

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

    console.error(error);

    return NextResponse.json(
      { error: "Failed to load document" },
      { status: 500 }
    );
  }
}