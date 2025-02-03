import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

import "./register.css";

export default function Register() {
  const [isRegistering, setIsRegistering] = useState(true);
  const navigate = useNavigate();



  return (
    <div className="register">
      <span className="registerTitle">{isRegistering ? "Register" : "Login"}</span>
      <form className="registerForm">
        {isRegistering && (
          <>
            <label>Username</label>
            <input className="registerInput" type="text" placeholder="Enter your username..." />
            <label>Email</label>
            <input className="registerInput" type="text" placeholder="Enter your email..." />
            <label>Password</label>
            <input className="registerInput" type="password" placeholder="Enter your password..." />
          </>
        )}
        {!isRegistering && (
          <>
            <label>Email</label>
            <input className="registerInput" type="text" placeholder="Enter your email..." />
            <label>Password</label>
            <input className="registerInput" type="password" placeholder="Enter your password..." />
          </>
        )}
        <button className="registerButton">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <button className="registerLoginButton" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </button>
    </div>
  );
}
