import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description || description.length < 5) {
      return NextResponse.json({ error: "Description too short" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert Project Planning Assistant.

Your task is to convert rough client notes into a clear professional project brief.

First determine the TYPE of project before creating the timeline. Possible categories include:
• Software / App Development
• Website Development
• Research / Academic Work
• Business Project
• Content Creation
• General Task Planning

IMPORTANT TIMELINE RULES:
• Research or academic topics (like "effects of corruption") should have realistic research timelines (1–6 months typically).
• Essays or reports should have timelines measured in days or weeks.
• Software projects usually take several weeks to months depending on complexity.
• Do NOT give unrealistically short timelines for complex topics.
• If the scope is unclear, provide a **reasonable professional estimate**.

Structure your response using these EXACT sections:

1. **Project Overview**
A concise 2–3 sentence explanation of the project.

2. **Project Type**
State what type of project this is.

3. **Key Deliverables**
Bullet list of expected outputs.

4. **Proposed Timeline**
Break into logical phases with realistic durations.
Example phases depending on project type:
• Research
• Planning
• Development
• Writing
• Testing
• Revision
• Launch / Submission

5. **Technical Requirements**
Mention tools, software, or skills needed (if applicable).

Tone: Professional, structured, and realistic.
If information is missing, include **Suggested assumptions** clearly labeled.`
        },
        {
          role: "user",
          content: `Here are my project notes: "${description}"`
        }
      ],
      temperature: 0.6,
    });

    const analysis = completion.choices[0].message.content;

    return NextResponse.json({ analysis });

  } catch (error: any) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 });
  }
}