// Admin.jsx
import React, { useEffect, useState, Fragment, useContext } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  FaChartBar,
  FaStar,
  FaEdit,
  FaPlus,
  FaSignOutAlt,
  FaRegEye,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { DeleteIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import axiosInstance from "../../hooks/axiosInstance";
import RichTextEditor from "../Richtexteditor/RichTextEditor";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Blog state
  const [blogTitle, setBlogTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [content, setContent] = useState("");
  const { logout } = useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });
    fetchReviews();
    fetchBlogs();
    fetchMeta();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get("/reviews");
      setReviews(res.data.data || res.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get("/blogs");
      setBlogs(res.data.data || res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  const fetchMeta = async () => {
    try {
      const [tagsRes, categoriesRes] = await Promise.all([
        axiosInstance.get("/tags"),
        axiosInstance.get("/categories"),
      ]);
      setTagsList(tagsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error("Failed to fetch tags or categories", err);
    }
  };

  const handleAddBlog = async () => {
    // Validation
    if (
      !blogTitle?.trim() ||
      !thumbnail?.trim() ||
      !selectedCategory?.trim() ||
      !content?.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Payload for backend
    const blogPayload = {
      title: blogTitle,
      content: content,
      thumbnail,
      tags: selectedTags,
      category: selectedCategory,
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosInstance.post("/blogs", blogPayload);

      // Reset fields
      setBlogTitle("");
      setThumbnail("");
      setSelectedTags([]);
      setSelectedCategory("");
      setContent("");
      setActiveSection("dashboard");

      // Refetch blogs list
      fetchBlogs();

      toast.success("Blog added successfully!");
    } catch (err) {
      console.error("Failed to post blog", err);
      toast.error("Failed to add blog.");
    }
  };

  const handleDeleteReview = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosInstance.delete(`/reviews/${id}`);
      if (res.status === 200) {
        setReviews(prev => prev.filter(review => review._id !== id));
        toast.success("Review deleted successfully ✅");
      } else {
        toast.error("Failed to delete review ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  const handleShowPost = (id) => {
    navigate(`/blog/${id}`)
  }

  const handleDeleteBlog = async (id) => {
    if (!id) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosInstance.delete(`/blogs/${id}`);

      if (res.status === 200) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      } else {
        Swal.fire("Oops!", "Failed to delete the blog.", "error");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
    }
  };

  const handleAddTag = async () => {
    if (!blogTitle.trim()) {
      toast.error("Tag name required!");
      return;
    }
    
    try {
      await axiosInstance.post("/tags", {
        name: blogTitle,
        createdAt: new Date().toISOString(),
      });
      fetchMeta(); // refresh tag list
      setBlogTitle("");
      setActiveSection("manageTags");
      toast.success("Tag added!");
    } catch (err) {
      console.error("Tag add failed", err);
      toast.error("Failed to add tag.");
    }
  };

  const handleAddCategory = async () => {
    if (!selectedCategory.trim()) {
      toast.error("Category name required!");
      return;
    }
    
    try {
      await axiosInstance.post("/categories", {
        name: selectedCategory,
        createdAt: new Date().toISOString(),
      });
      fetchMeta(); // refresh categories
      setSelectedCategory("");
      setActiveSection("manageCategories");
      toast.success("Category added!");
    } catch (err) {
      console.error("Category add failed", err);
      toast.error("Failed to add category.");
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white relative">
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden bg-[#1e293b] p-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <h2 className="text-xl font-bold text-orange-400">Admin Panel</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white p-2 hover:bg-orange-500 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-[#1e293b] p-6 space-y-6
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          overflow-y-auto
          ${isSidebarOpen ? 'top-[72px]' : 'top-0'}
          md:top-0
        `}
        data-aos="fade-right"
      >
        {/* Desktop title (hidden on mobile) */}
        <h2 className="hidden md:block text-2xl font-bold text-orange-400 mb-6 cursor-default">
          Admin Panel
        </h2>
        
        <nav className="flex flex-col gap-3">
          <button
            onClick={() => handleSectionChange("dashboard")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full transition-all duration-200 ${
              activeSection === "dashboard"
                ? "bg-orange-500 shadow-lg scale-105"
                : "hover:bg-orange-600 hover:scale-102"
            }`}
          >
            <FaChartBar className="flex-shrink-0" size={18} />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button
            onClick={() => handleSectionChange("reviews")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full transition-all duration-200 ${
              activeSection === "reviews"
                ? "bg-orange-500 shadow-lg scale-105"
                : "hover:bg-orange-600 hover:scale-102"
            }`}
          >
            <FaStar className="flex-shrink-0" size={18} />
            <span className="font-medium">Reviews</span>
          </button>
          
          <button
            onClick={() => handleSectionChange("manageBlogs")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full transition-all duration-200 ${
              activeSection === "manageBlogs"
                ? "bg-orange-500 shadow-lg scale-105"
                : "hover:bg-orange-600 hover:scale-102"
            }`}
          >
            <FaEdit className="flex-shrink-0" size={18} />
            <span className="font-medium">Manage Blogs</span>
          </button>
          
          <button
            onClick={() => handleSectionChange("addBlog")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full transition-all duration-200 ${
              activeSection === "addBlog"
                ? "bg-orange-500 shadow-lg scale-105"
                : "hover:bg-orange-600 hover:scale-102"
            }`}
          >
            <FaPlus className="flex-shrink-0" size={18} />
            <span className="font-medium">Add Blog</span>
          </button>
          
          <button
            onClick={() => handleSectionChange("addTag")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full transition-all duration-200 ${
              activeSection === "addTag"
                ? "bg-orange-500 shadow-lg scale-105"
                : "hover:bg-orange-600 hover:scale-102"
            }`}
          >
            <FaPlus className="flex-shrink-0" size={18} />
            <span className="font-medium">Add Tag</span>
          </button>
          
          <button
            onClick={() => handleSectionChange("manageTags")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full transition-all duration-200 ${
              activeSection === "manageTags"
                ? "bg-orange-500 shadow-lg scale-105"
                : "hover:bg-orange-600 hover:scale-102"
            }`}
          >
            <FaEdit className="flex-shrink-0" size={18} />
            <span className="font-medium">Manage Tags</span>
          </button>
          
          <button
            onClick={() => handleSectionChange("addCategory")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full transition-all duration-200 ${
              activeSection === "addCategory"
                ? "bg-orange-500 shadow-lg scale-105"
                : "hover:bg-orange-600 hover:scale-102"
            }`}
          >
            <FaPlus className="flex-shrink-0" size={18} />
            <span className="font-medium">Add Category</span>
          </button>
          
          <button
            onClick={() => handleSectionChange("manageCategories")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full transition-all duration-200 ${
              activeSection === "manageCategories"
                ? "bg-orange-500 shadow-lg scale-105"
                : "hover:bg-orange-600 hover:scale-102"
            }`}
          >
            <FaEdit className="flex-shrink-0" size={18} />
            <span className="font-medium">Manage Category</span>
          </button>

          <div className="border-t border-gray-600 my-2"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full hover:bg-red-600 transition-all duration-200 text-red-400 hover:text-white"
          >
            <FaSignOutAlt className="flex-shrink-0" size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-6 overflow-y-auto mt-[72px] md:mt-0">
        {/* Dashboard */}
        {activeSection === "dashboard" && (
          <section className="space-y-6" data-aos="fade-up">
            <h1 className="text-3xl font-bold text-orange-400">
              Dashboard Overview
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-orange-300">Total Reviews</h3>
                <p className="text-3xl font-bold mt-2">{reviews.length}</p>
              </div>
              <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-orange-300">Total Blogs</h3>
                <p className="text-3xl font-bold mt-2">{blogs.length}</p>
              </div>
              <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-orange-300">Total Categories</h3>
                <p className="text-3xl font-bold mt-2">{categories.length}</p>
              </div>
            </div>
          </section>
        )}
        {/* Reviews */}
        {activeSection === "reviews" && (
          <section data-aos="fade-up" className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">All Reviews</h2>
            <div className="bg-[#1e293b] p-3 md:p-5 rounded-lg shadow-lg overflow-x-auto max-h-[60vh]">
              <table className="w-full text-left table-auto border-collapse border border-gray-700 text-sm md:text-base">
                <thead>
                  <tr className="text-orange-300 border-b border-gray-700">
                    <th className="py-2 px-2 md:px-3 border border-gray-700">
                      Reviewer
                    </th>
                    <th className="py-2 px-2 md:px-3 border border-gray-700">Email</th>
                    <th className="py-2 px-2 md:px-3 border border-gray-700">Rating</th>
                    <th className="py-2 px-2 md:px-3 border border-gray-700">Review</th>
                    <th className="py-2 px-2 md:px-3 border border-gray-700">Date</th>
                    <th className="py-2 px-2 md:px-3 border border-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-4 text-gray-400"
                      >
                        No reviews found
                      </td>
                    </tr>
                  ) : (
                    reviews.map(
                      ({ _id, reviewer, email, rating, review, createdAt }) => (
                        <tr
                          key={_id}
                          className="border-b border-gray-700 hover:bg-[#334155]"
                        >
                          <td className="py-2 px-2 md:px-3 border border-gray-700">
                            {reviewer}
                          </td>
                          <td className="py-2 px-2 md:px-3 border border-gray-700">
                            {email}
                          </td>
                          <td className="py-2 px-2 md:px-3 border border-gray-700">
                            {rating} ⭐
                          </td>
                          <td className="py-2 px-2 md:px-3 border border-gray-700">
                            {review}
                          </td>
                          <td className="py-2 px-2 md:px-3 border border-gray-700">
                            {new Date(createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-2 md:px-3 border border-gray-700 text-center">
                            <button
                              onClick={() => handleDeleteReview(_id)}
                              className="bg-red-600 hover:bg-red-700 px-2 md:px-3 py-1 rounded text-xs md:text-sm"
                              title="Delete review"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Manage Blogs */}
        {activeSection === "manageBlogs" && (
          <section data-aos="fade-up" className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">Manage Blogs</h2>
            <div className="bg-[#1e293b] p-3 md:p-5 rounded-lg shadow-lg overflow-x-auto max-h-[60vh]">
              <table className="w-full text-left table-auto border-collapse border border-gray-700 text-sm md:text-base">
                <thead>
                  <tr className="text-orange-300 border-b border-gray-700">
                    <th className="py-2 px-2 md:px-3 border border-gray-700">Title</th>
                    <th className="py-2 px-2 md:px-3 border border-gray-700">Date</th>
                    <th className="py-2 px-2 md:px-3 border border-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-4 text-gray-400"
                      >
                        No blogs found
                      </td>
                    </tr>
                  ) : (
                    blogs.map(({ _id, title, createdAt }) => (
                      <tr
                        key={_id}
                        className="border-b border-gray-700"
                      >
                        <td className="py-2 px-2 md:px-3 border border-gray-700">
                          {title}
                        </td>
                        <td className="py-2 px-2 md:px-3 border border-gray-700">
                          {new Date(createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-2 md:px-3 border border-gray-700">
                          <div className="flex gap-1 md:gap-2 justify-center flex-wrap">
                            <button
                              className="bg-gray-500 text-white px-2 md:px-4 py-1 md:py-2 rounded text-sm md:text-base flex items-center justify-center
                 transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-gray-600"
                              title="edit blog"
                              onClick={() => navigate(`/edit-blog/${_id}`)}
                            >
                              <FaEdit size={18} className="md:w-6 md:h-6" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(_id)}
                              className="bg-gray-500 text-white px-2 md:px-4 py-1 md:py-2 rounded text-sm md:text-base flex items-center justify-center
                 transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-red-600"
                              title="Delete blog"
                            >
                              <DeleteIcon style={{ fontSize: 18 }} className="md:w-6 md:h-6" />
                            </button>
                            <button
                              onClick={() => handleShowPost(_id)}
                              className="bg-gray-500 text-white px-2 md:px-4 py-1 md:py-2 rounded text-sm md:text-base flex items-center justify-center
                 transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-green-600"
                              title="Show post"
                            >
                              <FaRegEye size={18} className="md:w-6 md:h-6" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {/* add blogs */}
        {activeSection === "addBlog" && (
          <section className="space-y-4 text-black" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              Add New Blog
            </h2>
            <div className="bg-[#1e293b] w-full max-w-7xl p-4 md:p-8 lg:p-12 rounded-xl shadow-xl">
              <input
                type="text"
                placeholder="Blog Title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full mb-3 p-2 md:p-3 rounded border border-gray-600 bg-[#334155] text-white text-sm md:text-base"
              />

              {/* RichTextEditor with responsive wrapper */}
              <div className="mb-3">
                <label className="block mb-2 text-sm md:text-base text-white font-medium">
                  Blog Content
                </label>
                <div className="w-full overflow-hidden rounded-lg border border-gray-600">
                  <RichTextEditor
                    value={content}
                    onChange={setContent}
                    className="min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder="Thumbnail URL"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full mb-3 p-2 md:p-3 rounded border border-gray-600 bg-[#334155] text-white text-sm md:text-base"
              />

              <div className="mb-3">
                <label className="block mb-2 text-sm md:text-base text-white font-medium">
                  Select Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag) => (
                    <button
                      key={tag._id}
                      type="button"
                      onClick={() =>
                        setSelectedTags((prev) =>
                          prev.includes(tag.name)
                            ? prev.filter((t) => t !== tag.name)
                            : [...prev, tag.name]
                        )
                      }
                      className={`px-3 py-1 rounded-full text-xs md:text-sm border transition-colors ${selectedTags.includes(tag.name)
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-[#334155] text-white border-gray-600 hover:border-orange-400"
                        }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm md:text-base text-white font-medium">
                  Select Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 md:p-3 rounded border border-gray-600 bg-[#334155] text-white text-sm md:text-base"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 flex-wrap">
                <button
                  onClick={() => setActiveSection("dashboard")}
                  className="px-4 py-2 rounded border text-gray-400 hover:bg-gray-600 transition text-sm md:text-base"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddBlog}
                  className="px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600 transition text-sm md:text-base"
                >
                  Submit
                </button>
              </div>
            </div>
          </section>
        )}

        {/* add tags */}
        {activeSection === "addTag" && (
          <section className="space-y-4" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              Add New Tag
            </h2>
            <div className="bg-[#1e293b] w-full max-w-md p-4 md:p-6 rounded-xl shadow-xl">
              <input
                type="text"
                placeholder="Tag Name"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full mb-4 p-2 md:p-3 rounded border border-gray-600 bg-[#334155] text-white text-sm md:text-base"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setBlogTitle("")}
                  className="px-4 py-2 rounded border text-gray-400 hover:bg-gray-600 transition text-sm md:text-base"
                >
                  Clear
                </button>
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600 transition text-sm md:text-base"
                >
                  Submit
                </button>
              </div>
            </div>
          </section>
        )}

        {/* manage tags */}
        {activeSection === "manageTags" && (
          <section className="space-y-4" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-orange-400">All Tags</h2>
            <div className="bg-[#1e293b] p-4 md:p-5 rounded-lg shadow-lg max-w-xl">
              {tagsList.length === 0 ? (
                <p className="text-gray-400">No tags found.</p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {tagsList.map((tag, idx) => (
                    <li
                      key={idx}
                      className="flex items-center bg-[#334155] text-white px-3 py-1 rounded-full border border-gray-600 text-xs md:text-sm"
                    >
                      <span>{tag.name || tag}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* add categories */}
        {activeSection === "addCategory" && (
          <section className="space-y-4" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              Add New Category
            </h2>
            <div className="bg-[#1e293b] w-full max-w-md p-4 md:p-6 rounded-xl shadow-xl">
              <input
                type="text"
                placeholder="Category Name"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full mb-4 p-2 md:p-3 rounded border border-gray-600 bg-[#334155] text-white text-sm md:text-base"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className="px-4 py-2 rounded border text-gray-400 hover:bg-gray-600 transition text-sm md:text-base"
                >
                  Clear
                </button>
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600 transition text-sm md:text-base"
                >
                  Submit
                </button>
              </div>
            </div>
          </section>
        )}

        {/* manage categories */}
        {activeSection === "manageCategories" && (
          <section className="space-y-4" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-orange-400">
              All Categories
            </h2>
            <div className="bg-[#1e293b] p-4 md:p-5 rounded-lg shadow-lg max-w-xl">
              {categories.length === 0 ? (
                <p className="text-gray-400">No categories found.</p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {categories.map((cat, idx) => (
                    <li
                      key={idx}
                      className="flex items-center bg-[#334155] text-white px-3 py-1 rounded-full border border-gray-600 text-xs md:text-sm"
                    >
                      <span>{cat.name || cat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;