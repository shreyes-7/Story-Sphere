import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register({ setCurrentUser }) {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const url = isRegistering ? "http://localhost:5000/api/register" : "http://localhost:5000/api/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      if (!isRegistering) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setCurrentUser(true);
        navigate("/");
      } else {
        alert("Registration successful! Please log in.");
        setIsRegistering(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">{isRegistering ? "Create Account" : "Sign In"}</h2>
        
        <form className="register-form" onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="input-group">
              <label>Username</label>
              <input type="text" name="username" onChange={handleChange} required />
            </div>
          )}
          
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
            {loading ? "Processing..." : isRegistering ? "Register" : "Login"}
          </button>
        </form>
        
        <button className="toggle-button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Sign In" : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
}
