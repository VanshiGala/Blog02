import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "/src/AuthContext.jsx"

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="bg-yellow-200 px-4 py-2 shadow-md flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link to="/">Blogify</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/">Home</Link>
        {!isLoggedIn && (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/addBlog">Add Blog</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
