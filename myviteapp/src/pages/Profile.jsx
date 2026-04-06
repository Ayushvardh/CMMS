import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../utils/profileStorage";
import "./dashboard.css";

export default function Profile() {
  const navigate = useNavigate();
  const existing = getProfile();

  const [name, setName] = useState(existing.name || "");
  const [email, setEmail] = useState(existing.email || "");
  const [dept, setDept] = useState(existing.department || "");
  const [photo, setPhoto] = useState(existing.photo || "");

  const onPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // store image in localStorage as base64 (good for demo)
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const save = () => {
    updateProfile({ name, email, department: dept, photo });
    navigate("/dashboard");
  };

  return (
    <div className="dash-wrap">
      <div className="dash-top">
        <div className="dash-title">
          <h2>My Profile</h2>
          <p>Upload photo and manage basic account details.</p>
        </div>

        <button className="dash-btn" onClick={() => navigate(-1)}>← Back</button>
      </div>

      <div className="dash-row">
        <div className="dash-panel">
          <h3>Profile Photo</h3>
          <p className="muted">For demo, photo is saved in localStorage.</p>

          <div className="profile-photo">
            {photo ? <img src={photo} alt="profile" /> : <div className="photo-empty">No Photo</div>}
          </div>

          <input type="file" accept="image/*" onChange={onPhotoChange} />
        </div>

        <div className="dash-panel">
          <h3>Details</h3>

          <div className="form-grid">
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </label>

            <label>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" />
            </label>

            <label>
              Department
              <input value={dept} onChange={(e) => setDept(e.target.value)} placeholder="IT / Admin / Lab" />
            </label>
          </div>

          <div className="dash-actions">
            <button className="dash-action-btn blue" onClick={save}>Save Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}