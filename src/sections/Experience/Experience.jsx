import React, { useState, useRef, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const experiences = [
  // {
  //   id: 1,
  //   header: "Frontend Developer at XYZ Corp",
  //   date: "Jan 2021 - Present",
  //   description:
  //     "Built scalable React apps, improved UI performance, and collaborated with backend teams.",
  // },
  // {
  //   id: 2,
  //   header: "Full-Stack Intern at ABC Ltd",
  //   date: "Jun 2020 - Dec 2020",
  //   description:
  //     "Worked on MERN stack projects, implemented REST APIs, and fixed bugs in production.",
  // },
  {
    id: 3,
    header: "MERN Stack Developer at Projukty Sheba",
    date: "2025 - Present",
    description:
      "Developing and maintaining modern web applications using MongoDB, Express.js, React.js, and Node.js. Responsible for creating responsive front-end designs, building RESTful APIs, and integrating third-party services. Collaborating with UI/UX designers to improve user experiences and ensuring scalable, secure backend architecture for client projects.",
  },
];

const Experience = () => {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const tabsRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({});

  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });

    if (!tabsRef.current) return;
    const activeTab = tabsRef.current.querySelector(`[data-id='${activeId}']`);
    if (activeTab) {
      setUnderlineStyle({
        width: activeTab.offsetWidth,
        left: activeTab.offsetLeft,
      });
    }
  }, [activeId]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77] text-gray-100 select-none flex flex-col justify-center items-center px-6 py-12">
      {/* Header with hr line */}
      <div
        className="flex items-center gap-4 mb-8 w-full max-w-4xl"
        data-aos="fade-right"
      >
        <h2 className="text-3xl font-bold text-orange-400 whitespace-nowrap">
          My Work Experiences
        </h2>
        <hr className="flex-grow border-t border-orange-600 opacity-60" />
      </div>

      {/* Tabs container */}
      <div
        ref={tabsRef}
        className="relative flex border-b border-gray-600 mb-8 space-x-8 overflow-x-auto max-w-4xl w-full scrollbar-hide"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {experiences.map(({ id, header }) => (
          <button
            key={id}
            data-id={id}
            onClick={() => setActiveId(id)}
            className={`relative text-lg py-2 font-semibold transition-colors duration-300 whitespace-nowrap ${
              activeId === id
                ? "text-orange-400"
                : "text-gray-400 hover:text-orange-400"
            }`}
          >
            {header}
          </button>
        ))}

        {/* Sliding underline */}
        <span
          className="absolute bottom-0 h-1 bg-orange-400 rounded transition-all duration-300"
          style={{
            width: underlineStyle.width,
            left: underlineStyle.left,
          }}
        />
      </div>

      {/* --- MODIFIED: Experience Content in a 3D Glassy Box --- */}
      <div 
        className="max-w-4xl w-full min-h-[280px] bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl shadow-black/30 p-8"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        {experiences.map(({ id, header, date, description }) => (
          <div
            key={id}
            className={`transition-opacity duration-500 ${
              activeId === id ? "opacity-100" : "opacity-0 absolute invisible"
            }`}
          >
            <h3 className="text-2xl font-semibold text-orange-400 mb-2">
              {header}
            </h3>
            <p className="text-sm italic text-gray-400 mb-4">{date}</p>
            <p className="text-gray-300 leading-relaxed text-lg">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;