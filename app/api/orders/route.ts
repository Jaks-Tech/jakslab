import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Constants for your new brand
const PRODUCTION_DOMAIN = "https://www.jakslab.work";
const LOGO_URL = `${PRODUCTION_DOMAIN}/jakslab.png`;

type Attachment = {
  filePath: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
};

type OrderPayload = {
  fullName: string;
  email: string;
  contactMethod: string;
  phone: string;
  projectType: string;
  customProject?: string;
  deadline: string;
  description: string;
  attachments?: Attachment[];
};

/**
 * Robust helper to get the site URL
 */
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  // If in production Vercel, use your custom domain
  if (process.env.NODE_ENV === "production") return PRODUCTION_DOMAIN;
  return "http://localhost:3000";
};

/**
 * Sends Admin Notification via Resend
 */
async function sendEmailNotifications(order: OrderPayload, orderId: string) {
  try {
    const baseUrl = getBaseUrl();
    const orderUrl = `${baseUrl}/order/${orderId}`;

    await resend.emails.send({
      // TIP: Once you verify your domain in Resend, change this to hello@jakslab.work
      from: "JaksLab <onboarding@resend.dev>", 
      to: "jakslab.services@gmail.com",
      subject: `🔔 New Request: ${order.fullName} - ${order.projectType}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          
          <div style="text-align: center; margin-bottom: 20px;">
            <img 
              src="${LOGO_URL}" 
              alt="JaksLab Logo" 
              width="80" 
              height="80" 
              style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #2563eb; display: inline-block;" 
            />
            <h2 style="color: #2563eb; margin-top: 10px;">JaksLab</h2>
          </div>

          <h3 style="border-bottom: 2px solid #f4f4f4; padding-bottom: 10px; color: #333;">New Project Request Received</h3>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Client Name:</strong> ${order.fullName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${order.email}</p>
            <p style="margin: 5px 0;"><strong>Contact:</strong> ${order.contactMethod} (${order.phone})</p>
            <p style="margin: 5px 0;"><strong>Project Type:</strong> ${order.projectType}</p>
            <p style="margin: 5px 0;"><strong>Deadline:</strong> ${order.deadline}</p>
          </div>

          <p><strong>Description:</strong></p>
          <div style="background: #fff; border-left: 4px solid #2563eb; padding: 10px 15px; font-style: italic; color: #555;">
            ${order.description}
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${orderUrl}" style="background: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              View Full Order & Files
            </a>
          </div>
          
          <p style="font-size: 11px; color: #aaa; margin-top: 40px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
            JaksLab Services • Engineered Excellence
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Resend Email Error:", error);
  }
}

/**
 * Sends Detailed Discord Notification
 */
async function sendDiscordNotification(order: OrderPayload, orderId: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const baseUrl = getBaseUrl();
  const orderUrl = `${baseUrl}/order/${orderId}`;

  const embed = {
    title: "🔔 New Request Received",
    description: `A new client has submitted a task via **jakslab.work**.\n\n[**Click here to View Full Order & Files**](${orderUrl})`,
    url: orderUrl,
    color: 0x2563eb,
    thumbnail: { url: LOGO_URL },
    author: {
      name: "JaksLab Services",
      icon_url: LOGO_URL,
    },
    fields: [
      { name: "👤 Client Name", value: order.fullName, inline: true },
      { name: "✉️ Email", value: order.email, inline: true },
      { name: "📞 Contact", value: `${order.contactMethod} (${order.phone})`, inline: false },
      { 
        name: "📂 Project Type", 
        value: order.projectType === "Custom Project" ? `Custom: ${order.customProject}` : order.projectType, 
        inline: true 
      },
      { name: "📅 Deadline", value: order.deadline, inline: true },
      { 
        name: "📝 Description", 
        value: order.description.length > 500 ? order.description.substring(0, 500) + "..." : order.description 
      },
      { 
        name: "📎 Attachments", 
        value: `${order.attachments?.length || 0} file(s) uploaded`, 
        inline: true 
      }
    ],
    footer: {
      text: `ID: ${orderId} • Sent from jakslab.work`,
    },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "JaksLab Orders",
        avatar_url: LOGO_URL,
        embeds: [embed] 
      }),
    });
  } catch (err) {
    console.error("Discord notification failed:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderPayload;

    if (!body.fullName || !body.email || !body.contactMethod || !body.phone || !body.projectType || !body.deadline || !body.description) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    const attachments = Array.isArray(body.attachments) ? body.attachments : [];
    const first = attachments[0];

    const { data, error } = await supabase
      .from("orders")
      .insert({
        full_name: body.fullName,
        email: body.email,
        contact_method: body.contactMethod,
        phone: body.phone,
        project_type: body.projectType,
        custom_project: body.customProject ?? null,
        deadline: body.deadline,
        description: body.description,
        file_url: first?.fileUrl ?? null,
        attachments,
      })
      .select("id")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Run notifications in parallel
    await Promise.allSettled([
      sendDiscordNotification(body, data.id),
      sendEmailNotifications(body, data.id)
    ]);

    return NextResponse.json({ ok: true, orderId: data.id }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}