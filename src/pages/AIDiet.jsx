import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function AIDiet() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const generatePlan = async () => {
    setLoading(true);
    setError("");
    setPlan(null);
    try {
      const res = await axios.get(`${API}/api/ai/diet`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data.dietPlan);
      setPlan(res.data.dietPlan);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <button
          onClick={() => navigate("/ai-hub")}
          className="text-orange-400 text-sm font-semibold"
        >
          ← Back
        </button>
        <span className="text-orange-400 font-bold text-lg">AI Diet Plan</span>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4">
        <p className="text-gray-400 text-sm">
          Get a personalized nutrition plan based on your fitness profile.
        </p>

        <button
          onClick={generatePlan}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl"
        >
          {loading ? "Generating..." : "Generate My Diet Plan"}
        </button>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {plan && (
        <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

  <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4">
    <p className="text-gray-400 text-sm">
      Daily Calories
    </p>

    <h3 className="text-2xl font-bold text-white mt-1">
      {plan.dailyCalories} kcal
    </h3>
  </div>

  <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4">
    <p className="text-gray-400 text-sm">
      Protein Target
    </p>

    <h3 className="text-2xl font-bold text-white mt-1">
      {plan.proteinTarget}
    </h3>
  </div>

  <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4">
    <p className="text-gray-400 text-sm">
      Goal
    </p>

    <h3 className="text-2xl font-bold text-white mt-1">
      {plan.goal}
    </h3>
  </div>

</div> 
  <div className="grid md:grid-cols-2 gap-4">
    
    <div
      style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
      className="rounded-2xl p-4"
    >
      <h3 className="text-lg font-bold text-white mb-3">
      🍳Breakfast

      </h3>

      <ul className="text-gray-200 space-y-2">
        {plan.breakfast?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    <div
      style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
      className="rounded-2xl p-4"
    >
      <h3 className="text-lg font-bold text-white mb-3">
        🍛Lunch

      </h3>

      <ul className="list-disc ml-5 text-gray-200 space-y-1">
        {plan.lunch?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    <div
      style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
      className="rounded-2xl p-4"
    >
      <h3 className="text-lg font-bold text-white mb-3">
        🥜Snacks

      </h3>

      <ul className="list-disc ml-5 text-gray-200 space-y-1">
        {plan.snacks?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    <div
      style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
      className="rounded-2xl p-4"
    >
      <h3 className="text-lg font-bold text-white mb-3">
        🍽️Dinner
      </h3>

      <ul className="list-disc ml-5 text-gray-200 space-y-1">
        {plan.dinner?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

  </div>
  </>
)}
      </div>
    </div>
  );
}