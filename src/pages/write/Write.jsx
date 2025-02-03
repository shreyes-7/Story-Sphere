import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./write.css";

export default function Write({ addPost }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState(""); // New field for custom category
  const navigate = useNavigate(); // To navigate after publishing

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle Clear Button
  const handleClear = () => {
    setImage(null);
    setTitle("");
    setContent("");
    setCategory("");
    setCustomCategory("");
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      category: customCategory || category,
      image,
    };

    // Add new post to the homepage
    addPost(newPost);

    // Show success alert
    alert("Blog has been published!");

    // Redirect to homepage after publishing
    navigate("/posts");
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
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
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
          <button className="clearButton" type="button" onClick={handleClear}>
            <i className="fas fa-times"></i> Clear
          </button>
        </div>
      </form>
    </div>
  );
}
