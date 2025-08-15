import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router";

import { toast } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const firebaseUid = user?.uid;

  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });

    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://moshiur-rahman-server.vercel.app/blogs");
        setBlogs(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
        toast.error("Failed to fetch blogs!");
      }
    };

    fetchBlogs();
  }, []);

  const truncateHTML = (html, wordLimit = 40) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.innerText || div.textContent || "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const handleLoveToggle = async (blogId) => {
    if (!firebaseUid) {
      Swal.fire({
        icon: "warning",
        title: "You need to be logged in to comment",
        html: `Redirecting to login in <b>3</b> seconds...`,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          const b = Swal.getHtmlContainer().querySelector("b");
          let count = 3;
          const interval = setInterval(() => {
            b.textContent = --count;
            if (count === 0) clearInterval(interval);
          }, 1000);
          Swal.showLoading();
        },
      });
      setTimeout(() => {
        navigate("/login", { state: { from: location.pathname } });
      }, 3000);
      return;
    }

    try {
      const res = await axios.post("https://moshiur-rahman-server.vercel.app/loves", {
        blogId,
        userId: firebaseUid,
      });

      // update the UI
      const updatedBlogs = blogs.map((blog) =>
        blog._id === blogId ? { ...blog, loves: res.data.loves } : blog
      );
      setBlogs(updatedBlogs);
      toast.success("You loved this blog!");
    } catch (error) {
      toast.error("Error toggling love: " + error.message);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(234,179,8,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.05),transparent_50%)]"></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-yellow-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-orange-300/10 rounded-full animate-bounce"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8" data-aos="fade-up">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-orange-400/20 blur-2xl rounded-full"></div>
            <h1 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Latest Blogs
            </h1>
          </div>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Blogs Container */}
        <div className="max-w-7xl mx-auto space-y-8">
          {blogs.length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-orange-400/20 border-t-orange-400 rounded-full animate-spin mx-auto mb-4"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-yellow-400/50 rounded-full animate-spin mx-auto"></div>
                </div>
                <p className="text-white/60 text-lg">Loading amazing content...</p>
              </div>
            </div>
          ) : (
            blogs.map(({ _id, thumbnail, title, content, loves = [] }, index) => {
              const isLoved = loves.includes(firebaseUid);

              return (
                <div
                  key={_id}
                  className="group relative"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* 3D Glass Card */}
                  <div className="relative transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-orange-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Main Card */}
                    <div className="relative backdrop-blur-2xl bg-gradient-to-br from-gray-900/80 via-slate-900/85 to-gray-800/80 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="flex flex-col lg:flex-row relative z-10">
                        {/* Thumbnail Section */}
                        {thumbnail && (
                          <div className="relative lg:w-80 flex-shrink-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <img
                              src={thumbnail}
                              alt={title}
                              className="w-full h-64 lg:h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
                          </div>
                        )}

                        {/* Content Section */}
                        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                          <div>
                            {/* Title */}
                            <div 
                              onClick={() => navigate(`/blog/${_id}`)}
                              className="cursor-pointer group/title mb-4"
                            >
                              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover/title:bg-gradient-to-r group-hover/title:from-orange-400 group-hover/title:to-yellow-400 group-hover/title:bg-clip-text group-hover/title:text-transparent transition-all duration-300 leading-tight">
                                {title}
                              </h2>
                              <div className="w-0 group-hover/title:w-full h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-300 mt-2"></div>
                            </div>

                            {/* Content Preview */}
                            <div
                              className="text-white/80 text-sm sm:text-base leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: truncateHTML(content, 40),
                              }}
                            />
                          </div>

                          {/* Actions */}
                          <div className="mt-6 lg:mt-8 flex items-center justify-between">
                            {/* Read More Button */}
                            <button
                              onClick={() => navigate(`/blog/${_id}`)}
                              className="group/btn relative px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                              <div className="absolute inset-0 border border-white/20 rounded-xl group-hover/btn:border-orange-400/60 transition-colors duration-300"></div>
                              <span className="relative text-white/90 group-hover/btn:text-white font-semibold flex items-center gap-2">
                                Read More 
                                <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                              </span>
                            </button>

                            {/* Love Button */}
                            <button
                              onClick={() => handleLoveToggle(_id)}
                              className={`group/love relative px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                                isLoved 
                                  ? "bg-gradient-to-r from-pink-500/80 to-red-500/80 border border-pink-400/50 shadow-lg shadow-pink-500/25" 
                                  : "bg-white/10 border border-white/20 hover:border-pink-400/50 hover:bg-pink-500/20"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`text-lg transform transition-transform duration-200 ${isLoved ? "scale-125" : "group-hover/love:scale-110"}`}>
                                  {isLoved ? "💖" : "🤍"}
                                </span>
                                <span className={`text-sm font-semibold ${isLoved ? "text-white" : "text-white/80 group-hover/love:text-white"}`}>
                                  {loves.length || 0}
                                </span>
                              </div>
                              
                              {/* Ripple Effect */}
                              <div className={`absolute inset-0 rounded-xl opacity-0 ${isLoved ? "animate-pulse bg-pink-400/20" : ""}`}></div>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Glow */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Spacer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Blogs;