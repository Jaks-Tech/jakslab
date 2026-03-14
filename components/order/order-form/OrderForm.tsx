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
        onReset={resetForm}
      />
    );
  }

  return (
    <form className="grid lg:grid-cols-2 gap-12" onSubmit={handleSubmit}>
      {/* LEFT COLUMN */}
      <div className="space-y-10">
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
      <div className="space-y-10">
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
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 disabled:opacity-60"
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