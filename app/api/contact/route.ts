import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper to get the correct URL for branding
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://jakslab.vercel.app`; 
  return "http://localhost:3000";
};

/**
 * Sends Admin Notification via Resend
 */
async function sendContactEmail(data: { name: string; email: string; subject: string; message: string }) {
  try {
    const logoUrl = "https://jakslab.vercel.app/jakslab.png";

    await resend.emails.send({
      from: "Jakslab Contact <onboarding@resend.dev>",
      to: "jakslab.services@gmail.com",
      subject: `📩 New Inquiry: ${data.subject}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoUrl}" alt="Jakslab Logo" width="70" height="70" style="border-radius: 50%; border: 2px solid #2563eb;" />
            <h2 style="color: #2563eb; margin-top: 10px;">New Message Received</h2>
          </div>

          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>From:</strong> ${data.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${data.subject}</p>
          </div>

          <p><strong>Message Content:</strong></p>
          <div style="background: #fff; border-left: 4px solid #2563eb; padding: 15px; font-style: italic; color: #444; border: 1px solid #eee;">
            ${data.message.replace(/\n/g, '<br/>')}
          </div>
          
          <p style="font-size: 11px; color: #aaa; margin-top: 40px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
            Jakslab Contact System
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Resend Email Error:", error);
  }
}

/**
 * Sends Discord Notification
 */
async function sendContactDiscord(data: { name: string; email: string; subject: string; message: string }) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const logoUrl = "https://jakslab.vercel.app/jakslab.png";

  const embed = {
    title: `📩 New Contact Message: ${data.subject}`,
    color: 0x3b82f6, // Blue
    thumbnail: { url: logoUrl },
    fields: [
      { name: "👤 Name", value: data.name, inline: true },
      { name: "✉️ Email", value: data.email, inline: true },
      { name: "📝 Message", value: data.message.length > 1000 ? data.message.substring(0, 1000) + "..." : data.message }
    ],
    footer: { text: "Jakslab Inquiries" },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Jakslab Inquiries",
        avatar_url: logoUrl,
        embeds: [embed]
      }),
    });
  } catch (err) {
    console.error("Discord Webhook Error:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Supabase (Table name must be contact_messages)
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: body.name,
          email: body.email,
          subject: body.subject,
          message: body.message,
        },
      ]);

    if (dbError) {
      console.error("Supabase Database Error:", dbError);
      throw dbError;
    }

    // 2. Parallel Notifications (doesn't block response)
    // Using allSettled so one failure doesn't stop the other
    await Promise.allSettled([
      sendContactEmail(body),
      sendContactDiscord(body)
    ]);

    return NextResponse.json({ success: true, message: "Inquiry sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("API Main Thread Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}