import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const reviews = [
  {
    id: 1,
    text: "Absolutely loved the experience working with Moshiur. Delivered high-quality code and maintained great communication throughout.",
    name: "Sarah J.",
    source: "Upwork",
  },
  {
    id: 2,
    text: "The platform Moshiur built for us helped streamline our business. Top-notch full-stack skills and professionalism.",
    name: "Akash Rahman",
    source: "Fiverr",
  },
  {
    id: 3,
    text: "Highly recommended for any MERN stack project. Clean UI and blazing fast performance.",
    name: "Daniel K.",
    source: "LinkedIn",
  },
  {
    id: 4,
    text: "This guy gets it. From Firebase auth to Mongo queries — he handled it all like a pro.",
    name: "Emily T.",
    source: "Freelancer.com",
  },
  {
    id: 5,
    text: "Working with Moshiur was a game-changer. Highly professional and incredibly fast delivery.",
    name: "Tanjim M.",
    source: "Facebook",
  },
  {
    id: 6,
    text: "Delivered beyond expectations. Very responsive and a pleasure to work with.",
    name: "Lina P.",
    source: "Upwork",
  },
  {
    id: 7,
    text: "The project was completed on time with impeccable quality. Would hire again!",
    name: "Mark W.",
    source: "Fiverr",
  },
  {
    id: 8,
    text: "Fantastic problem solver and coder. The UI looked sleek and performed flawlessly.",
    name: "Nadia R.",
    source: "LinkedIn",
  },
  {
    id: 9,
    text: "Communicated every step clearly and delivered a solid product.",
    name: "Carlos D.",
    source: "Freelancer.com",
  },
  {
    id: 10,
    text: "Great collaboration experience. Clean, modular code and great testing.",
    name: "Priya S.",
    source: "Facebook",
  },
  {
    id: 11,
    text: "Amazing full-stack skills, especially with React and Node.js.",
    name: "Jamal K.",
    source: "Upwork",
  },
  {
    id: 12,
    text: "Moshiur knows how to build scalable applications. Highly recommended.",
    name: "Sophie M.",
    source: "Fiverr",
  },
  {
    id: 13,
    text: "Fast turnaround and excellent quality. Made debugging painless.",
    name: "Alex T.",
    source: "LinkedIn",
  },
  {
    id: 14,
    text: "Handled complex backend logic like a champ. Would work with him again.",
    name: "Monica G.",
    source: "Freelancer.com",
  },
  {
    id: 15,
    text: "Very talented developer with great attention to detail.",
    name: "Ravi P.",
    source: "Facebook",
  },
  {
    id: 16,
    text: "Smooth communication and on-time delivery. The app runs perfectly.",
    name: "Jenna L.",
    source: "Upwork",
  },
  {
    id: 17,
    text: "Helped us migrate to MERN stack effortlessly. Top quality work.",
    name: "Hassan F.",
    source: "Fiverr",
  },
  {
    id: 18,
    text: "Professional, reliable, and super skilled. Highly satisfied client.",
    name: "Olivia C.",
    source: "LinkedIn",
  },
  {
    id: 19,
    text: "His codebase was clean, well-documented, and easy to maintain.",
    name: "Ethan B.",
    source: "Freelancer.com",
  },
  {
    id: 20,
    text: "Absolutely fantastic developer! Delivered an awesome product with all requested features.",
    name: "Maya N.",
    source: "Facebook",
  },
];


// Helper to split array into chunks of size N
const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const Reviews = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [perSlide, setPerSlide] = useState(3);

  // Group reviews into slides of N (perSlide)
  const slides = chunkArray(reviews, perSlide);

  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setPerSlide(1);
      else if (width < 1024) setPerSlide(2);
      else setPerSlide(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [slides.length]);

  return (
    <section className="h-screen bg-[#0f172a] text-white flex flex-col justify-center px-4">
      {/* Heading */}
      <div
        className="flex items-center justify-center gap-4 mb-10"
        data-aos="fade-right"
      >
        <h2 className="text-3xl font-bold text-orange-400 whitespace-nowrap">
          Some Reviews
        </h2>
        <hr className="w-full max-w-xs border-t border-orange-600 opacity-60" />
      </div>

      {/* Slide Wrapper */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${slideIndex * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((group, i) => (
            <div
              key={i}
              className="w-full flex justify-center items-center gap-6 px-4 flex-shrink-0"
              style={{ width: "100%", maxWidth: "1280px", margin: "0 auto" }}
            >
              {group.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#1e293b] w-full max-w-sm p-4 rounded-xl shadow-md transition-transform duration-500 hover:scale-[1.02]"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <p className="text-gray-300 text-sm italic mb-4 leading-relaxed">
                    “{review.text}”
                  </p>
                  <div className="text-xs text-gray-400 mt-auto flex flex-col items-end">
                    <span className="font-semibold text-orange-400">{review.name}</span>
                    <span className="italic">— {review.source}</span>
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
