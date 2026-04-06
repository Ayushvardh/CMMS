import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

export default function Signup() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",   // default selected role
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (form.password.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    // Create user object
    const user = {
      username: form.username,
      email: form.email,
      role: form.role,   // <-- selected role
      loggedIn: true
    };

    localStorage.setItem("cmms_user", JSON.stringify(user));

    alert("Signup successful ✅ You are now logged in.");

    window.location.href = "/";
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <Link to="/" className="back-arrow">←</Link>

        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          {/* ROLE DROPDOWN */}
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="technician">Technician</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
