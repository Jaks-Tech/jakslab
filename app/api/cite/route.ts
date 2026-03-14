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
  citations: number;
};

/* ---------------- Helpers ---------------- */

function isUrl(text: string) {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
}

function isDOI(input: string) {
  return input.includes("doi.org") || input.startsWith("10.");
}

/* ---------------- External API Fetchers ---------------- */

async function fetchDOIMetadata(doi: string) {
  const cleanDOI = doi.replace("https://doi.org/", "").trim();
  const res = await fetch(`https://api.crossref.org/works/${cleanDOI}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.message;
}

async function fetchWithTavily(url: string) {
  const res = await fetch("https://api.tavily.com/extract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      urls: [url],
    }),
  });
  const data = await res.json();
  return data?.results?.[0] || null;
}

/* ---------------- Research Logic ---------------- */

async function generateSearchQuery(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Extract the core scientific or pedagogical claim. Focus on mechanisms (e.g., "explicit instruction") rather than modern technology unless the text is specifically about tech. Max 6 words. No punctuation.`,
      },
      { role: "user", content: text },
    ],
  });
  return completion.choices[0].message.content?.trim() || text;
}

async function searchOpenAlex(query: string): Promise<Paper[]> {
  if (!process.env.OPENALEX_API_KEY) throw new Error("OPENALEX_API_KEY missing");

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 15; 

  const url = `https://api.openalex.org/works?search=${encodeURIComponent(
    query
  )}&filter=publication_year:${startYear}-${currentYear}&sort=relevance_score:desc&per_page=10&select=title,doi,publication_year,authorships,cited_by_count,primary_location&api_key=${process.env.OPENALEX_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const data = await res.json();
  return data.results.map((paper: any) => ({
    title: paper.title,
    year: paper.publication_year,
    authors: paper.authorships?.map((a: any) => a.author.display_name).join(", ") || "Unknown",
    journal: paper.primary_location?.source?.display_name || "Academic Journal",
    doi: paper.doi,
    citations: paper.cited_by_count,
  }));
}

/* ---------------- API Route ---------------- */

export async function POST(req: Request) {
  try {
    const { rawInput, targetStyle } = await req.json();

    if (!rawInput || !targetStyle) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 });
    }

    const hash = generateCitationHash(rawInput, targetStyle);

    /* ---------- 1. Cache Check ---------- */
    const { data: cachedData } = await supabase
      .from("citation_cache")
      .select("*")
      .eq("hash", hash)
      .maybeSingle();

    if (cachedData) return NextResponse.json({ ...cachedData, isCached: true });

    let structuredInput = rawInput;
    let sourcesList = ""; // Defined here to prevent ReferenceError

    /* ---------- 2. Logic Branching ---------- */
    if (isDOI(rawInput)) {
      const meta = await fetchDOIMetadata(rawInput);
      if (meta) {
        structuredInput = `DOI Meta: ${meta.title?.[0]} by ${meta.author?.[0]?.family}`;
        sourcesList = structuredInput;
      }
    } else if (isUrl(rawInput)) {
      const page = await fetchWithTavily(rawInput);
      if (page) {
        structuredInput = `URL Content: ${page.title} - ${page.content?.slice(0, 1000)}`;
        sourcesList = structuredInput;
      }
    } else {
      const searchQuery = await generateSearchQuery(rawInput);
      const foundPapers = await searchOpenAlex(searchQuery);
      
      sourcesList = foundPapers
        .map((p, i) => `SOURCE ${i+1}: ${p.title} (${p.year}). Authors: ${p.authors}. Journal: ${p.journal}. DOI: ${p.doi}`)
        .join("\n\n");

      structuredInput = `
CLAIM TO SUPPORT: ${rawInput}
STYLE: ${targetStyle}

POTENTIAL SOURCES:
${sourcesList}
`.trim();
    }

    /* ---------- 3. Contextual Rewrite Generation ---------- */
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an academic librarian and editor. You must respond in JSON format.
          Step 1: Select the SINGLE most relevant source that accurately supports the CLAIM.
          Step 2: If a source is about "AI" or "ChatGPT" but the claim is about general education/science, ignore it.
          Step 3: Rewrite the user's original CLAIM into a scholarly paragraph that naturally integrates the citation in ${targetStyle} style.

          Format JSON:
          {
            "full_reference": "Full bibliographic citation",
            "in_text": "(Author, Year)",
            "example": "The rewritten paragraph with citation integrated naturally."
          }`,
        },
        { role: "user", content: `Please provide the following research in JSON: ${structuredInput}` },
      ],
      response_format: { type: "json_object" },
    });

    const aiResult = JSON.parse(completion.choices[0].message.content!);

    /* ---------- 4. Save to Cache (Awaited) ---------- */
    const finalPayload = {
      hash,
      raw_input: rawInput,
      style: targetStyle,
      full_reference: aiResult.full_reference,
      in_text: aiResult.in_text,
      example: aiResult.example,
    };

    // Await ensures the result is available immediately
    await supabase.from("citation_cache").insert([finalPayload]);

    return NextResponse.json({ ...finalPayload, isCached: false });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}