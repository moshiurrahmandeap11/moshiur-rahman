import React, { useState, useEffect, Fragment, useContext } from "react";
import profilePic from "../../assets/profile.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaStarSolid } from "react-icons/lia";
import cv from "../../assets/resume.pdf";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const menuItems = [
  { label: "Home", scrollToId: "hero", bg: "bg-orange-100" },
  { label: "My Self", scrollToId: "myportfolio", bg: "bg-rose-100" },
  { label: "Experience", scrollToId: "experience", bg: "bg-yellow-100" },
  { label: "My Work", scrollToId: "worked", bg: "bg-green-100" },
  { label: "Reviews", scrollToId: "reviews", bg: "bg-blue-100" },
  { label: "Certifications", scrollToId: "certifications", bg: "bg-purple-100" },
  { label: "Contact", scrollToId: "contact", bg: "bg-pink-100" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewStats, setReviewStats] = useState({ count: 0, avg: 0 });
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setOpen(!open);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Track scroll for navbar background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✨ Handles scroll + route nav if user is on another page
  const scrollToSection = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToId: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // 🤝 If redirected to home, scroll to the desired section
  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollToId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(location.state.scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [location]);

  const fetchStats = async () => {
    try {
      const res = await axios.get("https://moshiur-rahman-server.vercel.app/reviews/stats");
      setReviewStats(res.data);
    } catch (err) {
      console.error("Error fetching review stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleReviewSubmit = async () => {
    if (!review.trim() || rating === 0) {
      alert("Please provide a rating and review!");
      return;
    }

    const reviewData = {
      reviewer: name || "Anonymous",
      email: email || "not_provided@example.com",
      review,
      rating,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("https://moshiur-rahman-server.vercel.app/reviews", reviewData);
      setReview("");
      setName("");
      setEmail("");
      setRating(0);
      fetchStats();
      closeModal();
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review, try again later.");
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled 
        ? 'backdrop-blur-xl bg-gradient-to-r from-gray-900/80 via-slate-900/85 to-gray-800/80 shadow-2xl border-b border-white/10' 
        : 'backdrop-blur-md bg-gradient-to-r from-gray-900/40 via-slate-900/45 to-gray-800/40'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between relative">
          {/* Logo Section */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-60 group-hover:opacity-100 blur transition duration-300"></div>
              <img
                src={profilePic}
                alt="Profile"
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover cursor-pointer border-2 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
                onClick={() => scrollToSection("hero")}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Review Button */}
            <div
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-orange-400/60 backdrop-blur-sm bg-white/5 hover:bg-white/10 shadow-lg hover:shadow-orange-400/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={openModal}
            >
              <LiaStarSolid className="text-yellow-400 group-hover:text-yellow-300 transition-colors" size={18} />
              <p className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                ({reviewStats.count})
              </p>
            </div>

            {/* Blogs Link */}
            <a 
              href="/blogs" 
              className="group relative px-5 py-2 rounded-full border border-white/20 hover:border-orange-400/60 backdrop-blur-sm bg-white/5 hover:bg-orange-400/20 shadow-lg hover:shadow-orange-400/20 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                Blogs
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            {/* CV Link */}
            <a 
              href={cv} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative px-5 py-2 rounded-full border border-white/20 hover:border-orange-400/60 backdrop-blur-sm bg-white/5 hover:bg-orange-400/20 shadow-lg hover:shadow-orange-400/20 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                Curriculum Vitae
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            {/* Review Button - Mobile */}
            <div
              className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 rounded-full border border-white/20 backdrop-blur-sm bg-white/5 shadow-md cursor-pointer hover:bg-white/10 transition-all"
              onClick={openModal}
            >
              <LiaStarSolid className="text-yellow-400" size={16} />
              <p className="text-xs sm:text-sm font-medium text-white/90">({reviewStats.count})</p>
            </div>

            {/* Blogs - Mobile */}
            <a 
              href="/blogs" 
              className="px-2 py-1 sm:px-3 sm:py-2 rounded-full border border-white/20 backdrop-blur-sm bg-white/5 shadow-md hover:bg-white/10 transition-all"
            >
              <span className="text-xs sm:text-sm font-medium text-white/90">Blogs</span>
            </a>

            {/* CV - Mobile */}
            <a 
              href={cv} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-2 py-1 sm:px-3 sm:py-2 rounded-full border border-white/20 backdrop-blur-sm bg-white/5 shadow-md hover:bg-white/10 transition-all"
            >
              <span className="text-xs sm:text-sm font-medium text-white/90">CV</span>
            </a>
          </div>

          {/* Profile/Menu Button */}
          <div className="relative flex-shrink-0 ml-2 sm:ml-4">
            {user ? (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-60 group-hover:opacity-100 blur transition duration-300"></div>
                <img
                  src={user.photoURL || profilePic}
                  onClick={toggleDropdown}
                  className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 hover:border-white/40 object-cover cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    open ? "ring-2 ring-orange-400/60 ring-offset-2 ring-offset-transparent scale-105" : ""
                  }`}
                  alt="User Profile"
                />
              </div>
            ) : (
              <button
                onClick={toggleDropdown}
                className={`relative p-2 sm:p-2.5 cursor-pointer rounded-full border border-white/20 hover:border-orange-400/60 backdrop-blur-sm bg-white/5 hover:bg-white/10 shadow-lg hover:shadow-orange-400/20 transition-all duration-300 transform hover:scale-105 ${
                  open ? "rotate-90 scale-110 border-orange-400/60 bg-white/10" : ""
                }`}
              >
                <GiHamburgerMenu size={20} className="text-white/90" />
              </button>
            )}

            {/* Dropdown Menu */}
            <div className={`absolute right-0 top-full mt-2 w-56 sm:w-64 origin-top-right transform transition-all duration-300 ease-out z-50 ${
              open ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
            }`}>
              <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 via-slate-900/90 to-gray-800/90 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="py-2">
                  {menuItems.map(({ label, scrollToId }, i) => (
                    <button
                      key={i}
                      className="w-full px-5 py-3 text-left text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-3 group"
                      onClick={() => scrollToSection(scrollToId)}
                    >
                      <div className="w-2 h-2 rounded-full bg-orange-400/60 group-hover:bg-orange-400 transition-colors"></div>
                      {label}
                    </button>
                  ))}
                  {user && (
                    <>
                      <div className="mx-4 my-2 h-px bg-white/10"></div>
                      <button
                        className="w-full px-5 py-3 text-left text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all duration-200 flex items-center gap-3 group"
                        onClick={() => {
                          logout();
                          setOpen(false);
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-red-400/60 group-hover:bg-red-400 transition-colors"></div>
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-xl bg-gradient-to-br from-gray-900/60 via-slate-900/70 to-gray-800/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl backdrop-blur-2xl bg-gradient-to-br from-gray-900/85 via-slate-900/90 to-gray-800/85 p-6 text-left align-middle shadow-2xl transition-all border border-white/10">
                  <Dialog.Title className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-60 blur"></div>
                      <LiaStarSolid className="relative text-yellow-400" size={28} />
                    </div>
                    Give a Review
                  </Dialog.Title>

                  <div className="space-y-5">
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full border border-white/20 rounded-xl p-4 text-sm text-white placeholder-white/60 focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400/60 transition-all backdrop-blur-sm bg-white/10 hover:bg-white/15 focus:bg-white/15"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full border border-white/20 rounded-xl p-4 text-sm text-white placeholder-white/60 focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400/60 transition-all backdrop-blur-sm bg-white/10 hover:bg-white/15 focus:bg-white/15"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <div className="py-3">
                      <p className="text-white/80 text-sm mb-3 text-center font-medium">Rate your experience</p>
                      <div className="flex gap-2 justify-center">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                            <LiaStarSolid
                              size={32}
                              className={`relative cursor-pointer transition-all hover:scale-125 ${
                                num <= rating 
                                  ? "text-yellow-400 drop-shadow-lg" 
                                  : "text-white/30 hover:text-yellow-200"
                              }`}
                              onClick={() => setRating(num)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative group">
                      <textarea
                        className="w-full border border-white/20 rounded-xl p-4 text-sm text-white placeholder-white/60 focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400/60 transition-all backdrop-blur-sm bg-white/10 hover:bg-white/15 focus:bg-white/15 resize-none"
                        placeholder="Share your thoughts and experience..."
                        rows={5}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end gap-4">
                    <button 
                      onClick={closeModal} 
                      className="px-6 py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm font-medium backdrop-blur-sm hover:border-white/30 transform hover:scale-105"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleReviewSubmit} 
                      className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold hover:from-orange-500 hover:to-yellow-500 transition-all text-sm shadow-xl hover:shadow-2xl hover:shadow-orange-400/25 transform hover:scale-105 overflow-hidden"
                    >
                      <span className="relative z-10">Submit Review</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Navbar;