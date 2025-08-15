import React, { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram } from "react-icons/fa";

const titles = [
  "A full stack web developer",
  "A Next.js developer",
  "A MERN stack developer",
  "A front end developer",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const circleRef = useRef(null);
  const glassRef = useRef(null);

  const lastPos = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  // Encrypting text animation
  useEffect(() => {
    let currentIndex = 0;
    let interval;

    const encryptText = (text) => {
      interval = setInterval(() => {
        if (currentIndex < text.length) {
          const randomChar = String.fromCharCode(
            33 + Math.floor(Math.random() * 94)
          );
          const newText = text.substring(0, currentIndex) + randomChar;
          setDisplayedText(newText);
          currentIndex++;
        } else {
          setDisplayedText(text);
          clearInterval(interval);
        }
      }, 50);
    };

    encryptText(titles[index]);

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [index]);

  // Animate fluid glass effects
  useEffect(() => {
    const lerp = (start, end, amt) => start + (end - start) * amt;

    const handleMove = (e) => {
      const rect = document.body.getBoundingClientRect();
      const x = (e.clientX - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.height / 2) / rect.height;
      
      targetPos.current = { x: e.clientX, y: e.clientY };
      
      // Move glass effect
      if (glassRef.current) {
        glassRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      }
    };

    const animate = () => {
      pos.current.x = lerp(pos.current.x, targetPos.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, targetPos.current.y, 0.15);

      velocity.current.x = pos.current.x - lastPos.current.x;
      velocity.current.y = pos.current.y - lastPos.current.y;

      velocity.current.x = lerp(velocity.current.x, 0, 0.1);
      velocity.current.y = lerp(velocity.current.y, 0, 0.1);

      lastPos.current.x = pos.current.x;
      lastPos.current.y = pos.current.y;

      if (circleRef.current) {
        const scaleX = 1 + Math.min(Math.abs(velocity.current.x) / 60, 0.5);
        const scaleY = 1 - Math.min(Math.abs(velocity.current.y) / 150, 0.3);
        const rotate = velocity.current.x * 2;

        circleRef.current.style.transform = `
          translate(${pos.current.x - 400}px, ${pos.current.y - 400}px)
          scaleX(${scaleX})
          scaleY(${scaleY})
          rotate(${rotate}deg)
        `;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setShowModal(true), 10);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden" id="hero">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        {/* Animated gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(234,179,8,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(251,146,60,0.05),transparent_50%)]"></div>
      </div>

      {/* Floating Glass Elements */}
      <div ref={glassRef} className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-orange-400/10 backdrop-blur-sm rounded-lg border border-orange-400/20 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-40 w-20 h-20 bg-yellow-400/10 backdrop-blur-sm rounded-full border border-yellow-400/20 animate-float-slow"></div>
      </div>

      {/* Fluid motion circle with glass effect */}
      <div
        ref={circleRef}
        className="pointer-events-none absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-400/20 via-yellow-400/15 to-orange-600/20 rounded-full z-0 transition-all duration-75 blur-3xl backdrop-blur-xl"
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-11/12 max-w-6xl mx-auto text-center">
          
          {/* Glass Content Card */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-orange-400/10 via-yellow-400/10 to-orange-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 rounded-3xl"></div>
            
            {/* Main Glass Panel */}
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
              
              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-yellow-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                {/* Main Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6">
                  <span className="block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent drop-shadow-lg">
                    G'day, I'm
                  </span>
                  <span className="block bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-xl">
                    Moshiur Rahman
                  </span>
                </h1>

                {/* Animated Subtitle */}
                <div className="relative mb-8">
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 blur-lg rounded-lg opacity-60"></div>
                  <h4 className="relative text-lg sm:text-xl lg:text-2xl xl:text-3xl font-mono text-orange-400 min-h-[3rem] flex items-center justify-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                    {displayedText}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                  Passionate about building dynamic, responsive web apps with clean code & modern design. Always learning, always shipping.
                </p>

                {/* CTA Button */}
                <button
                  onClick={openModal}
                  className="group/btn relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden rounded-2xl"
                >
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl opacity-90 group-hover/btn:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                  
                  {/* Button Border */}
                  <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover/btn:border-white/40 transition-colors"></div>
                  
                  {/* Button Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl blur opacity-0 group-hover/btn:opacity-60 transition-opacity"></div>
                  
                  {/* Button Text */}
                  <span className="relative z-10 flex items-center gap-2">
                    Contact Me!
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">💫</span>
                  </span>
                </button>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"></div>
            </div>
          </div>

          {/* Floating Social Icons */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-4">
            {[
              { icon: FaGithub, href: "https://github.com/moshiurrahmandeap11", color: "group-hover:text-gray-400" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/moshiurrahmandeap/", color: "group-hover:text-blue-400" },
              { icon: FaEnvelope, href: "mailto:moshiurrahmandeap@gmail.com", color: "group-hover:text-red-400" }
            ].map(({ icon: Icon, href, color }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <Icon className={`w-5 h-5 text-white/70 ${color} transition-colors`} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          {/* Modal Backdrop */}
          <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-gray-900/80 via-slate-900/85 to-gray-800/80"></div>
          
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative transform transition-all duration-300 ${showModal ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
          >
            {/* Modal Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-orange-400/20 blur-2xl rounded-3xl"></div>
            
            {/* Modal Content */}
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-gray-900/90 via-slate-900/95 to-gray-800/90 rounded-2xl border border-white/10 p-8 max-w-md w-full text-center shadow-2xl">
              
              {/* Modal Header */}
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Connect with me
              </h2>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-6 mb-8">
                {[
                  { icon: FaGithub, href: "https://github.com/moshiurrahmandeap11", label: "GitHub", color: "hover:text-gray-400" },
                  { icon: FaLinkedin, href: "https://www.linkedin.com/in/moshiurrahmandeap/", label: "LinkedIn", color: "hover:text-blue-400" },
                  { icon: FaEnvelope, href: "mailto:moshiurrahmandeap@gmail.com", label: "Email", color: "hover:text-red-400" }
                ].map(({ icon: Icon, href, label, color }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`group relative p-4 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-110 ${color}`}
                  >
                    <Icon className="w-7 h-7 text-white/80 group-hover:text-current transition-colors" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/0 to-yellow-400/0 group-hover:from-orange-400/20 group-hover:to-yellow-400/20 rounded-xl transition-all duration-300 blur -z-10"></div>
                  </a>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="group relative px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
              >
                <span className="relative z-10">Close</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;