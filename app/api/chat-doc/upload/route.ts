import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import OpenAI from "openai";
import mammoth from "mammoth";
import Tesseract from "tesseract.js";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/* -------------------------------------------------------------------------- */
/* PDF TEXT EXTRACTION                                                        */
/* -------------------------------------------------------------------------- */

async function extractPDF(buffer: Buffer) {
  // load pdf-parse only when needed
  const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;

  const data = await pdfParse(buffer);

  return data.text;
}

/* -------------------------------------------------------------------------- */
/* OCR FALLBACK FOR SCANNED PDF                                               */
/* -------------------------------------------------------------------------- */

async function ocrPDF(buffer: Buffer) {
  const worker = await Tesseract.createWorker("eng");

  const { data } = await worker.recognize(buffer);

  await worker.terminate();

  return data.text;
}

/* -------------------------------------------------------------------------- */
/* DOCX EXTRACTION                                                            */
/* -------------------------------------------------------------------------- */

async function extractDOC(buffer: Buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

/* -------------------------------------------------------------------------- */
/* TEXT CHUNKING                                                              */
/* -------------------------------------------------------------------------- */

function chunkText(text: string, size = 1200, overlap = 200) {
  const chunks: string[] = [];

  const cleanText = text.replace(/\s+/g, " ").trim();

  let start = 0;

  while (start < cleanText.length) {
    chunks.push(cleanText.slice(start, start + size));
    start += size - overlap;
  }

  return chunks;
}

/* -------------------------------------------------------------------------- */
/* POST ROUTE                                                                 */
/* -------------------------------------------------------------------------- */

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let text = "";

    /* ---------------------------------------------------------------------- */
    /* FILE TYPE DETECTION                                                    */
    /* ---------------------------------------------------------------------- */

    if (file.name.toLowerCase().endsWith(".pdf")) {
      text = await extractPDF(buffer);

      // OCR fallback if scanned
      if (text.trim().length < 50) {
        text = await ocrPDF(buffer);
      }
    }

    else if (file.name.toLowerCase().endsWith(".docx")) {
      text = await extractDOC(buffer);
    }

    else {
      return NextResponse.json(
        { success: false, error: "Unsupported file type" },
        { status: 400 }
      );
    }

    if (!text || text.trim().length < 10) {
      throw new Error("Document appears empty.");
    }

    /* ---------------------------------------------------------------------- */
    /* SAVE DOCUMENT                                                          */
    /* ---------------------------------------------------------------------- */

    const { data: doc, error: docError } = await supabaseAdmin
      .from("documents")
      .insert({ title: file.name })
      .select()
      .single();

    if (docError || !doc) {
      throw new Error("Database error while saving document.");
    }

    /* ---------------------------------------------------------------------- */
    /* CHUNK TEXT                                                             */
    /* ---------------------------------------------------------------------- */

    const chunks = chunkText(text);

    /* ---------------------------------------------------------------------- */
    /* CREATE EMBEDDINGS                                                      */
    /* ---------------------------------------------------------------------- */

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunks,
    });

    const payload = embeddingResponse.data.map((item, index) => ({
      document_id: doc.id,
      content: chunks[index],
      embedding: item.embedding,
    }));

    /* ---------------------------------------------------------------------- */
    /* STORE CHUNKS                                                           */
    /* ---------------------------------------------------------------------- */

    const { error: chunkError } = await supabaseAdmin
      .from("document_chunks")
      .insert(payload);

    if (chunkError) throw chunkError;

    return NextResponse.json({
      success: true,
      documentId: doc.id,
      chunksStored: payload.length,
    });

  } catch (error: any) {
    console.error("Extraction Pipeline Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process document",
      },
      { status: 500 }
    );
  }
}