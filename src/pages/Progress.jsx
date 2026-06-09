import { useState } from "react";
import Streak from "./Streak";
import Leaderboard from "./Leaderboard";

export default function Progress() {
  const [activeTab, setActiveTab] = useState("streak");

  return (
    <div className="min-h-screen bg-[#111111] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Progress Dashboard</h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("streak")}
          className={`px-5 py-2 rounded-lg ${
            activeTab === "streak"
              ? "bg-orange-500"
              : "bg-gray-800"
          }`}
        >
          🔥 Streaks
        </button>

        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`px-5 py-2 rounded-lg ${
            activeTab === "leaderboard"
              ? "bg-orange-500"
              : "bg-gray-800"
          }`}
        >
          🏆 Leaderboard
        </button>
      </div>

      {activeTab === "streak" && <Streak />}
      {activeTab === "leaderboard" && <Leaderboard />}
    </div>
  );
}