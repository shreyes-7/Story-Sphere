import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar({ postAuthor, postProfilePic, postSocialLinks }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="sidebar">
      <div className="sidebarProfile">
        <img
          className="profilePic"
          src={postAuthor ? postProfilePic : user.profilePic}
          alt="Profile"
        />
        <span className="profileName">{postAuthor || user.name}</span>
        <p className="profileBio">{postAuthor ? postSocialLinks.bio : user.bio}</p>
      </div>
      
      {/* Saved Collections */}
      <div className="savedCollections">
        <h3 className="sidebarTitle">Saved Collections</h3>
        <div className="collectionsList">
          <Link to="/saved/travel" className="collectionItem">Travel</Link>
          <Link to="/saved/nature" className="collectionItem">Nature</Link>
          <Link to="/saved/photography" className="collectionItem">Photography</Link>
          <Link to="/saved/technology" className="collectionItem">Technology</Link>
        </div>
      </div>

      {/* Trending Categories */}
      <div className="sidebarCategories">
        <h3 className="sidebarTitle">Trending Categories</h3>
        <div className="sidebarCategoryList">
          <Link to="/posts?category=travel" className="sidebarCategory">Travel</Link>
          <Link to="/posts?category=nature" className="sidebarCategory">Nature</Link>
          <Link to="/posts?category=city-life" className="sidebarCategory">City Life</Link>
          <Link to="/posts?category=night-sky" className="sidebarCategory">Night Sky</Link>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="sidebarSocial">
        {user.instagram && (
          <a href={user.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram sidebarIcon"></i>
          </a>
        )}
        {user.facebook && (
          <a href={user.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook sidebarIcon"></i>
          </a>
        )}
        {user.twitter && (
          <a href={user.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter sidebarIcon"></i>
          </a>
        )}
        {user.email && (
          <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-envelope sidebarIcon"></i>
          </a>
        )}
      </div>
    </div>
  );
}