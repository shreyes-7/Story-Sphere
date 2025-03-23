import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./topbar.css";

export default function Topbar({ setCurrentUser }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setCurrentUser(false);
    navigate("/register");
  };

  return (
    <div className="topbar">
      {/* Left Section - Logo */}
      <div className="topbarLeft">
        <Link className="logoLink" to="/">
          <img src="/blog.png" alt="Blog Logo" className="logoImg" />
        </Link>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="topbarCenter">
        <ul className="topbarList">
          <li className="topbarListItem"><Link className="topbarLink" to="/">Home</Link></li>
          <li className="topbarListItem"><Link className="topbarLink" to="/aboutme">About</Link></li>
          <li className="topbarListItem"><Link className="topbarLink" to="/contact">Contact</Link></li>
          <li className="topbarListItem"><Link className="topbarLink" to="/write">Create Post</Link></li>
          {token && <li className="topbarListItem logout" onClick={handleLogout}>Logout</li>}
        </ul>
      </div>

      {/* Right Section - Profile & Search */}
      <div className="topbarRight">
        <div className="searchBar">
          <input type="text" className="searchInput" placeholder="Search..." />
          <FaSearch className="searchIcon" />
        </div>
        {token ? (
          <Link className="topbarLink" to="/settings">
            <div className="topbarProfile">
              <img 
                className="topbarImg" 
                src={userData?.profilePic || "https://cdn-icons-png.freepik.com/256/4140/4140039.png"} 
                alt="User Profile" 
              />
            </div>
          </Link>
        ) : (
          <ul className="topbarList">
            <li className="topbarListItem"><Link className="topbarLink" to="/login">Login</Link></li>
            <li className="topbarListItem"><Link className="topbarLink" to="/register">Register</Link></li>
          </ul>
        )}
      </div>
    </div>
  );
}
