import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password, role });
    await newUser.save();

    res.json({ message: "Signup successful", user: newUser });

  } catch (err) {
    res.status(500).json({ message: "Error signing up" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 Reactivate if deactivated
    if (user.isDeleted) {
      user.isDeleted = false;
      await user.save();
    }

    res.json({ message: "Login successful", user });

  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// ✅ FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error updating password" });
  }
});

// ✅ GET PROFILE
router.get("/profile/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// ✅ GET USERS (WITH ROLE FILTER) 🔥 IMPORTANT
router.get("/users", async (req, res) => {
  try {
    const role = req.query.role;

    const users = await User.find(
      role ? { role } : {}
    ).select("-password"); // 👈 ONLY CHANGE

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE PROFILE
router.put("/profile/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// ✅ DELETE
router.delete("/profile/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ✅ DEACTIVATE
router.put("/profile/:id/deactivate", async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
  res.json(updated);
});

export default router;