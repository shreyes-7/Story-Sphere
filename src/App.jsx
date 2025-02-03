import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import SinglePost from "./pages/single/Single";
import Write from "./pages/write/Write";
import Contact from "./pages/contact/Contact";
import AboutMe from "./pages/aboutme/Aboutme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";

function App() {
  const currentUser = true;
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Majestic Call of the Mountains",
      content: "Lorem ipsum dolor sit amet...",
      category: "Travel",
      image: "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      author: "Shreyes Jaiswal",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      socialLinks: {
        instagram: "https://instagram.com/shreyes",
        facebook: "https://facebook.com/shreyes",
        twitter: "https://twitter.com/shreyes",
        email: "shreyes@example.com",
      }
    },
    {
      id: 2,
      title: "Exploring the Depths of the Ocean",
      content: "Lorem ipsum dolor sit amet...",
      category: "Travel",
      image: "https://images.pexels.com/photos/45170/pexels-photo-45170.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      author: "Shreyes Jaiswal",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      socialLinks: {
        instagram: "https://instagram.com/shreyes",
        facebook: "https://facebook.com/shreyes",
        twitter: "https://twitter.com/shreyes",
        email: "shreyes@example.com",
      }
    },
    {
      id: 3,
      title: "The Beauty of Autumn",
      content: "Lorem ipsum dolor sit amet...",
      category: "Nature",
      image: "https://images.pexels.com/photos/1122852/pexels-photo-1122852.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      author: "Shreyes Jaiswal",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      socialLinks: {
        instagram: "https://instagram.com/shreyes",
        facebook: "https://facebook.com/shreyes",
        twitter: "https://twitter.com/shreyes",
        email: "shreyes@example.com",
      }
    },
    {
      id: 4,
      title: "The Urban Jungle",
      content: "Lorem ipsum dolor sit amet...",
      category: "City Life",
      image: "https://images.pexels.com/photos/1062615/pexels-photo-1062615.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      author: "Shreyes Jaiswal",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      socialLinks: {
        instagram: "https://instagram.com/shreyes",
        facebook: "https://facebook.com/shreyes",
        twitter: "https://twitter.com/shreyes",
        email: "shreyes@example.com",
      }
    },
    {
      id: 5,
      title: "Starry Night in the Desert",
      content: "Lorem ipsum dolor sit amet...",
      category: "Night Sky",
      image: "https://images.pexels.com/photos/1485739/pexels-photo-1485739.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      author: "Shreyes Jaiswal",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      socialLinks: {
        instagram: "https://instagram.com/shreyes",
        facebook: "https://facebook.com/shreyes",
        twitter: "https://twitter.com/shreyes",
        email: "shreyes@example.com",
      }
    },
  ]);

  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
  };

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage posts={posts} />} />
        <Route path="/posts" element={<Homepage posts={posts} />} />
        <Route path="/register" element={currentUser ? <Homepage posts={posts} /> : <Register />} />
        <Route path="/login" element={currentUser ? <Homepage posts={posts} /> : <Login />} />
        <Route path="/post/:id" element={<SinglePost posts={posts} />} />
        <Route path="/write" element={currentUser ? <Write addPost={addPost} /> : <Login />} />
        <Route path="/settings" element={currentUser ? <Settings /> : <Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/singlePost/:postId" element={<SinglePost />} />
      </Routes>
    </Router>
  );
}

export default App;
