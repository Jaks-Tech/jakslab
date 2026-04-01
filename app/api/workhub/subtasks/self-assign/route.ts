import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { subtask_id, user_id, team_id } = await req.json();

    // ─────────────────────────────────────────────
    // 1. VALIDATION
    // ─────────────────────────────────────────────
    if (!subtask_id || !user_id || !team_id) {
      return NextResponse.json(
        { error: "Missing required identifiers." },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // 2. ATOMIC CLAIM (Prevents double assignment)
    // ─────────────────────────────────────────────
    const { data: subtask, error: updateError } = await supabaseAdmin
      .from("workhub_subtasks")
      .update({
        assigned_to: user_id,
        status: "in_progress",
      })
      .eq("id", subtask_id)
      .is("assigned_to", null)
      .select()
      .single();

    if (updateError) throw updateError;

    if (!subtask) {
      return NextResponse.json(
        { error: "Subtask already assigned." },
        { status: 409 }
      );
    }

    // ─────────────────────────────────────────────
    // 3. FETCH MEMBER EMAIL
    // ─────────────────────────────────────────────
    const { data: member } = await supabaseAdmin
      .from("workhub_team_members")
      .select("user_email")
      .eq("team_id", team_id)
      .eq("user_name", user_id)
      .single();

    // ─────────────────────────────────────────────
    // 4. SEND EMAIL (non-blocking safe)
    // ─────────────────────────────────────────────
    if (member?.user_email) {
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || "https://www.jakslab.work";

      const workLink = `${baseUrl}/workhub/tasks/${subtask.task_id}`;
      const logoUrl =
        "https://www.jakslab.work/_next/image?url=%2Fjakslab.png&w=1080&q=75";

      sendAssignmentEmail({
        to: member.user_email,
        user_id,
        team_id,
        subtask,
        workLink,
        logoUrl,
      }).catch((err) => {
        console.error("Email dispatch failed:", err);
      });
    }

    return NextResponse.json({ success: true, subtask });
  } catch (err) {
    console.error("Self-Assign Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ─────────────────────────────────────────────
   EMAIL SENDER (clean separation)
───────────────────────────────────────────── */
async function sendAssignmentEmail({
  to,
  user_id,
  team_id,
  subtask,
  workLink,
  logoUrl,
}: {
  to: string;
  user_id: string;
  team_id: string;
  subtask: any;
  workLink: string;
  logoUrl: string;
}) {
  return resend.emails.send({
    from: "Jakslab Workhub <system@jakslab.work>",
    to,
    subject: `Task Assigned: ${subtask.title}`,
    html: buildEmailTemplate({
      user_id,
      team_id,
      subtask,
      workLink,
      logoUrl,
      to,
    }),
  });
}

/* ─────────────────────────────────────────────
   EMAIL TEMPLATE (clean + modern + premium)
───────────────────────────────────────────── */
function buildEmailTemplate({
  user_id,
  team_id,
  subtask,
  workLink,
  logoUrl,
  to,
}: any) {
  return `
  <div style="font-family: Inter, system-ui, sans-serif; background:#0a0a0a; padding:40px;">
    
    <div style="max-width:600px;margin:auto;background:#111;border-radius:16px;padding:32px;color:#e5e5e5;border:1px solid #1f1f1f;">
      
      <!-- Logo -->
      <div style="text-align:center;margin-bottom:24px;">
        <img src="${logoUrl}" style="width:120px;" />
      </div>

      <!-- Header -->
      <h2 style="text-align:center;color:#3b82f6;margin-bottom:8px;">
        Task Assigned
      </h2>
      <p style="text-align:center;color:#777;font-size:12px;margin-bottom:24px;">
        Workhub Notification System
      </p>

      <!-- Greeting -->
      <p style="font-size:14px;">Hello <strong>${user_id}</strong>,</p>

      <p style="font-size:14px;color:#aaa;">
        You have been assigned a new subtask in team 
        <strong>${team_id}</strong>.
      </p>

      <!-- Task Card -->
      <div style="background:#0f172a;padding:20px;border-radius:10px;margin:24px 0;">
        <h3 style="margin:0 0 10px;color:#fff;">
          ${subtask.title}
        </h3>

        <p style="font-size:13px;color:#cbd5f5;line-height:1.6;">
          ${
            subtask.instructions ||
            "No instructions provided."
          }
        </p>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin:30px 0;">
        <a href="${workLink}" 
           style="background:#3b82f6;color:white;padding:14px 28px;
                  border-radius:10px;text-decoration:none;
                  font-weight:600;">
          Open Task
        </a>
      </div>

      <!-- Footer -->
      <p style="font-size:10px;color:#555;text-align:center;">
        Sent to ${to} • © 2026 Jakslab
      </p>

    </div>
  </div>
  `;
}