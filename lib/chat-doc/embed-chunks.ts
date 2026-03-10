import { openai } from "@/lib/openai";

export async function embedChunks(chunks: string[]) {

  const embeddings = await Promise.all(
    chunks.map(async (chunk) => {

      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk,
      });

      return {
        content: chunk,
        embedding: response.data[0].embedding,
      };

    })
  );

  return embeddings;
}