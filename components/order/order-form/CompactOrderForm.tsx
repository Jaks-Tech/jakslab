"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Paperclip, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SuccessState from "./SuccessState";
import PersonalInfo from "./PersonalInfo";

const topics = ["Essay Writing", "Research Paper", "Literature Review", "Thesis Writing", "Dissertation", "Case Study", "Term Paper", "Report Writing", "Web Development", "Mobile App Development", "Machine Learning Project", "Data Science Project", "AI / Deep Learning", "Software Engineering", "Database Design", "API Development", "Custom Project"];
const fieldClass = "w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-[15px] text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-slate-700 focus:ring-2 focus:ring-slate-200";

export default function CompactOrderForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState<string>();
  const [portalUrl, setPortalUrl] = useState<string>();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [platform, setPlatform] = useState("WhatsApp");
  const [projectType, setProjectType] = useState("");
  const [customProject, setCustomProject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setLoading(true); setErrorMsg(null);
    try {
      const attachments = [];
      for (const file of files) {
        if (file.size > 20 * 1024 * 1024) throw new Error(`${file.name} is larger than 20MB.`);
        const filePath = `orders/${crypto.randomUUID()}-${file.name.replace(/\s+/g, "_")}`;
        const { error } = await supabase.storage.from("order-files").upload(filePath, file, { contentType: file.type || "application/octet-stream" });
        if (error) throw error;
        const { data } = supabase.storage.from("order-files").getPublicUrl(filePath);
        attachments.push({ filePath, fileUrl: data.publicUrl, fileName: file.name, fileType: file.type, fileSize: file.size });
      }
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fullName, email, contactMethod: platform, phone, projectType, customProject: projectType === "Custom Project" ? customProject : "", deadline, description, attachments }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Something went wrong.");
      setOrderId(data.orderId); setPortalUrl(data.portalUrl); setSubmitted(true);
    } catch (error) { setErrorMsg(error instanceof Error ? error.message : "Please try again."); }
    finally { setLoading(false); }
  };

  const reset = () => {
    setSubmitted(false); setStep(1); setOrderId(undefined); setPortalUrl(undefined); setFullName(""); setEmail(""); setPhone(""); setPlatform("WhatsApp"); setProjectType(""); setCustomProject(""); setDeadline(""); setDescription(""); setFiles([]); setErrorMsg(null);
  };
  if (submitted) return <SuccessState orderId={orderId} portalUrl={portalUrl} onReset={reset} />;

  return (
    <form onSubmit={submit} className="order-form-light">
      {step === 1 ? <div className="space-y-5">
        <div><label className="mb-2 block text-sm font-semibold text-slate-800">Type of work</label><select required aria-label="Choose a topic" value={projectType} onChange={(event) => setProjectType(event.target.value)} className={`${fieldClass} appearance-none`}><option value="">Choose a topic</option>{topics.map((topic) => <option key={topic}>{topic}</option>)}</select></div>
        {projectType === "Custom Project" && <input required value={customProject} onChange={(event) => setCustomProject(event.target.value)} placeholder="Describe your custom project" className={fieldClass} />}
        <div><label className="mb-2 block text-sm font-semibold text-slate-800">Brief and requirements</label><textarea required aria-label="Your question" rows={7} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the expected result, requirements and any relevant context." className={`${fieldClass} resize-none`} /></div>
        <div><label className="mb-2 block text-sm font-semibold text-slate-800">Deadline</label><input required type="date" aria-label="When do you need an answer?" value={deadline} onChange={(event) => setDeadline(event.target.value)} className={fieldClass} /></div>
        {files.map((file, index) => <div key={`${file.name}-${index}`} className="flex items-center justify-between border border-slate-300 px-3 py-2 text-sm text-slate-700"><span className="truncate">{file.name}</span><button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="p-1 text-slate-500 hover:text-red-700"><X size={16} /></button></div>)}
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 hover:border-slate-700"><Paperclip size={18} /> Attach files<input type="file" multiple accept=".pdf,.docx,.png,.jpg,.jpeg,.webp,.gif,.zip" className="hidden" onChange={(event) => setFiles((current) => [...current, ...Array.from(event.target.files ?? [])])} /></label>
          <button type="button" onClick={() => { if (!projectType || !description || !deadline || (projectType === "Custom Project" && !customProject)) { setErrorMsg("Complete the project details before continuing."); return; } setErrorMsg(null); setStep(2); }} className="flex items-center justify-center gap-2 rounded-lg bg-[#202733] px-5 py-3 text-sm font-bold text-[#fff] hover:bg-[#111827] sm:ml-auto">Continue <ArrowRight size={17} /></button>
        </div>
      </div> : <div className="space-y-3 p-1">
        <button type="button" onClick={() => setStep(1)} className="mb-2 rounded-lg border border-slate-300 p-2 text-slate-700 hover:border-slate-700" aria-label="Back"><ArrowLeft size={19} /></button>
        <PersonalInfo fullName={fullName} setFullName={setFullName} email={email} setEmail={setEmail} platform={platform} setPlatform={setPlatform} phone={phone} setPhone={setPhone} />
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-[#202733] py-3.5 text-sm font-bold text-[#fff] hover:bg-[#111827] disabled:opacity-60">{loading ? "Sending..." : "Submit request"}</button>
      </div>}
      {errorMsg && <p className="px-2 pb-1 pt-2 text-sm text-red-700">{errorMsg}</p>}
    </form>
  );
}
