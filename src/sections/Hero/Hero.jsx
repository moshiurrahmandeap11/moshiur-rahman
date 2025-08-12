import React, { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram } from "react-icons/fa";

const titles = [
  "A full stack web developer",
  "A mern stack developer",
  "A front end developer",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // for animation control
  const circleRef = useRef(null);

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

  // Animate big circle with fluid motion
  useEffect(() => {
    const lerp = (start, end, amt) => start + (end - start) * amt;

    const handleMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
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
        const rotate = velocity.current.x * 4;

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

  // Modal open/close handlers with animation
  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setShowModal(true), 10); // slight delay to trigger transition
  };

  const closeModal = () => {
    setShowModal(false);
    // wait for animation to finish before unmounting modal
    setTimeout(() => setIsModalOpen(false), 300);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Fluid motion circle */}
<div
  ref={circleRef}
  className="pointer-events-none absolute top-0 left-0 w-[800px] h-[800px] bg-orange-600 opacity-30 rounded-full z-0 transition-all duration-50 blur-3xl"
/>


      {/* Content */}
      <div className="w-11/12 max-w-6xl mx-auto pt-32 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          G'day, I'm <br /> Moshiur Rahman
        </h1>

        <h4 className="text-xl md:text-2xl font-mono mt-4 text-orange-500 min-h-[2.5rem]">
          {displayedText}
        </h4>

        <p className="mt-6 text-white/40 max-w-xl mx-auto">
          Passionate about building dynamic, responsive web apps with clean code & modern design. Always learning, always shipping.
        </p>

        <button
          onClick={openModal}
          className="mt-6 inline-block relative group text-black font-semibold px-6 py-3 border border-orange-400 rounded overflow-hidden text-sm"
        >
          <span className="relative z-10 group-hover:text-white transition duration-300">
            Contact Me!
          </span>
          <span className="absolute left-0 bottom-0 w-full h-full bg-orange-400 z-0 transform scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 bg-transparent backdrop-blur-3xl bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${showModal ? "opacity-100" : "opacity-0"
            }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-gray-900 rounded-lg p-8 max-w-sm w-full text-center text-white relative transform transition-transform duration-300 ${showModal ? "scale-100" : "scale-90"
              }`}
          >
            <h2 className="text-2xl mb-6 font-semibold">Connect with me</h2>
            <div className="flex justify-center space-x-6 text-3xl">
              <a
                href="https://github.com/moshiurrahmandeap11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-orange-500 transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/moshiurrahmandeap/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-orange-500 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=moshiurrahmandeap@gmail.com" target="_blank" rel="noopener noreferrer"
                aria-label="Email"
                className="hover:text-orange-500 transition"
              >
                <FaEnvelope />
              </a>
            </div>

            <button
              onClick={closeModal}
              className="mt-8 px-4 py-2 bg-orange-500 rounded hover:bg-orange-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
