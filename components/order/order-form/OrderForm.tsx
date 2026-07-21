"use client";

import { useState, useMemo } from "react";

import PersonalInfo from "./PersonalInfo";
import ProjectDescription from "./ProjectDescription";
import ProjectDetails from "./ProjectDetails";
import FileUpload from "./FileUpload";
import { FilePreviewModal } from "./FilePreviewModal";
import SuccessState from "./SuccessState";

import { getKind } from "./fileUtils";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  full_name: string;
  email: string;
  contact_method: string;
  phone: string;
  project_type: string;
  custom_project?: string;
  deadline: string;
  description: string;
};

type OrderFormProps = {
  order?: Order;
};

export default function OrderForm({ order }: OrderFormProps) {
  const isEdit = !!order;

  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(order?.id ?? null);
  const [portalUrl, setPortalUrl] = useState<string | null>(null);

  // form fields
  const [fullName, setFullName] = useState(order?.full_name || "");
  const [email, setEmail] = useState(order?.email || "");
  const [platform, setPlatform] = useState(order?.contact_method || "WhatsApp");
  const [phone, setPhone] = useState(order?.phone || "");

  const [projectType, setProjectType] = useState(order?.project_type || "");
  const [customProject, setCustomProject] = useState(order?.custom_project || "");

  const [deadline, setDeadline] = useState(order?.deadline || "");
  const [description, setDescription] = useState(order?.description || "");

  // files
  const [files, setFiles] = useState<File[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);

  // UI
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const previewableCount = useMemo(
    () => files.filter((f) => getKind(f) !== "unsupported").length,
    [files]
  );

  /**
   * Upload files to Supabase Storage
   */
  const uploadFiles = async () => {
    const attachments: {
      filePath: string;
      fileUrl: string;
      fileName: string;
      fileType: string;
      fileSize: number;
    }[] = [];

    const maxBytes = 20 * 1024 * 1024;

    for (const file of files) {
      if (file.size > maxBytes) {
        throw new Error(`File too large: ${file.name}`);
      }

      const safeName = file.name.replace(/\s+/g, "_");
      const filePath = `orders/${crypto.randomUUID()}-${safeName}`;

      const { error } = await supabase.storage
        .from("order-files")
        .upload(filePath, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from("order-files")
        .getPublicUrl(filePath);

      attachments.push({
        filePath,
        fileUrl: data.publicUrl,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });
    }

    return attachments;
  };

  /**
   * Submit handler
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg(null);

    try {
      const attachments = await uploadFiles();

      /**
       * EDIT ORDER
       */
        if (isEdit && order) {
          const res = await fetch(`/api/orders/${order.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullName,
              email,
              contactMethod: platform,
              phone,
              projectType,
              customProject:
                projectType === "Custom Project" ? customProject : null,
              deadline,
              description,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data?.error || "Update failed");
          }

          setOrderId(order.id);
          setSubmitted(true);
          return;
        }

      /**
       * CREATE ORDER (via API)
       */
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          contactMethod: platform,
          phone,
          projectType,
          customProject:
            projectType === "Custom Project" ? customProject : "",
          deadline,
          description,
          attachments,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      setOrderId(data.orderId);
      setPortalUrl(data.portalUrl || null);
      setSubmitted(true);

    } catch (err: any) {
      setErrorMsg(err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset form
   */
  const resetForm = () => {
    setSubmitted(false);
    setOrderId(null);
    setPortalUrl(null);

    setFullName("");
    setEmail("");
    setPlatform("WhatsApp");
    setPhone("");

    setProjectType("");
    setCustomProject("");

    setDeadline("");
    setDescription("");

    setFiles([]);
    setErrorMsg(null);
    setLoading(false);
  };

  if (submitted) {
    return (
      <SuccessState
        orderId={orderId ?? undefined}
        portalUrl={portalUrl ?? undefined}
        onReset={resetForm}
      />
    );
  }

  return (
    <form className="grid gap-5 lg:grid-cols-2 lg:gap-6 [perspective:1400px]" onSubmit={handleSubmit}>
      {/* LEFT COLUMN */}
      <div className="order-form-card space-y-9 rounded-2xl border border-white/10 bg-[#07101f]/55 p-5 shadow-[0_24px_70px_rgba(0,0,0,.28)] backdrop-blur-xl sm:p-8">
        <PersonalInfo
          fullName={fullName}
          setFullName={setFullName}
          email={email}
          setEmail={setEmail}
          platform={platform}
          setPlatform={setPlatform}
          phone={phone}
          setPhone={setPhone}
        />

        <ProjectDescription
          description={description}
          setDescription={setDescription}
        />
      </div>

      {/* RIGHT COLUMN */}
      <div className="order-form-card space-y-9 rounded-2xl border border-white/10 bg-[#07101f]/55 p-5 shadow-[0_24px_70px_rgba(0,0,0,.28)] backdrop-blur-xl sm:p-8">
        <ProjectDetails
          projectType={projectType}
          setProjectType={setProjectType}
          customProject={customProject}
          setCustomProject={setCustomProject}
          deadline={deadline}
          setDeadline={setDeadline}
        />

        <FileUpload
          files={files}
          setFiles={setFiles}
          previewableCount={previewableCount}
          setPreviewOpen={setPreviewOpen}
        />
      </div>

      {/* ERROR */}
      {errorMsg && (
        <p className="lg:col-span-2 text-center text-red-400 text-sm">
          {errorMsg}
        </p>
      )}

      {/* SUBMIT */}
      <div className="lg:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-4 text-white font-medium hover:bg-blue-500 transition-colors disabled:opacity-60"
        >
          {loading
            ? "Submitting..."
            : isEdit
            ? "Update Request"
            : "Submit Request"}
        </button>
      </div>

      {/* PREVIEW MODAL */}
      <FilePreviewModal
        files={files}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </form>
  );
}
