import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./topbar.css";

export default function Topbar() {
  const user = true; // Change this based on user authentication status

  return (
    <div className="topbar">
      {/* Left Section - Logo */}
      <div className="topbarLeft">
        <Link className="logoLink" to="/">
          <img src="https://cdn-icons-png.flaticon.com/128/10745/10745934.png" alt="Blog Logo" className="logoImg" />
        </Link>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="topbarCenter">
        <ul className="topbarList">
          <li className="topbarListItem"><Link className="topbarLink" to="/">Home</Link></li>
          <li className="topbarListItem"><Link className="topbarLink" to="/aboutme">About</Link></li>
          <li className="topbarListItem"><Link className="topbarLink" to="/contact">Contact</Link></li>
          <li className="topbarListItem"><Link className="topbarLink" to="/write">Create Post</Link></li>
          {user && <li className="topbarListItem logout">Logout</li>}
        </ul>
      </div>

      {/* Right Section - Profile & Search */}
      <div className="topbarRight">
        <div className="searchBar">
          <input type="text" className="searchInput" placeholder="Search..." />
          <FaSearch className="searchIcon" />
        </div>
        {user ? (
          <Link className="topbarLink" to="/settings">
            <img className="topbarImg" src="https://cdn-icons-png.freepik.com/256/4140/4140039.png" alt="User Profile" />
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
