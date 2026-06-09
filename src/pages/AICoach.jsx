import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const API = import.meta.env.VITE_API_URL;

export default function AICoach() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || loading) return;

    const question = text.trim();
    const userMsg = { role: "user", content: question };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setText("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API}/api/ai/ask`,
        { question },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...updatedMessages, { role: "assistant", content: res.data.answer }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: "assistant", content: "Sorry, something went wrong. Try again!" }]);
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
        <span className="text-orange-400 font-bold text-lg">AI Coach</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">

        {messages.length === 0 && (
  <div className="bg-[#18243d] text-gray-200 rounded-3xl p-5 max-w-md">
    <h3 className="font-semibold mb-3">
      🤖 AI Fitness Coach
    </h3>

    <p className="text-sm text-gray-300">
      Ask me anything about:
    </p>

    <ul className="text-sm mt-2 space-y-1 text-gray-300">
      <li>• Workouts</li>
      <li>• Nutrition</li>
      <li>• Recovery</li>
      <li>• Muscle Gain</li>
      <li>• Fat Loss</li>
    </ul>
  </div>
)}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] whitespace-pre-wrap leading-relaxed px-4 py-2 rounded-2xl text-sm ${
              msg.role === "user"
  ? "bg-orange-500 self-end text-white"
  : "bg-[#18243d] self-start text-gray-200"
            }`}
          >
            <div className="text-gray-100 leading-6">
  <ReactMarkdown
    components={{
      p: ({ children }) => (
        <p className="mb-2">{children}</p>
      ),
      h1: ({ children }) => (
        <h1 className="text-xl font-bold mb-2">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-lg font-bold mb-2">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-semibold mb-2">{children}</h3>
      ),
      ul: ({ children }) => (
        <ul className="list-disc pl-5 mb-2">{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal pl-5 mb-2">{children}</ol>
      ),
      li: ({ children }) => (
        <li className="mb-1">{children}</li>
      ),
      strong: ({ children }) => (
        <strong className="font-bold text-white">{children}</strong>
      ),
    }}
  >
    {msg.content}
  </ReactMarkdown>
</div>
          </div>
        ))}
        {loading && (
  <div className="bg-gray-800 self-start px-4 py-2 rounded-2xl text-sm text-gray-400 animate-pulse">
    🤖 Coach is thinking...
  </div>
)}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask your coach..."
          className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 outline-none text-sm"
        />
        <button
          onClick={sendMessage}
          disabled={!text.trim() || loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-4 py-2 rounded-full text-sm font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}