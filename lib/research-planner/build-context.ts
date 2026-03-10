type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export function buildResearchContext(
  plan: string,
  history: Message[],
  question: string
): Message[] {

  return [
    {
      role: "system",
      content:
        "You are a research supervisor helping refine an existing research plan.",
    },

    {
      role: "system",
      content: `Current research plan:\n\n${plan}`,
    },

    ...history,

    {
      role: "user",
      content: question,
    },
  ];
}