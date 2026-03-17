"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import PhoneInputWithCountry from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState<string | undefined>();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const strengthLabel = ["Weak", "Fair", "Good", "Strong", "Very Strong"][strength];

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
        }

        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/order`,
            data: {
            full_name: fullName,
            phone: phone || null,
            },
        },
        });

        if (error) {
        setError(error.message);
        setLoading(false);
        return;
        }

        // Set returning user flag for Header logic
        localStorage.setItem("jakslab_returning_user", "true");

        router.push("/order");
    };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 selection:bg-emerald-500/30">

      <div className="w-full max-w-md relative rounded-3xl border border-white/5 backdrop-blur-xl p-8 shadow-2xl shadow-black/40">

        <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] -z-10" />

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

            <h1 className="text-2xl font-black text-white tracking-tighter italic">
              Jakslab
            </h1>

            <p className="text-zinc-500 text-sm font-light">
              Create an account to create and track your JaksLab orders
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">

            {/* Full Name */}
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />

              <input
                type="text"
                required
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            
            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />

              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {/* Phone with country select */}
            {/* Phone */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl px-4 py-3 flex items-center">
            <PhoneInput
                placeholder="Phone number (optional)"
                international
                defaultCountry="US"
                countryCallingCodeEditable={false}
                value={phone}
                onChange={setPhone}
                className="w-full text-white"
            />
            </div>


            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Strength */}
            {password && (
              <div className="text-xs text-zinc-400">
                Strength: <span className="text-emerald-400 font-semibold">{strengthLabel}</span>
              </div>
            )}

            {/* Repeat Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Repeat Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold text-center italic">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-600/20"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Create Account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-zinc-600 text-xs uppercase tracking-widest font-bold">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-500 hover:text-emerald-400">
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}