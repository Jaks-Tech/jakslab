'use client';

import { motion } from 'framer-motion';
import { Reply, Trash2, FileText, ExternalLink, Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface MessageBubbleProps {
  msg: any;
  repliedToMsg?: any;
  isMe: boolean;
  displayName: string;
  onReply: (msg: any) => void;
  onDelete: (id: string) => void;
}

export default function MessageBubble({ msg, repliedToMsg, isMe, displayName, onReply, onDelete }: MessageBubbleProps) {
  
  // --- HELPERS ---
  const getFileUrl = (path: string) => supabase.storage.from('ghost-files').getPublicUrl(path).data.publicUrl;
  const isImage = (path: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(path);
  
  const getCleanFileName = (path: string) => {
    const fullFileName = path.split('/').pop() || '';
    const parts = fullFileName.split('_');
    return parts.length > 1 ? parts.slice(1).join('_') : fullFileName;
  };

  // --- DOWNLOAD PROTOCOL ---
  const handleDownload = async (path: string) => {
    try {
      const publicUrl = getFileUrl(path);
      const response = await fetch(publicUrl);
      const blob = await response.blob();
      
      const cleanName = getCleanFileName(path);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = cleanName; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Secure download failed. Packet may be corrupted.");
    }
  };

  return (
    <div className={`flex flex-col group ${isMe ? 'items-end' : 'items-start'}`}>
      <span className={`text-[10px] font-black mb-1.5 px-1 uppercase tracking-widest ${
        isMe ? 'text-emerald-500/70' : 'text-zinc-600'
      }`}>
        {displayName}
      </span>

      <div className="relative flex items-center gap-2 max-w-[90%]">
        {/* DRAGGABLE BUBBLE */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 100 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => { if (info.offset.x > 60) onReply(msg); }}
          className={`p-3 border shadow-sm transition-all overflow-hidden relative cursor-grab active:cursor-grabbing ${
            isMe 
              ? 'bg-emerald-600 border-emerald-500 rounded-2xl rounded-tr-none text-white' 
              : 'bg-zinc-800 border-zinc-700/50 rounded-2xl rounded-tl-none text-zinc-100'
          }`}
        >
          {/* --- REPLY SNIPPET --- */}
          {msg.reply_to_id && (
            <div className={`mb-2 p-2 rounded-lg border-l-2 text-[10px] bg-black/20 overflow-hidden ${
                isMe ? 'border-emerald-300/50' : 'border-emerald-500'
            }`}>
              <p className="font-black uppercase tracking-tighter opacity-60 mb-0.5 flex items-center gap-1">
                <Reply size={10} /> Inbound Chat Reply
              </p>
              <div className="italic line-clamp-1 opacity-80">
                {repliedToMsg ? (
                  <div className="flex items-center gap-1">
                    {repliedToMsg.content && <span>{repliedToMsg.content}</span>}
                    {repliedToMsg.file_path && (
                      <span className="flex items-center gap-1">
                        {repliedToMsg.content && <span className="mx-1">•</span>}
                        <FileText size={10} /> 
                        {getCleanFileName(repliedToMsg.file_path)}
                      </span>
                    )}
                  </div>
                ) : (
                  "Wiped Message"
                )}
              </div>
            </div>
          )}

          {msg.content && <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>}
          
          {msg.file_path && (
            <div className={`mt-3 ${msg.content ? 'pt-3 border-t border-white/10' : ''}`}>
              {isImage(msg.file_path) ? (
                /* --- IMAGE PREVIEW --- */
                <div className="relative group/img">
                  <a href={getFileUrl(msg.file_path)} target="_blank" rel="noreferrer" className="block rounded-lg overflow-hidden border border-black/20 bg-black/5">
                    <img src={getFileUrl(msg.file_path)} alt="Attachment" className="max-h-72 w-full object-contain transition-transform duration-500 hover:scale-[1.03]" />
                  </a>
                  <button 
                    onClick={() => handleDownload(msg.file_path)}
                    className="absolute bottom-2 right-2 p-2 bg-black/60 hover:bg-emerald-500 backdrop-blur-md rounded-lg text-white opacity-0 group-hover/img:opacity-100 transition-all shadow-xl"
                  >
                    <Download size={16} />
                  </button>
                </div>
              ) : (
                /* --- DOCUMENT CARD --- */
                <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  isMe ? 'bg-emerald-500/10 border-emerald-400/20' : 'bg-zinc-900 border-zinc-700'
                }`}>
                  <div className={`p-2 rounded-lg ${isMe ? 'bg-emerald-500/20' : 'bg-zinc-800'}`}>
                    <FileText size={18} className={isMe ? 'text-emerald-400' : 'text-zinc-400'} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs font-bold truncate text-zinc-100">{getCleanFileName(msg.file_path)}</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-tighter">{msg.file_path.split('.').pop()} Secure</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleDownload(msg.file_path)}
                      className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-emerald-400 transition-colors"
                    >
                      <Download size={16} />
                    </button>
                    <a href={getFileUrl(msg.file_path)} target="_blank" className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-emerald-400">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* SIDE ACTIONS */}
        <div className={`flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? 'order-first' : 'order-last'}`}>
          <button onClick={() => onReply(msg)} className="p-1.5 text-zinc-500 hover:text-emerald-500 transition-colors">
            <Reply size={16} />
          </button>
          {isMe && (
            <button onClick={() => onDelete(msg.id)} className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      
      <span className={`text-[10px] text-zinc-500 mt-1 font-mono ${isMe ? 'mr-1' : 'ml-1'}`}>
        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}