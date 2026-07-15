"use client";

import { useState } from "react";

type AIAnalyzeButtonProps = {
  description: string;
  onAnalysisReceived: (val: string) => void;
};

export default function AIAnalyzeButton({
  description,
  onAnalysisReceived,
}: AIAnalyzeButtonProps) {
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

      if (!response.ok)
        throw new Error("API Route not found (404) or Server Error");

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
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleAnalyze}
        disabled={loading}
        className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analyzing...
          </span>
        ) : (
          "Improve this brief"
        )}
      </button>

      <p className="text-xs text-white/50 max-w-sm">
        Optional: turn your notes into a clearer project brief before submitting.
      </p>
    </div>
  );
}
