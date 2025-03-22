import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./settings.css";

export default function Settings() {
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");

  // Function to handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Creates a preview URL
      setProfilePic(imageUrl);
    }
  };

  // Function to save updates
  const handleSave = () => {
    updateUser({ name, bio, profilePic, email });
    alert("Profile Updated Successfully!");
  };

  // Function to handle password change
  const handlePasswordChange = () => {
    if (password) {
      alert("Password changed successfully!");
      setPassword("");
    } else {
      alert("Please enter a new password.");
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <h2 className="settingsTitle">Update Profile</h2>

        {/* Profile Picture Section */}
        <div className="settingsPP">
          <img src={profilePic} alt="Profile" className="settingsPPImg" />
          <label htmlFor="fileInput" className="settingsPPIcon">
            📸
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleProfilePicChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Name Input */}
        <label>Username</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Bio Input */}
        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={6}
        ></textarea>

        {/* Email Input */}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <label>Change Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Save Button */}
        <button className="settingsSubmitButton" onClick={handleSave}>
          Save Changes
        </button>

        {/* Change Password Button */}
        <button
          className="settingsSubmitButton"
          onClick={handlePasswordChange}
          style={{ background: "#ff4500" }}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
