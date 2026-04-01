import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// 🔥 Helper to generate branded IDs (e.g., JL-A8F2Z1)
function generateBrandedId(prefix: string = "JL") {
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${randomStr}`;
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("workhub_teams")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ teams: data });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 🔍 Debug log to see exactly what the frontend is sending
    console.log("POST /api/workhub/teams - Incoming Body:", body);

    const { name, created_by } = body;

    // 🛡️ Strict Validation
    if (!name || !created_by) {
      return NextResponse.json(
        { 
          error: "Missing fields", 
          details: { 
            name: !name ? "is required" : "received", 
            created_by: !created_by ? "is required" : "received" 
          } 
        }, 
        { status: 400 }
      );
    }

    // 1. Generate the custom JL ID
    const newTeamId = generateBrandedId("JL");

    // 2. Insert into Supabase

    const { data, error } = await supabaseAdmin
    .from("workhub_teams")
    .insert({ id: newTeamId, name, created_by })
    .select()
    .single();

    if (error) {
    console.error("Supabase POST Error:", error);
    
    // Check for unique constraint violation
    if (error.code === '23505') {
        return NextResponse.json(
        { error: "A team with this name already exists. Please choose a different name." }, 
        { status: 400 }
        );
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 3. Return the created team (frontend needs data.team.id for redirect)
    return NextResponse.json({ team: data });
    
  } catch (err) {
    console.error("API Route Exception:", err);
    return NextResponse.json({ error: "Invalid JSON or Server Error" }, { status: 500 });
  }
}