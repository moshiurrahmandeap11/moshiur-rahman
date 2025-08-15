import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, User } from "lucide-react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://moshiur-rahman-server.vercel.app/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        // Filter only 5-star reviews
        const fiveStarOnly = (data || []).filter(r => r.rating === 5);
        setReviews(fiveStarOnly);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setReviews([]); // Set empty array on error
      }
    };

    fetchReviews();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && reviews.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % reviews.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, reviews.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const getSlidesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (reviews.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full"></div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            <Star 
              className="w-2 h-2 text-white/20 animate-pulse" 
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-6 mb-8 p-6 rounded-3xl backdrop-blur-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-2">
              <Quote className="w-8 h-8 text-orange-400" />
              <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Reviews
              </h2>
              <Quote className="w-8 h-8 text-purple-400 rotate-180" />
            </div>
          </div>
        </div>

        {/* Reviews Slider */}
        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`
            }}
          >
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="group relative h-full">
                  {/* Glassy Card */}
                  <div className="relative h-80 backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:border-white/30 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] group-hover:bg-gradient-to-br group-hover:from-white/15 group-hover:via-white/10 group-hover:to-white/5">
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Rating Stars */}
                    <div className="absolute top-4 right-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className="w-3 h-3 text-yellow-400 animate-pulse"
                          fill="currentColor"
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>

                    <div className="p-6 h-full flex flex-col">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <Quote className="w-8 h-8 text-orange-400/60" />
                      </div>

                      {/* Review Text with Scrollable Area */}
                      <div className="flex-grow mb-6">
                        <blockquote className="text-slate-300 text-base leading-relaxed italic max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400/50 scrollbar-track-white/10 pr-2">
                          "{review.review}"
                        </blockquote>
                      </div>

                      {/* Reviewer Info */}
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-400/50 shadow-lg">
                            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                        </div>
                        
                        <div className="flex-grow">
                          <h4 className="font-semibold text-white text-sm group-hover:text-orange-300 transition-colors duration-300">
                            {review.reviewer}
                          </h4>
                          <p className="text-slate-400 text-xs">
                            {review.email || "No Email"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/50 via-pink-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-110 group z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-orange-400 transition-colors duration-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-110 group z-10"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-orange-400 transition-colors duration-300" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-orange-400 shadow-lg shadow-orange-400/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl hover:from-white/15 hover:to-white/10 transition-all duration-300 hover:scale-105"
          >
            <span className="text-sm text-slate-300">
              Auto-play: <span className={isAutoPlaying ? 'text-green-400' : 'text-red-400'}>
                {isAutoPlaying ? 'ON' : 'OFF'}
              </span>
            </span>
          </button>
        </div>

        {/* Stats Section */}
        {/* <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "100+", label: "Happy Clients", icon: "👥" },
            { number: "5.0", label: "Average Rating", icon: "⭐" },
            { number: "50+", label: "Projects Completed", icon: "🚀" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-orange-400 mb-1">{stat.number}</div>
              <div className="text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Reviews;