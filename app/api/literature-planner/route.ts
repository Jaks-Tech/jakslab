import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import OpenAI from "openai";
import { generateCitationHash } from "@/lib/utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ---------------- Types ---------------- */

type Paper = {
  title: string;
  year: number;
  authors: string;
  journal: string;
  doi: string;
  url: string;
};

/* ---------------- Helpers ---------------- */

async function generateSearchQuery(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Extract 4-6 broad academic keywords for a literature review on this topic. Focus on core scientific or pedagogical mechanisms. Max 6 words. No punctuation.`,
      },
      { role: "user", content: text },
    ],
  });
  return completion.choices[0].message.content?.trim() || text;
}

async function searchOpenAlex(query: string, count: number): Promise<Paper[]> {
  if (!process.env.OPENALEX_API_KEY) throw new Error("OPENALEX_API_KEY missing");

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 15;

  const url = `https://api.openalex.org/works?search=${encodeURIComponent(
    query
  )}&filter=publication_year:${startYear}-${currentYear}&sort=relevance_score:desc&per_page=${count}&select=title,doi,publication_year,authorships,primary_location&api_key=${process.env.OPENALEX_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const data = await res.json();
  return data.results.map((paper: any) => ({
    title: paper.title,
    year: paper.publication_year,
    authors: paper.authorships?.map((a: any) => a.author.display_name).join(", ") || "Unknown",
    journal: paper.primary_location?.source?.display_name || "Academic Journal",
    doi: paper.doi || "",
    url: paper.primary_location?.landing_page_url || paper.doi || "#",
  }));
}

/* ---------------- API Route ---------------- */

export async function POST(req: Request) {
  try {
    const { topic, targetStyle, refCount = 5 } = await req.json();

    if (!topic || !targetStyle) {
      return NextResponse.json({ error: "Missing input fields" }, { status: 400 });
    }

    // Generate unique hash for this topic, style, and count
    const topicHash = generateCitationHash(`${topic.toLowerCase().trim()}-${refCount}`, targetStyle);

    /* ---------- 1. Cache Check ---------- */
    const { data: cached } = await supabase
      .from("literature_reviews")
      .select("*")
      .eq("topic_hash", topicHash)
      .maybeSingle();

    if (cached) {
      return NextResponse.json({ 
        ...cached, 
        topic_summary: cached.summary,
        literature_plan: cached.plan_data,
        suggested_themes: cached.themes,
        isCached: true 
      });
    }

    /* ---------- 2. Research Phase ---------- */
    const searchQuery = await generateSearchQuery(topic);
    
    // Fetch a pool slightly larger than requested to allow AI filtering
    const poolSize = Math.min(refCount + 5, 20); 
    const foundPapers = await searchOpenAlex(searchQuery, poolSize);

    const sourcesMetadata = foundPapers.map((p, i) => 
      `SOURCE ${i+1}: ${p.title} (${p.year}). Authors: ${p.authors}. Journal: ${p.journal}. DOI: ${p.doi}. URL: ${p.url}`
    ).join("\n\n");

    /* ---------- 3. AI Synthesis (Architecture) ---------- */
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a Research Architect. You must respond in valid JSON format.
          
          Instructions:
          1. Select exactly ${refCount} relevant papers from the provided list.
          2. Ignore "AI/ChatGPT" sources if the topic is general science/pedagogy.
          3. For each selected paper:
             - Provide the full citation in ${targetStyle}.
             - Provide a 'content_snippet' (2-sentence summary of the paper's focus).
             - Provide a 'relationship' note (how it specifically supports the TOPIC).
          4. Provide a high-level 'topic_summary' of the research landscape.`,
        },
        { 
          role: "user", 
          content: `TOPIC: ${topic}\nSOURCES:\n${sourcesMetadata}\n\nReturn JSON:
          {
            "topic_summary": "string",
            "literature_plan": [
              {
                "citation": "string",
                "link": "string (URL or DOI)",
                "content_snippet": "string",
                "relationship": "string",
                "relevance": "High/Medium"
              }
            ],
            "suggested_themes": ["string"]
          }` 
        },
      ],
      response_format: { type: "json_object" },
    });

    const aiResult = JSON.parse(completion.choices[0].message.content!);

    /* ---------- 4. Save and Return (Awaited) ---------- */
    const finalPayload = {
      topic_hash: topicHash,
      topic: topic.trim(),
      reference_count: refCount,
      style: targetStyle,
      summary: aiResult.topic_summary,
      plan_data: aiResult.literature_plan,
      themes: aiResult.suggested_themes
    };

    const { data: savedData, error: dbError } = await supabase
      .from("literature_reviews")
      .insert([finalPayload])
      .select()
      .single();

    // Standardize response structure for Frontend
    const responseData = {
      ...(savedData || finalPayload),
      topic_summary: aiResult.topic_summary,
      literature_plan: aiResult.literature_plan,
      suggested_themes: aiResult.suggested_themes,
      isCached: false
    };

    if (dbError) console.error("Supabase Error:", dbError);

    return NextResponse.json(responseData);

  } catch (error: any) {
    console.error("Planner Error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}