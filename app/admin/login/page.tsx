"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/admin");
    }
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