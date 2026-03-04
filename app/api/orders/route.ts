import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
 * Sends Admin Notification via Resend
 */
async function sendEmailNotifications(order: OrderPayload, orderId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const orderUrl = `${baseUrl}/order/${orderId}`;
    
    // Path to your logo in the public folder
    const logoUrl = `${baseUrl}/jakslab.png`;

    await resend.emails.send({
      from: "Jakslab <onboarding@resend.dev>",
      to: "jakslab.services@gmail.com",
      subject: `🔔 New Order: ${order.fullName} - ${order.projectType}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoUrl}" alt="Jakslab Logo" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #2563eb;" />
            <h2 style="color: #2563eb; margin-top: 10px;">Jakslab Services</h2>
          </div>

          <h3 style="border-bottom: 2px solid #f4f4f4; padding-bottom: 10px;">New Project Request Received</h3>
          
          <p><strong>Client Name:</strong> ${order.fullName}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>Contact:</strong> ${order.contactMethod} (${order.phone})</p>
          <p><strong>Project Type:</strong> ${order.projectType}</p>
          <p><strong>Deadline:</strong> ${order.deadline}</p>
          <p><strong>Description:</strong> ${order.description}</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${orderUrl}" style="background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              View Full Order & Files
            </a>
          </div>
          
          <p style="font-size: 12px; color: #999; margin-top: 40px; text-align: center;">
            This is an automated notification from your Jakslab dashboard.
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

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const orderUrl = `${baseUrl}/order/${orderId}`;

  const embed = {
    title: "🚀 New Order Received!",
    description: `A new request has been submitted. [**View Order Details**](${orderUrl})`,
    color: 0x3b82f6, // Professional Blue
    fields: [
      { name: "Client Name", value: order.fullName, inline: true },
      { name: "Email", value: order.email, inline: true },
      { name: "Contact Method", value: `${order.contactMethod}: ${order.phone}`, inline: false },
      {
        name: "Project Type",
        value: order.projectType === "Custom Project" ? `Custom: ${order.customProject}` : order.projectType,
        inline: true
      },
      { name: "Deadline", value: `📅 ${order.deadline}`, inline: true },
      {
        name: "Description",
        value: order.description.length > 500 ? order.description.substring(0, 500) + "..." : order.description
      },
      { name: "Attachments", value: `${order.attachments?.length || 0} file(s) uploaded`, inline: true }
    ],
    footer: { text: `Order ID: ${orderId}` },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch (err) {
    console.error("Discord notification failed:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderPayload;

    // Validation
    if (!body.fullName || !body.email || !body.contactMethod || !body.phone || !body.projectType || !body.deadline || !body.description) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    const attachments = Array.isArray(body.attachments) ? body.attachments : [];
    const first = attachments[0];

    // Database Insertion
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

    // Parallel Notifications (Discord + Admin Email Only)
    await Promise.all([
      sendDiscordNotification(body, data.id),
      sendEmailNotifications(body, data.id)
    ]);

    return NextResponse.json({ ok: true, orderId: data.id }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}