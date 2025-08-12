import React, { useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import progHeroImg from "../../assets/programminghero_logo.jpeg";

const certificates = [
  {
    id: 1,
    title: "Full Stack Developer",
    image: progHeroImg,
    website: "https://programming-hero.com",
    country: "Bangladesh",
    issued: "June 2025",
  },
  {
    id: 2,
    title: "MERN Stack Developer",
    image: progHeroImg,
    website: "https://programming-hero.com",
    country: "Bangladesh",
    issued: "August 2025",
  },
];

const Certification = () => {
  useEffect(() => {
    Aos.init({ duration: 900, easing: "ease-in-out", once: false });
  }, []);

  return (
    <section className="min-h-screen bg-[#0f172a] text-white flex flex-col px-6 py-16">
      {/* Heading */}
      <div
        className="flex items-center gap-4 mb-12 max-w-4xl mx-auto"
        data-aos="fade-right"
      >
        <h2 className="text-3xl font-bold text-orange-400 whitespace-nowrap">
          Certification
        </h2>
        <hr className="flex-grow border-t border-orange-600 opacity-60" />
      </div>

      {/* Grid layout for responsiveness */}
      <div
        className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto"
        data-aos="fade-up"
      >
        {certificates.map(({ id, title, image, website, country, issued }) => (
          <div
            key={id}
            className="bg-[#1e293b] rounded-xl p-6 shadow-md flex flex-col"
            data-aos="zoom-in"
            data-aos-delay={id * 150}
          >
            {/* Image */}
            <img
              src={image}
              alt="Programming Hero Logo"
              className="w-20 h-20 object-contain rounded-lg mb-4"
            />

            {/* Info */}
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-orange-400 hover:underline mb-2"
            >
              Programming Hero <FaExternalLinkAlt className="text-sm" />
            </a>
            <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
            <p className="text-gray-400 mb-1">Country: {country}</p>
            <p className="text-gray-400">Issued: {issued}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certification;
