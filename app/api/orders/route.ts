import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Resend } from "resend";
import { createPortalToken, hashPortalToken } from "@/lib/order-portal";

const resend = new Resend(process.env.RESEND_API_KEY);

// Constants for your brand
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
 * Generates a personalized ID: JL001-140326
 */
function generatePersonalizedId(currentCount: number) {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  
  const orderNum = String(currentCount + 1).padStart(3, '0');
  return `JL${orderNum}-${day}${month}${year}`;
}

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.NODE_ENV === "production") return PRODUCTION_DOMAIN;
  return "http://localhost:3000";
};

async function sendEmailNotifications(order: OrderPayload, orderId: string, portalUrl: string) {
  try {
    const baseUrl = getBaseUrl();
    const orderUrl = `${baseUrl}/admin/orders/${orderId}`;

    await resend.emails.send({
      from: "JaksLab <onboarding@resend.dev>",
      to: "hello@jakslab.work",
      subject: `🔔 New Request: ${order.fullName} - ${order.projectType}`,
      html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #eee;border-radius:10px">
        <div style="text-align:center;margin-bottom:20px">
          <img src="${LOGO_URL}" width="80" height="80" style="border-radius:50%;border:2px solid #2563eb"/>
          <h2 style="color:#2563eb;margin-top:10px">JaksLab</h2>
        </div>
        <h3 style="border-bottom:2px solid #f4f4f4;padding-bottom:10px">New Project Request</h3>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Name:</strong> ${order.fullName}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Contact:</strong> ${order.contactMethod} (${order.phone})</p>
        <p><strong>Project:</strong> ${order.projectType}</p>
        <p><strong>Deadline:</strong> ${order.deadline}</p>
        <p><strong>Description:</strong></p>
        <div style="background:#f9f9f9;padding:12px;border-radius:6px">${order.description}</div>
        <div style="text-align:center;margin-top:25px">
          <a href="${orderUrl}" style="background:#2563eb;color:white;padding:14px 28px;text-decoration:none;border-radius:8px">View Order</a>
        </div>
      </div>
      `,
    });

    await resend.emails.send({
      from: "JaksLab <onboarding@resend.dev>",
      to: order.email,
      subject: `We received your JaksLab request — ${orderId}`,
      html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:28px;color:#172033">
        <img src="${LOGO_URL}" width="56" height="56" style="border-radius:50%;margin-bottom:20px"/>
        <h2 style="margin:0 0 12px">Your request is with us.</h2>
        <p style="line-height:1.7;color:#526078">We will review the brief and contact you with the scope, price and next step. Your reference is <strong>${orderId}</strong>.</p>
        <p style="line-height:1.7;color:#526078">Use your private workspace to follow progress and download deliveries.</p>
        <a href="${portalUrl}" style="display:inline-block;margin-top:12px;background:#2563eb;color:white;padding:13px 20px;text-decoration:none;border-radius:8px">Open private workspace</a>
        <p style="margin-top:24px;font-size:12px;color:#8290a5">Keep this link private. It provides access to your project.</p>
      </div>`,
    });
  } catch (err) {
    console.error("Email error:", err);
  }
}

async function sendDiscordNotification(order: OrderPayload, orderId: string) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return;

  const baseUrl = getBaseUrl();
  const orderUrl = `${baseUrl}/admin/orders/${orderId}`;

  const embed = {
    title: "🔔 New Request Received",
    description: `[Open Order #${orderId}](${orderUrl})`,
    color: 0x2563eb,
    thumbnail: { url: LOGO_URL },
    fields: [
      { name: "Client", value: order.fullName, inline: true },
      { name: "Email", value: order.email, inline: true },
      { name: "Contact", value: `${order.contactMethod} (${order.phone})` },
      { name: "Project", value: order.projectType, inline: true },
      { name: "Deadline", value: order.deadline, inline: true },
      {
        name: "Description",
        value: order.description.length > 400 ? order.description.slice(0, 400) + "..." : order.description,
      },
      { name: "Attachments", value: `${order.attachments?.length || 0} file(s)` },
    ],
    footer: { text: `Order ID: ${orderId}` },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "JaksLab Orders",
        avatar_url: LOGO_URL,
        embeds: [embed],
      }),
    });
  } catch (err) {
    console.error("Discord notification failed:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderPayload;

    if (
      !body.fullName || !body.email || !body.contactMethod ||
      !body.phone || !body.projectType || !body.deadline || !body.description
    ) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    // 1. Fetch current order count to determine next sequence number
    const { count, error: countError } = await supabaseAdmin
      .from("orders")
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;

    // 2. Generate the Personalized ID
    const personalizedId = generatePersonalizedId(count || 0);

    const attachments = Array.isArray(body.attachments) ? body.attachments : [];
    const first = attachments[0];

    // 3. Insert order using the manual personalizedId
    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert({
        id: personalizedId, // Passing manual ID
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

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const portalToken = createPortalToken();
    const { error: accessError } = await supabaseAdmin
      .from("order_portal_access")
      .insert({ order_id: data.id, access_token_hash: hashPortalToken(portalToken) });

    if (accessError) throw accessError;

    const portalUrl = `${getBaseUrl()}/order/portal/${portalToken}`;

    await Promise.allSettled([
      sendDiscordNotification(body, data.id),
      sendEmailNotifications(body, data.id, portalUrl),
    ]);

    return NextResponse.json({ ok: true, orderId: data.id, portalUrl }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
