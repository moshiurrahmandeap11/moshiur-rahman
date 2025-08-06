import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaShareAlt,
  FaArrowLeft,
  FaThumbsUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [likeCounts, setLikeCounts] = useState({});
  const [likedByUser, setLikedByUser] = useState({});

  // Fetch blog and comments
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://moshiur-rahman-server.vercel.app/blogs/${id}`);
        setBlog(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://moshiur-rahman-server.vercel.app/comments/${id}`);
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

useEffect(() => {
  if (comments.length === 0) return;

  const fetchLikesData = async () => {
    try {
      // Always fetch like counts for all comments
      const countsPromises = comments.map((c) =>
        axios.get(`https://moshiur-rahman-server.vercel.app/comments/like-count/${c._id}`)
      );

      const countsResponses = await Promise.all(countsPromises);
      const newLikeCounts = {};
      countsResponses.forEach((res) => {
        if (res.data.success) {
          const commentId = res.config.url.split("/").pop();
          newLikeCounts[commentId] = res.data.count;
        }
      });
      setLikeCounts(newLikeCounts);

      // Only fetch likedByUser if user logged in
      if (user) {
        const likedPromises = comments.map((c) =>
          axios.get(`https://moshiur-rahman-server.vercel.app/comments/liked/${c._id}`, {
            params: { userId: user.uid },
          })
        );
        const likedResponses = await Promise.all(likedPromises);

        const newLikedByUser = {};
        likedResponses.forEach((res) => {
          if (res.data.success) {
            const commentId = res.config.url.split("/").pop();
            newLikedByUser[commentId] = res.data.liked;
          }
        });
        setLikedByUser(newLikedByUser);
      } else {
        // If no user logged in, clear likedByUser state to empty
        setLikedByUser({});
      }
    } catch (err) {
      console.error("Failed to fetch like data:", err);
    }
  };

  fetchLikesData();
}, [comments, user]);


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

    if (!comment.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please write a comment!",
      });
      return;
    }

    try {
      const res = await axios.post("https://moshiur-rahman-server.vercel.app/comments", {
        blogId: id,
        username: user.displayName || "Anonymous",
        photoURL: user.photoURL || "",
        content: comment,
      });

      if (res.data.success || res.data.insertedId) {
        setComments((prev) => [
          {
            _id: res.data.insertedId || Math.random().toString(36),
            blogId: id,
            username: user.displayName || "Anonymous",
            photoURL: user.photoURL || "",
            content: comment,
            createdAt: new Date(),
            likes: 0,
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

  const handleLikeComment = async (commentId) => {
    if (!user) {
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
      const res = await axios.post("https://moshiur-rahman-server.vercel.app/comments/like", {
        commentId,
        userId: user.uid,
      });

      if (res.data.success) {
        setLikeCounts((prev) => ({
          ...prev,
          [commentId]: res.data.liked
            ? (prev[commentId] || 0) + 1
            : Math.max((prev[commentId] || 1) - 1, 0),
        }));

        setLikedByUser((prev) => ({
          ...prev,
          [commentId]: res.data.liked,
        }));
      }
    } catch (error) {
      console.error("Failed to like comment:", error);
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
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-orange-400 hover:text-orange-600 font-semibold mb-6"
        >
          <FaArrowLeft /> Back
        </button>

        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-400 mb-6">
          By <span className="font-semibold">Moshiur Rahman</span> |{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full rounded-md mb-6 object-cover max-h-96"
          />
        )}

        <article
          className="prose prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="flex items-center gap-4 mb-6">
          <span className="text-gray-400 font-semibold flex items-center gap-1">
            <FaShareAlt /> Share:
          </span>

          <a
            href={shareUrls.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href={shareUrls.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>

        <hr className="border-gray-600 opacity-40 my-6" />

        <div className="space-y-6 mt-6">
          <h3 className="text-xl font-bold">Comments</h3>

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

          <div className="mt-6 space-y-4">
            {loadingComments ? (
              <p className="text-gray-400">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-gray-500 italic">No comments yet. Be the first!</p>
            ) : (
              comments.map((c) => (
                <div
                  key={c._id}
                  className="bg-gray-800 p-4 rounded-md border border-gray-700 flex gap-4 items-start"
                >
                  <img
                    src={
                      c.photoURL ||
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(c.username)
                    }
                    alt="user avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold text-orange-400">
                        {c.username || "Anonymous"}
                      </h4>
                      <span className="text-sm ml-3 text-gray-500">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-300 whitespace-pre-line">{c.content}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleLikeComment(c._id)}
                        className={`text-sm flex items-center gap-1 font-semibold ${
                          likedByUser[c._id]
                            ? "text-orange-600"
                            : "text-orange-400 hover:underline"
                        }`}
                      >
                        <FaThumbsUp />
                        {likedByUser[c._id] ? "Liked" : "Like"}
                      </button>
                      <span className="text-sm text-gray-400">
                        {likeCounts[c._id] || 0} Likes
                      </span>
                    </div>
                  </div>
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
