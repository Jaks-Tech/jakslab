import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/* ---------------- CONFIG ---------------- */
const PRODUCTION_DOMAIN = "https://www.jakslab.work";
const LOGO_URL = `${PRODUCTION_DOMAIN}/jakslab.png`;

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ---------------- HANDLER ---------------- */
export async function POST(req: Request) {
  try {
    const { sessionId, inviteeEmail } = await req.json();

    if (!sessionId || !inviteeEmail) {
      return NextResponse.json(
        { error: 'Missing fields' },
        { status: 400 }
      );
    }

    /* -------- TOKEN GENERATION -------- */
    const now = new Date();

    const datePart = now
      .toISOString()
      .split('T')[0]
      .replace(/-/g, '');

    const timePart = now
      .toTimeString()
      .split(' ')[0]
      .replace(/:/g, '')
      .slice(0, 4);

    const randomSuffix = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();

    const token = `JL-GHOST-${datePart}-${timePart}-${randomSuffix}`;
    /* ---------------------------------- */

    const protocol =
      process.env.NODE_ENV === 'development' ? 'http' : 'https';

    const host = req.headers.get('host') || 'jakslab.work';

    const inviteLink = `${protocol}://${host}/ghost-chat/${sessionId}?token=${token}`;

    /* -------- STORE INVITE -------- */
    const { error: dbError } = await supabase
      .from('invites')
      .insert({
        session_id: sessionId,
        email: inviteeEmail,
        token,
        expires_at: new Date(
          Date.now() + 60 * 60 * 1000
        ).toISOString(),
      });

    if (dbError) throw dbError;

    /* -------- SEND EMAIL -------- */
    await resend.emails.send({
      from: 'JaksLab Secure Chat <join-session@jakslab.work>',
      to: inviteeEmail,
      subject: `Secure Invitation: ${token}`,
      html: `
        <div style="
          font-family: 'Courier New', monospace;
          background:#f9fafb;
          padding:24px;
          border-radius:10px;
          border:1px solid #e5e7eb;
          color:#111827;
        ">

          <!-- LOGO -->
          <div style="text-align:center; margin-bottom:20px;">
            <img src="${LOGO_URL}" alt="JaksLab" style="height:40px;" />
          </div>

          <!-- HEADER -->
          <h2 style="
            color:#10b981;
            border-bottom:2px solid #10b981;
            padding-bottom:8px;
            margin-bottom:16px;
            text-align:center;
          ">
            SECURITY CLEARANCE GRANTED
          </h2>

          <!-- TOKEN -->
          <p style="font-size:13px;">
            <strong>REFERENCE ID:</strong> ${token}
          </p>

          <!-- BODY -->
          <p style="font-size:14px;">
            A secure GhostChat session has been initialized for you on the JaksLab protocol.
          </p>

          <!-- WARNING -->
          <div style="
            background:#fff5f5;
            color:#b91c1c;
            padding:12px;
            border-left:4px solid #ef4444;
            font-size:13px;
            margin-top:16px;
            border-radius:6px;
          ">
            <strong>PROTOCOL WARNING:</strong><br/>
            This link is single-use. The session and all associated data will be permanently purged once all participants disconnect.
          </div>

          <!-- CTA -->
          <div style="text-align:center; margin-top:24px;">
            <a href="${inviteLink}" style="
              display:inline-block;
              background:#10b981;
              color:white;
              padding:12px 24px;
              text-decoration:none;
              border-radius:6px;
              font-weight:bold;
              font-size:14px;
            ">
              JOIN SECURE SESSION
            </a>
          </div>

          <!-- FOOTER -->
          <p style="
            margin-top:32px;
            font-size:11px;
            color:#6b7280;
            text-align:center;
          ">
            &copy; 2026 JaksLab • Ghost Protocol
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      tokenId: token,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}