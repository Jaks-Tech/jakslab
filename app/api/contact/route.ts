import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Centralized Branding Constants
const PRODUCTION_DOMAIN = "https://www.jakslab.work";
const LOGO_URL = `${PRODUCTION_DOMAIN}/jakslab.png`;

interface ContactData {
  name: string;
  email: string;
  phone: string;
  platform: string;
  subject: string;
  message: string;
}

/**
 * Robust helper to get the site URL
 */
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.NODE_ENV === "production") return PRODUCTION_DOMAIN;
  return "http://localhost:3000";
};

/**
 * Sends Admin Notification via Resend
 */
async function sendContactEmail(data: ContactData) {
  try {
    await resend.emails.send({
      // Change 'onboarding@resend.dev' once you verify jakslab.work in Resend
      from: "JaksLab Contact <onboarding@resend.dev>",
      to: "hello@jakslab.work",
      subject: `📩 New Inquiry: ${data.subject}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${LOGO_URL}" alt="JaksLab Logo" width="70" height="70" style="border-radius: 50%; border: 2px solid #2563eb; object-fit: cover;" />
            <h2 style="color: #2563eb; margin-top: 10px;">New Message Received</h2>
          </div>

          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>From:</strong> ${data.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> +${data.phone} (${data.platform})</p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${data.subject}</p>
          </div>

          <p><strong>Message Content:</strong></p>
          <div style="background: #fff; border-left: 4px solid #2563eb; padding: 15px; font-style: italic; color: #444; border: 1px solid #eee;">
            ${data.message.replace(/\n/g, '<br/>')}
          </div>
          
          <p style="font-size: 11px; color: #aaa; margin-top: 40px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
            JaksLab Contact System • Engineered Excellence
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
async function sendContactDiscord(data: ContactData) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const embed = {
    title: `📩 New Contact Message: ${data.subject}`,
    color: 0x3b82f6, 
    thumbnail: { url: LOGO_URL },
    fields: [
      { name: "👤 Name", value: data.name, inline: true },
      { name: "✉️ Email", value: data.email, inline: true },
      { name: "📱 Phone", value: `+${data.phone}\n(${data.platform})`, inline: true },
      { 
        name: "📝 Message", 
        value: data.message.length > 1000 ? data.message.substring(0, 1000) + "..." : data.message 
      }
    ],
    footer: { text: "JaksLab Inquiries • jakslab.work" },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "JaksLab Inquiries",
        avatar_url: LOGO_URL,
        embeds: [embed]
      }),
    });
  } catch (err) {
    console.error("Discord Webhook Error:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body: ContactData = await req.json();

    // Basic validation
    if (!body.name || !body.email || !body.subject || !body.message || !body.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          platform: body.platform,
          subject: body.subject,
          message: body.message,
        },
      ]);

    if (dbError) {
      console.error("Supabase Database Error:", dbError);
      return NextResponse.json({ error: "Database error occurred." }, { status: 500 });
    }

    // 2. Parallel Notifications (allSettled ensures one failure doesn't stop the other)
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
