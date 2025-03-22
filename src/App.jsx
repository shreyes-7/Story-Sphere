import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import SinglePost from "./pages/single/Single";
import Write from "./pages/write/Write";
import Contact from "./pages/contact/Contact";
import AboutMe from "./pages/aboutme/Aboutme";

function App() {
  const [currentUser, setCurrentUser] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setCurrentUser(!!token);
  }, []);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blog");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchPosts();
  }, []);

  const addPost = async (newPost) => {
    try {
      const response = await fetch("http://localhost:5000/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error(`Failed to add post, Status: ${response.status}`);

      const savedPost = await response.json();
      setPosts([...posts, savedPost.blog]);
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  return (
    <Router>
      <Topbar setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Homepage posts={posts} />} />
        <Route path="/posts" element={<Homepage posts={posts} />} />
        <Route path="/register" element={currentUser ? <Homepage posts={posts} /> : <Register setCurrentUser={setCurrentUser} />} />
        <Route path="/login" element={currentUser ? <Homepage posts={posts} /> : <Login setCurrentUser={setCurrentUser} />} />
        <Route path="/post/:id" element={<SinglePost posts={posts} />} />
        <Route path="/write" element={currentUser ? <Write addPost={addPost} /> : <Register />} />
        <Route path="/settings" element={currentUser ? <Settings /> : <Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/singlePost/:postId" element={<SinglePost />} />
      </Routes>
    </Router>
  );
}

export default App;
