"use client";

import { Send, Shield, CheckCircle2, Info, ReceiptText, Laptop, Landmark, ClipboardCheck } from "lucide-react";
import PaymentFlow from "./PaymentFlow";
import PaymentForm from "./PaymentForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-transparent text-slate-300 py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* 1. HERO HEADER CONTAINER */}
        <div className="relative group">
        {/* The Faded Outline Card */}
        <div className="relative z-10 bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 text-center space-y-6 shadow-2xl overflow-hidden">
            
            {/* Subtle Atmospheric Background Glows */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Directly Rounded Image Container */}
            <div className="relative w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 duration-500 shadow-xl">
            <img 
                src="/remitly.png" 
                alt="Remitly Logo" 
                className="w-full h-full p-2.5 object-contain" 
            />
            </div>

            <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Pay with Remitly
            </h1>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Follow the interactive guide to complete your transfer, then use the 
                verification form at the bottom to finalize your order.
            </p>

            {/* Tags Section */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
                {["Bank Deposit", "Kenya 🇰🇪", "Equity Bank"].map((tag) => (
                <span 
                    key={tag} 
                    className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-black tracking-[0.15em] text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-colors cursor-default"
                >
                    {tag}
                </span>
                ))}
            </div>
            </div>
        </div>
        
        {/* The Faded/Ghost Outline Layer */}
        <div className="absolute inset-0 border border-white/5 rounded-[3.5rem] -m-2.5 pointer-events-none opacity-40" />
        </div>

        {/* 2. INSTRUCTIONAL PHASE SECTION */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-white/5 pb-4">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Laptop size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-none">Follow these steps to make the payment</h2>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Step 1: Complete the tutorial</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
            {/* The Tutorial Component */}
            <div className="space-y-4">
              <PaymentFlow />
            </div>

            {/* Credential Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-52 h-52 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <Shield size={18} className="text-blue-400" />
                    <h2 className="text-xl font-bold text-white">Recipient Details</h2>
                  </div>

                  <div className="bg-blue-500/5 border border-blue-500/10 p-5 rounded-2xl text-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Bank</span>
                      <span className="text-white font-semibold">Equity Bank</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Account</span>
                      <span className="font-mono text-blue-300">0190185048644</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Name</span>
                      <span className="text-white font-semibold">Jeremiah Abunga</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Phone</span>
                      <span className="text-white font-semibold">+254 113178912</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-yellow-500/15 bg-yellow-500/5 p-4 flex gap-3">
                    <Info size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-300/80 leading-relaxed">
                      Ensure the recipient name <strong>"Jeremiah Abunga"</strong> is entered exactly as shown to prevent bank rejection.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Trust/Support Badge */}
              <div className="p-5 rounded-3xl border border-white/5 bg-white/[0.01] flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={18} />
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                  Your information is secured. Follow the Remitly prompts for a safe transaction.
                </p>
              </div>
            </aside>
          </div>
        </div>

        {/* 3. SUBMISSION PHASE SECTION */}
        <div className="space-y-8 pt-8">
          <div className="flex items-center gap-4 border-b border-white/5 pb-4">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <ClipboardCheck size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-none">Send your payment confirmation</h2>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Step 2: Submit your receipt</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <ReceiptText size={180} className="text-blue-500" />
              </div>

              <div className="relative z-10 space-y-10">
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-black text-white">Verification Form</h2>
                  <p className="text-slate-400 max-w-md mx-auto text-sm">
                    Enter the details exactly as they appear on your Remitly confirmation screen to notify our team.
                  </p>
                </div>

                {/* Submitting component */}
                <div className="max-w-2xl mx-auto">
                   <PaymentForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-8 border-t border-white/5">
           <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] font-bold">
             JaksLab Engineering • Secure Payment Gateway
           </p>
        </div>

      </div>
    </main>
  );
}