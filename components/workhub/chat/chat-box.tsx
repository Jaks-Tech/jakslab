"use client";

import { useEffect, useState, useRef } from "react";

type Message = {
  id: string;
  message: string;      // Mapping to 'content' in DB
  sender_id: string;    // Mapping to 'user_name' in DB
  created_at?: string;
};

export default function ChatBox({ taskId, teamname }: { taskId: string; teamname: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [senderName, setSenderName] = useState("Anonymous");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Load Identity and Start Polling
  useEffect(() => {
    const savedName = localStorage.getItem("workhub_user_name");
    if (savedName) setSenderName(savedName);

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/workhub/messages?task_id=${taskId}`);
        if (res.ok) {
          const data = await res.json();
          // Adjust this if your API returns { messages: [] } or just []
          setMessages(Array.isArray(data) ? data : data.messages || []);
        }
      } catch (err) {
        console.error("Comms Link Error:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, [taskId]);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Optimistic UI Update
    const newMessage: Message = {
      id: Math.random().toString(),
      message: text,
      sender_id: senderName,
    };
    setMessages((prev) => [...prev, newMessage]);
    
    const currentText = text;
    setText("");

    await fetch("/api/workhub/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_id: taskId,
        sender_id: senderName, // Ensure backend maps this to user_name
        message: currentText,   // Ensure backend maps this to content
      }),
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-white/5 dark:bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
      
      {/* HEADER */}
      <div className="px-8 py-6 border-b border-white/5 bg-white/5 flex flex-col gap-1">
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
              Secure Channel • {taskId}
            </span>
         </div>
         <h1 className="text-xl font-black text-white uppercase tracking-tight truncate">
           {teamname}
         </h1>
      </div>

      {/* MESSAGE FEED */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none"
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center opacity-20">
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Awaiting Transmissions...</p>
          </div>
        ) : (
          messages.map((m) => {
            const isMe = m.sender_id === senderName;
            return (
              <div key={m.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <span className="text-[9px] font-black text-gray-500 uppercase mb-1 px-2">
                  {isMe ? "You" : m.sender_id}
                </span>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMe 
                    ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-500/20" 
                    : "bg-white/10 text-gray-200 rounded-tl-none border border-white/5"
                }`}>
                  {m.message}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* INPUT BAR */}
      <form onSubmit={sendMessage} className="p-4 bg-black/20 border-t border-white/5">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500/50 text-sm text-white placeholder:text-gray-700"
            placeholder="Broadcast transmission..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            type="submit" 
            className="px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all active:scale-95 flex items-center justify-center shadow-lg shadow-blue-600/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}