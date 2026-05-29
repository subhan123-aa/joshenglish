const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    heroEyebrow: String,
    bannerTitle: String,
    bannerTagline: String,
    bannerCopy: String,
    experienceBadge: String,
    aboutTitle: String,
    aboutExperience: String,
    aboutCopy: String,
    aboutPoints: [String],
    officialEmail: String,
    govtBadge: String,
    consultationTitle: String,
    consultationSubtitle: String,
    consultationButton: String,
    consultationNote: String,
    contactPhone: String,
    whatsappNumber: String,
    highlights: [{ label: String, value: String }],
    courses: [{ title: String, description: String }],
    seminarSectionTitle: String,
    seminarSectionCopy: String,
    seminarGallery: [
      {
        title: String,
        month: String,
        caption: String,
        imageUrl: String,
        status: String,
      },
    ],
    branches: [String],
    socialLinks: {
      youtube: String,
      instagram: String,
      facebook: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);
