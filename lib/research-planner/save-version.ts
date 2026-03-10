import { supabase } from "@/lib/supabase";

export async function savePlanVersion(sessionId: string, content: string) {

  const { data: versions } = await supabase
    .from("research_versions")
    .select("version_number")
    .eq("session_id", sessionId)
    .order("version_number", { ascending: false });

  const nextVersion = (versions?.[0]?.version_number ?? 0) + 1;

  await supabase
    .from("research_versions")
    .update({ is_current: false })
    .eq("session_id", sessionId)
    .eq("is_current", true);

  const { error } = await supabase
    .from("research_versions")
    .insert({
      session_id: sessionId,
      content,
      version_number: nextVersion,
      is_current: true,
    });

  if (error) {
    throw new Error("Failed to save version");
  }

  return nextVersion;
}