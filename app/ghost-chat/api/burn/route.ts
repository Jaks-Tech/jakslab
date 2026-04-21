import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Use Service Role Key to bypass RLS for complete purging
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { sessionId, mode } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    /* 1. AUTOMATIC CHECK LOGIC 
       If mode is 'auto', we verify if anyone is still online via your presence table 
       or 'last_active' timestamp before proceeding.
    */
    if (mode === 'auto') {
      const { data: session } = await supabase
        .from('sessions')
        .select('online_count')
        .eq('id', sessionId)
        .single();

      // If people are still in the room, abort the automatic burn
      if (session && session.online_count > 0) {
        return NextResponse.json({ skipped: true, reason: 'Room not empty' });
      }
    }

    /* 2. PURGE SEQUENCE (Manual or Confirmed Auto)
    */
    
    // A. Delete Files from Storage
    // List all files in the session folder
    const { data: files } = await supabase.storage
      .from('ghost-files')
      .list(sessionId);

    if (files && files.length > 0) {
      const pathsToDelete = files.map((file) => `${sessionId}/${file.name}`);
      await supabase.storage.from('ghost-files').remove(pathsToDelete);
    }

    // B. Delete Messages
    await supabase
      .from('messages')
      .delete()
      .eq('session_id', sessionId);

    // C. Delete Invites
    await supabase
      .from('invites')
      .delete()
      .eq('session_id', sessionId);

    // D. Delete the Session itself
    const { error: sessionDeleteError } = await supabase
      .from('sessions')
      .delete()
      .eq('id', sessionId);

    if (sessionDeleteError) throw sessionDeleteError;

    return NextResponse.json({ 
      success: true, 
      burnedAt: new Date().toISOString(),
      mode: mode || 'manual' 
    });

  } catch (error: any) {
    console.error('Burn Protocol Failure:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}