'use client';

import { useState } from 'react';
import { X, Send, CheckCircle2, Loader2, Mail, Plus } from 'lucide-react';

interface InviteModalProps {
  sessionId: string;
  onClose: () => void;
}

export default function InviteModal({ sessionId, onClose }: InviteModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const sendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/ghost-chat/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sessionId, 
          inviteeEmail: email 
        }),
      });

      if (response.ok) {
        setStatus('sent');
        setEmail(''); // Clear the input for the next invite
        
        // Return to idle state after 2 seconds so they can send another
        setTimeout(() => setStatus('idle'), 2000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-transparent border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        
        {/* Progress Bar */}
        {status === 'sending' && (
          <div className="absolute top-0 left-0 h-1 bg-emerald-500 animate-progress-indefinite w-full" />
        )}

        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-500" />
            Invite Participants
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            You can invite multiple people. Each link is single-use.
          </p>
        </div>

        <form onSubmit={sendInvite} className="space-y-4">
          <div className="relative">
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
              Recipient Email
            </label>
            <input
              required
              disabled={status === 'sending'}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@example.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all disabled:opacity-50"
            />
            
            {/* Success Checkmark overlay inside input */}
            {status === 'sent' && (
              <div className="absolute right-3 bottom-3 text-emerald-500 animate-in fade-in zoom-in">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
          </div>

          <button
            disabled={status === 'sending' || !email}
            type="submit"
            className={`w-full font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
              status === 'sent' 
              ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/50' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : status === 'sent' ? (
              <>
                <Plus className="w-4 h-4" />
                Invite Another
              </>
            ) : status === 'error' ? (
              'Try Again'
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Invite
              </>
            )}
          </button>
          
          {status === 'error' && (
            <p className="text-center text-xs text-red-400 animate-shake">
              Something went wrong. Check your connection.
            </p>
          )}

          {status === 'sent' && (
            <p className="text-center text-[10px] text-emerald-500 animate-pulse">
              Invite sent successfully! Input cleared for next user.
            </p>
          )}
        </form>
        
        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-center">
          <button 
            onClick={onClose}
            className="text-xs text-zinc-500 hover:text-zinc-300 underline underline-offset-4"
          >
            Done inviting
          </button>
        </div>
      </div>
    </div>
  );
}