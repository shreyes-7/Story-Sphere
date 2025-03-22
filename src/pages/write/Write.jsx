import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./write.css";

export default function Write({ addPost }) {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Image upload failed");

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImageToCloudinary();
    if (!imageUrl) {
      alert("Image upload failed. Please try again.");
      return;
    }

    const newPost = {
      title,
      content,
      category,
      image: imageUrl, // Store Cloudinary URL
    };

    try {
      const response = await fetch("http://localhost:5000/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        alert("Blog published successfully!");
        navigate("/posts");
      } else {
        alert("Failed to publish blog.");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("An error occurred while submitting the blog.");
    }
  };

  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="writeFormGroup">
          {image && <img className="writeImg" src={image} alt="Preview" />}
          <label htmlFor="fileInput" className="writeIcon">
            <i className="fas fa-camera"></i> Upload Image
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* Title Input */}
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Enter Blog Title..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Category Input */}
        <div className="writeFormGroup">
          <input
            className="writeCategory"
            placeholder="Enter Category..."
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Blog Content Input */}
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* Buttons: Publish, Clear */}
        <div className="buttonGroup">
          <button className="writeSubmit" type="submit">
            <i className="fas fa-paper-plane"></i> Publish
          </button>
        </div>
      </form>
    </div>
  );
}
