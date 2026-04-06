import express from "express";
import Technician from "../models/Technician.js";

const router = express.Router();

// ✅ GET all technicians
router.get("/", async (req, res) => {
  try {
    const techs = await Technician.find();
    res.json(techs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching technicians", error: err });
  }
});

// ✅ UPDATE status (Available / Busy)
router.put("/:id/status", async (req, res) => {
  try {
    const updated = await Technician.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating status", error: err });
  }
});

export default router;