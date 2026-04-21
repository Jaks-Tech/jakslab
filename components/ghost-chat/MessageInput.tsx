'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Paperclip, Send, Loader2, X, Reply } from 'lucide-react';

export default function MessageInput({ sessionId }: { sessionId: string }) {
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  // NEW: State to track what we are replying to
  const [replyTarget, setReplyTarget] = useState<{ id: string; content: string; sender_id: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // LISTEN for the 'set-reply' event from useMessageActions
  useEffect(() => {
    const handleSetReply = (e: any) => {
      setReplyTarget(e.detail);
      // Optional: Auto-focus the input when replying
      document.getElementById('ghost-input')?.focus();
    };

    window.addEventListener('set-reply', handleSetReply);
    return () => window.removeEventListener('set-reply', handleSetReply);
  }, []);

  const handleSendMessage = async (e?: React.FormEvent, filePath?: string) => {
    e?.preventDefault();
    if (!message.trim() && !filePath) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      let senderId = user?.id;

      if (!senderId) {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
          // Reconstruct the same guest ID logic used in ChatWindow
          senderId = `guest_${token.slice(0, 8)}`; 
        } else {
          senderId = 'anonymous';
        }
      }

      // --- TRANSMISSION WITH REPLY_TO_ID ---
      const { error } = await supabase.from('messages').insert({
        session_id: sessionId,
        content: message.trim(),
        file_path: filePath || null,
        sender_id: senderId,
        reply_to_id: replyTarget?.id || null, // INJECT THE REPLY ID HERE
      });

      if (error) throw error;

      // Reset everything on success
      setMessage('');
      setReplyTarget(null); // Clear the reply preview
      if (fileInputRef.current) fileInputRef.current.value = '';
      
    } catch (error: any) {
      console.error("Transmission Error:", error.message);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.size > 5 * 1024 * 1024) return;

    setUploading(true);
    const uniquePrefix = Math.random().toString(36).substring(2, 7);
    const path = `${sessionId}/${uniquePrefix}_${file.name}`;

    try {
      const { error } = await supabase.storage.from('ghost-files').upload(path, file);
      if (error) throw error;
      await handleSendMessage(undefined, path);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      
      {/* REPLY PREVIEW BAR */}
      {replyTarget && (
        <div className="flex items-center justify-between bg-zinc-900/80 border-t border-x border-zinc-800 p-2 px-4 rounded-t-xl animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-3 overflow-hidden">
            <Reply size={14} className="text-emerald-500 flex-shrink-0" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                Replying to packet
              </span>
              <p className="text-xs text-zinc-400 truncate italic">
                {replyTarget.content || "Attached Media"}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setReplyTarget(null)}
            className="p-1 text-zinc-500 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <form 
        onSubmit={handleSendMessage} 
        className={`flex items-center gap-2 bg-zinc-950 p-2 ${replyTarget ? 'rounded-b-xl border-x border-b border-zinc-800' : ''}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="p-2.5 text-zinc-500 hover:text-emerald-500 transition-colors"
        >
          {uploading ? <Loader2 className="animate-spin w-5 h-5" /> : <Paperclip className="w-5 h-5" />}
        </button>

        <input
          id="ghost-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={uploading ? "Encrypting..." : "Send message..."}
          disabled={uploading}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
        />

        <button
          type="submit"
          disabled={(!message.trim() && !uploading) || uploading}
          className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-30"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}