import { supabaseAdmin } from "@/lib/supabase-admin";

export async function createSubmission(data: {
  subtask_id: string;
  user_id: string;
  content?: string;
  file_url?: string;
}) {
  const { data: submission, error } = await supabaseAdmin
    .from("submissions")
    .insert({
      ...data,
      status: "submitted",
    })
    .select()
    .single();

  if (error) throw error;

  return submission;
}