import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa";

import ChatHistoryMenu from "./ChatHistoryMenu/ChatHistoryMenu";
import ChatWindow from "./ChatWindow/ChatWindow";

const AiAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = "http://localhost:3000/api";

  const fetchChatSessions = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/chats`);
      setChatSessions(res.data);
    } catch (err) {
      console.error("Failed to fetch chat sessions:", err);
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      fetchChatSessions();
      if (!activeChatId) {
        setActiveChatId("new");
        setMessages([]);
      }
    }
  }, [isChatOpen]);

  const handleNewChat = () => {
    setActiveChatId("new");
    setMessages([]);
    setIsMenuOpen(false);
  };

  const handleSelectChat = async (chatId) => {
    setActiveChatId(chatId);
    setIsMenuOpen(false);
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/chats/${chatId}`);
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Failed to fetch messages for chat:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (input, mode) => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let response;
      if (activeChatId === "new") {
        response = await axios.post(`${API_BASE_URL}/chats`, { message: input, mode });
        const newChat = response.data;
        setActiveChatId(newChat._id);
        setMessages(newChat.messages);
        setChatSessions((prev) => [newChat, ...prev]);
      } else {
        response = await axios.post(`${API_BASE_URL}/chats/${activeChatId}/messages`, { message: input, mode });
        const botReply = response.data.answer;
        setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ দুঃখিত, একটি সমস্যা হয়েছে।" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    if (isChatOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsChatOpen(false);
        setIsAnimating(false);
      }, 400);
    } else {
      setIsChatOpen(true);
    }
  };

  return (
    <>
      {/* AI চ্যাট বাটন */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg focus:outline-none transition-all duration-300"
          title="Open AI Chat"
        >
          <FaRobot size={24} />
        </button>
      </div>

      {/* চ্যাটবক্স UI */}
      {isChatOpen && (
        <div
          className={`fixed bottom-20 right-6 z-40 w-[90vw] h-[80vh] max-w-4xl max-h-[700px] bg-gray-900 rounded-lg shadow-2xl flex overflow-hidden border border-gray-700 
            ${isAnimating ? "animate-genieClose" : "animate-genieOpen"}`}
        >
          <ChatHistoryMenu
            isOpen={isMenuOpen}
            sessions={chatSessions}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            activeChatId={activeChatId}
          />

          <ChatWindow
            messages={messages}
            onSend={handleSend}
            isLoading={isLoading}
            onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      )}

      <style>
        {`
          @keyframes genieOpen {
            0% { 
              transform: scaleY(0.1) scaleX(0.5) translateY(200px);
              opacity: 0;
              border-radius: 50%;
            }
            50% {
              transform: scaleY(1.1) scaleX(0.9) translateY(0);
              opacity: 1;
              border-radius: 20px;
            }
            100% { 
              transform: scaleY(1) scaleX(1) translateY(0);
              border-radius: 12px;
            }
          }

          @keyframes genieClose {
            0% { 
              transform: scaleY(1) scaleX(1) translateY(0);
              opacity: 1;
              border-radius: 12px;
            }
            50% {
              transform: scaleY(1.1) scaleX(0.9) translateY(0);
              opacity: 0.8;
            }
            100% { 
              transform: scaleY(0.1) scaleX(0.5) translateY(200px);
              opacity: 0;
              border-radius: 50%;
            }
          }

          .animate-genieOpen {
            animation: genieOpen 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
            transform-origin: bottom right;
          }
          .animate-genieClose {
            animation: genieClose 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
            transform-origin: bottom right;
          }
        `}
      </style>
    </>
  );
};

export default AiAssistant;
