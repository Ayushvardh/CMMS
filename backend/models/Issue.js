import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  computerId: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },

  issueType: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  // who reported the issue
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // 👈 important
  },

  status: {
    type: String,
    default: "Pending",
  },

  priority: {
    type: String,
    default: "Medium",
  },

  assignedTo: {
    type: String,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Issue", issueSchema);