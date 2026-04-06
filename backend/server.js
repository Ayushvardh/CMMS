import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import issueRoutes from "./routes/issueRoutes.js";
import technicianRoutes from "./routes/technicianRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/issues", issueRoutes);

// connect mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.log("❌ MongoDB ERROR:", err);
  });

// server start
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});