import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";  // 👈 import SweetAlert2
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaShareAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";


const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // 👈 get user from context
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/blogs/${id}`);
        setBlog(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/comments/${id}`);
        setComments(res.data.data || []);
        setLoadingComments(false);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        setLoadingComments(false);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]);

  const currentURL = window.location.href;
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentURL
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentURL
    )}&text=${encodeURIComponent(blog?.title || "")}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentURL
    )}`,
  };

const handleCommentSubmit = async () => {
  if (!user) {
    let timerInterval;
    let countdown = 5;

    Swal.fire({
      icon: "warning",
      title: "You need to be logged in to comment",
      html: `Redirecting to login page in <b>${countdown}</b> seconds...`,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          countdown -= 1;
          b.textContent = countdown;
        }, 1000);
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });

    setTimeout(() => {
      navigate("/login", { state: { from: location.pathname } });
    }, 3000);

    return;
  }

  if (!comment.trim()) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please write a comment!",
    });
    return;
  }

  try {
    const res = await axios.post("http://localhost:3000/comments", {
      blogId: id,
      username: user.displayName || "Anonymous",
      content: comment,
    });

    if (res.data.success || res.data.insertedId) {
      setComments((prev) => [
        {
          _id: res.data.insertedId || Math.random().toString(36),
          blogId: id,
          username: user.displayName || "Anonymous",
          content: comment,
          createdAt: new Date(),
        },
        ...prev,
      ]);
      setComment("");
      Swal.fire({
        icon: "success",
        title: "Comment submitted!",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    console.error("Failed to submit comment", error);
    Swal.fire({
      icon: "error",
      title: "Failed to submit comment",
      text: "Please try again later.",
    });
  }
};


  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6">
        Loading blog...
      </div>
    );
  }

  return (
    <section className="bg-black py-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-md shadow-lg mt-8 min-h-screen"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-orange-400 hover:text-orange-600 font-semibold mb-6"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>

        {/* Author & Date */}
        <p className="text-sm text-gray-400 mb-6">
          By <span className="font-semibold">Moshiur Rahman</span> |{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {/* Thumbnail */}
        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full rounded-md mb-6 object-cover max-h-96"
          />
        )}

        {/* Content rendered as HTML */}
        <article
          className="prose prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Social Share */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-gray-400 font-semibold flex items-center gap-1">
            <FaShareAlt /> Share:
          </span>

          <a
            href={shareUrls.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
            title="Share on Facebook"
          >
            <FaFacebookF size={20} />
          </a>

          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            title="Share on Twitter"
          >
            <FaTwitter size={20} />
          </a>

          <a
            href={shareUrls.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition"
            title="Share on LinkedIn"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>

        {/* Divider */}
        <hr className="border-gray-600 opacity-40 my-6" />

        {/* Comment Section */}
        <div className="space-y-6 mt-6">
          <h3 className="text-xl font-bold">Comments</h3>

          {/* Comment Form */}
          <div className="space-y-3">
            <textarea
              className="w-full p-3 rounded bg-gray-800 text-white resize-none border border-gray-600 focus:outline-none focus:border-orange-500"
              rows={4}
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="px-6 py-2 bg-orange-500 rounded hover:bg-orange-600 transition text-white font-semibold"
            >
              Submit Comment
            </button>
          </div>

          {/* All Comments */}
          <div className="mt-6 space-y-4">
            {loadingComments ? (
              <p className="text-gray-400">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-gray-500 italic">
                No comments yet. Be the first!
              </p>
            ) : (
              comments.map((c) => (
                <div
                  key={c._id}
                  className="bg-gray-800 p-4 rounded-md border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-orange-400">
                      {c.username || "Anonymous"}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-300 whitespace-pre-line">{c.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Blog;
