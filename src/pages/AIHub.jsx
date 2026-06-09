import { useNavigate } from "react-router-dom";

export default function AIHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">💪 AI Hub</h1>

        <p className="text-gray-400 mb-10">
          Your personal fitness assistant
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <div
            onClick={() => navigate("/ai-workout")}
            className="cursor-pointer bg-[#1a1a1a] border border-[#2a2a2a]
                       rounded-3xl p-6 hover:border-orange-500 transition-all"
          >
            <div className="text-5xl mb-4">🏋️</div>

            <h2 className="text-xl font-bold mb-2">
              Workout Plan
            </h2>

            <p className="text-gray-400">
              Personalized workouts based on your profile.
            </p>
          </div>

          <div
            onClick={() => navigate("/ai-diet")}
            className="cursor-pointer bg-[#1a1a1a] border border-[#2a2a2a]
                       rounded-3xl p-6 hover:border-orange-500 transition-all"
          >
            <div className="text-5xl mb-4">🥗</div>

            <h2 className="text-xl font-bold mb-2">
              Diet Plan
            </h2>

            <p className="text-gray-400">
              Nutrition guidance tailored to your goal.
            </p>
          </div>

          <div
            onClick={() => navigate("/ai-coach")}
            className="cursor-pointer bg-[#1a1a1a] border border-[#2a2a2a]
                       rounded-3xl p-6 hover:border-orange-500 transition-all"
          >
            <div className="text-5xl mb-4">🤖</div>

            <h2 className="text-xl font-bold mb-2">
              AI Coach
            </h2>

            <p className="text-gray-400">
              Ask fitness questions anytime.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}