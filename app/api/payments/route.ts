import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Constants
const PRODUCTION_DOMAIN = "https://www.jakslab.work";
const LOGO_URL = `${PRODUCTION_DOMAIN}/jakslab.png`;

type PaymentPayload = {
  senderName: string;
  referenceNumber: string;
  amountSent: string;
  currency: string;
  notes?: string;
};

function generatePaymentId(currentCount: number) {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const sequence = String(currentCount + 1).padStart(3, '0');
  return `PAY-${sequence}-${day}${month}${year}`;
}

/**
 * RESTORED: Full Discord Notification Logic
 */
async function sendPaymentDiscord(payment: PaymentPayload, paymentId: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const embed = {
    title: `💰 New Payment Logged: ${paymentId}`,
    description: `A new Remitly payment has been reported and is awaiting verification.`,
    color: 0x10b981, // Emerald Green
    thumbnail: { url: LOGO_URL },
    fields: [
      { name: "👤 Sender", value: payment.senderName, inline: true },
      { name: "🔢 Reference", value: `\`${payment.referenceNumber}\``, inline: true },
      { name: "💵 Amount", value: `**${payment.amountSent} ${payment.currency}**`, inline: true },
      { 
        name: "📝 Notes", 
        value: payment.notes && payment.notes.length > 0 ? payment.notes : "No notes provided." 
      }
    ],
    footer: { text: "JaksLab Billing • jakslab.work" },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "JaksLab Billing",
        avatar_url: LOGO_URL, // Restored Bot Avatar
        embeds: [embed],
      }),
    });
  } catch (err) {
    console.error("Discord Error:", err);
  }
}

/**
 * Updated Email HTML for Admin
 */
async function sendEmailNotifications(payment: PaymentPayload, paymentId: string) {
  try {
    await resend.emails.send({
      from: "JaksLab Payments <billing@jakslab.work>",
      to: "jakslab.services@gmail.com",
      subject: `💰 Payment Received: ${payment.amountSent} ${payment.currency} from ${payment.senderName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #eee;border-radius:15px">
          <div style="text-align:center;margin-bottom:20px">
              <img src="${LOGO_URL}" width="80" height="80" style="display:block; margin:0 auto; border-radius:12px;" />
              <h2 style="color:#2563eb;margin-top:15px">Payment Confirmation</h2>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;border:1px solid #e2e8f0">
            <p><strong>Tracking ID:</strong> ${paymentId}</p>
            <p><strong>Remitly Ref:</strong> ${payment.referenceNumber}</p>
            <p><strong>Sender:</strong> ${payment.senderName}</p>
            <p style="font-size:18px; color:#2563eb;"><strong>Amount: ${payment.amountSent} ${payment.currency}</strong></p>
          </div>
          ${payment.notes ? `<p style="margin-top:15px; color:#475569 italic;">Notes: ${payment.notes}</p>` : ""}
        </div>`,
    });
  } catch (err) { console.error("Email Error:", err); }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PaymentPayload;

    if (!body.senderName || !body.referenceNumber || !body.amountSent) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const { count } = await supabaseAdmin
      .from("remitly_payments")
      .select("*", { count: "exact", head: true });

    const paymentId = generatePaymentId(count || 0);

    const { data, error: dbError } = await supabaseAdmin
      .from("remitly_payments")
      .insert({
        id: paymentId,
        sender_name: body.senderName,
        reference_number: body.referenceNumber,
        amount_sent: parseFloat(body.amountSent),
        currency: body.currency,
        notes: body.notes,
        status: 'pending'
      })
      .select("id")
      .single();

    if (dbError) {
      if (dbError.code === '23505') return NextResponse.json({ error: "Reference already exists." }, { status: 409 });
      throw dbError;
    }

    await Promise.allSettled([
      sendPaymentDiscord(body, data.id),
      sendEmailNotifications(body, data.id),
    ]);

    return NextResponse.json({ ok: true, paymentId: data.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}