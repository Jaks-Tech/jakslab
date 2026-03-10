import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { sessionId, question } = await req.json();

    if (!sessionId || !question?.trim()) {
      return NextResponse.json(
        { error: "sessionId and question required" },
        { status: 400 }
      );
    }

    const { data: version } = await supabase
      .from("research_versions")
      .select("content")
      .eq("session_id", sessionId)
      .eq("is_current", true)
      .single();

    const { data: messages } = await supabase
      .from("research_messages")
      .select("role, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    const chatMessages = [
      {
        role: "system" as const,
        content:
          "You are a research supervisor helping refine an existing research plan.",
      },
      {
        role: "system" as const,
        content: `Current research plan:\n\n${version?.content ?? ""}`,
      },
      ...(messages ?? []).map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
      {
        role: "user" as const,
        content: question,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.35,
      max_tokens: 1800,
      messages: chatMessages,
    });

    const answer = completion.choices?.[0]?.message?.content?.trim();

    if (!answer) throw new Error("Empty AI response");

    await supabase.from("research_messages").insert([
      {
        session_id: sessionId,
        role: "user",
        content: question,
      },
      {
        session_id: sessionId,
        role: "assistant",
        content: answer,
      },
    ]);

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to process follow-up" },
      { status: 500 }
    );
  }
}