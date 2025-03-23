const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "https://cdn-icons-png.freepik.com/256/4140/4140039.png"  }, // Store Cloudinary URL
  bio: { type: String, default: "" },
  socialLinks: {
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
  },
});

module.exports = mongoose.model("User", userSchema);
