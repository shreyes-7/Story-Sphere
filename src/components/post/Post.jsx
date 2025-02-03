import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ img, postId, title, category, description }) {
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
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        {description} {/* Display short description */}
      </p>
    </div>
  );
}
