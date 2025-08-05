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

  const truncateContent = (content, wordLimit = 50) => {
    const words = content.split(" ");
    if (words.length <= wordLimit) return content;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-6"
      data-aos="fade-up"
    >
      <h1 className="text-4xl font-extrabold mb-8 text-orange-400 text-center">
        Latest Blogs
      </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">Loading...</p>
        ) : (
          blogs.map(({ _id, thumbnail, title, content }) => (
            <article
              key={_id}
              className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col"
              data-aos="fade-up"
            >
              {/* Thumbnail on top */}
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h2 className="font-bold text-xl mb-3">{title}</h2>

                {/* Content snippet */}
                <p className="flex-grow text-gray-300 whitespace-pre-line mb-4">
                  {truncateContent(content, 50)}
                </p>

                {/* Show More navigates to detailed blog */}
                {content.split(" ").length > 50 && (
                  <button
                    onClick={() => navigate(`/blog/${_id}`)}
                    className="self-start text-orange-400 hover:text-orange-600 transition font-semibold"
                  >
                    Show More
                  </button>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
