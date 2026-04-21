// app/hooks/ghost-chat/useMessageActions.ts
import { supabase } from '@/lib/supabase';

export const useMessageActions = (sessionId: string) => {
  
  const handleReply = (msg: any) => {
    // Dispatches a global event that MessageInput listens for
    const event = new CustomEvent('set-reply', { 
      detail: {
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id
      } 
    });
    window.dispatchEvent(event);
  };

  const handleDelete = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId)
        .eq('session_id', sessionId);

      if (error) throw error;
      
    } catch (error: any) {
      console.error("Purge Error:", error.message);
    }
  };

  return { handleReply, handleDelete };
};