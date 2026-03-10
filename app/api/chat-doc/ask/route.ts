import { NextResponse } from "next/server";

import { openai } from "@/lib/openai";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {

  try {

    const { documentId, question } = await req.json();

    if (!documentId || !question) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: question,
    });

    const embedding = embeddingResponse.data[0].embedding;

    const { data: chunks } = await supabase.rpc(
      "match_document_chunks",
      {
        query_embedding: embedding,
        match_count: 5,
        doc_id: documentId,
      }
    );

    const context = chunks
      ?.map((c: any) => c.content)
      .join("\n\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You answer questions using the provided document context.

Only use information from the document.
If the answer is not present say "The document does not contain that information".
`,
        },
        {
          role: "user",
          content: `
Context:
${context}

Question:
${question}
`,
        },
      ],
    });

    const answer =
      completion.choices[0]?.message?.content?.trim();

    await supabase.from("document_messages").insert([
      {
        document_id: documentId,
        role: "user",
        content: question,
      },
      {
        document_id: documentId,
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
      { error: "Failed to answer question" },
      { status: 500 }
    );
  }
}