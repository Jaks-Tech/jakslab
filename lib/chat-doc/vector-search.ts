import { supabase } from "@/lib/supabase";
import { openai } from "@/lib/openai";

export async function vectorSearch(documentId: string, question: string) {

  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });

  const embedding = embeddingResponse.data[0].embedding;

  const { data } = await supabase.rpc("match_document_chunks", {
    query_embedding: embedding,
    match_count: 5,
    doc_id: documentId,
  });

  return data ?? [];
}