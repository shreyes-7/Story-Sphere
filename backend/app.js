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
const multer = require("multer");
const cloudinary = require("./config/cloudinary");

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



app.get("/api/user", verifyToken, async (req, res) => {
  try {
      const user = await User.findById(req.userId).select("-password"); // Exclude password
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
  } catch (err) {
      res.status(500).json({ message: "Error fetching user details", error: err });
  }
});




const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.put("/api/user", verifyToken, upload.single("profilePic"), async (req, res) => {
    try {
        let profilePicUrl = req.body.profilePic; // Default: use existing one

        if (req.file) {
            const result = await cloudinary.uploader.upload_stream(
                { folder: "profile_pictures" },
                (error, result) => {
                    if (error) return res.status(500).json({ message: "Cloudinary error", error });
                    profilePicUrl = result.secure_url;
                    updateUserProfile();
                }
            ).end(req.file.buffer);
        } else {
            updateUserProfile();
        }

        function updateUserProfile() {
            User.findByIdAndUpdate(
                req.userId,
                {
                    username: req.body.username,
                    bio: req.body.bio,
                    profilePic: profilePicUrl,
                    socialLinks: {
                        instagram: req.body.instagram,
                        facebook: req.body.facebook,
                        twitter: req.body.twitter,
                        linkedin: req.body.linkedin,
                        github: req.body.github,
                    },
                },
                { new: true }
            )
                .select("-password")
                .then((updatedUser) => res.status(200).json(updatedUser))
                .catch((err) => res.status(500).json({ message: "Error updating profile", error: err }));
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err });
    }
});
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Fetch user from DB
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ username: user.username, profilePic: user.profilePic });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/user/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, "your_secret_key");
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ username: user.username, profilePic: user.profilePic });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});


// const verifyToken = require("../middleware/auth"); // Middleware to check authentication

const router = express.Router();

// Fetch user details
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});



module.exports = router;


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
