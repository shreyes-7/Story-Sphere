import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]); // State to store fetched posts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blog");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId)); // Remove post from state
  };

  return (
    <div className="posts">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            img={post.picture}
            postId={post._id}
            title={post.title}
            category={post.category}
            description={post.paragraph}
            createdAt={post.createdAt}
            onDelete={handleDeletePost}
          />
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
}
