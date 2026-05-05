const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    heroTitle: String,
    heroSubtitle: String,
    heroDescription: String,
    aboutTitle: String,
    aboutText: String,
    contactPhone: String,
    whatsappNumber: String,
    contactEmail: String,
    branches: [{ title: String, subtitle: String }],
    socialLinks: {
      youtube: String,
      instagram: String,
      facebook: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);
