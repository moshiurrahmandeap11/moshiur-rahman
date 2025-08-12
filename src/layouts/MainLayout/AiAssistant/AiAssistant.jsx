import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { FaRobot, FaTimes } from "react-icons/fa";

const AiAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [aiDisabled, setAiDisabled] = useState(false);
  const [showAskText, setShowAskText] = useState(true);
  const [aiHistory, setAiHistory] = useState([]);
  const [mode, setMode] = useState("moshiur"); // "moshiur" or "general"
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchAiHistory();
  }, []);

  const fetchAiHistory = async () => {
    try {
      const res = await axios.get("https://moshiur-rahman-server.vercel.app/ai-history");
      setAiHistory(res.data);
    } catch {
      setAiHistory([]);
    }
  };

 // AiAssistant.js ফাইলের handleSend ফাংশনটি নিচের মতো পরিবর্তন করুন

const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input; // ইনপুট ক্লিয়ার হওয়ার আগে সেভ করে রাখুন
    setInput("");

    try {
      // সরাসরি OpenRouter কল না করে আপনার ব্যাকএন্ডের /ai-answer এন্ডপয়েন্টকে কল করুন
      const response = await axios.post(
        "https://moshiur-rahman-server.vercel.app/ai-answer", // আপনার ব্যাকএন্ডের URL
        {
          command: currentInput,
          mode: mode, // বর্তমান মোড ("moshiur" or "general") পাঠান
        }
      );

      const botReply = {
        from: "bot",
        text: response.data.answer, // ব্যাকএন্ড থেকে আসা উত্তর
      };
      setMessages((prev) => [...prev, botReply]);

      // যেহেতু ব্যাকএন্ডেই হিস্টোরি সেভ হচ্ছে, তাই নতুন করে আর ai-command কল করার প্রয়োজন নেই।
      // তবে নতুন হিস্টোরি দেখানোর জন্য fetchAiHistory কল করতে পারেন।
      fetchAiHistory();

    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ AI is off due to API error or pricing limits.",
        },
      ]);
      setAiDisabled(true);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* AI Chatbot Button + Animated Text + Close Icon */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2">
        {showAskText && (
          <div className="flex items-center space-x-1 bg-orange-500 text-white px-3 py-1 rounded-full font-semibold text-sm cursor-default animate-fadeIn">
            <span>Ask about Moshiur</span>
            <FaTimes
              className="cursor-pointer hover:text-orange-300"
              onClick={() => setShowAskText(false)}
              title="Close"
            />
          </div>
        )}

        <button
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg focus:outline-none transition-all duration-300"
          title="Open AI Chat"
        >
          <FaRobot size={20} />
        </button>
      </div>

      {/* Chatbox UI */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 max-w-[90vw] h-[32rem] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-700 transform transition-all duration-500 animate-fadeIn">
          <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white p-3 font-semibold text-center rounded-t-lg">
            {mode === "moshiur" ? "Moshiur's AI Assistant" : "ChatGPT Assistant"}
          </div>
          <div className="flex justify-center gap-2 my-2">
            <button
              className={`px-3 py-1 rounded ${mode === "moshiur" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300"}`}
              onClick={() => setMode("moshiur")}
            >
              Moshiur Mode
            </button>
            <button
              className={`px-3 py-1 rounded ${mode === "general" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300"}`}
              onClick={() => setMode("general")}
            >
              ChatGPT Mode
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[85%] break-words ${
                  msg.from === "user"
                    ? "bg-orange-600 text-white self-end animate-messageInUser"
                    : "bg-gray-700 text-gray-200 self-start"
                }`}
              >
                {msg.from === "bot" ? (
                  <ul className="list-disc list-inside space-y-1">
                    {msg.text.split("\n").map((line, idx) => (
                      <li
                        key={idx}
                        className="opacity-0 animate-bulletFadeIn"
                        style={{
                          animationDelay: `${idx * 0.3}s`,
                          animationFillMode: "forwards",
                        }}
                      >
                        {line.trim()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
            <div className="mt-4">
              <h3 className="text-sm text-orange-300 mb-1">পুরোনো History</h3>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {aiHistory.map((item, idx) => (
                  <div key={idx} className="p-2 rounded bg-[#222] text-white">
                    <div><strong>প্রশ্ন:</strong> {item.command}</div>
                    <div><strong>উত্তর:</strong> {item.response}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {!aiDisabled && (
            <div className="flex flex-col sm:flex-row border-t border-gray-700 bg-gray-900">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={mode === "moshiur" ? "Moshiur সম্পর্কে প্রশ্ন করুন..." : "কিছু জিজ্ঞেস করুন..."}
                className="flex-grow min-w-0 p-3 bg-gray-900 text-white placeholder-gray-400 outline-none text-sm rounded-t-md sm:rounded-t-none sm:rounded-l-md"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                onClick={handleSend}
                className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-b-md sm:rounded-b-none sm:rounded-r-md transition duration-300"
                type="button"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
        @keyframes messageInUser {
          0% {
            opacity: 0;
            transform: translateX(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes bulletFadeIn {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-messageInUser {
          animation: messageInUser 0.4s ease forwards;
        }
        .animate-bulletFadeIn {
          animation-name: bulletFadeIn;
          animation-duration: 0.5s;
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        }
      `}</style>
    </>
  );
};

export default AiAssistant;