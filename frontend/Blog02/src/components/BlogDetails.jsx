import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API}/api/blogs/comment/${id}`,
        {
          content: comment,
        },
        { withCredentials: true }
      );
      alert("Comment added");
      setComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment");
    }
  };

  if (!blog) return <p className="mt-6 text-center text-lg">Loading...</p>;

  return (
    <div className="max-w-4xl  p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>

      {blog.coverImageURL && (
        <img
          src={blog.coverImageURL}
          className="w-50 h-50 rounded-lg mb-6 shadow"
        />
      )}

      <p className="text-gray-700 text-lg leading-relaxed mb-6">{blog.body}</p>

      {blog.createdBy && (
        <div className="flex items-center gap-4 mb-8">
          <img
            src={blog.createdBy.profileImageUrl}
            className="w-12 h-12 rounded-full object-cover shadow"
          />
          <span className="text-gray-600 font-medium">
            {blog.createdBy.fullName}
          </span>
        </div>
      )}

      <div className="bg-yellow-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>

        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <input
            type="text"
            name="content"
            placeholder="Enter your comment"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogDetails;
