import React, { useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    coverImageURL: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      coverImageURL: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("coverImage", formData.coverImageURL);
    data.append("title", formData.title);
    data.append("body", formData.body);

    try {
      await axios.post(`${API}/api/blogs`, data, {
        withCredentials: true,
      });
      alert("Blog published successfully!");
      setFormData({ title: "", body: "", coverImageURL: null });
    } catch (error) {
      console.log("Error publishing blog:", error);
      alert("Failed to publish blog.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Add a New Blog
      </h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image
          </label>
          <input
            type="file"
            name="coverImageURL"
            className="w-full border border-gray-300 rounded-lg p-2"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body
          </label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="w-full h-40 border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your blog content here..."
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
