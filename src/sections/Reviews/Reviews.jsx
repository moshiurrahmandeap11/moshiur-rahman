import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";

// helper: split array into chunks
const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [perSlide, setPerSlide] = useState(3);

  // Fetch reviews from backend
 useEffect(() => {
  const fetchReviews = async () => {
    try {
      const res = await axios.get("https://moshiur-rahman-server.vercel.app/reviews");
      // Only include 5-star reviews
      const fiveStarOnly = (res.data || []).filter((r) => r.rating === 5);
      setReviews(fiveStarOnly);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  fetchReviews();
}, []);


  // init AOS and responsive breakpoints
  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });

    const handleResize = () => {
      const width = window.innerWidth;
      setPerSlide(width < 1024 ? 1 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = chunkArray(reviews, perSlide);

  // auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="min-h-screen bg-[#0f172a] text-white flex flex-col justify-center px-4">
      {/* heading */}
      <div className="flex items-center justify-center gap-4 mb-10" data-aos="fade-right">
        <h2 className="text-3xl font-bold text-orange-400 whitespace-nowrap">Some Reviews</h2>
        <hr className="w-full max-w-xs border-t border-orange-600 opacity-60" />
      </div>

      {/* slides */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${slideIndex * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((group, slideIdx) => (
            <div
              key={slideIdx}
              className="w-full flex justify-center items-center gap-6 px-4 flex-shrink-0 max-w-screen-xl mx-auto"
              style={{ width: "100%" }}
            >
              {group.map((review, index) => (
                <div
                  key={index}
                  className="bg-[#1e293b] w-full sm:w-[90%] md:w-[80%] lg:w-[30%] p-4 rounded-xl shadow-md transition-transform duration-500 hover:scale-[1.02]"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <p className="text-gray-300 text-sm italic mb-4 leading-relaxed">“{review.review}”</p>
                  <div className="text-xs text-gray-400 mt-auto flex flex-col items-end">
                    <span className="font-semibold text-orange-400">{review.reviewer}</span>
                    <span className="italic">{review.email || "No Email"}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
