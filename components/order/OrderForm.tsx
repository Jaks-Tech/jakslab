"use client";

import { useState } from "react";
import { UploadCloud, Check, Send, ChevronDown } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Shared classes to keep the code DRY
const inputClasses =
  "w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/40 transition backdrop-blur-md";

const labelClasses = "block text-sm text-slate-400 mb-2 font-medium";

export function OrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [platform, setPlatform] = useState("WhatsApp");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle logic here
    console.log({ projectType, platform, phone });
  };

  const resetForm = () => {
    setSubmitted(false);
    setProjectType("");
    setPhone("");
  };

  if (submitted) return <SuccessState onReset={resetForm} />;

  return (
    <div className="relative p-6 sm:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500 max-w-6xl mx-auto">
      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <div className="w-[700px] h-[700px] bg-blue-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Place Your Order</h2>
        <p className="text-slate-400">
          Provide the details below and we’ll respond with a tailored quote.
        </p>
      </div>

      <form className="grid lg:grid-cols-2 gap-12" onSubmit={handleSubmit}>
        
        {/* --- LEFT COLUMN: Personal & Description --- */}
        <div className="space-y-10">
          <section>
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/5 pb-2">
              Personal Information
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" required className={inputClasses} />
                <input type="email" placeholder="Email Address" required className={inputClasses} />
              </div>

              <div>
                <label className={labelClasses}>Contact Method</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-1/3">
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className={`${inputClasses} appearance-none cursor-pointer`}
                    >
                      <option className="bg-slate-900">WhatsApp</option>
                      <option className="bg-slate-900">Telegram</option>
                      <option className="bg-slate-900">Signal</option>
                      <option className="bg-slate-900">WeChat</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                  
                  <div className="flex-1">
                    <PhoneInput
                      country={"us"}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      enableSearch
                      containerClass="!w-full"
                      inputClass="!w-full !bg-white/5 !text-white !border-white/10 !rounded-xl !h-[48px] focus:!border-blue-500/50"
                      buttonClass="!bg-transparent !border-white/10 !rounded-l-xl hover:!bg-white/10"
                      dropdownClass="!bg-slate-800 !text-white"
                      searchClass="!bg-slate-700 !text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/5 pb-2">
              Project Description
            </h3>
            <textarea
              placeholder="Describe your project requirements, goals, and specific instructions..."
              rows={6}
              required
              className={inputClasses}
            />
          </section>
        </div>

        {/* --- RIGHT COLUMN: Project Details & Files --- */}
        <div className="space-y-10">
          <section>
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/5 pb-2">
              Project Details
            </h3>
            <div className="space-y-6">
              <div>
                <label className={labelClasses}>Project Type</label>
                <div className="relative">
                    <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        required
                        className={`${inputClasses} appearance-none cursor-pointer`}
                    >
                        <option value="" className="bg-slate-900">Select Type</option>
                        <option className="bg-slate-900">Essay Writing</option>
                        <option className="bg-slate-900">Research Papers</option>
                        <option className="bg-slate-900">Thesis / Dissertation</option>
                        <option className="bg-slate-900">Machine Learning</option>
                        <option className="bg-slate-900">Web Development</option>
                        <option className="bg-slate-900">Custom Project</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {projectType === "Custom Project" && (
                <input
                  type="text"
                  placeholder="What kind of project is it?"
                  required
                  className={`${inputClasses} border-blue-500/30 animate-in fade-in slide-in-from-top-2`}
                />
              )}

              <div>
                <label className={labelClasses}>Project Deadline</label>
                <input type="date" required className={inputClasses} />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/5 pb-2">
              File Upload
            </h3>
            <label className="group block border-2 border-dashed border-white/10 rounded-2xl p-10 text-center bg-white/5 hover:border-blue-500/40 transition-all cursor-pointer backdrop-blur-md">
              <UploadCloud className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-white font-medium">Click to upload or drag & drop</p>
              <p className="text-sm text-slate-500 mt-2">PDF, DOCX, ZIP (Max 20MB)</p>
              <input type="file" className="hidden" />
            </label>
          </section>
        </div>

        {/* --- FULL WIDTH SUBMIT --- */}
        <div className="lg:col-span-2 pt-6 border-t border-white/5">
          <button
            type="submit"
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <Send className="w-5 h-5" />
            Submit Request
          </button>
          <p className="text-sm text-slate-500 mt-5 text-center">
            By submitting, you agree to our <span className="text-blue-400 cursor-pointer">Terms of Service</span>.
          </p>
        </div>
      </form>
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative p-10 sm:p-14 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-center animate-in zoom-in duration-500">
      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
        <Check className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-3xl font-bold text-white">Order Submitted!</h3>
      <p className="mt-4 text-slate-400 max-w-md mx-auto">
        Thank you for your request. Our team will review your requirements and contact you shortly.
      </p>
      <button
        onClick={onReset}
        className="mt-10 px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
      >
        Submit Another Request
      </button>
    </div>
  );
}