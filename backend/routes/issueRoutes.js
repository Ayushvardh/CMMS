import express from "express";
import Issue from "../models/Issue.js";
console.log("✅ Issue routes loaded");

const router = express.Router();

// CREATE ISSUE
router.post("/", async (req, res) => {
  try {
    const {
      computerId,
      department,
      issueType,
      description,
      priority,
      assignedTo,
      reportedBy
    } = req.body;

    const issue = new Issue({
      computerId,
      department,
      issueType,
      description,
      priority,
      assignedTo,
      reportedBy, // 🔥 FORCE SAVE
    });

    await issue.save();

    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create issue" });
  }
});

// GET ALL ISSUES
router.get("/", async (req, res) => {
  const issues = await Issue.find()
    .populate("reportedBy", "username") // ✅ ONLY CHANGE
    .sort({ createdAt: -1 });

  res.json(issues);
});

// UPDATE ISSUE
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  const updated = await Issue.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

// update priority
router.put("/:id/priority", async (req, res) => {
  const { priority } = req.body;

  const updated = await Issue.findByIdAndUpdate(
    req.params.id,
    { priority },
    { new: true }
  );

  res.json(updated);
});

// DELETE ISSUE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Issue.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json({ message: "Issue deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting issue", error: err });
  }
});

export default router;