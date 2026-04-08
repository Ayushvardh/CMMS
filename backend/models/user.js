import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,

  role: {
    type: String,
    enum: ["user", "admin", "technician"],
    default: "user",
  },

  // ✅ extra fields for profile
  department: String,
  photo: String,

  // ✅ for temporary deactivate
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

export default User;