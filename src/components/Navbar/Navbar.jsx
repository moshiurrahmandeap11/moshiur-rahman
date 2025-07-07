import React, { useState } from "react";
import profilePic from "../../assets/profile.jpg";
import { GiHamburgerMenu } from "react-icons/gi";

const menuItems = [
  { label: "Home", scrollToId: "hero", bg: "bg-orange-100" },
  { label: "My Self", scrollToId: "myportfolio", bg: "bg-rose-100" },
  { label: "Experience", scrollToId: "experience", bg: "bg-yellow-100" },
  { label: "My Work", scrollToId: "worked", bg: "bg-green-100" },
  { label: "Reviews", scrollToId: "reviews", bg: "bg-blue-100" },
  {
    label: "Certifications",
    scrollToId: "certifications",
    bg: "bg-purple-100",
  },
  { label: "Contact", scrollToId: "contact", bg: "bg-pink-100" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  const scrollToSection = (id) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="lg:w-11/12 mx-auto px-4 py-4 flex items-center justify-between relative">
      {/* Profile */}
      <div className="flex items-center gap-2">
        <img
          src={profilePic}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover border"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 relative">
        {/* CV Button */}
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block group text-black font-semibold px-4 py-2 border border-orange-400 rounded overflow-hidden text-sm"
        >
          <span className="relative z-10 group-hover:text-white transition duration-300">
            Curriculum Vitae
          </span>
          <span className="absolute left-0 bottom-0 w-full h-full bg-orange-400 z-0 transform scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </a>

        {/* Hamburger Button */}
        <button
          onClick={toggleDropdown}
          className={`p-2 cursor-pointer rounded-md border transition-transform duration-200 ${
            open ? "rotate-90 scale-110 border-black" : "border-gray-300"
          }`}
        >
          <GiHamburgerMenu size={24} className="text-gray-700" />
        </button>

        {/* Animated Dropdown Menu */}
        <div
          className={`absolute right-0 top-14 w-56 origin-top-right transform transition-all duration-500 ease-in-out z-50 ${
            open
              ? "scale-100 opacity-100 rotate-0"
              : "scale-75 opacity-0 -rotate-12 pointer-events-none"
          }`}
        >
          <ul className="overflow-hidden rounded-xl shadow-lg">
            {menuItems.map(({ label, bg, scrollToId }, i) => (
              <li
                key={i}
                className={`${bg} px-5 py-3 text-sm font-medium text-gray-800 hover:bg-opacity-90 transition-all cursor-pointer border-b`}
                onClick={() => {
                  if (scrollToId) scrollToSection(scrollToId);
                  else setOpen(false);
                }}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
