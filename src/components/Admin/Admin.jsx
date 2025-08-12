// Admin.jsx
import React, { useEffect, useState, Fragment, useContext } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import {
  FaChartBar,
  FaStar,
  FaEdit,
  FaPlus,
  FaSignOutAlt,
  FaRegEye,
} from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins.pkgd.min.css';
import Swal from "sweetalert2";
import { DeleteIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";


const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);

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
      const res = await axios.get(
        "https://moshiur-rahman-server.vercel.app/reviews"
      );
      setReviews(res.data.data || res.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };



  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        "https://moshiur-rahman-server.vercel.app/blogs"
      );
      setBlogs(res.data.data || res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  const fetchMeta = async () => {
    try {
      const [tagsRes, categoriesRes] = await Promise.all([
        axios.get("https://moshiur-rahman-server.vercel.app/tags"),
        axios.get("https://moshiur-rahman-server.vercel.app/categories"),
      ]);
      setTagsList(tagsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error("Failed to fetch tags or categories", err);
    }
  };

  const handleAddBlog = async ({
    blogTitle,
    thumbnail,
    selectedTags,
    selectedCategory,
    contentHTML,
    setBlogTitle,
    setThumbnail,
    setSelectedTags,
    setSelectedCategory,
    setContentHTML,
    fetchBlogs,
    setActiveSection
  }) => {
    // Validation
    if (
      !blogTitle?.trim() ||
      !thumbnail?.trim() ||
      !selectedCategory?.trim() ||
      !contentHTML?.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }


    // Payload for backend
    const blogPayload = {
      title: blogTitle,
      content: contentHTML,
      thumbnail,
      tags: selectedTags,
      category: selectedCategory,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("https://moshiur-rahman-server.vercel.app/blogs", blogPayload);

      // Reset fields
      setBlogTitle("");
      setThumbnail("");
      setSelectedTags([]);
      setSelectedCategory("");
      setContentHTML("");
      setActiveSection("dashboard");

      // Refetch blogs list
      if (fetchBlogs) fetchBlogs();

      toast.success("Blog added successfully!");
    } catch (err) {
      console.error("Failed to post blog", err);
      toast.error("Failed to add blog.");
    }
  };



  const handleDeleteReview = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`https://moshiur-rahman-server.vercel.app/reviews/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setReviews((prev) => prev.filter((review) => review._id !== id));
        toast.success("Review deleted successfully ✅");
      } else {
        toast.error(data.message || "Failed to delete review ❌");
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
      const res = await axios.delete(`https://moshiur-rahman-server.vercel.app/blogs/${id}`);

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


  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
      <aside
        className="w-full md:w-64 bg-[#1e293b] p-6 space-y-8"
        data-aos="fade-right"
      >
        <h2 className="text-2xl font-bold text-orange-400 mb-6 cursor-default">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-5">
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`flex items-center gap-3 px-3 py-2 rounded ${activeSection === "dashboard"
              ? "bg-orange-500"
              : "hover:bg-orange-600"
              } transition`}
          >
            <FaChartBar /> Dashboard
          </button>
          <button
            onClick={() => setActiveSection("reviews")}
            className={`flex items-center gap-3 px-3 py-2 rounded ${activeSection === "reviews"
              ? "bg-orange-500"
              : "hover:bg-orange-600"
              } transition`}
          >
            <FaStar /> Reviews
          </button>
          <button
            onClick={() => setActiveSection("manageBlogs")}
            className={`flex items-center gap-3 px-3 py-2 rounded ${activeSection === "manageBlogs"
              ? "bg-orange-500"
              : "hover:bg-orange-600"
              } transition`}
          >
            <FaEdit /> Manage Blogs
          </button>
          <button
            onClick={() => setActiveSection("addBlog")}
            className={`flex items-center gap-3 px-3 py-2 rounded ${activeSection === "addBlog"
              ? "bg-orange-500"
              : "hover:bg-orange-600"
              } transition`}
          >
            <FaPlus /> Add Blog
          </button>
          <button
            onClick={() => setActiveSection("addTag")}
            className={`flex items-center gap-3 px-3 py-2 rounded ${activeSection === "addTag"
              ? "bg-orange-500"
              : "hover:bg-orange-600"
              } transition`}
          >
            <FaPlus /> Add Tag
          </button>
          <button
            onClick={() => setActiveSection("manageTags")}
            className={`flex items-center gap-3 px-3 py-2 rounded ${activeSection === "manageTags"
              ? "bg-orange-500"
              : "hover:bg-orange-600"
              } transition`}
          >
            <FaEdit /> Manage Tags
          </button>
          <button
            onClick={() => setActiveSection("addCategory")}
            className={`flex items-center gap-3 px-3 py-2 rounded ${activeSection === "addCategory"
              ? "bg-orange-500"
              : "hover:bg-orange-600"
              } transition`}
          >
            <FaPlus /> Add Category
          </button>
          <button
            onClick={() => setActiveSection("manageCategories")}
            className={`flex items-center gap-3 px-3 py-2 rounded ${activeSection === "manageCategories"
              ? "bg-orange-500"
              : "hover:bg-orange-600"
              } transition`}
          >
            <FaEdit /> Manage Category
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 transition text-red-400"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Dashboard */}
        {activeSection === "dashboard" && (
          <section className="space-y-6" data-aos="fade-up">
            <h1 className="text-3xl font-bold text-orange-400">
              Dashboard Overview
            </h1>
          </section>
        )}
        {/* Reviews */}
        {activeSection === "reviews" && (
          <section data-aos="fade-up" className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">All Reviews</h2>
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg overflow-x-auto max-h-[60vh]">
              <table className="w-full text-left table-auto border-collapse border border-gray-700">
                <thead>
                  <tr className="text-orange-300 border-b border-gray-700">
                    <th className="py-2 px-3 border border-gray-700">
                      Reviewer
                    </th>
                    <th className="py-2 px-3 border border-gray-700">Email</th>
                    <th className="py-2 px-3 border border-gray-700">Rating</th>
                    <th className="py-2 px-3 border border-gray-700">Review</th>
                    <th className="py-2 px-3 border border-gray-700">Date</th>
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
                          className="border-b border-gray-700 hover:bg-[#334155] group relative"
                        >
                          <td className="py-2 px-3 border border-gray-700">
                            {reviewer}
                          </td>
                          <td className="py-2 px-3 border border-gray-700">
                            {email}
                          </td>
                          <td className="py-2 px-3 border border-gray-700">
                            {rating} ⭐
                          </td>
                          <td className="py-2 px-3 border border-gray-700">
                            {review}
                          </td>
                          <td className="py-2 px-3 border border-gray-700">
                            {new Date(createdAt).toLocaleDateString()}
                          </td>

                          {/* Delete button cell */}
                          <td className="py-2 px-3 border border-gray-700 w-20 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={() => handleDeleteReview(_id)}
                              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
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
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg overflow-x-auto max-h-[60vh]">
              <table className="w-full text-left table-auto border-collapse border border-gray-700">
                <thead>
                  <tr className="text-orange-300 border-b border-gray-700">
                    <th className="py-2 px-3 border border-gray-700">Title</th>
                    <th className="py-2 px-3 border border-gray-700">Date</th>
                    <th className="py-2 px-3 border border-gray-700">
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
                        <td className="py-2 px-3 border border-gray-700">
                          {title}
                        </td>
                        <td className="py-2 px-3 border border-gray-700">
                          {new Date(createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-3 border border-gray-700 flex gap-2 justify-center">
                          <button
                            className="bg-gray-500 text-white px-4 py-2 rounded text-base flex items-center justify-center
               transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-gray-600
               bg-pulse"
                            title="edit blog"
                            onClick={() => navigate(`/edit-blog/${_id}`)}
                          >
                            <FaEdit size={24} />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(_id)}
                            className="bg-gray-500 text-white px-4 py-2 rounded text-base flex items-center justify-center
               transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-red-600
               bg-pulse"
                            title="Delete blog"
                          >
                            <DeleteIcon style={{ fontSize: 24 }} />
                          </button>
                          <button
                            onClick={() => handleShowPost(_id)}
                            className="bg-gray-500 text-white px-4 py-2 rounded text-base flex items-center justify-center
               transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-green-600
               bg-pulse"
                            title="Show post"
                          >
                            <FaRegEye size={24} />
                          </button>
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
          <section className="space-y-4" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              Add New Blog
            </h2>
            <div className="bg-[#1e293b] w-full max-w-7xl lg:p-12 rounded-xl shadow-xl">
              <input
                type="text"
                placeholder="Blog Title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full mb-3 p-2 rounded border border-gray-600 bg-[#334155]"
              />

              <div className="mb-3 bg-white rounded-md">
                <div className="mb-3 bg-white text-black rounded-md">
                  <FroalaEditorComponent
                    tag='textarea'
                    model={content}
                    onModelChange={setContent}
                    config={{
                      height: 400,
                      toolbarButtons: {
                        moreText: [
                          'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript',
                          'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle'
                        ],
                        moreParagraph: [
                          'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL',
                          'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'
                        ],
                        moreRich: [
                          'insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'specialCharacters',
                          'insertFile', 'insertHR'
                        ],
                        moreMisc: [
                          'undo', 'redo', 'clearFormatting', 'selectAll', 'html', 'fullscreen', 'print', 'help'
                        ]
                      },
                      pluginsEnabled: [
                        'align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'emoticons',
                        'entities', 'file', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'imageManager',
                        'inlineClass', 'inlineStyle', 'lineBreaker', 'link', 'lists', 'paragraphFormat',
                        'paragraphStyle', 'print', 'quickInsert', 'quote', 'table', 'url', 'video', 'wordPaste', 'specialCharacters'
                      ]
                    }}
                  />
                </div>

              </div>

              <input
                type="text"
                placeholder="Thumbnail URL"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full mb-3 p-2 rounded border border-gray-600 bg-[#334155] text-white"
              />

              <div className="mb-3">
                <label className="block mb-1 text-sm text-white">
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
                      className={`px-3 py-1 rounded-full text-sm border ${selectedTags.includes(tag.name)
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-[#334155] text-white border-gray-600"
                        }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm text-white">
                  Select Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 rounded border border-gray-600 bg-[#334155] text-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setActiveSection("dashboard")}
                  className="px-4 py-2 rounded border text-gray-400 hover:bg-gray-600"
                >
                  Cancel
                </button>

                <button
                  onClick={() =>
                    handleAddBlog({
                      blogTitle,
                      thumbnail,
                      selectedTags,
                      selectedCategory,
                      contentHTML: content, // use your Jodit editor state
                      setBlogTitle,
                      setThumbnail,
                      setSelectedTags,
                      setSelectedCategory,
                      setContentHTML: setContent,
                      fetchBlogs,
                      setActiveSection,
                    })
                  }
                  className="px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600"
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
            <div className="bg-[#1e293b] w-full max-w-md p-6 rounded-xl shadow-xl">
              <input
                type="text"
                placeholder="Tag Name"
                value={blogTitle} // reuse this state
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full mb-4 p-2 rounded border border-gray-600 bg-[#334155] text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setBlogTitle("")}
                  className="px-4 py-2 rounded border text-gray-400 hover:bg-gray-600"
                >
                  Clear
                </button>
                <button
                  onClick={async () => {
                    if (!blogTitle.trim()) return alert("Tag name required!");
                    try {
                      await axios.post("https://moshiur-rahman-server.vercel.app/tags", {
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
                  }}
                  className="px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600"
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
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg max-w-xl">
              {tagsList.length === 0 ? (
                <p className="text-gray-400">No tags found.</p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {tagsList.map((tag, idx) => (
                    <li
                      key={idx}
                      className="flex items-center bg-[#334155] text-white px-3 py-1 rounded-full border border-gray-600"
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
            <div className="bg-[#1e293b] w-full max-w-md p-6 rounded-xl shadow-xl">
              <input
                type="text"
                placeholder="Category Name"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full mb-4 p-2 rounded border border-gray-600 bg-[#334155] text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className="px-4 py-2 rounded border text-gray-400 hover:bg-gray-600"
                >
                  Clear
                </button>
                <button
                  onClick={async () => {
                    if (!selectedCategory.trim())
                      return alert("Category name required!");
                    try {
                      await axios.post("https://moshiur-rahman-server.vercel.app/categories", {
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
                  }}
                  className="px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600"
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
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg max-w-xl">
              {categories.length === 0 ? (
                <p className="text-gray-400">No categories found.</p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {categories.map((cat, idx) => (
                    <li
                      key={idx}
                      className="flex items-center bg-[#334155] text-white px-3 py-1 rounded-full border border-gray-600"
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
