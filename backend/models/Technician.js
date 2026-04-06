import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    default: "Available", // Available / Busy
  },
  assignedIssues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
});

const Technician = mongoose.model("Technician", technicianSchema);

export default Technician;