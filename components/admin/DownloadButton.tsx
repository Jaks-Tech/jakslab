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
      className="p-2 hover:bg-blue-600/20 text-slate-500 hover:text-blue-400 rounded-lg transition-colors"
      title="Download with project name"
    >
      <Download size={16} />
    </button>
  );
}