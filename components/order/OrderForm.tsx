"use client";

import { useState } from "react";
import { UploadCloud, Check, Send } from "lucide-react";

export function OrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [projectType, setProjectType] = useState("");

  if (submitted) {
    return (
      <div className="relative p-10 sm:p-14 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] text-center hover:border-blue-500/40 transition-all duration-500">
        
        <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
          <div className="w-[500px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full" />
        </div>

        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
          <Check className="w-10 h-10 text-white" />
        </div>

        <h3 className="text-3xl font-bold text-white">
          Order Submitted Successfully
        </h3>

        <p className="mt-4 text-slate-400 max-w-md mx-auto">
          Thank you for your request. Our team will carefully review your
          requirements and get back to you shortly with a detailed quote.
        </p>

        <button
          onClick={() => {
            setSubmitted(false);
            setProjectType("");
          }}
          className="mt-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white rounded-full font-semibold 
                     hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]
                     transition-all duration-300"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  const inputClasses =
    "w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/40 transition backdrop-blur-md";

  return (
    <div className="relative p-6 sm:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500">

      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <div className="w-[700px] h-[700px] bg-blue-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="mb-12 text-center">
        <p className="text-slate-400">
          Provide the details below and we’ll respond with a tailored quote.
        </p>
      </div>

      <form
        className="grid lg:grid-cols-2 gap-12"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        {/* LEFT */}
        <div className="space-y-10">
          <div>
            <h3 className="text-center font-semibold text-white mb-6 text-lg">
              Personal Information
            </h3>

            <div className="space-y-4">
              <input type="text" placeholder="Full Name" required className={inputClasses} />
              <input type="email" placeholder="Email Address" required className={inputClasses} />
              <input type="text" placeholder="WhatsApp Number (Optional)" className={inputClasses} />
            </div>
          </div>

          <div>
            <h3 className="text-center font-semibold text-white mb-6 text-lg">
              Project Description
            </h3>

            <textarea
              placeholder="Describe your project requirements..."
              rows={6}
              required
              className={inputClasses}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-10">
          <div>
            <h3 className="text-center font-semibold text-white mb-6 text-lg">
              Project Details
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Project Type
                </label>

                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  required
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900 text-white">Select Project Type</option>
                  <option className="bg-slate-900 text-white">Essay Writing</option>
                  <option className="bg-slate-900 text-white">Research Papers</option>
                  <option className="bg-slate-900 text-white">Thesis / Dissertation</option>
                  <option className="bg-slate-900 text-white">Machine Learning</option>
                  <option className="bg-slate-900 text-white">Model Training</option>
                  <option className="bg-slate-900 text-white">Web Development</option>
                  <option className="bg-slate-900 text-white">Programming Assignment</option>
                  <option className="bg-slate-900 text-white">Custom Project</option>
                </select>
              </div>

              {projectType === "Custom Project" && (
                <input
                  type="text"
                  placeholder="Describe your custom project..."
                  required
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-blue-500/40 text-white placeholder:text-slate-500 focus:outline-none transition"
                />
              )}

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Project Deadline
                </label>

                <input type="date" required className={inputClasses} />

                <p className="mt-1 text-xs text-slate-500">
                  Select your preferred submission date.
                </p>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <h3 className="text-center font-semibold text-white mb-6 text-lg">
              File Upload
            </h3>

            <label className="block border-2 border-dashed border-white/10 rounded-2xl p-10 text-center bg-white/5 hover:border-blue-500/40 transition cursor-pointer backdrop-blur-md">
              <UploadCloud className="mx-auto mb-4 text-blue-400" />
              <p className="text-white font-medium">
                Click to upload or drag & drop
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Maximum file size 20MB
              </p>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="lg:col-span-2 pt-6">
          <button
            type="submit"
            className="w-full py-5 rounded-2xl 
                       bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white font-semibold text-lg
                       hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]
                       transition-all duration-300
                       inline-flex items-center justify-center gap-3"
          >
            <Send className="w-5 h-5" />
            Submit Request
          </button>

          <p className="text-sm text-slate-500 mt-5 text-center">
            By submitting, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </form>
    </div>
  );
}