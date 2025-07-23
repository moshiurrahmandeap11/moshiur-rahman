import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
import CustomCursor from '../../components/CustomCursor/CustomCursor';
import Footer from '../../components/Footer/Footer';
import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaRobot,
} from 'react-icons/fa';
import axios from 'axios';

// Import JSON data correctly from src/lib/moshiur.json
import moshiurData from '../../../public/moshiur.json';

const MainLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Build system prompt with Moshiur data
    const systemPrompt = `You are an AI assistant that knows everything about Moshiur Rahman. Here's his data:\n${JSON.stringify(
      moshiurData
    )}\n\nOnly answer based on this information.`;

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: input },
          ],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botReply = {
        from: 'bot',
        text: response.data.choices[0].message.content.trim(),
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: '⚠️ Sorry, something went wrong with the AI.',
        },
      ]);
    }
  };

  return (
    <div className="cursor-none relative">
      <CustomCursor />

      {/* Top Nav */}
      <header className="shadow-md bg-transparent backdrop-blur-3xl sticky z-50 top-0">
        <Navbar />
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer id="contact">
        <Footer />
      </footer>

      {/* === Fixed Social Icons Left === */}
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

      {/* === Fixed Email Right === */}
      <div className="fixed bottom-4 right-10 z-50 hidden sm:flex flex-col items-center gap-4">
        <a
          href="mailto:moshiurrahmandeap@gmail.com"
          className="text-white hover:text-orange-400 font-semibold text-sm rotate-90 origin-bottom-right tracking-widest"
        >
          moshiurrahmandeap@gmail.com
        </a>
      </div>

      {/* === AI Chatbot Button & UI === */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg focus:outline-none transition-all duration-300"
        >
          <FaRobot size={20} />
        </button>
      </div>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 max-w-[90vw] h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-300 transform transition-all duration-500 animate-fadeIn">
          <div className="bg-orange-500 text-white p-3 font-semibold text-center">
            Ask Moshiur's AI Assistant
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md animate-fadeIn ${
                  msg.from === 'user'
                    ? 'bg-orange-100 text-right'
                    : 'bg-gray-100 text-left'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 p-2 outline-none text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-orange-500 text-white px-4 text-sm transition hover:bg-orange-600"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
