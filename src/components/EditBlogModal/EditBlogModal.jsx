import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import RichTextEditor from "../Richtexteditor/RichTextEditor";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogTitle, setBlogTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const [allTags, setAllTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    // Fetch blog by ID
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://moshiur-rahman-server.vercel.app/blogs/${id}`);
        if (res.data.success) {
          const blog = res.data.data;
          setBlogTitle(blog.title || "");
          setThumbnail(blog.thumbnail || "");
          setSelectedTags(blog.tags || []);
          setSelectedCategory(blog.category || "");
          setContent(blog.content || "");
        } else {
          toast.error("Blog not found");
          navigate("/mrd-admin");
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        toast.error("Failed to fetch blog");
        navigate("/mrd-admin");
      } finally {
        setLoading(false);
      }
    };

    // Fetch tags and categories
    const fetchTagsAndCategories = async () => {
      try {
        const tagsRes = await axios.get("https://moshiur-rahman-server.vercel.app/tags");
        const catsRes = await axios.get("https://moshiur-rahman-server.vercel.app/categories");
        setAllTags(tagsRes.data || []);
        setAllCategories(catsRes.data || []);
      } catch (error) {
        console.error("Failed to fetch tags/categories:", error);
        toast.error("Failed to load tags and categories");
      }
    };

    fetchBlog();
    fetchTagsAndCategories();
  }, [id, navigate]);

  const handleTagToggle = (tagName) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
    );
  };

  const handleSubmit = async () => {
    if (!blogTitle.trim() || !thumbnail.trim() || !selectedCategory.trim() || !content.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const updatePayload = {
        title: blogTitle,
        thumbnail,
        tags: selectedTags,
        category: selectedCategory,
        content: content,
      };

      await axios.put(`https://moshiur-rahman-server.vercel.app/blogs/${id}`, updatePayload);

      toast.success("Blog updated successfully!");
      navigate("/mrd-admin");
    } catch (error) {
      console.error("Failed to update blog:", error);
      toast.error("Failed to update blog");
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]">
        <div className="text-orange-400 text-xl">Loading blog...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]">
      <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 bg-[#1e293b] rounded-xl shadow-xl mt-4 md:mt-8">
        <h2 className="text-orange-400 text-2xl md:text-3xl font-bold mb-6">Edit Blog</h2>

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
            {allTags.length === 0 ? (
              <p className="text-gray-400 text-sm">No tags available</p>
            ) : (
              allTags.map((tag) => (
                <button
                  key={tag._id}
                  type="button"
                  onClick={() => handleTagToggle(tag.name)}
                  className={`px-3 py-1 rounded-full text-xs md:text-sm border transition-colors ${
                    selectedTags.includes(tag.name)
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-[#334155] text-white border-gray-600 hover:border-orange-400"
                  }`}
                >
                  {tag.name}
                </button>
              ))
            )}
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
            {allCategories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 flex-wrap mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded border border-gray-600 text-gray-400 hover:bg-gray-600 transition text-sm md:text-base"
          >
            Back
          </button>
          <button
            onClick={() => navigate("/mrd-admin")}
            className="px-4 py-2 rounded border border-gray-600 text-gray-400 hover:bg-gray-600 transition text-sm md:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600 transition text-sm md:text-base"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditBlogPage;