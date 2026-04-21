export interface GhostSession {
  id: string;
  creator_id: string;
  burned_at: string | null;
  creator_online: boolean;
  guest_online: boolean;
}

export interface GhostMessage {
  id: string;
  session_id: string;
  sender_id: string;
  content: string | null;
  file_path: string | null;
  reply_to_id: string | null;
  created_at: string;
}

