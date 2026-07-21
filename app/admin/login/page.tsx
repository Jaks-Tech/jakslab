"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, Users } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      setLoggedIn(true);
    }
  }

  if (loggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Login successful</h1>
            <p className="mt-2 text-sm text-slate-400">Choose where you want to continue.</p>
          </div>
          <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
            <Link href="/admin" className="group flex items-center gap-4 py-5">
              <LayoutDashboard className="h-5 w-5 text-blue-400" />
              <div className="flex-1"><p className="font-semibold text-white">Admin Dashboard</p><p className="mt-1 text-xs text-slate-500">Orders and inquiries</p></div>
              <ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/workhub" className="group flex items-center gap-4 py-5">
              <Users className="h-5 w-5 text-blue-400" />
              <div className="flex-1"><p className="font-semibold text-white">Work Hub</p><p className="mt-1 text-xs text-slate-500">Team tasks and collaboration</p></div>
              <ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-transparent">

      <form
        onSubmit={login}
        className="p-10 rounded-3xl space-y-6 w-[400px] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl"
      >

        {/* Company Logo */}
        <div className="flex justify-center">
          <Image
            src="/Jakslab.png"
            alt="Jakslab"
            width={90}
            height={90}
            priority
            className="rounded-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold text-white text-center tracking-tight">
          Jakslab Console
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 p-3 rounded-xl text-white font-bold hover:bg-blue-700 transition-all"
        >
          Login
        </button>

      </form>

    </div>
  );
}
