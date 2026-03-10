import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: `You are the JaksLab AI Neural Engine. 
          Your goal is to transform a vague project description into a high-performance professional brief.
          Structure the response clearly with:
          1. Refined Summary
          2. Key Deliverables
          3. Estimated Timeline
          4. Technical Requirements
          Use professional, enterprise-grade language.`
        },
        {
          role: "user",
          content: description,
        },
      ],
      temperature: 0.7,
    });

    const analysis = response.choices[0].message.content;

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}