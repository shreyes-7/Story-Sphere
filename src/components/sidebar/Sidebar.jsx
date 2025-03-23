import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import {
  FaInstagram, FaFacebookF, FaTwitter,
  FaEnvelope, FaLinkedin, FaGithub,
} from "react-icons/fa";
import "./sidebar.css";
import { useEffect } from "react";

export default function Sidebar({ postAuthor, postProfilePic, postSocialLinks }) {
  const { user, loading, fetchUser } = useContext(UserContext);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]); 
  
  if (loading || !user) {
    return (
      <div className="sidebar">
        {/* Skeleton Profile Section */}
        <div className="sidebarProfile">
          <div className="skeleton skeleton-profilePic"></div>
          <div className="skeleton skeleton-name"></div>
          <div className="skeleton skeleton-bio"></div>
        </div>

        {/* Skeleton for Saved Collections */}
        <div className="savedCollections">
          <h3 className="sidebarTitle">Saved Collections</h3>
          <div className="collectionsList">
            <div className="skeleton skeleton-collection"></div>
            <div className="skeleton skeleton-collection"></div>
            <div className="skeleton skeleton-collection"></div>
            <div className="skeleton skeleton-collection"></div>
          </div>
        </div>

        {/* Skeleton for Trending Categories */}
        <div className="sidebarCategories">
          <h3 className="sidebarTitle">Trending Categories</h3>
          <div className="sidebarCategoryList">
            <div className="skeleton skeleton-category"></div>
            <div className="skeleton skeleton-category"></div>
            <div className="skeleton skeleton-category"></div>
            <div className="skeleton skeleton-category"></div>
          </div>
        </div>

        {/* Skeleton for Social Media Links */}
        <div className="sidebarSocial">
          <h3 className="sidebarTitle">Follow Me</h3>
          <div className="socialIcons">
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton skeleton-icon"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="sidebarProfile">
        <img 
          className="profilePic" 
          src={postProfilePic || user.profilePic || "/default-profile.png"} 
          alt="Profile" 
        />
        <span className="profileName">{postAuthor || user.username || "Unknown User"}</span>
        <p className="profileBio">{postSocialLinks?.bio || user.bio || "No bio available"}</p>
      </div>

      {/* Saved Collections */}
      <div className="savedCollections">
        <h3 className="sidebarTitle">Saved Collections</h3>
        <div className="collectionsList">
          {["Travel", "Nature", "Photography", "Technology"].map((category, index) => (
            <Link key={index} to={`/saved/${category.toLowerCase()}`} className="collectionItem">
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Categories */}
      <div className="sidebarCategories">
        <h3 className="sidebarTitle">Trending Categories</h3>
        <div className="sidebarCategoryList">
          {["Travel", "Nature", "City Life", "Night Sky"].map((category, index) => (
            <Link key={index} to={`/posts?category=${category.toLowerCase()}`} className="sidebarCategory">
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="sidebarSocial">
        <h3 className="sidebarTitle">Follow Me</h3>
        <div className="socialIcons">
          <span className="socialIcon instagram">
            {user?.socialLinks?.instagram ? (
              <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            ) : <FaInstagram />}
          </span>

          <span className="socialIcon facebook">
            {user?.socialLinks?.facebook ? (
              <a href={user.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            ) : <FaFacebookF />}
          </span>

          <span className="socialIcon twitter">
            {user?.socialLinks?.twitter ? (
              <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            ) : <FaTwitter />}
          </span>

          <span className="socialIcon linkedin">
            {user?.socialLinks?.linkedin ? (
              <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            ) : <FaLinkedin />}
          </span>

          <span className="socialIcon github">
            {user?.socialLinks?.github ? (
              <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            ) : <FaGithub />}
          </span>

          <span className="socialIcon email">
            {user?.email ? (
              <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
                <FaEnvelope />
              </a>
            ) : <FaEnvelope />}
          </span>
        </div>
      </div>
    </div>
  );
}
