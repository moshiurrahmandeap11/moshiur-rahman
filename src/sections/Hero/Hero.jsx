import React, { useEffect, useState, useRef } from "react";

const titles = [
  "A full stack web developer",
  "A mern stack developer",
  "A front end developer",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
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

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white via-orange-50 to-white">
      {/* Fluid motion circle that stays inside the Hero section */}
      <div
        ref={circleRef}
        className="pointer-events-none absolute top-0 left-0 w-[800px] h-[800px] bg-orange-600 opacity-30 rounded-full z-0 transition-all duration-50"
      />

      {/* Content */}
      <div className="w-11/12 max-w-6xl mx-auto pt-32 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          G'day, I'm <br /> Moshiur Rahman
        </h1>

        <h4 className="text-xl md:text-2xl font-mono mt-4 text-orange-500 min-h-[2.5rem]">
          {displayedText}
        </h4>

        <p className="mt-6 text-gray-700 max-w-xl mx-auto">
          Passionate about building dynamic, responsive web apps with clean code
          & modern design. Always learning, always shipping.
        </p>

        <a
          href="#contact"
          className="mt-6 inline-block relative group text-black font-semibold px-6 py-3 border border-orange-400 rounded overflow-hidden text-sm"
        >
          <span className="relative z-10 group-hover:text-white transition duration-300">
            Contact Me!
          </span>
          <span className="absolute left-0 bottom-0 w-full h-full bg-orange-400 z-0 transform scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
