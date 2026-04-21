import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useGhostPresence = (sessionId: string, userId: string) => {
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const channel = supabase.channel(`ghost_session_${sessionId}`, {
      config: { presence: { key: userId } }
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const count = Object.keys(state).length;
        setOnlineCount(count);

        // Logic: If count becomes 0, the session is abandoned.
        // We handle the actual 'Burn' via a database trigger or Edge Function 
        // to ensure it happens even if the browser is closed.
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [sessionId, userId]);

  return { onlineCount };
};