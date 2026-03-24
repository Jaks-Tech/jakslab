"use client";

import { useMemo, useState } from "react";
import {
  Apple,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Globe,
  Landmark,
  Phone,
  PlayCircle,
  Send,
  User,
  Info
} from "lucide-react";

type FormState = {
  amount: string;
  senderName: string;
  senderBank: string;
  senderAcc: string;
  transactionId: string;
};

const recipient = {
  country: "Kenya",
  bank: "Equity Bank",
  accountNumber: "0190185048644",
  firstName: "Jeremiah",
  lastName: "Abunga",
  countryCode: "+254", // KE Default
  mobileNumber: "113178912",
  phone: "+254113178912",
};

export default function PaymentFlow() {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    amount: "100", 
    senderName: "Client", 
    senderBank: "",
    senderAcc: "",
    transactionId: "REF-DEMO-001",
  });

  const steps = [
    "Platform",
    "Country",
    "Amount",
    "Method",
    "Bank",
    "Account",
    "Recipient",
    "Notification",
    "Sender Info",
    "Finish",
  ];

  const progress = useMemo(
    () => `${Math.round(((step + 1) / steps.length) * 100)}%`,
    [step, steps.length]
  );

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  const copyText = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  };

  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const cardBase = "rounded-[1.75rem] border border-white/8 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 shadow-2xl";
  const innerCard = "flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-white/5 transition-all duration-200 hover:bg-white/[0.08]";
  const labelClass = "text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5";
  const inputClass = "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition focus:border-blue-500";
  const descClass = "text-slate-400 text-sm mb-6 leading-relaxed";

  return (
    <section className={`${cardBase} relative overflow-hidden max-w-2xl mx-auto`}>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-1">Demonstration Mode</p>
              <h2 className="text-xl font-bold text-white">Step {step + 1}: {steps[step]}</h2>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Send size={20} />
            </div>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: progress }} />
          </div>
        </div>

        {/* Standardized Content Area */}
        <div className="min-h-[420px] flex flex-col justify-center">
          
          {/* Step 0: Platform */}
          {step === 0 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <p className={descClass}>Choose how you want to access your Remitly account. Mobile apps offer the fastest experience with biometrics, while the website is best for desktop users.</p>
              <div className="grid gap-3">
                <a href="https://apps.apple.com/us/app/remitly-global-money-transfer/id674258465" target="_blank" rel="noopener noreferrer" className={innerCard}>
                  <div className="flex items-center gap-4"><Apple size={22}/><span className="text-white font-medium">App Store</span></div>
                  <ChevronRight size={18} className="text-slate-600" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.remitly.androidapp" target="_blank" rel="noopener noreferrer" className={innerCard}>
                  <div className="flex items-center gap-4"><PlayCircle size={22}/><span className="text-white font-medium">Google Play</span></div>
                  <ChevronRight size={18} className="text-slate-600" />
                </a>
                <a href="https://www.remitly.com/send" target="_blank" rel="noopener noreferrer" onClick={next} className={`${innerCard} border-blue-500/30 bg-blue-500/5`}>
                  <div className="flex items-center gap-4"><Globe size={22} className="text-blue-400"/><span className="text-white font-medium">Continue with Website</span></div>
                  <ChevronRight size={18} className="text-blue-400" />
                </a>
              </div>
            </div>
          )}

          {/* Step 1: Country */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <p className={descClass}>Select the destination country. Remitly offers specialized exchange rates for different regions to ensure the most money reaches your recipient.</p>
              <button onClick={next} className={`${innerCard} w-full py-8 border-blue-500/20 bg-blue-500/5`}>
                <div className="text-left">
                  <p className={labelClass}>Target Destination</p>
                  <p className="text-white text-2xl font-bold">Kenya 🇰🇪</p>
                </div>
                <ChevronRight className="text-blue-400" size={24} />
              </button>
            </div>
          )}

          {/* Step 2: Amount */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <p className={descClass}>Enter the amount you wish to send in USD. The exchange rate and any applicable fees will be calculated in real-time on the next screen.</p>
              <div className="p-1">
                <label className="text-sm font-semibold text-slate-300 block mb-3">Amount to Send (USD)</label>
                <input type="number" value={form.amount} onChange={(e) => updateField("amount", e.target.value)} className={inputClass} />
              </div>
            </div>
          )}

          {/* Step 3: Method */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <p className={descClass}>Bank Deposits are the most secure way to send. The money is transferred directly from your account to the recipient's bank within 0-2 business days.</p>
              <button onClick={next} className={`${innerCard} w-full py-8`}>
                <div className="flex items-center gap-5"><Landmark className="text-blue-400" size={28}/><span className="text-white font-bold text-xl">Bank Deposit</span></div>
                <ChevronRight className="text-blue-400" size={24} />
              </button>
            </div>
          )}

          {/* Step 4: Bank */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <p className={descClass}>Select the recipient's bank. Choosing a major local bank like Equity Bank ensures the fastest processing time in Kenya.</p>
              <button onClick={next} className={`${innerCard} w-full py-8`}>
                <span className="text-white font-bold text-xl ml-2">Equity Bank</span>
                <ChevronRight className="text-blue-400" size={24} />
              </button>
            </div>
          )}

          {/* Step 5: Account Number */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <p className={descClass}>Ensure the account number is correct. A single wrong digit can delay the transfer. Use the copy button to avoid typing errors.</p>
              <div className="space-y-2">
                <p className={labelClass}>Equity Bank Account Number</p>
                <div className={`${innerCard} py-6`}>
                  <span className="text-white font-mono text-xl tracking-wider">{recipient.accountNumber}</span>
                  <button onClick={() => copyText("acc", recipient.accountNumber)} className="text-blue-400 font-black text-sm px-4 py-2 bg-blue-500/10 rounded-xl">
                    {copied === "acc" ? "COPIED" : "COPY"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Recipient Name */}
          {step === 6 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4">
              <p className={descClass}>The recipient's name must match their government-issued ID. Banks will verify this information before releasing the funds.</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className={labelClass}>First Name</p>
                  <div className={innerCard}>
                    <span className="text-white font-bold text-lg">{recipient.firstName}</span>
                    <button onClick={() => copyText("fname", recipient.firstName)} className="text-blue-400 font-bold text-xs">
                      {copied === "fname" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className={labelClass}>Last Name</p>
                  <div className={innerCard}>
                    <span className="text-white font-bold text-lg">{recipient.lastName}</span>
                    <button onClick={() => copyText("lname", recipient.lastName)} className="text-blue-400 font-bold text-xs">
                      {copied === "lname" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

{/* Step 7: Notification */}
{step === 7 && (
  <div className="space-y-5 animate-in fade-in slide-in-from-right-4">
    <p className={descClass}>
      Adding a mobile number allows Remitly to send an automated SMS alert. 
      Since Remitly already prefills the country code, you only need to copy the mobile number below.
    </p>
    
    <div className="space-y-2">
      <p className={labelClass}>Recipient Mobile Number</p>
      <div className={`${innerCard} py-6`}>
        <div className="flex items-center gap-4 flex-1">
          {/* Static Country Code Section (Non-copyable) */}
          <div className="flex items-center gap-2 pr-4 border-r border-white/10 select-none opacity-60">
            <span className="text-xl">🇰🇪</span>
            <span className="text-white font-bold text-lg">{recipient.countryCode}</span>
          </div>
          
          {/* Mobile Number Section (The part they need) */}
          <div className="flex-1">
            <span className="text-white font-bold text-lg tracking-wider">
              {recipient.mobileNumber}
            </span>
          </div>
        </div>

        {/* Action Button - Copies only the number part */}
        <button 
          onClick={() => copyText("phone", recipient.mobileNumber)} 
          className="text-blue-400 font-black text-sm px-3 py-2.5 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-all active:scale-95"
        >
          {copied === "phone" ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="text-[10px] text-slate-600 italic px-1 flex items-center gap-1.5 mt-2">
        <Info size={10} /> Note: This copies the number without the {recipient.countryCode} prefix.
      </p>
    </div>
  </div>
)}

          {/* Step 8: Sender Info */}
          {step === 8 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="p-8 rounded-[2rem] bg-blue-600/10 border border-blue-500/20 text-center space-y-6">
                <div className="h-16 w-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
                  <User size={32} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">Funding Source</h3>
                  <p className="text-blue-200 text-sm leading-relaxed max-w-sm mx-auto">
                    In the official Remitly app, you will now be asked to link your debit card or bank account. This is the source where the funds will be debited from.
                  </p>
                  <div className="inline-flex items-center gap-2 text-[10px] text-blue-400 font-bold uppercase tracking-widest pt-2">
                    <Info size={12}/> Follow Remitly prompts to finish
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 9: Finish */}
          {step === 9 && (
            <div className="space-y-8 animate-in fade-in zoom-in text-center">
              <div className="h-24 w-24 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 size={56} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">Transfer Initiated</h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">The simulation is complete. In a real scenario, you would now receive a confirmation email from Remitly.</p>
              </div>
              <div className="text-left space-y-3 bg-white/5 p-6 rounded-3xl border border-white/10">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest border-b border-white/5 pb-2 mb-2">
                    <span className="text-slate-500">Receipt Summary</span>
                </div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">Recipient:</span><span className="text-white">{recipient.firstName} {recipient.lastName}</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">Method:</span><span className="text-white">Bank Deposit</span></div>
                <div className="flex justify-between text-xs pt-2 border-t border-white/5"><span className="text-slate-500">Total:</span><span className="text-emerald-400 font-bold text-lg">${form.amount}.00</span></div>
              </div>
              <button onClick={() => window.location.reload()} className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition">
                Restart Demonstration
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <button type="button" onClick={prev} disabled={step === 0} className="flex items-center gap-2 text-slate-500 hover:text-white disabled:opacity-0 transition font-bold px-4">
            <ArrowLeft size={20} /> Back
          </button>
          {step < steps.length - 1 && (
            <button type="button" onClick={next} className="flex items-center gap-2 bg-blue-600 px-10 py-4 rounded-2xl text-white font-black hover:bg-blue-700 transition">
              Continue <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}