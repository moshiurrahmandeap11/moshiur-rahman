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
        const res = await axios.get("http://localhost:3000/blogs");
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
      const res = await axios.post("http://localhost:3000/loves", {
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
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-6"
      data-aos="fade-up"
    >
      <h1 className="text-4xl font-extrabold mb-8 text-orange-400 text-center">
        Latest Blogs
      </h1>

      <div className="flex flex-col gap-8">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          blogs.map(({ _id, thumbnail, title, content, loves = [] }) => {
            const isLoved = loves.includes(firebaseUid);

            return (
              <div
                key={_id}
                className="flex flex-col md:flex-row lg:max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
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
                    <div onClick={() => navigate(`/blog/${_id}`)}>

                    <h2 className="text-2xl font-bold mb-3 text-orange-400">
                      {title}
                    </h2>
                    </div>
                    <div
                      className="text-gray-300 whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: truncateHTML(content, 40),
                      }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => navigate(`/blog/${_id}`)}
                      className="text-orange-400 hover:text-orange-600 transition font-semibold"
                    >
                      See More →
                    </button>

                    {/* ❤️ Love Button */}
                    <button
                      onClick={() => handleLoveToggle(_id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                        isLoved ? "bg-pink-600" : "bg-gray-700"
                      } text-white hover:scale-105 transition`}
                    >
                      ❤️ {loves.length || 0}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Blogs;
