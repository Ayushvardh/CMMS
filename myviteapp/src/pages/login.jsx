import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Basic validation
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    // Demo users
    let role = null;

    if (username === "admin" && password === "1234") {
      role = "admin";
    } else if (username === "tech" && password === "1234") {
      role = "technician";   // ✅ keep this same
    } else if (username === "user" && password === "1234") {
      role = "user";
    }

    if (role) {
      const user = {
        username,
        role,
        loggedIn: true,
      };

      localStorage.setItem("cmms_user", JSON.stringify(user));

      // ✅ FIXED ROLE-BASED REDIRECT
      if (role === "admin") {
        window.location.href = "/admin";
      } else if (role === "technician") {
        window.location.href = "/technician";   // ✅ NEW
      } else {
        window.location.href = "/";
      }

    } else {
      alert("Invalid username or password ❌");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <a href="/" className="back-arrow">←</a>

        <h2>Sign In</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Sign In</button>

        <p className="login-note">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;