"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnrollUserForm({ teamId }: { teamId: string }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState(""); // New state for email
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/workhub/teams/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          team_id: teamId, 
          user_name: userName.toUpperCase(),
          user_email: userEmail.toLowerCase(), // Sending email to the API
          role 
        }),
      });

      if (res.ok) {
        setUserName("");
        setUserEmail(""); // Reset email field
        router.refresh();
      }
    } catch (err) {
      console.error("Enrollment failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent border border-white/10 dark:border-gray-800 rounded-[2rem] p-6 space-y-6">
      <div className="flex items-center gap-2 px-2">
        <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
        <h3 className="text-[10px] font-black titlecase tracking-[0.3em] text-gray-400">
          Enroll Team Member
        </h3>
      </div>

      <form onSubmit={handleEnroll} className="space-y-4">
        {/* NAME AND ROLE ROW */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            className="flex-[2] bg-white/5 border border-white/10 focus:border-blue-500/50 p-4 rounded-2xl text-sm font-bold text-white outline-none transition-all placeholder:text-gray-600"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={loading}
          />

          <select
            className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl text-[10px] font-black titlecase tracking-widest text-gray-400 outline-none appearance-none cursor-pointer hover:bg-white/10 transition-all"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
          >
            <option value="member">Member</option>
            <option value="lead">Lead</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* EMAIL INPUT */}
        <div className="relative group">
          <input
            type="email"
            className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 p-4 rounded-2xl text-sm font-bold text-white outline-none transition-all placeholder:text-gray-600"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            disabled={loading}
            required
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !userName.trim() || !userEmail.trim()}
          className="w-full py-4 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-white font-black text-xs titlecase tracking-[0.4em] rounded-2xl transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-3 group"
        >
          {loading ? "Registering..." : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
              Enroll
            </>
          )}
        </button>
      </form>

      <p className="text-center text-[8px] font-bold text-gray-600 uppercase tracking-widest opacity-50 italic leading-loose">
        Email will be linked to operative identity<br/>
        Authorized operatives will appear in the sector registry
      </p>
    </div>
  );
}