import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { task_id, subtasks, team_id } = await req.json();

    // ─────────────────────────────────────────────
    // VALIDATION
    // ─────────────────────────────────────────────
    if (!task_id || !Array.isArray(subtasks) || !team_id) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // PREPARE INSERT
    // ─────────────────────────────────────────────
    const subtasksToInsert = subtasks
      .filter((st: any) => st.title?.trim())
      .map((st: any, index: number) => ({
        id: `SUB-${nanoid(6).toUpperCase()}`,
        task_id,
        title: st.title,
        instructions: st.instructions || "",
        order_index: index,
        status: st.assigned_to ? "in_progress" : "pending",
        assigned_to: st.assigned_to || null,
      }));

    const { data: createdNodes, error } = await supabaseAdmin
      .from("workhub_subtasks")
      .insert(subtasksToInsert)
      .select();

    if (error) throw error;

    // ─────────────────────────────────────────────
    // FETCH TEAM MEMBERS
    // ─────────────────────────────────────────────
    const { data: teamMembers } = await supabaseAdmin
      .from("workhub_team_members")
      .select("user_name, user_email")
      .eq("team_id", team_id);

    if (!teamMembers?.length) {
      return NextResponse.json({ success: true, count: createdNodes.length });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://www.jakslab.work";
    const workLink = `${baseUrl}/workhub/tasks/${task_id}`;
    const logoUrl =
      "https://www.jakslab.work/_next/image?url=%2Fjakslab.png&w=1080&q=75";

    // ─────────────────────────────────────────────
    // EMAIL DISPATCH (PARALLEL ⚡)
    // ─────────────────────────────────────────────
    const emailPromises: Promise<any>[] = [];

    for (const node of createdNodes) {
      if (node.assigned_to) {
        const target = teamMembers.find(
          (m) => m.user_name === node.assigned_to
        );

        if (target?.user_email) {
          emailPromises.push(
            sendAssignedEmail({
              to: target.user_email,
              node,
              workLink,
              logoUrl,
            })
          );
        }
      } else {
        const emails = teamMembers.map((m) => m.user_email);

        emailPromises.push(
          sendBroadcastEmail({
            to: emails,
            node,
            workLink,
            logoUrl,
          })
        );
      }
    }

    // fire all emails at once
    await Promise.allSettled(emailPromises);

    return NextResponse.json({
      success: true,
      count: createdNodes.length,
    });
  } catch (error: any) {
    console.error("Workhub Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

//
// ─────────────────────────────────────────────
// EMAIL HELPERS
// ─────────────────────────────────────────────
//

async function sendAssignedEmail({
  to,
  node,
  workLink,
  logoUrl,
}: any) {
  return resend.emails.send({
    from: "Jakslab Workhub <system@jakslab.work>",
    to,
    subject: `Assigned: ${node.title}`,
    html: emailTemplate({
      title: "Task Assigned",
      accent: "#3b82f6",
      buttonText: "Open Task",
      user: node.assigned_to,
      node,
      workLink,
      logoUrl,
    }),
  });
}

async function sendBroadcastEmail({
  to,
  node,
  workLink,
  logoUrl,
}: any) {
  return resend.emails.send({
    from: "Jakslab Workhub <system@jakslab.work>",
    to,
    subject: `New Task Available: ${node.title}`,
    html: emailTemplate({
      title: "New Task Available",
      accent: "#f59e0b",
      buttonText: "Claim Task",
      user: null,
      node,
      workLink,
      logoUrl,
    }),
  });
}

//
// ─────────────────────────────────────────────
// UNIFIED EMAIL TEMPLATE 🎨
// ─────────────────────────────────────────────
//

function emailTemplate({
  title,
  accent,
  buttonText,
  user,
  node,
  workLink,
  logoUrl,
}: any) {
  return `
  <div style="font-family:Inter,system-ui,sans-serif;background:#0a0a0a;padding:40px;">
    
    <div style="max-width:600px;margin:auto;background:#111;border-radius:16px;padding:30px;color:#e5e5e5;border:1px solid #1f1f1f;">
      
      <div style="text-align:center;margin-bottom:24px;">
        <img src="${logoUrl}" style="width:110px;" />
      </div>

      <h2 style="text-align:center;color:${accent};margin-bottom:10px;">
        ${title}
      </h2>

      ${
        user
          ? `<p style="font-size:14px;">Hello <strong>${user}</strong>,</p>`
          : `<p style="font-size:14px;">A new task is available for your team.</p>`
      }

      <div style="background:#0f172a;padding:20px;border-radius:10px;margin:25px 0;">
        <h3 style="margin:0 0 10px;color:#fff;">${node.title}</h3>
        ${
          node.instructions
            ? `<p style="font-size:13px;color:#cbd5f5;">${node.instructions}</p>`
            : ""
        }
      </div>

      <div style="text-align:center;margin:30px 0;">
        <a href="${workLink}" 
           style="background:${accent};color:white;padding:14px 28px;
                  border-radius:10px;text-decoration:none;font-weight:600;">
          ${buttonText}
        </a>
      </div>

      <p style="font-size:10px;color:#555;text-align:center;">
        © 2026 Jakslab Workhub
      </p>

    </div>
  </div>
  `;
}