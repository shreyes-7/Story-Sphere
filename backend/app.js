const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const connectToDB = require("./config/db");
const User = require("./models/user.model");
const Blog = require("./models/blog.model");
const postRoutes = require("./routes/postRoutes");
const uploadRoutes = require("./upload");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Connect to MongoDB
connectToDB();

// Secret Key for JWT
const JWT_SECRET = "your_jwt_secret"; // Change this for security



// 🔹 Register User
app.post("/api/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Error registering user", error: err });
    }
  });
  
  // 🔹 Login User
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ token, username: user.username });
    } catch (err) {
      res.status(500).json({ message: "Error logging in", error: err });
    }
  });
  
  // 🔹 Middleware to Verify Token
  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "No token provided" });
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      req.userId = decoded.userId;
      next();
    });
  };

// Blog Routes
app.post('/api/blog', async (req, res) => {
    try {
        const { title, image, content, category } = req.body;
        const newBlog = new Blog({
            title,
            picture: image,
            paragraph: content,
            category
        });

        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating blog' });
    }
});

app.get('/api/blog', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching blogs' });
    }
});

app.delete("/api/blog/:id", async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting post" });
    }
  });
  

// Use Posts Route
app.use('/api', postRoutes);  // Mount the new route
app.use("/api", uploadRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
