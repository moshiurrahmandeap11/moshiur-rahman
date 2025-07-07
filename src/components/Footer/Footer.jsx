import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 900, easing: "ease-in-out", once: false });
  }, []);

  return (
    <footer className=" pb-40 bg-[#0f172a] text-white flex flex-col justify-center items-center px-6 text-center">
      {/* Get In Touch */}
      <h3
        className="text-4xl font-bold text-orange-400 mb-4"
        data-aos="fade-down"
      >
        Get In Touch
      </h3>

      {/* Let's Work Together */}
      <h2
        className="text-2xl font-semibold mb-6"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        Let's Work Together
      </h2>

      {/* Description */}
      <p
        className="max-w-xl text-gray-300 mb-8 leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        I’m open for new opportunities – especially ambitious or large projects.
        However, my inbox is always open. Whether you have a question or just want
        to say hi, I’ll try my best to get back to you!
      </p>

      {/* Button */}
      <button
        className="relative inline-block px-8 py-3 border-2 border-orange-400 text-orange-400 font-semibold rounded-full overflow-hidden group hover:text-white transition-colors duration-300"
        data-aos="zoom-in"
        data-aos-delay="450"
      >
        <span className="relative z-10">Say Hello World!</span>
        {/* Animated fill effect */}
        <span
          className="absolute inset-0 bg-orange-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
          style={{ transformOrigin: "left" }}
        ></span>
      </button>
    </footer>
  );
};

export default Footer;
