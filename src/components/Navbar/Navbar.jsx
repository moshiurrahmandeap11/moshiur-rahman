import React, { useState, useEffect, Fragment } from "react";
import profilePic from "../../assets/profile.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaStarSolid } from "react-icons/lia";
import cv from "../../assets/moshiurcv.pdf";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

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

  const toggleDropdown = () => setOpen(!open);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const scrollToSection = (id) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Fetch review stats from backend
  const fetchStats = async () => {
    try {
      const res = await axios.get("https://moshiur-rahman-server.onrender.com/reviews/stats");
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
      await axios.post("https://moshiur-rahman-server.onrender.com/reviews", reviewData);
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
    <div className="lg:w-11/12 mx-auto px-4 py-4 flex items-center justify-between relative">
      <div className="flex items-center gap-2">
        <img
          src={profilePic}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover"
        />
      </div>

      <div className="flex items-center gap-4 relative">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 px-3 py-1 border border-yellow-300 rounded-full bg-yellow-100 shadow-sm hover:scale-105 transition-all cursor-pointer"
            onClick={openModal}
          >
            <LiaStarSolid className="text-yellow-500" size={20} />
            <p className="text-sm font-medium text-gray-800">
             ({reviewStats.count})
            </p>
          </div>

          <a
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block group text-black font-semibold px-4 py-2 border border-orange-400 rounded-full overflow-hidden text-sm hover:shadow-lg"
          >
            <span className="relative z-10 group-hover:text-white transition duration-300">
              Curriculum Vitae
            </span>
            <span className="absolute left-0 bottom-0 w-full h-full bg-orange-400 z-0 transform scale-x-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        </div>

        <button
          onClick={toggleDropdown}
          className={`p-2 cursor-pointer rounded-md border transition-transform duration-200 ${
            open ? "rotate-90 scale-110 border-black" : "border-gray-300"
          }`}
        >
          <GiHamburgerMenu size={24} className="text-gray-700" />
        </button>

        <div
          className={`absolute right-0 top-14 w-56 origin-top-right transform transition-all duration-500 ease-in-out z-50 ${
            open
              ? "scale-100 opacity-100 rotate-0"
              : "scale-75 opacity-0 -rotate-12 pointer-events-none"
          }`}
        >
          <ul className="overflow-hidden rounded-xl shadow-lg bg-white">
            {menuItems.map(({ label, bg, scrollToId }, i) => (
              <li
                key={i}
                className={`${bg} px-5 py-3 text-sm font-medium text-gray-800 hover:bg-opacity-90 transition-all cursor-pointer border-b`}
                onClick={() => scrollToSection(scrollToId)}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Review Modal */}
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0 bg-transparent backdrop-blur-3xl bg-opacity-25 flex justify-center items-center px-4">
                <Dialog.Panel className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
                  <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
                    Give a Review ✍️
                  </Dialog.Title>

                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border rounded p-2 text-sm text-gray-700 mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border rounded p-2 text-sm text-gray-700 mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <LiaStarSolid
                        key={num}
                        size={24}
                        className={`cursor-pointer ${
                          num <= rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                        onClick={() => setRating(num)}
                      />
                    ))}
                  </div>

                  <textarea
                    className="w-full border rounded p-2 text-sm text-gray-700"
                    placeholder="Write your review here..."
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReviewSubmit}
                      className="px-4 py-2 rounded bg-yellow-400 text-white font-medium hover:bg-yellow-500 text-sm"
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default Navbar;
