"use client";

import { UploadCloud, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type FileUploadProps = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  setPreviewOpen: Dispatch<SetStateAction<boolean>>;
  previewableCount: number;
};

export default function FileUpload({
  files,
  setFiles,
  setPreviewOpen,
  previewableCount,
}: FileUploadProps) {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);

    // append new files instead of replacing
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section>
      <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/5 pb-2">
        File Upload
      </h3>

      <label className="group block border-2 border-dashed border-white/10 rounded-2xl p-10 text-center bg-white/5 hover:border-blue-500/40 transition-all cursor-pointer backdrop-blur-md">

        <UploadCloud className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />

        <p className="text-white font-medium">
          Click to upload or drag & drop
        </p>

        <p className="text-sm text-slate-500 mt-2">
          PDF, DOCX, Images, ZIP (Max 20MB each)
        </p>

        {/* Selected files */}
        {files.length > 0 && (
          <div className="mt-6 space-y-2 text-left max-w-md mx-auto">

            <p className="text-sm text-slate-400">
              Selected files: <span className="text-white">{files.length}</span>
            </p>

            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
              >
                <span className="truncate text-slate-300">
                  {file.name}
                </span>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {/* Preview button */}
            {previewableCount > 0 && (
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="mt-3 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm"
              >
                Preview Files ({previewableCount})
              </button>
            )}
          </div>
        )}

        <input
          type="file"
          multiple
          accept=".pdf,.docx,.png,.jpg,.jpeg,.webp,.gif,.zip"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </section>
  );
}