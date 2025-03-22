const express = require("express");
const router = express.Router();
const Post = require("../models/blog.model"); // Assuming a Mongoose model

// Fetch all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from MongoDB
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

router.get("/posts/:postId", async (req, res) => {
  try {
      console.log(`Fetching post with ID: ${req.params.postId}`);
      const post = await Post.findById(req.params.postId);
      
      if (!post) {
          return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(post);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching post" });
  }
});

module.exports = router;
