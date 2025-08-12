import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import DOMPurify from "dompurify";

const ChatWindow = ({ messages, onSend, isLoading, onToggleMenu }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to determine mode based on input
  const determineMode = (input) => {
    const moshiurKeywords = ["moshiur", "rahman", "portfolio", "project", "skill", "experience"];
    const lowerInput = input.toLowerCase();
    return moshiurKeywords.some((keyword) => lowerInput.includes(keyword)) ? "moshiur" : "general";
  };

  const handleSendClick = () => {
    if (!input.trim()) return;
    const mode = determineMode(input); // Determine mode dynamically
    onSend(input, mode);
    setInput("");
  };

  // Sanitize HTML content to prevent XSS
const sanitizeHTML = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['a', 'b', 'strong', 'ul', 'li', 'p'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'style'],
    ALLOWED_CSS_PROPERTIES: ['color']
  });
};


  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="flex items-center justify-between bg-gray-800 p-3 border-b border-gray-700">
        <button onClick={onToggleMenu} className="text-white hover:text-orange-400">
          <FaBars size={20} />
        </button>
        <div className="text-white font-semibold">
          {determineMode(input || "general") === "moshiur" ? "Moshiur's AI" : "General Assistant"}
        </div>
        <div></div> {/* Placeholder for centering title */}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 rounded-lg max-w-[85%] break-words ${
                msg.from === "user" ? "bg-orange-600 text-white" : "bg-gray-700 text-gray-200"
              }`}
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.text) }}
            />
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 bg-gray-700 rounded-lg text-gray-400">Typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-700">
        <div className="flex items-center bg-gray-800 rounded-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
            placeholder="আপনার প্রশ্ন টাইপ করুন..."
            className="flex-grow p-3 bg-transparent text-white placeholder-gray-500 outline-none"
          />
          <button
            onClick={handleSendClick}
            disabled={isLoading}
            className="bg-orange-600 text-white px-5 py-3 rounded-r-lg hover:bg-orange-700 disabled:bg-gray-600"
          >
            পাঠান
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;