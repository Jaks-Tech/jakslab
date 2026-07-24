"use client";

import { Download } from "lucide-react";

interface DownloadButtonProps {
  url: string;
  projectTitle: string;
  originalFileName?: string;
}

export default function DownloadButton({ url, projectTitle, originalFileName }: DownloadButtonProps) {
  const handleDownload = async () => {
    try {
      // Priority: Original FileName > Project Title > Fallback
      const cleanName = originalFileName || 
        `${projectTitle.replace(/\s+/g, '_').toLowerCase()}_file`;

      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = cleanName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(url, "_blank");
    }
  };

  return (
    <button 
      onClick={handleDownload}
      className="rounded-md border border-slate-300 p-2 text-slate-700 transition-colors hover:bg-slate-100"
      title="Download file"
    >
      <Download size={16} />
    </button>
  );
}
