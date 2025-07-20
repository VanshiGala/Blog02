import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-6 px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="flex flex-col bg-yellow-50 rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
        >
          <img
            src={`http://localhost:5000${blog.coverImageURL}`}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
          <div className="flex flex-col justify-between flex-grow p-4">
            <h5 className="text-xl font-bold mb-4 text-gray-800">
              {blog.title}
            </h5>
            <Link
              to={`/blog/${blog._id}`}
              className=" bg-yellow-300 text-white text-center w-20 p-2 rounded hover:bg-yellow-600 transition"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
