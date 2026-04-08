import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {
    if (!email || !newPassword) {
      alert("Fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, newPassword })
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Password updated");
      window.location.href = "/login";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Forgot Password</h2>

        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={handleReset}>Update Password</button>
      </div>
    </div>
  );
}