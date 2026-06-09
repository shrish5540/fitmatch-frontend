import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function AIWorkout() {
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
      const res = await axios.get(`${API}/api/ai/workout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.workoutPlan);
      setPlan(res.data.workoutPlan);
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
        <span className="text-orange-400 font-bold text-lg">AI Workout Plan</span>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4">
        <p className="text-gray-400 text-sm">
          Get a personalized workout plan based on your fitness profile.
        </p>

        <button
          onClick={generatePlan}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl"
        >
          {loading
  ? "Creating your personalized workout split..."
  : "Generate My Workout Plan"}
        </button>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {!plan && !loading && !error && (
  <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 text-center">
    <div className="text-4xl mb-3">💪</div>

    <h3 className="font-bold text-lg">
      Ready to train?
    </h3>

    <p className="text-gray-400 mt-2">
      Generate a personalized workout plan based on your profile.
    </p>
  </div>
)}
       {plan && (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white">
      {plan.title}
    </h2>

    {plan.days?.map((day, index) => (
      <div
        key={index}
        style={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #2a2a2a",
        }}
        className="rounded-2xl p-5 text-gray-200 transition-all hover:border-orange-500/30"
      >
        <div className="mb-3">
  <p className="text-xs uppercase tracking-wider text-gray-500">
    Day {index + 1}
  </p>

  <h3 className="text-xl font-bold">
    {day.day}
  </h3>
</div>
        <div className="mb-2">
  <span className="inline-block bg-orange-500/15 border border-orange-500/30 text-orange-300 px-3 py-1 rounded-full text-sm">
    🔥 {day.focus}
  </span>
</div>

<p className="text-gray-500 text-sm mb-3">
  {day.exercises.length} Exercises
</p>


        <ul className="space-y-2">
  {day.exercises.map((exercise, i) => (
    <li key={i}>
  {exercise}
</li>
  ))}
</ul>
      </div>
    ))}
  </div>
)}
        
      </div>
    </div>
  );
}