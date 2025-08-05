import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import CustomCursor from "../../components/CustomCursor/CustomCursor";
import Footer from "../../components/Footer/Footer";
import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaRobot,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";

import moshiurData from "../../../public/moshiur.json";

const MainLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [aiDisabled, setAiDisabled] = useState(false);
  const [showAskText, setShowAskText] = useState(true);

  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Keywords to identify if question is about Moshiur Rahman
    const moshiurKeywords = [
      "moshiur",
      "rahman",
      "moshiur rahman",
      "moshiur's",
      "moshiur rahman's",
      "bio",
      "skills",
      "projects",
      "experience",
      "contact",
      "achievements",
      "education",
      "personality",
      "goals",
      "quote",
      "language",
      "title",
      "location",
      "interests",
    ];

    const inputLower = input.toLowerCase();

    const isMoshiurQuestion = moshiurKeywords.some((kw) =>
      inputLower.includes(kw)
    );

    let messagesForAPI;

    if (isMoshiurQuestion) {
      // If question about Moshiur, restrict answers to Moshiur data only
      const systemPrompt = `You are a helpful AI assistant who ONLY answers questions based on this JSON data about Moshiur Rahman:\n${JSON.stringify(
        moshiurData,
        null,
        2
      )}\nIf asked about anything else, politely say you only answer questions about Moshiur Rahman.`;

      messagesForAPI = [
        { role: "system", content: systemPrompt },
        { role: "user", content: input },
      ];
    } else {
      // Else, general AI with full knowledge
      messagesForAPI = [
        {
          role: "system",
          content:
            "You are a helpful AI assistant with full general knowledge. Answer all questions truthfully and helpfully.",
        },
        { role: "user", content: input },
      ];
    }

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: messagesForAPI,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = {
        from: "bot",
        text: response.data.choices[0].message.content.trim(),
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("AI Error:", error);
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

  // Auto-scroll when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="cursor-none relative">
      <CustomCursor />

      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 sticky z-50 top-0">
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer id="contact">
        <Footer />
      </footer>

      {/* Social Icons */}
      <div className="fixed bottom-0 left-6 z-50 hidden sm:flex flex-col items-center gap-4">
        <a
          href="https://github.com/moshiurrahmandeap11"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-white hover:text-orange-400 transition text-xl" />
        </a>
        <a
          href="https://instagram.com/__moshiur.rahman.deap"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-white hover:text-orange-400 transition text-xl" />
        </a>
        <a
          href="https://facebook.com/moshiurrahmandeap"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-white hover:text-orange-400 transition text-xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/moshiurrahmandeap"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-white hover:text-orange-400 transition text-xl" />
        </a>
        <div className="w-px h-24 bg-white mt-2" />
      </div>

      {/* Email Right */}
      <div className="fixed bottom-4 right-10 z-50 hidden sm:flex flex-col items-center gap-4">
        <a
          href="mailto:moshiurrahmandeap@gmail.com"
          className="text-white hover:text-orange-400 font-semibold text-sm rotate-90 origin-bottom-right tracking-widest"
        >
          moshiurrahmandeap@gmail.com
        </a>
      </div>

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
          onClick={toggleChat}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg focus:outline-none transition-all duration-300"
          title="Open AI Chat"
        >
          <FaRobot size={20} />
        </button>
      </div>

      {/* Chatbox UI */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 max-w-[90vw] h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-700 transform transition-all duration-500 animate-fadeIn">
          <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white p-3 font-semibold text-center rounded-t-lg">
            Ask Moshiur's AI Assistant
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
          </div>

          {!aiDisabled && (
            <div className="flex flex-col sm:flex-row border-t border-gray-700 bg-gray-900">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your question..."
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
    </div>
  );
};

export default MainLayout;
