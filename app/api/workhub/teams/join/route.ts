import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { team_id, user_name, user_email, role } = await req.json();

    // 1. Validation
    if (!team_id || !user_name || !user_email) {
      return NextResponse.json({ error: "Incomplete operative credentials" }, { status: 400 });
    }

    // 2. Insert into the Operative Registry
    const { data: member, error } = await supabaseAdmin
      .from("workhub_team_members")
      .upsert(
        { 
          team_id, 
          user_name: user_name.toUpperCase(), 
          user_email: user_email.toLowerCase(), 
          role 
        }, 
        { onConflict: "team_id, user_name" }
      )
      .select()
      .single();

    if (error) throw error;

    // 3. Optional: Send Broadcast Confirmation
    try {
      await resend.emails.send({
        from: 'Workhub System <support@jakslab.work>',
        to: user_email,
        subject: `[AUTH] ACCESS GRANTED: SECTOR ${team_id}`,
        html: `
          <div style="font-family: monospace; background: #00px; color: #fff; padding: 20px; border: 1px solid #333;">
            <h2 style="color: #3b82f6;">AUTHORIZATION CONFIRMED</h2>
            <p>Operative: <strong>${user_name.toUpperCase()}</strong></p>
            <p>Status: <strong>REGISTERED</strong></p>
            <p style="font-size: 10px; color: #666;">Clearance Level: ${role.toUpperCase()}</p>
          </div>
        `
      });
    } catch (e) {
      console.error("Email broadcast failed:", e);
    }

    return NextResponse.json({ success: true, member });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}