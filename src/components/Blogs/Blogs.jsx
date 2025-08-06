import React, { useEffect, useState } from "react";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });

    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/blogs");
        setBlogs(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };

    fetchBlogs();
  }, []);

  const truncateContent = (content, wordLimit = 40) => {
    const words = content.split(" ");
    if (words.length <= wordLimit) return content;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div
      className="min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-6"
      data-aos="fade-up"
    >
      <h1 className="text-4xl font-extrabold mb-8 text-orange-400 text-center">
        Latest Blogs
      </h1>

      <div className="flex flex-col gap-8">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          blogs.map(({ _id, thumbnail, title, content }) => (
            <div
              key={_id}
              onClick={() => navigate(`/blog/${_id}`)}
              className="flex flex-col md:flex-row max-w-8/12 mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden"
              data-aos="fade-up"
            >
              {/* Thumbnail */}
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full md:w-64 h-64 object-cover"
                />
              )}

              {/* Text Content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-orange-400">
                    {title}
                  </h2>
                  <p className="text-gray-300 whitespace-pre-line">
                    {truncateContent(content, 40)}
                  </p>
                </div>

                {/* Button */}
                {content.split(" ").length > 40 && (
                  <button
                    onClick={() => navigate(`/blog/${_id}`)}
                    className="mt-4 text-orange-400 hover:text-orange-600 transition font-semibold self-start"
                  >
                    See More →
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
