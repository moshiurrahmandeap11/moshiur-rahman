import React, { useEffect, useRef, useState } from "react";
import profilePic from "../../assets/profile.jpg";
import shipWheel from "../../assets/wheel.webp";
import Aos from "aos";
import "aos/dist/aos.css";

const chars = "!@#$%^&*()_+-={}[]<>?/|\\~";

const MyPortfolio = () => {
  const wheelRef = useRef(null);
  const languages = [
    "JavaScript",
    "React.js",
    "Firebase",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JWT",
  ];
  const [animatedLangs, setAnimatedLangs] = useState(
    Array(languages.length).fill("")
  );

  useEffect(() => {
    Aos.init({ duration: 800, once: false, easing: "ease-in-out" });

    const handleScroll = () => {
      const rotateDeg = window.scrollY % 360;
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${rotateDeg}deg)`;
      }
    };
    window.addEventListener("scroll", handleScroll);

    let currentLangIndex = 0;
    let charIndex = 0;
    let timeoutId;

    const animateLang = () => {
      const lang = languages[currentLangIndex];
      if (charIndex > lang.length) {
        // Set full text and wait before next animation
        setAnimatedLangs((prev) => {
          const copy = [...prev];
          copy[currentLangIndex] = lang;
          return copy;
        });

        // After 3s, reset this language's animation and move to next language
        timeoutId = setTimeout(() => {
          setAnimatedLangs((prev) => {
            const copy = [...prev];
            copy[currentLangIndex] = "";
            return copy;
          });

          currentLangIndex = (currentLangIndex + 1) % languages.length;
          charIndex = 0;
          animateLang();
        }, 1000);
        return;
      }

      // Build display text with encrypted chars
      let displayText = "";
      for (let i = 0; i < lang.length; i++) {
        if (i < charIndex) displayText += lang[i];
        else displayText += chars[Math.floor(Math.random() * chars.length)];
      }
      setAnimatedLangs((prev) => {
        const copy = [...prev];
        copy[currentLangIndex] = displayText;
        return copy;
      });

      charIndex++;
      timeoutId = setTimeout(animateLang, 50);
    };

    animateLang();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white overflow-hidden">
      {/* Background ship wheel positioned 20% from bottom */}
      <img
        ref={wheelRef}
        src={shipWheel}
        alt="Ship Wheel"
        className="pointer-events-none opacity-20 brightness-150 contrast-125 w-[500px] h-[500px] absolute bottom-[20%] -left-32 z-0 transition-transform duration-300"
      />

      <div className="relative z-10 w-11/12 max-w-6xl mx-auto">
        {/* Header with HR */}
        <div className="flex items-center gap-4 mb-8">
          <h2
            className="text-3xl font-bold whitespace-nowrap text-orange-400"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            My Portfolio
          </h2>
          <hr className="flex-grow border-t border-orange-600 opacity-60" />
        </div>

        {/* Content */}
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12">
          {/* Left: Description */}
          <div className="md:w-1/2 text-gray-300 text-lg leading-relaxed space-y-5">
            <p data-aos="fade-up" data-aos-duration="900" data-aos-delay="100">
              Yo! I’m <span className="text-orange-400">Moshiur Rahman</span> —
              a full-stack developer with a knack for solving real-world
              problems through code. My focus? Seamless UI/UX, performance, and
              scalable backend logic.
            </p>
            <p data-aos="fade-up" data-aos-duration="900" data-aos-delay="200">
              I specialize in{" "}
              <span className="text-orange-400">MERN stack</span>, working with
              React, Express, MongoDB, and Node.js. Whether it’s building
              dynamic UIs or architecting REST APIs, I bring clean code and
              clean vibes.
            </p>
            <p data-aos="fade-up" data-aos-duration="900" data-aos-delay="300">
              I enjoy working in teams, collaborating on open-source, and
              constantly learning new tools. My builds prioritize both
              aesthetics and accessibility.
            </p>
            <p data-aos="fade-up" data-aos-duration="900" data-aos-delay="400">
              Beyond code, I vibe with design, motion graphics, and meaningful
              storytelling through digital experiences. Let's make something
              epic together ✨
            </p>
            <p data-aos="fade-up" data-aos-duration="900" data-aos-delay="500">
              When I'm not coding, you can find me exploring nature, diving
              into sci-fi novels, or experimenting with new music beats.
            </p>
            <p data-aos="fade-up" data-aos-duration="900" data-aos-delay="600">
              I'm always eager to connect with like-minded creators and
              developers. Drop me a message anytime!
            </p>

            {/* New languages/tech section */}
            <div
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay="700"
              className="mt-8"
            >
              <h3 className="text-orange-400 font-semibold mb-2">
                Languages & Tech I Know:
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {animatedLangs.map((langText, idx) => (
                  <li key={idx} className="font-mono">
                    {langText || ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Image Box */}
          <div
            className="md:w-1/2 relative"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="800"
          >
            <div className="border-4 border-orange-500 rounded-xl w-[300px] h-[350px] mx-auto relative">
              <img
                src={profilePic}
                alt="Moshiur Rahman"
                className="absolute top-[-20px] left-[-20px] w-[300px] h-[350px] object-cover rounded-xl shadow-2xl border-2 border-white brightness-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPortfolio;
