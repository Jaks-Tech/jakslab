"use client";

import { useState } from "react";

type AIAnalyzeButtonProps = {
  description: string;
  onAnalysisReceived: (val: string) => void;
};

export default function AIAnalyzeButton({ description, onAnalysisReceived }: AIAnalyzeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!description || description.trim().length < 10) {
      alert("Please enter a bit more detail first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) throw new Error("API Route not found (404) or Server Error");

      const data = await response.json();
      if (data.analysis) {
        onAnalysisReceived(data.analysis);
      }
    } catch (error) {
      console.error("AI Analysis failed:", error);
      alert("Analysis failed. Check if /api/analyze/route.ts exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAnalyze}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-md transition-all text-sm font-medium shadow-lg active:scale-95"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Analyzing...
        </span>
      ) : (
        "Refine with AI"
      )}
    </button>
  );
}