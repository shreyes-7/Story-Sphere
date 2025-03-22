import { useState } from "react";
import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ img, postId, title, category, description, createdAt, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const trimDescription = (desc, maxLength = 150) => {
    return desc.length > maxLength ? desc.substring(0, maxLength) + "..." : desc;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blog/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDelete(postId); // Remove post from UI
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="post">
      <img className="postImg" src={img} alt="" />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to={`/posts?cat=${category}`}>
              {category}
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to={`/singlePost/${postId}`} className="link">
            {title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{formatDate(createdAt)}</span>

        {/* Three-dot menu */}
        <div className="postOptions">
          <span className="dots" onClick={() => setMenuOpen(!menuOpen)}>⋮</span>
          {menuOpen && (
            <div className="menu">
              <button onClick={handleDelete} className="deleteBtn">Delete</button>
            </div>
          )}
        </div>
      </div>
      <p className="postDesc">{trimDescription(description)}</p>
    </div>
  );
}
