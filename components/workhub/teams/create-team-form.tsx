"use client";

import { useState } from "react";

export default function CreateTeamForm() {
  const [teamName, setTeamName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [newTeamId, setNewTeamId] = useState("");

  const handleSubmit = async () => {
    if (!teamName.trim() || !creatorName.trim()) {
      alert("Both Team Name and Creator Name are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/workhub/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: teamName,
          created_by: creatorName,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.error?.message || data.error || "Something went wrong");
        return;
      }

      // Success logic: Store the ID and show the popup
      setNewTeamId(data.team.id);
      setShowModal(true);
      
      // Clear inputs
      setTeamName("");
      setCreatorName("");
    } catch (err) {
      setLoading(false);
      alert("Failed to connect to the server.");
    }
  };

  const closeAndRefresh = () => {
    setShowModal(false);
    // Standard reload to update the team list in the background
    location.reload();
  };

  return (
    <div className="border rounded-lg p-4 space-y-3 relative">
      <h2 className="font-semibold text-lg">Create a New Team</h2>

      <div className="space-y-2">
        <input
          className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
          placeholder="Team Name (e.g., Marketing)"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
          placeholder="Your Name (e.g., Jane Doe)"
          value={creatorName}
          onChange={(e) => setCreatorName(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 w-full hover:bg-blue-700 transition-colors"
      >
        {loading ? "Creating..." : "Create Team"}
      </button>

      {/* CUSTOM POPUP MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm w-full shadow-2xl border dark:border-gray-800 animate-in fade-in zoom-in duration-200">
            <div className="text-center space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-green-600 dark:text-green-300 text-2xl">✓</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Team Created!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your team has been successfully branded with ID:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono text-blue-600 dark:text-blue-400 font-bold">
                  {newTeamId}
                </div>
              </div>

              <button
                onClick={closeAndRefresh}
                className="w-full py-2 bg-gray-900 dark:bg-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Close & Refresh List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}