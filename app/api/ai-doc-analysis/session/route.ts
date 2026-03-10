import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { supabase } from "@/lib/supabase";

/**
 * Remove ```markdown fences if the model returns them
 */
function cleanMarkdown(text: string) {
  if (!text) return "";

  return text
    .replace(/^```markdown\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic = body?.topic?.trim();

    if (!topic || topic.length < 5) {
      return NextResponse.json(
        { success: false, error: "Topic must be at least 5 characters." },
        { status: 400 }
      );
    }

    if (topic.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Topic is too long." },
        { status: 400 }
      );
    }

    /**
     * Create research session
     */
    const { data: session, error: sessionError } = await supabase
      .from("research_sessions")
      .insert({
        title: topic.slice(0, 80),
        topic,
      })
      .select()
      .single();

    if (sessionError) {
      console.error("Supabase session error:", sessionError);

      return NextResponse.json(
        { success: false, error: sessionError.message },
        { status: 500 }
      );
    }

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session creation failed." },
        { status: 500 }
      );
    }

    /**
     * Generate AI research planner
     */
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.35,
      max_tokens: 2200,
      messages: [
        {
          role: "system",
          content: `
You are an expert research planner and academic supervisor.

Generate a structured research planning document in **clean markdown**.

IMPORTANT:
- Do NOT wrap the output in \`\`\`markdown or any code block.
- Return ONLY the markdown content.
- Do NOT include duplicated content.
- Do NOT show raw markdown examples.

Structure:

# Research Plan

## Topic Overview
Explain the concept and importance.

## Brainstorming Directions
Possible angles or research directions.

## Research Questions
Key questions guiding the research.

## Methodology Options
Explain multiple methodologies and compare them.

## Recommended Approach
Explain which approach is best and why.

## Implementation Plan
Step-by-step execution.

## Tools & Resources
Frameworks, datasets, tools.

## Challenges & Risks
Common issues and mitigation.

## Timeline
Suggested milestone schedule.

## Final Advice
Practical advice for starting the research.
`,
        },
        {
          role: "user",
          content: `Create a detailed research planner for this topic:\n\n${topic}`,
        },
      ],
    });

    let result = completion.choices?.[0]?.message?.content?.trim();

    if (!result) {
      throw new Error("AI returned empty response.");
    }

    // remove markdown fences if model ignored instructions
    result = cleanMarkdown(result);

    /**
     * Store chat messages
     */
    const { error: messageError } = await supabase
      .from("research_messages")
      .insert([
        {
          session_id: session.id,
          role: "user",
          content: topic,
        },
        {
          session_id: session.id,
          role: "assistant",
          content: result,
        },
      ]);

    if (messageError) {
      console.error("Message insert error:", messageError);
    }

    /**
     * Store first version of plan
     */
    const { error: versionError } = await supabase
      .from("research_versions")
      .insert({
        session_id: session.id,
        content: result,
        version_number: 1,
        is_current: true,
      });

    if (versionError) {
      console.error("Version insert error:", versionError);
    }

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      result,
    });
  } catch (error: any) {
    console.error("Research planner error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to generate research planner",
      },
      { status: 500 }
    );
  }
}