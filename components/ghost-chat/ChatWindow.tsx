'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import type { GhostMessage } from '@/app/types/chat';
import { useRouter } from 'next/navigation';
import { ShieldAlert, LogOut } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { useMessageActions } from '@/app/hooks/ghost-chat/useMessageActions';

export default function ChatWindow({ sessionId }: { sessionId: string }) {
  const [messages, setMessages] = useState<GhostMessage[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [sessionEnded, setSessionEnded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initialize modular actions (Reply/Delete)
  const { handleReply, handleDelete } = useMessageActions(sessionId);

  useEffect(() => {
    const getIdentity = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setCurrentUserId(user.id);
      } else {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        
        if (token) {
          const { data: invite } = await supabase
            .from('invites')
            .select('email')
            .eq('token', token)
            .single();

          let initials = 'GUEST';
          if (invite?.email) {
            const prefix = invite.email.split('@')[0];
            initials = prefix.match(/^[a-zA-Z]+/)?.[0] || prefix.slice(0, 4);
          }

          const guestId = `guest_${token.slice(0, 8)}_${initials.toLowerCase()}`;
          setCurrentUserId(guestId);
        }
      }
    };
    
    getIdentity();

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });
      
      if (error) return;
      if (data) setMessages(data as GhostMessage[]);
    };

    fetchMessages();

    const channel = supabase
      .channel(`chat_room_${sessionId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `session_id=eq.${sessionId}` },
        (payload) => {
          const newMessage = payload.new as GhostMessage;
          setMessages((current) => {
            if (current.find(m => m.id === newMessage.id)) return current;
            return [...current, newMessage];
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((current) => current.filter((m) => m.id !== payload.old.id));
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'sessions', filter: `id=eq.${sessionId}` },
        () => {
          setSessionEnded(true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, router]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getDisplayName = (senderId: string | null, isMe: boolean) => {
    if (!senderId) return 'ANONYMOUS';
    if (isMe) return 'YOU';
    if (senderId.startsWith('guest_')) {
      const parts = senderId.split('_');
      return (parts[2] || 'GUEST').toUpperCase();
    }
    return 'ADMIN';
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* --- PROTOCOL TERMINATED OVERLAY --- */}
      {sessionEnded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-700">
          <div className="max-w-sm w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20">
                <ShieldAlert className="w-12 h-12 text-red-500 animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white uppercase tracking-tighter italic">Protocol Terminated</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                This secure line has been burned. All ephemeral data has been purged from the JaksLab servers.
              </p>
            </div>

            <button
              onClick={() => router.push('/ghost-chat')}
              className="w-full bg-white hover:bg-zinc-200 text-black font-black py-3 rounded-xl transition-all active:scale-[0.98]"
            >
              <LogOut className="w-4 h-4 mr-2 inline" />
              Return to Hub
            </button>
          </div>
        </div>
      )}

      {/* --- CHAT CONTENT --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide min-h-0 bg-transparent">
        {messages.map((msg) => {
          const isMe = msg.sender_id === currentUserId;
          const displayName = getDisplayName(msg.sender_id, msg.sender_id === currentUserId);
          
          // --- PARENT PACKET LOOKUP ---
          // Find the original message this packet is responding to
          const repliedToMsg = msg.reply_to_id 
            ? messages.find(m => m.id === msg.reply_to_id) 
            : null;

          return (
            <MessageBubble
              key={msg.id}
              msg={msg}
              repliedToMsg={repliedToMsg} // Pass the found parent to the bubble
              isMe={isMe}
              displayName={displayName}
              onReply={handleReply}
              onDelete={handleDelete}
            />
          );
        })}
        <div ref={scrollRef} className="h-4" />
      </div>
    </div>
  );
}