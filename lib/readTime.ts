export function calculateReadTime(content: string): string {
  const wordsPerMinute = 225;

  const cleanText = content
    .replace(/[#_*>\-\n`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = cleanText.match(/\b\w+\b/g)?.length || 0;

  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return `${minutes} min read`;
}