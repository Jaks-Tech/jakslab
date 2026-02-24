"use client";

import { useState } from "react";
import { UploadCloud, Check, Send } from "lucide-react";

export function OrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [projectType, setProjectType] = useState("");

  if (submitted) {
    return (
      <div className="p-10 sm:p-14 bg-white rounded-3xl border border-slate-200 shadow-2xl text-center">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-8">
          <Check className="w-10 h-10 text-green-600" />
        </div>

        <h3 className="text-3xl font-bold text-slate-900">
          Order Submitted Successfully
        </h3>

        <p className="mt-4 text-slate-700 max-w-md mx-auto">
          Thank you for your request. Our team will carefully review your
          requirements and get back to you shortly with a detailed quote.
        </p>

        <button
          onClick={() => {
            setSubmitted(false);
            setProjectType("");
          }}
          className="mt-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white rounded-full font-semibold shadow-lg 
                     hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-12 bg-white rounded-3xl border border-slate-200 shadow-2xl">

      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-slate-700">
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
        {/* LEFT COLUMN */}
        <div className="space-y-10">

          {/* Personal Information */}
          <div>
            <h3 className="text-center font-semibold text-slate-900 mb-6 text-lg">
              Personal Information
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-5 py-3 rounded-xl border border-slate-300 
                           text-slate-900 
                           placeholder:text-slate-600 placeholder:opacity-100
                           focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-5 py-3 rounded-xl border border-slate-300 
                           text-slate-900 
                           placeholder:text-slate-600 placeholder:opacity-100
                           focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />

              <input
                type="text"
                placeholder="WhatsApp Number (Optional)"
                className="w-full px-5 py-3 rounded-xl border border-slate-300 
                           text-slate-900 
                           placeholder:text-slate-600 placeholder:opacity-100
                           focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Project Description */}
          <div>
            <h3 className="text-center font-semibold text-slate-900 mb-6 text-lg">
              Project Description
            </h3>

            <textarea
              placeholder="Describe your project requirements..."
              rows={6}
              required
              className="w-full px-5 py-3 rounded-xl border border-slate-300 
                         text-slate-900 
                         placeholder:text-slate-600 placeholder:opacity-100
                         focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-10">

          {/* Project Details */}
          <div>
            <h3 className="text-center font-semibold text-slate-900 mb-6 text-lg">
              Project Details
            </h3>

            <div className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Project Type
                </label>

                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  required
                  className="w-full px-5 py-3 rounded-xl border border-slate-300 
                             text-slate-900
                             focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                >
                  <option value="">Select Project Type</option>
                  <option>Essay Writing</option>
                  <option>Research Papers</option>
                  <option>Thesis / Dissertation</option>
                  <option>Machine Learning</option>
                  <option>Model Training</option>
                  <option>Web Development</option>
                  <option>Programming Assignment</option>
                  <option>Custom Project</option>
                </select>
              </div>

              {projectType === "Custom Project" && (
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Specify Project Type
                  </label>

                  <input
                    type="text"
                    placeholder="Describe your custom project..."
                    required
                    className="w-full px-5 py-3 rounded-xl border border-blue-400 
                               bg-blue-50 text-slate-900 
                               placeholder:text-slate-600 placeholder:opacity-100
                               focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Project Deadline
                </label>

                <input
                  type="date"
                  required
                  className="w-full px-5 py-3 rounded-xl border border-slate-300 
                             text-slate-900
                             focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />

                <p className="mt-1 text-xs text-slate-500">
                  Select your preferred submission date.
                </p>
              </div>

            </div>
          </div>

          {/* File Upload */}
          <div>
            <h3 className="text-center font-semibold text-slate-900 mb-6 text-lg">
              File Upload
            </h3>

            <label className="block border-2 border-dashed border-slate-300 
                              rounded-2xl p-10 text-center bg-slate-50 
                              hover:bg-slate-100 hover:border-blue-400 
                              transition cursor-pointer">
              <UploadCloud className="mx-auto mb-4 text-slate-600" />
              <p className="text-slate-800 font-medium">
                Click to upload or drag & drop
              </p>
              <p className="text-sm text-slate-600 mt-2">
                Maximum file size 20MB
              </p>
              <input type="file" className="hidden" />
            </label>
          </div>

        </div>

        {/* FULL WIDTH SUBMIT */}
        <div className="lg:col-span-2 pt-6">
          <button
            type="submit"
            className="w-full py-5 rounded-2xl 
                       bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white font-semibold text-lg
                       shadow-lg hover:shadow-2xl 
                       hover:-translate-y-1 active:translate-y-0
                       transition-all duration-300
                       inline-flex items-center justify-center gap-3"
          >
            <Send className="w-5 h-5" />
            Submit Request
          </button>

          <p className="text-sm text-slate-600 mt-5 text-center">
            By submitting, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

      </form>
    </div>
  );
}