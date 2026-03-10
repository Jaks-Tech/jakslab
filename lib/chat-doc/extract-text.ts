import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import Tesseract from "tesseract.js";
import { createCanvas } from "@napi-rs/canvas";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

async function extractPDF(buffer: Buffer) {
  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const content = await page.getTextContent();

    const pageText = content.items
      .map((item: any) => item.str)
      .join(" ");

    text += pageText + "\n";
  }

  return text;
}

async function ocrPDF(buffer: Buffer) {
  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const viewport = page.getViewport({ scale: 2 });

    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext("2d");

    // Inside ocrPDF loop...
    await page.render({
      canvasContext: ctx as any,
      canvas: canvas as any, // Add this line
      viewport,
    }).promise;

    const image = canvas.toBuffer('image/png');

    const { data } = await Tesseract.recognize(image, "eng");

    text += data.text + "\n";
  }

  return text;
}

export async function extractText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  let text = "";

  try {
    // PDF
    if (file.type === "application/pdf") {
      text = await extractPDF(buffer);

      // OCR fallback for scanned PDFs
      if (text.trim().length < 50) {
        text = await ocrPDF(buffer);
      }
    }

    // DOCX
    else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    }

    // DOC
    else if (file.type === "application/msword") {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    }

    else {
      throw new Error("Unsupported file format");
    }

    // Clean text
    text = text
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]+/g, " ")
      .trim();

    if (!text || text.length < 50) {
      throw new Error("Document contains little readable text");
    }

    return text;

  } catch (error) {
    console.error("Text extraction error:", error);
    throw new Error("Failed to extract text from document");
  }
}