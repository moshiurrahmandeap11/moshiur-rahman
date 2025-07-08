import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
import CustomCursor from '../../components/CustomCursor/CustomCursor';
import Footer from '../../components/Footer/Footer';
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const MainLayout = () => {
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
        {/* Vertical Line */}
        <div className="w-px h-24 bg-white mt-2" />
      </div>

      {/* === Fixed Email Right === */}
      <div className="fixed bottom-4  right-10 z-50 hidden sm:flex flex-col items-center gap-4">
        <a
          href="mailto:your@email.com"
          className="text-white hover:text-orange-400 font-semibold text-sm rotate-90 origin-bottom-right tracking-widest"
        >
          moshiurrahmandeap@gmail.com
        </a>
      </div>
    </div>
  );
};

export default MainLayout;
