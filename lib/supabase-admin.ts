import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!serviceRole) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY missing in env");
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRole
);