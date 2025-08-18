import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaRobot, FaTimes } from "react-icons/fa";

import ChatHistoryMenu from "./ChatHistoryMenu/ChatHistoryMenu";
import ChatWindow from "./ChatWindow/ChatWindow";

const AiAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState([]); // Always initialize as array
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]); // Always initialize as array
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://moshiur-rahman-server.vercel.app/api";

  // Safe message setter with array validation
  const safeSetMessages = useCallback((newMessages) => {
    if (typeof newMessages === 'function') {
      setMessages(prev => {
        const currentMessages = Array.isArray(prev) ? prev : [];
        const result = newMessages(currentMessages);
        return Array.isArray(result) ? result : [];
      });
    } else {
      setMessages(Array.isArray(newMessages) ? newMessages : []);
    }
  }, []);

  // Safe session setter with array validation
  const safeChatSessions = useCallback((newSessions) => {
    if (typeof newSessions === 'function') {
      setChatSessions(prev => {
        const currentSessions = Array.isArray(prev) ? prev : [];
        const result = newSessions(currentSessions);
        return Array.isArray(result) ? result : [];
      });
    } else {
      setChatSessions(Array.isArray(newSessions) ? newSessions : []);
    }
  }, []);

  const fetchChatSessions = async () => {
    try {
      setIsLoadingSessions(true);
      setError(null);
      
      const res = await axios.get(`${API_BASE_URL}/chats`, {
        timeout: 10000 // 10 second timeout
      });
      
      // Handle different response structures
      let sessions = [];
      if (res.data) {
        if (Array.isArray(res.data)) {
          sessions = res.data;
        } else if (res.data.chats && Array.isArray(res.data.chats)) {
          sessions = res.data.chats;
        } else if (res.data.data && Array.isArray(res.data.data)) {
          sessions = res.data.data;
        }
      }
      
      safeChatSessions(sessions);
      console.log(`✅ Loaded ${sessions.length} chat sessions`);
    } catch (err) {
      console.error("❌ Failed to fetch chat sessions:", err);
      setError("চ্যাট সেশন লোড করতে ব্যর্থ হয়েছে");
      safeChatSessions([]); // Set empty array on error
    } finally {
      setIsLoadingSessions(false);
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      fetchChatSessions();
      if (!activeChatId) {
        setActiveChatId("new");
        safeSetMessages([]);
      }
    }
  }, [isChatOpen, activeChatId, safeSetMessages]);

  const handleNewChat = useCallback(() => {
    console.log("🆕 Starting new chat");
    setActiveChatId("new");
    safeSetMessages([]);
    setIsMenuOpen(false);
    setError(null);
  }, [safeSetMessages]);

  const handleSelectChat = async (chatId) => {
    if (!chatId || chatId === activeChatId) return;
    
    console.log(`📂 Loading chat: ${chatId}`);
    setActiveChatId(chatId);
    setIsMenuOpen(false);
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(`${API_BASE_URL}/chats/${chatId}`, {
        timeout: 10000
      });
      
      if (res.data && res.data.messages) {
        const chatMessages = Array.isArray(res.data.messages) ? res.data.messages : [];
        safeSetMessages(chatMessages);
        console.log(`✅ Loaded ${chatMessages.length} messages`);
      } else {
        console.warn("No messages found in response");
        safeSetMessages([]);
      }
    } catch (err) {
      console.error("❌ Failed to fetch messages for chat:", err);
      setError("চ্যাট লোড করতে ব্যর্থ হয়েছে");
      safeSetMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (input, mode) => {
    if (!input || !input.trim()) return;
    
    console.log(`📤 Sending message in ${mode} mode`);
    const userMessage = { 
      from: "user", 
      text: input.trim(),
      timestamp: new Date()
    };
    
    // Add user message immediately
    safeSetMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      let response;
      
      if (activeChatId === "new") {
        console.log("🆕 Creating new chat");
        response = await axios.post(`${API_BASE_URL}/chats`, { 
          message: input.trim(), 
          mode 
        }, {
          timeout: 30000 // 30 seconds for new chat
        });
        
        const newChat = response.data;
        if (newChat && newChat._id) {
          setActiveChatId(newChat._id);
          
          // Safely set messages from new chat
          if (newChat.messages && Array.isArray(newChat.messages)) {
            safeSetMessages(newChat.messages);
          }
          
          // Add to chat sessions
          safeChatSessions(prev => [newChat, ...prev]);
          console.log(`✅ New chat created: ${newChat._id}`);
        } else {
          throw new Error("Invalid response from server");
        }
      } else {
        console.log(`💬 Adding message to chat: ${activeChatId}`);
        response = await axios.post(
          `${API_BASE_URL}/chats/${activeChatId}/messages`, 
          { message: input.trim(), mode },
          { timeout: 30000 }
        );
        
        if (response.data && response.data.answer) {
          const botReply = {
            from: "bot",
            text: response.data.answer,
            timestamp: new Date()
          };
          safeSetMessages(prev => [...prev, botReply]);
          console.log("✅ Bot response added");
        } else {
          throw new Error("No response from bot");
        }
      }
    } catch (err) {
      console.error("❌ Send message error:", err);
      
      let errorMessage = "⚠️ দুঃখিত, একটি সমস্যা হয়েছে।";
      
      if (err.response?.status === 429) {
        errorMessage = "⚠️ অনেক বেশি রিকোয়েস্ট। একটু অপেক্ষা করুন।";
      } else if (err.response?.status >= 500) {
        errorMessage = "⚠️ সার্ভার সমস্যা। পরে চেষ্টা করুন।";
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = "⚠️ সময় শেষ। আবার চেষ্টা করুন।";
      }
      
      safeSetMessages(prev => [
        ...prev,
        { from: "bot", text: errorMessage, timestamp: new Date() },
      ]);
      setError("মেসেজ পাঠাতে ব্যর্থ হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteChat = async (chatId) => {
    if (!chatId) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/chats/${chatId}`);
      
      // Remove from sessions
      safeChatSessions(prev => prev.filter(session => session._id !== chatId));
      
      // If deleted chat was active, start new chat
      if (activeChatId === chatId) {
        handleNewChat();
      }
      
      console.log(`🗑️ Chat deleted: ${chatId}`);
    } catch (err) {
      console.error("❌ Failed to delete chat:", err);
      setError("চ্যাট মুছতে ব্যর্থ হয়েছে");
    }
  };

  const toggleChat = () => {
    if (isChatOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsChatOpen(false);
        setIsAnimating(false);
        setIsMenuOpen(false);
        setError(null);
      }, 400);
    } else {
      setIsChatOpen(true);
      setError(null);
    }
  };

  const handleRetry = useCallback(() => {
    if (activeChatId === "new") {
      safeSetMessages([]);
    } else {
      handleSelectChat(activeChatId);
    }
  }, [activeChatId, safeSetMessages]);

  return (
    <>
      {/* AI চ্যাট বাটন */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className={`relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 rounded-full shadow-lg focus:outline-none transition-all duration-300 transform hover:scale-105 ${
            isChatOpen ? "rotate-45" : ""
          }`}
          title={isChatOpen ? "Close AI Chat" : "Open AI Chat"}
        >
          {isChatOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
          
          {/* Notification dot */}
          {!isChatOpen && chatSessions.length > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
              {chatSessions.length > 9 ? '9+' : chatSessions.length}
            </div>
          )}
        </button>
      </div>

      {/* চ্যাটবক্স UI */}
      {isChatOpen && (
        <div
          className={`fixed bottom-20 right-6 z-40 w-[90vw] h-[80vh] max-w-4xl max-h-[700px] bg-gray-900 rounded-lg shadow-2xl flex overflow-hidden border border-gray-700 
            ${isAnimating ? "animate-genieClose" : "animate-genieOpen"}`}
        >
          {/* Error Banner */}
          {error && (
            <div className="absolute top-0 left-0 right-0 bg-red-500/90 text-white px-4 py-2 z-10 flex items-center justify-between">
              <span className="text-sm">{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-white hover:text-gray-200"
              >
                <FaTimes size={14} />
              </button>
            </div>
          )}

          <ChatHistoryMenu
            isOpen={isMenuOpen}
            sessions={chatSessions}
            isLoading={isLoadingSessions}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            onDeleteChat={handleDeleteChat}
            activeChatId={activeChatId}
          />

          <ChatWindow
            messages={messages}
            onSend={handleSend}
            onRetry={handleRetry}
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

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .fixed.bottom-20.right-6 {
              bottom: 80px;
              right: 16px;
              left: 16px;
              width: calc(100vw - 32px);
              max-width: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default AiAssistant;