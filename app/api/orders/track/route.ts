import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createPortalToken, hashPortalToken } from "@/lib/order-portal";

export async function POST(request: Request) {
  const { orderId, email } = await request.json();
  if (!orderId || !email) {
    return NextResponse.json({ error: "Enter your order reference and email." }, { status: 400 });
  }

  const { data: order } = await supabaseAdmin
    .from("orders")
    .select("id,email")
    .eq("id", String(orderId).trim().toUpperCase())
    .ilike("email", String(email).trim())
    .maybeSingle();

  if (!order) {
    return NextResponse.json({ error: "We could not match those details." }, { status: 404 });
  }

  const token = createPortalToken();
  const { error } = await supabaseAdmin.from("order_portal_access").upsert({
    order_id: order.id,
    access_token_hash: hashPortalToken(token),
    last_accessed_at: new Date().toISOString(),
  });

  if (error) return NextResponse.json({ error: "Unable to open the workspace." }, { status: 500 });
  return NextResponse.json({ portalUrl: `/order/portal/${token}` });
}
