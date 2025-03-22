import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./singlePost.css";

export default function SinglePost() {
  const { postId } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) {
      setError("Invalid post ID");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        console.log(`Fetching post from: http://localhost:5000/api/posts/${postId}`);
        
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch post: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Fetched Post:", data);
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="singlePost">
      <img 
        className="singlePostImg" 
        src={post?.picture || "https://images.unsplash.com/photo-1637055159652-2b8837731f00?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhcmslMjBncmFkaWVudHxlbnwwfHwwfHx8MA%3D%3D"} 
        alt={post?.title || "No title available"} 
      />
      <div className="singlePostInfo">
        <h1 className="singlePostTitle">{post?.title || "Untitled Post"}</h1>
        <p className="singlePostCategory">Category: {post?.category || "Uncategorized"}</p>
        <span className="singlePostDate">
          Published: {post?.createdAt ? new Date(post.createdAt).toLocaleString() : "Unknown"}
        </span>
      </div>
      <p className="singlePostDesc">{post?.paragraph || "No description available."}</p>
    </div>
  );
}
