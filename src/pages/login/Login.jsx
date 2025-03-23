import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login({ setCurrentUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      setCurrentUser(true);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <button className="toggle-button" onClick={() => navigate("/register")}>
          New here? Create an account
        </button>
      </div>
    </div>
  );
}
