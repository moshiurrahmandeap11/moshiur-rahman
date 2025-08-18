import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaBars, FaMicrophone, FaStop, FaCopy, FaRedo, FaUser, FaRobot } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import DOMPurify from "dompurify";

const ChatWindow = ({ messages, onSend, isLoading, onToggleMenu, onRetry }) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'bn-BD';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };
      
      recognitionInstance.onerror = () => setIsRecording(false);
      recognitionInstance.onend = () => setIsRecording(false);
      
      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Smart mode detection with context analysis
  const determineMode = useCallback((input) => {
    const moshiurKeywords = [
      "moshiur", "rahman", "portfolio", "project", "skill", "experience",
      "কাজ", "প্রোজেক্ট", "দক্ষতা", "অভিজ্ঞতা", "পোর্টফোলিও"
    ];
    const lowerInput = input.toLowerCase();
    
    // Check for direct mentions
    const hasMoshiurKeywords = moshiurKeywords.some(keyword => 
      lowerInput.includes(keyword.toLowerCase())
    );
    
    // Context-based detection from recent messages
    const recentMessages = messages.slice(-3);
    const hasRecentMoshiurContext = recentMessages.some(msg => 
      moshiurKeywords.some(keyword => 
        msg.text.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    return hasMoshiurKeywords || hasRecentMoshiurContext ? "moshiur" : "general";
  }, [messages]);

  const handleSendClick = useCallback(() => {
    if (!input.trim() || isLoading) return;
    const mode = determineMode(input);
    onSend(input, mode);
    setInput("");
    inputRef.current?.focus();
  }, [input, isLoading, determineMode, onSend]);

  const handleVoiceInput = useCallback(() => {
    if (!recognition) {
      alert("Voice input is not supported in your browser");
      return;
    }
    
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  }, [recognition, isRecording]);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text.replace(/<[^>]*>/g, ''));
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, []);

  // Sanitize HTML with enhanced security
  const sanitizeHTML = useCallback((html) => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['a', 'b', 'strong', 'i', 'em', 'ul', 'li', 'ol', 'p', 'br', 'code', 'pre'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'style', 'class'],
      ALLOWED_CSS_PROPERTIES: ['color', 'background-color', 'font-weight'],
      ADD_ATTR: ['target']
    });
  }, []);

  const currentMode = determineMode(input || "general");

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 min-h-0">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-700 p-4 border-b border-gray-600 shadow-lg backdrop-blur-sm">
        <button 
          onClick={onToggleMenu} 
          className="text-white hover:text-orange-400 transition-colors duration-200 p-2 rounded-full hover:bg-gray-700"
        >
          <FaBars size={18} />
        </button>
        
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full animate-pulse ${currentMode === "moshiur" ? "bg-orange-400" : "bg-blue-400"}`}></div>
          <div className="text-white font-semibold text-lg">
            {currentMode === "moshiur" ? (
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                🚀 Moshiur's AI
              </span>
            ) : (
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                🤖 General Assistant
              </span>
            )}
          </div>
        </div>
        
        <div className="w-10"></div>
      </div>

      {/* Enhanced Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-gray-900/50">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-xl text-gray-300 font-medium">Start The Conversation</h2>
            <p className="text-gray-500 max-w-md">
              You can ask me anything! If you want to ask about my portfolio, just type "Moshiur" or "Moshiur Rahman".
            </p>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} group`}>
            <div className={`relative flex items-start space-x-3 max-w-[85%] ${msg.from === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ${
                msg.from === "user" 
                  ? "bg-gradient-to-br from-orange-500 to-orange-600" 
                  : "bg-gradient-to-br from-gray-600 to-gray-700"
              }`}>
                {msg.from === "user" ? <FaUser size={12} /> : <FaRobot size={12} />}
              </div>
              
              {/* Message Bubble */}
              <div className={`relative p-4 rounded-2xl shadow-lg backdrop-blur-sm border ${
                msg.from === "user" 
                  ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-400/30" 
                  : "bg-gradient-to-br from-gray-700/80 to-gray-800/80 text-gray-100 border-gray-600/30"
              }`}>
                <div 
                  className="prose prose-sm max-w-none text-current prose-a:text-orange-300 prose-strong:text-current"
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.text) }}
                />
                
                {/* Message Actions */}
                {msg.from === "bot" && (
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => copyToClipboard(msg.text)}
                        className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-full shadow-lg transition-colors duration-200"
                        title="Copy message"
                      >
                        <FaCopy size={12} />
                      </button>
                      {onRetry && (
                        <button
                          onClick={() => onRetry(i)}
                          className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-colors duration-200"
                          title="Regenerate response"
                        >
                          <FaRedo size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Enhanced Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white shadow-lg">
                <FaRobot size={12} />
              </div>
              <div className="bg-gradient-to-br from-gray-700/80 to-gray-800/80 border border-gray-600/30 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-gray-300 text-sm">চিন্তা করছি...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="p-4 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm">
        <div className="flex items-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl border border-gray-600/50 shadow-xl">
          {/* Voice Input Button */}
          {recognition && (
            <button
              onClick={handleVoiceInput}
              disabled={isLoading}
              className={`p-3 m-2 rounded-full transition-all duration-200 ${
                isRecording 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "text-gray-400 hover:text-orange-400 hover:bg-gray-600/50"
              }`}
              title={isRecording ? "Stop recording" : "Start voice input"}
            >
              {isRecording ? <FaStop size={16} /> : <FaMicrophone size={16} />}
            </button>
          )}
          
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
            placeholder="Type your message..."
            className="flex-grow p-4 bg-transparent text-white placeholder-gray-400 outline-none text-base"
            disabled={isLoading}
            maxLength={1000}
          />
          
          {/* Character Count */}
          {input.length > 800 && (
            <div className="px-3 text-xs text-gray-400">
              {input.length}/1000
            </div>
          )}
          
          <button
            onClick={handleSendClick}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 m-2 rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 transition-all duration-200 shadow-lg disabled:cursor-not-allowed flex items-center justify-center min-w-[50px]"
            title="Send message"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <MdSend size={20} />
            )}
          </button>
        </div>
        
        {/* Mode Indicator */}
        <div className="mt-2 text-center">
          <span className={`text-xs px-3 py-1 rounded-full ${
            currentMode === "moshiur" 
              ? "bg-orange-900/30 text-orange-300 border border-orange-600/30" 
              : "bg-blue-900/30 text-blue-300 border border-blue-600/30"
          }`}>
            {currentMode === "moshiur" ? "🎯 Moshiur Mode" : "🌐 General Mode"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;