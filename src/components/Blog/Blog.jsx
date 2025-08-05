import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaShareAlt,
  FaArrowLeft,
} from "react-icons/fa";

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/blogs/${id}`);
        setBlog(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };
    fetchBlog();
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

  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      alert("Please write a comment!");
      return;
    }
    alert(`Comment submitted: ${comment}`);
    setComment("");
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
      <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-md shadow-lg mt-8 min-h-screen">
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
        <hr className="border-gray-600 opacity-40 mb-6" />

        {/* Comment Section */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold mb-2">Leave a Comment</h3>
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
      </div>
    </section>
  );
};

export default Blog;
