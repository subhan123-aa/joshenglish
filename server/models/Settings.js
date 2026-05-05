const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    siteName: String,
    supportEmail: String,
    contactPhone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
