"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("jakslab_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    localStorage.setItem("jakslab_email", email);

    router.push("/order");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent selection:bg-blue-500/30">
      
      {/* Card Container */}
      <div className="w-full max-w-md relative rounded-3xl border border-white/10 bg-transparent backdrop-blur-xl p-8 shadow-2xl shadow-black/40">

        {/* Subtle outline glow */}
        <div className="absolute inset-0 rounded-3xl border border-blue-500/10 pointer-events-none" />

        {/* Ambient background glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10" />

        <div className="space-y-8">

          {/* Header */}
          <div className="text-center space-y-3">

            <div className="flex justify-center">
              <Image
                src="/jakslab.png"
                alt="JaksLab"
                width={64}
                height={64}
                priority
                className="rounded-xl"
              />
            </div>

            <h1 className="text-3xl font-black text-white tracking-tighter italic">
              Welcome Back
            </h1>

            <p className="text-zinc-500 text-sm font-light">
              Sign in to check your orders
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />

              <input
                type="email"
                required
                autoFocus
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-xs font-bold text-center italic">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-zinc-600 text-xs uppercase tracking-widest font-bold">
            New to JaksLab?{" "}
            <Link
              href="/signup"
              className="text-blue-500 hover:text-blue-400"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}