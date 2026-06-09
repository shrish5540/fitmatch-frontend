import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Streak() {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchStreak = async () => {
    try {
      const res = await axios.get(`${API}/api/streak`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStreak(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreak();
  }, []);

  const checkIn = async () => {
    setChecking(true);
    setMessage("");
    try {
      const res = await axios.post(
        `${API}/api/checkin`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Checked in!");
      fetchStreak();
    } catch (err) {
      if (err.response?.status === 400) {
        setMessage(err.response.data?.message || "Already checked in today");
      } else if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Check-in failed. Please try again.");
      }
    } finally {
      setChecking(false);
    }
  };
const buildMonthCalendar = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const checkInDates = new Set(
    (streak?.checkIns || []).map(
      (d) => new Date(d).toDateString()
    )
  );

  const days = [];

  // Empty spaces before first day
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }

  // Month days
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);

    days.push({
      day,
      active: checkInDates.has(date.toDateString()),
      isToday:
        date.toDateString() === today.toDateString(),
    });
  }

  return {
    monthName: today.toLocaleString("default", {
      month: "long",
    }),
    year,
    days,
  };
};
  

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading streak...</p>
      </div>
    );
  }

const calendar = buildMonthCalendar();
  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        
        <span className="text-orange-400 font-bold text-lg">My Streak</span>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-6">
        {/* Stats */}
        <div className="flex gap-4">
          <div
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
            className="flex-1 rounded-2xl p-4 text-center"
          >
            <p className="text-4xl font-bold text-orange-400">
              {streak?.currentStreak || 0}🔥
            </p>
            <p className="text-gray-400 text-sm mt-1">Current Streak</p>
          </div>
          <div
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
            className="flex-1 rounded-2xl p-4 text-center"
          >
            <p className="text-4xl font-bold text-orange-400">
              {streak?.totalCheckIns || 0}
            </p>
            <p className="text-gray-400 text-sm mt-1">Total Check-ins</p>
          </div>
        </div>

        {/* Check In Button */}
        <button
          onClick={checkIn}
          disabled={checking}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl"
        >
          {checking
  ? "Checking in..."
  : message.includes("Already")
  ? "✅ Checked In Today"
  : "✅ Check In Today"}
        </button>

        {message &&
 !message.includes("Already") && (
  <p className="text-center text-sm text-orange-300">
    {message}
  </p>
)}

        {/* 21-day Calendar */}
        {/* Monthly Calendar */}
<div
  style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
  className="rounded-2xl p-4 max-w-5xl mx-auto w-full"
>
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">
      {calendar.monthName} {calendar.year}
    </h3>
  </div>

  <div className="grid grid-cols-7 gap-2 text-center text-gray-400 text-sm mb-3">
    <div>Sun</div>
    <div>Mon</div>
    <div>Tue</div>
    <div>Wed</div>
    <div>Thu</div>
    <div>Fri</div>
    <div>Sat</div>
  </div>

  <div className="grid grid-cols-7 gap-2">
    {calendar.days.map((day, index) =>
      day ? (
        <div
          key={index}
          className={`h-16 rounded-lg flex items-center justify-center text-sm font-semibold border ${
            day.active
              ? "bg-orange-500 text-white border-orange-500"
              : day.isToday
              ? "border-orange-500 text-orange-400"
              : "bg-gray-800 text-gray-400 border-gray-700"
          }`}
        >
          {day.day}
        </div>
      ) : (
        <div key={index}></div>
      )
    )}
  </div>
</div>
      </div>
    </div>
  );
}