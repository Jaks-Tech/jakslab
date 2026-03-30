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

  if (!res.ok) return null;

  const data = await res.json();
  return data?.results?.[0] || null;
}

/* ---------------- Research Logic ---------------- */

async function generateSearchQuery(text: string) {
  const cleaned = text.trim();
  const words = cleaned.split(/\s+/).filter(Boolean);

  if (words.length <= 12) {
    return cleaned;
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    messages: [
      {
        role: "system",
            content: `
            You transform long academic text into an OpenAlex search query.

            Rules:
            - If the input has 12 words or fewer, return it exactly as written.
            - If the input has more than 12 words, rewrite it into a context-preserving academic search query.
            - The query must be between 10 and 15 words.
            - Preserve the core claim and important context such as topic, population, setting, outcome, and comparison.
            - Remove only non-essential filler words.
            - Do not reduce the query to vague keywords.
            - Do not use punctuation.
            - Return only the query text.
            `.trim(),
      },
      { role: "user", content: cleaned },
    ],
  });

  return completion.choices[0].message.content?.trim() || cleaned;
}

/* ---------------- OpenAlex Search ---------------- */

async function searchOpenAlex(
  query: string,
  numSources: number
): Promise<Paper[]> {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 5;

  const url = `https://api.openalex.org/works?search=${encodeURIComponent(
    query
  )}&filter=publication_year:${startYear}-${currentYear}&sort=relevance_score:desc&per_page=${
    numSources * 2
  }&select=title,doi,publication_year,authorships,cited_by_count,primary_location`;

  const res = await fetch(url);

  if (!res.ok) return [];

  const data = await res.json();

  return data.results.map((paper: any) => ({
    title: paper.title,
    year: paper.publication_year,
    authors:
      paper.authorships
        ?.map((a: any) => a.author.display_name)
        .join(", ") || "Unknown",
    journal:
      paper.primary_location?.source?.display_name || "Academic Journal",
    doi: paper.doi,
    citations: paper.cited_by_count,
  }));
}

/* ---------------- API Route ---------------- */

export async function POST(req: Request) {
  try {
    const { rawInput, targetStyle, numSources } = await req.json();

    if (!rawInput || !targetStyle || !numSources) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 });
    }

    const hash = generateCitationHash(rawInput, targetStyle + numSources);

    /* ---------- Cache Check ---------- */

    const { data: cachedData } = await supabase
      .from("citation_cache")
      .select("*")
      .eq("hash", hash)
      .maybeSingle();

    if (cachedData) {
      return NextResponse.json({ ...cachedData, isCached: true });
    }

    let structuredInput = rawInput;
    let sourcesList = "";

    /* ---------- DOI Handling ---------- */

    if (isDOI(rawInput)) {
      const meta = await fetchDOIMetadata(rawInput);

      if (meta) {
        structuredInput = `DOI Meta: ${meta.title?.[0]} by ${meta.author?.[0]?.family}`;
        sourcesList = structuredInput;
      }
    }

    /* ---------- URL Handling ---------- */

    else if (isUrl(rawInput)) {
      const page = await fetchWithTavily(rawInput);

      if (page) {
        structuredInput = `URL Content: ${page.title} - ${page.content?.slice(
          0,
          1200
        )}`;
        sourcesList = structuredInput;
      }
    }

    /* ---------- Paragraph / Claim Handling ---------- */

    else {
      const searchQuery = await generateSearchQuery(rawInput);

      const foundPapers = await searchOpenAlex(searchQuery, numSources);

      const selectedPapers = foundPapers.slice(0, numSources);

      sourcesList = selectedPapers
        .map(
          (p, i) =>
            `SOURCE ${i + 1}: ${p.title} (${p.year}). Authors: ${
              p.authors
            }. Journal: ${p.journal}. DOI: ${p.doi}`
        )
        .join("\n\n");

      structuredInput = `
CLAIM OR PARAGRAPH:
${rawInput}

STYLE:
${targetStyle}

NUMBER OF SOURCES:
${numSources}

AVAILABLE SOURCES:
${sourcesList}
`.trim();
    }

    /* ---------- AI Rewrite ---------- */

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an academic librarian and editor.

Use ALL provided sources to support the paragraph.

Rewrite the paragraph into a scholarly version and cite every source.

Return JSON in this format:

{
 "references":[
   "Full citation 1",
   "Full citation 2"
 ],
 "in_text_citations":[
   "(Author, Year)"
 ],
 "example":"Rewritten paragraph citing all sources."
}

Citations must follow ${targetStyle} style.`,
        },
        {
          role: "user",
          content: structuredInput,
        },
      ],
      response_format: { type: "json_object" },
    });

    const aiResult = JSON.parse(completion.choices[0].message.content!);

    /* ---------- Save to Cache ---------- */

    const finalPayload = {
      hash,
      raw_input: rawInput,
      style: targetStyle,
      references: aiResult.references,
      in_text_citations: aiResult.in_text_citations,
      example: aiResult.example,
    };

    await supabase.from("citation_cache").insert([finalPayload]);

    return NextResponse.json({ ...finalPayload, isCached: false });
  } catch (error: any) {
    console.error("API Error:", error);

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}