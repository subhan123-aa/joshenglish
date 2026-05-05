const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Josh English Admin" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    resetToken: String,
    resetTokenExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
