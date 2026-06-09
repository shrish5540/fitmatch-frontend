import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Leaderboard() {
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`${API}/api/leaderboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLeaders(res.data.leaderboard || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const medal = (rank) => {
    if (rank === 0) return "🥇";
    if (rank === 1) return "🥈";
    if (rank === 2) return "🥉";
    return `#${rank + 1}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        
        <span className="text-orange-400 font-bold text-lg">Leaderboard</span>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3">
        {leaders.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-10">
            No data yet. Start checking in!
          </p>
        )}
        {leaders.map((user, i) => {
          const isMe = user._id === userId;
          return (
            <div
              key={user._id}
              style={{
                backgroundColor: isMe ? "#2a1a0a" : "#1a1a1a",
                border: `1px solid ${isMe ? "#f97316" : "#2a2a2a"}`,
              }}
              className="rounded-2xl p-4 flex items-center gap-4"
            >
              {/* Rank */}
              <span className="text-xl w-8 text-center">{medal(i)}</span>

              {/* Avatar */}
              {user.profileImage ? (
  <img
    src={user.profileImage}
    alt={user.name}
    className="w-11 h-11 rounded-full object-cover flex-shrink-0"
  />
) : (
  <div
    style={{
      backgroundColor: "#f97316",
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      flexShrink: 0,
    }}
    className="flex items-center justify-center"
  >
    <span className="text-white font-bold">
      {user.name?.charAt(0).toUpperCase()}
    </span>
  </div>
)}

              {/* Name */}
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  {user.name} {isMe && <span className="text-orange-400">(You)</span>}
                </p>
                <p className="text-gray-400 text-xs">{user.streak} day streak</p>
              </div>

              {/* Score */}
              <span className="text-orange-400 font-bold text-lg">
                {user.streak}🔥
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}