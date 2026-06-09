import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import socket from "../socket";

const API = import.meta.env.VITE_API_URL;

export default function Chat() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [otherUser, setOtherUser] = useState(null);
  const bottomRef = useRef(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const getSenderId = (msg) =>
    String(msg.senderId?._id ?? msg.senderId ?? "");

  useEffect(() => {
  axios
    .get(`${API}/api/chat/${matchId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setMessages(res.data.messages || []);
      setOtherUser(res.data.otherUser || null);
    })
    .catch(console.error);

  socket.connect();
  socket.emit("joinRoom", matchId);

  socket.on("receiveMessage", (msg) => {
    setMessages((prev) => [...prev, msg]);
  });

  return () => {
    socket.emit("leaveRoom", matchId);
    socket.off("receiveMessage");
    socket.disconnect();
  };
}, [matchId, token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim() || !userId) return;
    socket.emit("sendMessage", {
      matchId,
      senderId: userId,
      text: text.trim(),
    });
    setText("");
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const d = new Date(timestamp);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <button
          onClick={() => navigate("/matches")}
          className="text-orange-400 text-sm font-semibold"
        >
          ← Back
        </button>
        <span className="text-orange-400 font-bold text-lg">Chat</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-10">
            No messages yet. Say hi! 👋
          </p>
        )}
        {messages.map((msg, i) => {
          const isMine = getSenderId(msg) === String(userId);
          return (
            <div
  key={msg._id || i}
  className={`flex flex-col max-w-md ${
    isMine ? "self-end items-end" : "self-start items-start"
  }`}
>
  <div
    className={`px-5 py-3 rounded-3xl text-base shadow-md ${
      isMine
        ? "bg-orange-500 text-white"
        : "bg-gray-800 text-gray-200"
    }`}
  >
    {msg.text}
  </div>

  <span className="text-xs text-gray-500 mt-1 px-2">
    {formatTime(msg.createdAt)}
  </span>
</div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 outline-none text-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full text-sm font-semibold"
        >
          Send
        </button>
      </div>

    </div>
  );
}