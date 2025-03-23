import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./settings.css";

export default function Settings() {
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [socialLinks, setSocialLinks] = useState(user?.socialLinks || {});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const userData = res.data;
        setName(userData.username);
        setBio(userData.bio);
        setProfilePic(userData.profilePic);
        setEmail(userData.email);
        setSocialLinks(userData.socialLinks);
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  // Handle profile picture upload
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await axios.put("http://localhost:5000/api/user", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProfilePic(res.data.profilePic);
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  // Save all updates
  const handleSave = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/user",
        { username: name, bio, profilePic, ...socialLinks },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <h2 className="settingsTitle">Update Profile</h2>

        {/* Profile Picture Section */}
        <div className="settingsPP">
          <img src={profilePic} alt="Profile" className="settingsPPImg" />
          <label htmlFor="fileInput" className="settingsPPIcon">📷</label>
          <input
            type="file"
            id="fileInput"
            onChange={handleProfilePicChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Username */}
        <label>Username</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        {/* Bio */}
        <label>Bio</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={6}></textarea>

        {/* Social Media Links */}
        <h3 className="socialLinksTitle">Social Media Links</h3>
        {Object.keys(socialLinks).map((platform) => (
          <div key={platform}>
            <label>{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
            <input
              type="text"
              value={socialLinks[platform]}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, [platform]: e.target.value })
              }
            />
          </div>
        ))}

        {/* Save Button */}
        <button className="settingsSubmitButton" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
