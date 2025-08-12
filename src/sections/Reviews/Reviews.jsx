import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";

// Swiper.js এর প্রয়োজনীয় কম্পোনেন্ট ও স্টাইল ইম্পোর্ট করুন
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  // Backend থেকে রিভিউ ডেটা Fetch করা হচ্ছে
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          "https://moshiur-rahman-server.vercel.app/reviews"
        );
        // শুধুমাত্র ৫ স্টার রেটিং এর রিভিউগুলো দেখানো হচ্ছে
        const fiveStarOnly = (res.data || []).filter((r) => r.rating === 5);
        setReviews(fiveStarOnly);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  // AOS (Animate On Scroll) ইনিশিয়ালাইজ করা
  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="min-h-screen bg-[#0f172a] text-white flex flex-col justify-center items-center px-4 py-16">
      {/* হেডিং */}
      <div
        className="flex items-center justify-center gap-4 mb-10 w-full max-w-screen-xl"
        data-aos="fade-right"
      >
        <h2 className="text-3xl font-bold text-orange-400 whitespace-nowrap">
          Some Reviews
        </h2>
        <hr className="w-full max-w-xs border-t border-orange-600 opacity-60" />
      </div>

      {/* Swiper স্লাইডার */}
      <div className="w-full max-w-screen-xl">
        <Swiper
          modules={[Pagination, Autoplay, A11y]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          grabCursor={true}
          // রেসপন্সিভ ব্রেকপয়েন্ট
          breakpoints={{
            // যখন স্ক্রিনের প্রস্থ 0px বা তার বেশি
            0: {
              slidesPerView: 1,
            },
            // যখন স্ক্রিনের প্রস্থ 768px বা তার বেশি
            768: {
              slidesPerView: 2,
            },
            // যখন স্ক্রিনের প্রস্থ 1024px বা তার বেশি
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper" // কাস্টম স্টাইলিং এর জন্য ক্লাস
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="self-stretch">
              <div
                className="bg-[#1e293b] h-full p-6 rounded-xl shadow-lg flex flex-col transition-transform duration-500 hover:scale-[1.02]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <p className="text-gray-300 text-sm italic mb-4 leading-relaxed">
                  “{review.review}”
                </p>
                <div className="text-xs text-gray-400 mt-auto flex flex-col items-end">
                  <span className="font-semibold text-orange-400">
                    {review.reviewer}
                  </span>
                  <span className="italic">
                    {review.email || "No Email"}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;