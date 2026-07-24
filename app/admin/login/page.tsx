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

  async function login(event: React.FormEvent) {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else setLoggedIn(true);
  }

  if (loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4 text-slate-950">
        <section className="w-full max-w-md rounded-xl border border-slate-200 p-6 sm:p-8">
          <h1 className="text-2xl font-semibold">Login successful</h1>
          <p className="mt-2 text-sm text-slate-600">Choose where you want to continue.</p>
          <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            <Destination href="/admin" icon={<LayoutDashboard size={19} />} title="Admin dashboard" description="Orders and enquiries" />
            <Destination href="/workhub" icon={<Users size={19} />} title="Work Hub" description="Team tasks and collaboration" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 text-slate-950">
      <form onSubmit={login} className="w-full max-w-md rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
          <Image src="/jakslab.png" alt="JaksLab" width={44} height={44} priority className="rounded-full border border-slate-200" />
          <div>
            <h1 className="text-xl font-semibold">JaksLab Admin</h1>
            <p className="text-sm text-slate-600">Sign in to manage website requests.</p>
          </div>
        </div>
        <div className="mt-6 space-y-5">
          <label className="block text-sm font-medium">
            Email address
            <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-slate-700" />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-slate-700" />
          </label>
          <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">Sign in</button>
        </div>
      </form>
    </main>
  );
}

function Destination({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link href={href} className="group flex items-center gap-4 py-5">
      <span className="text-slate-700">{icon}</span>
      <span className="flex-1">
        <span className="block font-medium">{title}</span>
        <span className="mt-1 block text-xs text-slate-500">{description}</span>
      </span>
      <ArrowRight className="text-slate-500 transition-transform group-hover:translate-x-1" size={17} />
    </Link>
  );
}
