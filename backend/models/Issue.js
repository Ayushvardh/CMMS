import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  computerId: String,
  department: String,
  issueType: String,
  description: String,

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