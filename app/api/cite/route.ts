import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import OpenAI from "openai";
import { generateCitationHash } from "@/lib/utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    // 1️⃣ Check cache
    const { data: cachedData } = await supabase
      .from("citation_cache")
      .select("*")
      .eq("hash", hash)
      .maybeSingle();

    if (cachedData) {
      return NextResponse.json({ ...cachedData, isCached: true });
    }

    let structuredInput = rawInput;

    // 2️⃣ DOI → Crossref
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

    // 3️⃣ URL → Tavily
    else if (isUrl(rawInput)) {
      try {
        const page = await fetchWithTavily(rawInput);

        if (page) {
          structuredInput = `
Title: ${page.title || "Unknown"}
URL: ${rawInput}

Content:
${page.content?.slice(0, 2000) || ""}
          `.trim();
        }
      } catch (err) {
        console.error("Tavily error:", err);
      }
    }

    // 4️⃣ Generate citation with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
            content: `Generate a correct ${targetStyle} citation.

Return ONLY JSON with:

{
 "full_reference": "The full bibliography reference",
 "in_text": "The parenthetical in-text citation",
 "example": "A short sentence showing how the citation would appear in a research paper"
}

Rules for example:
- Write a natural academic sentence
- Use the in-text citation at the end of the sentence
- Do NOT repeat the full reference
`,
        },
        {
          role: "user",
          content: structuredInput,
        },
      ],
      response_format: { type: "json_object" },
    });

    const aiResult = JSON.parse(completion.choices[0].message.content!);

    // 5️⃣ Save to cache
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