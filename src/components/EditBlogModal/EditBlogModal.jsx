import React, { useState, useEffect } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/plugins.pkgd.min.css";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogTitle, setBlogTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [content, setContent] = useState(""); // Froala HTML content

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
          setContent(blog.content || blog.contentHTML || "");
        } else {
          toast.error("Blog not found");
          navigate("/manageBlogs");
        }
      } catch {
        toast.error("Failed to fetch blog");
        navigate("/manageBlogs");
      }
    };

    // Fetch tags and categories
    const fetchTagsAndCategories = async () => {
      try {
        const tagsRes = await axios.get("https://moshiur-rahman-server.vercel.app/tags");
        const catsRes = await axios.get("https://moshiur-rahman-server.vercel.app/categories");
        setAllTags(tagsRes.data || []);
        setAllCategories(catsRes.data || []);
      } catch {
        setAllTags([{ _id: "1", name: "tag1" }, { _id: "2", name: "tag2" }]);
        setAllCategories([{ _id: "1", name: "cat1" }, { _id: "2", name: "cat2" }]);
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
      toast.error("Fill all required fields.");
      return;
    }

    try {
      await axios.put(`https://moshiur-rahman-server.vercel.app/blogs/${id}`, {
        title: blogTitle,
        thumbnail,
        tags: selectedTags,
        category: selectedCategory,
        content: content, // Froala HTML output, backend expects 'content'
      });

      toast.success("Blog updated successfully!");
      navigate("/mrd-admin");
    } catch {
      toast.error("Failed to update blog");
    }
  };

  return (
    <section className="max-w-full p-6 bg-black">
      <div className="max-w-4xl mx-auto p-6 bg-[#1e293b] rounded-xl mt-8">
        <h2 className="text-orange-400 text-2xl font-bold mb-6">Edit Blog</h2>

        <input
          type="text"
          placeholder="Blog Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          className="w-full mb-3 p-2 rounded border border-gray-600 bg-[#334155] text-white"
        />

        <div className="mb-3 bg-white rounded-md">
          <FroalaEditorComponent
            tag="textarea"
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
              ],
              imageUploadURL: "https://moshiur-rahman-server.vercel.app/froala-upload", // Backend endpoint
              imageUploadParam: "file",
              imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
              imageMaxSize: 5 * 1024 * 1024 // 5MB
            }}
          />
        </div>

        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full mb-3 p-2 rounded border border-gray-600 bg-[#334155] text-white"
        />

        <div className="mb-3">
          <label className="block mb-1 text-sm text-white">Select Tags</label>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag._id}
                type="button"
                onClick={() => handleTagToggle(tag.name)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  selectedTags.includes(tag.name)
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
          <label className="block mb-1 text-sm text-white">Select Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 rounded border border-gray-600 bg-[#334155] text-white"
          >
            <option value="">Select Category</option>
            {allCategories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded border text-gray-400 hover:bg-gray-600"
          >
            Back
          </button>
          <button
            onClick={() => navigate("/manageBlogs")}
            className="px-4 py-2 rounded border text-gray-400 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditBlogPage;