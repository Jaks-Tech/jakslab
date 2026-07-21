import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });

  const { data } = await supabaseAdmin.auth.getUser(token);
  const user = data.user;
  const allowedEmails = (process.env.ADMIN_EMAILS || "jakstech2030@gmail.com,hello@jakslab.work")
    .split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  const isAdmin = user?.app_metadata?.role === "admin"
    || (!!user?.email && allowedEmails.includes(user.email.toLowerCase()));

  if (!user || !isAdmin) {
    return NextResponse.json({ error: "Administrator access is required." }, { status: 403 });
  }

  const form = await request.formData();
  const orderId = String(form.get("orderId") || "");
  const title = String(form.get("title") || "Project delivery");
  const notes = String(form.get("notes") || "");
  const files = form.getAll("files").filter((item): item is File => item instanceof File);
  if (!orderId || files.length === 0) {
    return NextResponse.json({ error: "Add an order reference and at least one file." }, { status: 400 });
  }

  const { data: order } = await supabaseAdmin.from("orders").select("id").eq("id", orderId).maybeSingle();
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });

  const { data: latest } = await supabaseAdmin.from("order_deliveries")
    .select("version").eq("order_id", orderId).order("version", { ascending: false }).limit(1).maybeSingle();
  const version = (latest?.version || 0) + 1;
  const uploaded = [];

  for (const file of files) {
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: `${file.name} is larger than 50MB.` }, { status: 400 });
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${orderId}/v${version}/${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabaseAdmin.storage.from("order-deliveries").upload(filePath, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    uploaded.push({ fileName: file.name, filePath, fileSize: file.size, fileType: file.type });
  }

  const { error } = await supabaseAdmin.from("order_deliveries").insert({
    order_id: orderId, version, title, notes, files: uploaded,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabaseAdmin.from("orders")
    .update({ status: "delivered", updated_at: new Date().toISOString() }).eq("id", orderId);
  return NextResponse.json({ ok: true, version });
}
