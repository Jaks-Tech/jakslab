export type SupportedKind = "image" | "pdf" | "docx" | "unsupported";

export function getKind(file: File): SupportedKind {
  const name = file.name.toLowerCase();

  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/pdf" || name.endsWith(".pdf")) return "pdf";

  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx")
  )
    return "docx";

  return "unsupported";
}