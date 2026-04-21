'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabase';
import { useGhostPresence } from '@/components/ghost-chat/useGhostPresence';
import ChatWindow from '@/components/ghost-chat/ChatWindow';
import MessageInput from '@/components/ghost-chat/MessageInput';
import InviteModal from '@/components/ghost-chat/InviteModal';
import BurnConfirmation from '@/components/ghost-chat/BurnConfirmation';
import { UserPlus, ShieldCheck, Loader2, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GhostChatPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [showBurnConfirm, setShowBurnConfirm] = useState(false);
  const [isBurning, setIsBurning] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          // 1. Creator identity protocol
          setUser({ ...authUser, displayName: 'ADMIN', isGuest: false });
          setLoading(false);
          return;
        }

        const token = searchParams.get('token');
        if (token) {
          const { data: invite, error } = await supabase
            .from('invites')
            .select('*')
            .eq('token', token)
            .eq('session_id', sessionId)
            .single();

          if (invite && !error) {
            // 2. Extract initials from email (e.g. jakstech2030 -> JAKS)
            const prefix = invite.email.split('@')[0];
            const initials = prefix.match(/^[a-zA-Z]+/)?.[0] || prefix.slice(0, 4);

            setUser({ 
              id: `guest_${token.slice(0, 8)}_${initials.toLowerCase()}`, 
              email: invite.email, 
              isGuest: true,
              displayName: initials.toUpperCase()
            });
          } else {
            alert("This invite is invalid or has expired.");
            router.push('/ghost-chat');
          }
        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error("Access check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [sessionId, searchParams, router]);

  const { onlineCount } = useGhostPresence(sessionId, user?.id || 'anonymous');

  // Triggered by the BurnConfirmation modal
  const executeBurnSequence = async () => {
    setIsBurning(true);
    try {
      const response = await fetch('/ghost-chat/api/burn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, mode: 'manual' }),
      });

      if (response.ok) {
        router.push('/ghost-chat'); 
      } else {
        const err = await response.json();
        alert(`Burn failed: ${err.error}`);
        setIsBurning(false);
        setShowBurnConfirm(false);
      }
    } catch (error) {
      console.error("Manual burn failed:", error);
      setIsBurning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-zinc-500">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-full flex justify-center px-2 sm:px-4 pt-4 sm:pt-6 relative">
      
      {/* CHAT CARD */}
      <div className="w-full max-w-4xl flex flex-col overflow-hidden border border-zinc-800 bg-transparent text-white shadow-2xl rounded-none sm:rounded-2xl">

        {/* HEADER */}
        <header className="p-3 sm:p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h1 className="font-bold text-sm md:text-base text-zinc-100 flex items-center gap-2">
                {user.isGuest ? 'Secure Chat' : 'Ghost Chat'}
                <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 font-mono">
                  {user.displayName}
                </span>
              </h1>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                {sessionId?.slice(0, 8)}...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {!user.isGuest && (
              <>
                <button 
                  onClick={() => setShowInvite(true)}
                  className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs text-zinc-300 transition-all active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Invite</span>
                </button>

                <button 
                  onClick={() => setShowBurnConfirm(true)}
                  className="flex items-center gap-2 bg-red-950/30 hover:bg-red-600 border border-red-900/50 px-3 py-1.5 rounded-lg text-xs text-red-500 hover:text-white transition-all active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Burn Session</span>
                </button>
              </>
            )}
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">
              <span className={`w-2 h-2 rounded-full ${onlineCount > 1 ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]' : 'bg-zinc-600'}`} />
              <span className="text-[10px] font-mono text-zinc-300">{onlineCount}</span>
            </div>
          </div>
        </header>

        {/* CHAT AREA */}
        <div className="flex flex-col min-h-[45vh] sm:min-h-[35vh] max-h-[75vh] sm:max-h-[70vh] transition-all duration-300 ease-out">
          <ChatWindow sessionId={sessionId} />
        </div>

        {/* INPUT */}
        <footer className="p-3 sm:p-4 bg-zinc-950 border-t border-zinc-900">
          <MessageInput sessionId={sessionId} />

          <div className="mt-2 sm:mt-3 flex justify-center">
            <p className="text-[10px] text-zinc-500 italic text-center px-2">
              {onlineCount === 1
                ? "Waiting for guest. Data purge active on exit."
                : "Secure line active. All packets are temporary."}
            </p>
          </div>
        </footer>

        {/* MODALS */}
        {showInvite && (
          <InviteModal 
            sessionId={sessionId} 
            onClose={() => setShowInvite(false)} 
          />
        )}

        {showBurnConfirm && (
          <BurnConfirmation 
            isBurning={isBurning}
            onConfirm={executeBurnSequence}
            onCancel={() => setShowBurnConfirm(false)}
          />
        )}
      </div>
    </div>
  );
}