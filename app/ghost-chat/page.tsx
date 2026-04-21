'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { GhostSession } from '@/app/types/chat';
import { PlusCircle, MessageSquare, Flame, Loader2 } from 'lucide-react';

export default function GhostChatLanding() {
  const [sessions, setSessions] = useState<GhostSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchActiveSessions();
  }, []);

  const fetchActiveSessions = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch sessions created by the user that aren't burned yet
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('creator_id', user.id)
      .is('burned_at', null)
      .order('created_at', { ascending: false });

    if (!error && data) setSessions(data);
    setLoading(false);
  };

  const createNewSession = async () => {
    setCreating(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        creator_id: user.id,
        creator_online: true
      })
      .select()
      .single();

    if (error) {
      alert("Error creating session");
      setCreating(false);
    } else {
      router.push(`/ghost-chat/${data.id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-transparent text-zinc-100">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            Go-Ghost
          </h1>
          <p className="text-zinc-500 text-sm">Secure, ephemeral file sharing and messaging.</p>
        </div>
        
        <button
          onClick={createNewSession}
          disabled={creating}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full font-semibold transition-all disabled:opacity-50"
        >
          {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlusCircle className="w-5 h-5" />}
          New Session
        </button>
      </header>

      <main>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-zinc-300">
          <MessageSquare className="w-5 h-5" />
          Active Sessions
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-700" />
          </div>
        ) : sessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session) => (
              <div 
                key={session.id}
                onClick={() => router.push(`/ghost-chat/${session.id}`)}
                className="group cursor-pointer bg-transparent border border-zinc-800 p-5 rounded-2xl hover:border-emerald-500/50 transition-all hover:bg-zinc-800/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                    <MessageSquare className="w-5 h-5 text-emerald-500" />
                  </div>
                  <Flame className="w-4 h-4 text-zinc-700 group-hover:text-orange-500 transition-colors" />
                </div>
                <h3 className="font-mono text-sm text-zinc-300 truncate mb-1">{session.id}</h3>
                <p className="text-xs text-zinc-500">Click to resume or invite</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 mb-2">No active sessions found.</p>
            <p className="text-xs text-zinc-600 italic">Sessions vanish from this list once they are burned.</p>
          </div>
        )}
      </main>

      <section className="mt-20 border-t border-zinc-900 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-emerald-500 font-bold mb-2">1. Create</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Start a session and get a private room generated just for you.</p>
          </div>
          <div>
            <h4 className="text-emerald-500 font-bold mb-2">2. Invite</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Send a one-time link via email. The link dies the moment they enter.</p>
          </div>
          <div>
            <h4 className="text-emerald-500 font-bold mb-2">3. Burn</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">When both of you leave the room, the session burns. Access is revoked.</p>
          </div>
        </div>
      </section>
    </div>
  );
}