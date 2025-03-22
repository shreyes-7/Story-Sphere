import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering ? "http://localhost:5000/api/register" : "http://localhost:5000/api/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (!isRegistering) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        window.location.reload(); 
      } else {
        alert("Registered successfully! Please login.");
        setIsRegistering(false);
      }
    } catch (err) {
      alert(err.message);
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
          <button className="submit-button">{isRegistering ? "Register" : "Login"}</button>
        </form>
        <button className="toggle-button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Sign In" : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
}
