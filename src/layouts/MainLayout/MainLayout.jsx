import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import CustomCursor from "../../components/CustomCursor/CustomCursor";
import Footer from "../../components/Footer/Footer";
import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import AiAssistant from "./AiAssistant/AiAssistant";


const MainLayout = () => {
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

      {/* AI Assistant */}
      <AiAssistant />

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