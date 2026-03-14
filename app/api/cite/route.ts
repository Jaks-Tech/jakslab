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

function getYearRange() {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 5;
  return { startYear, currentYear };
}

/* ---------------- Crossref DOI ---------------- */

async function fetchDOIMetadata(doi: string) {
  const cleanDOI = doi.replace("https://doi.org/", "").trim();

  const res = await fetch(`https://api.crossref.org/works/${cleanDOI}`);

  if (!res.ok) return null;

  const data = await res.json();
  return data.message;
}

/* ---------------- Tavily URL ---------------- */

async function fetchWithTavily(url: string) {
  const res = await fetch("https://api.tavily.com/extract", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      urls: [url],
    }),
  });

  const data = await res.json();
  return data?.results?.[0] || null;
}

/* ---------------- Query Extraction ---------------- */

async function generateSearchQuery(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Extract a short academic research query.

Rules:
- Maximum 8 words
- Only the main research topic
- No punctuation

Example:
climate change education data analysis`,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return completion.choices[0].message.content?.trim() || text;
}

/* ---------------- OpenAlex Search ---------------- */

async function searchOpenAlex(query: string): Promise<Paper[]> {
  if (!process.env.OPENALEX_API_KEY) {
    throw new Error("OPENALEX_API_KEY missing");
  }

  const { startYear, currentYear } = getYearRange();

  const url = `https://api.openalex.org/works?search=${encodeURIComponent(
    query
  )}&filter=publication_year:${startYear}-${currentYear}&sort=cited_by_count:desc&per_page=5&select=title,doi,publication_year,authorships,cited_by_count,primary_location&api_key=${process.env.OPENALEX_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) return [];

  const data = await res.json();

  const papers: Paper[] = data.results.map((paper: any) => ({
    title: paper.title,
    year: paper.publication_year,
    authors:
      paper.authorships
        ?.map((a: any) => a.author.display_name)
        .join(", ") || "Unknown",
    journal: paper.primary_location?.source?.display_name || "",
    doi: paper.doi,
    citations: paper.cited_by_count,
  }));

  return papers;
}

/* ---------------- API Route ---------------- */

export async function POST(req: Request) {
  try {
    const { rawInput, targetStyle } = await req.json();

    if (!rawInput || !targetStyle) {
      return NextResponse.json(
        { error: "Missing rawInput or targetStyle" },
        { status: 400 }
      );
    }

    const hash = generateCitationHash(rawInput, targetStyle);

    /* ---------- Cache ---------- */

    const { data: cachedData } = await supabase
      .from("citation_cache")
      .select("*")
      .eq("hash", hash)
      .maybeSingle();

    if (cachedData) {
      return NextResponse.json({ ...cachedData, isCached: true });
    }

    let structuredInput = rawInput;

    /* ---------- DOI ---------- */

    if (isDOI(rawInput)) {
      const meta = await fetchDOIMetadata(rawInput);

      if (meta) {
        const authors =
          meta.author
            ?.map((a: any) => `${a.family}, ${a.given}`)
            .join("; ") || "Unknown";

        const year = meta.issued?.["date-parts"]?.[0]?.[0] || "n.d.";

        structuredInput = `
Title: ${meta.title?.[0] || "Unknown"}
Authors: ${authors}
Year: ${year}
Journal: ${meta["container-title"]?.[0] || ""}
Volume: ${meta.volume || ""}
Issue: ${meta.issue || ""}
Pages: ${meta.page || ""}
DOI: ${rawInput}
`.trim();
      }
    }

    /* ---------- URL ---------- */

    else if (isUrl(rawInput)) {
      const page = await fetchWithTavily(rawInput);

      if (page) {
        structuredInput = `
Title: ${page.title || "Unknown"}
URL: ${rawInput}

Content:
${page.content?.slice(0, 2000) || ""}
`.trim();
      }
    }

    /* ---------- Paragraph Research ---------- */

    else {
      const searchQuery = await generateSearchQuery(rawInput);
      const papers: Paper[] = await searchOpenAlex(searchQuery);

      if (papers.length > 0) {
        const sources = papers
          .map(
            (p: Paper, i: number) => `
Source ${i + 1}
Title: ${p.title}
Authors: ${p.authors}
Year: ${p.year}
Journal: ${p.journal}
DOI: ${p.doi}
Citations: ${p.citations}`
          )
          .join("\n");

        structuredInput = `
Topic:
${rawInput}

Academic Sources:
${sources}

Use ONLY these sources to generate the citation.
Do not invent references.
`;
      }
    }

    /* ---------- OpenAI Citation ---------- */

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Generate a correct ${targetStyle} citation.

Return ONLY JSON:

{
 "full_reference": "",
 "in_text": "",
 "example": ""
}

Rules:
- Use provided sources if available
- Do not invent references
- Write a natural academic sentence
- Place the in-text citation at the end`,
        },
        {
          role: "user",
          content: structuredInput,
        },
      ],
      response_format: { type: "json_object" },
    });

    const aiResult = JSON.parse(completion.choices[0].message.content!);

    aiResult.original_paragraph = rawInput;

    /* ---------- Save Cache ---------- */

    await supabase.from("citation_cache").insert([
      {
        hash,
        raw_input: rawInput,
        style: targetStyle,
        full_reference: aiResult.full_reference,
        in_text: aiResult.in_text,
        example: aiResult.example,
      },
    ]);

    return NextResponse.json({ ...aiResult, isCached: false });
  } catch (error) {
    console.error("Citation API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}