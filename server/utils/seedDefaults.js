const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Course = require("../models/Course");
const Content = require("../models/Content");
const Settings = require("../models/Settings");

async function seedDefaults() {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@joshenglishacademy.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  if (!(await Admin.findOne({ email: adminEmail }))) {
    await Admin.create({
      name: "Josh English Admin",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
    });
  }

  if (!(await Course.countDocuments())) {
    await Course.insertMany([
      {
        name: "Spoken English Course",
        description:
          "Master day-to-day communication, vocabulary, grammar, and speaking confidence with practical classroom training.",
        duration: "3 Months",
        price: "",
      },
      {
        name: "IELTS Coaching",
        description:
          "Structured guidance for speaking, listening, reading, and writing with exam-focused strategies and feedback.",
        duration: "2.5 Months",
        price: "",
      },
      {
        name: "Competitive Exam English",
        description:
          "Special coaching for UPSC, SSC, PSC, and RRB aspirants to strengthen grammar, comprehension, and accuracy.",
        duration: "4 Months",
        price: "",
      },
      {
        name: "Personality Development",
        description:
          "Build interview confidence, communication presence, and personal expression to stand out academically and professionally.",
        duration: "6 Weeks",
        price: "",
      },
    ]);
  }

  if (!(await Content.findOne())) {
    await Content.create({
      heroTitle: "Boost Your Spoken English Today!",
      heroSubtitle: "Most Trusted Since 2015",
      heroDescription:
        "Learn with confidence under RKD Sir and build the fluency, personality, and exam-ready English skills needed for real success.",
      aboutTitle: "About Josh English Academy",
      aboutText:
        "Josh English Academy, led by RKD Sir, has been helping students improve spoken English and crack competitive exams since 2015. We focus on practical learning, fluency, and confidence building.",
      contactPhone: "8759137380",
      whatsappNumber: "918759137380",
      contactEmail: "info@joshenglishacademy.com",
      branches: [
        { title: "Islampur", subtitle: "Near Union Bank" },
        { title: "Chakulia", subtitle: "Uttar Dinajpur" },
        { title: "Barodhia", subtitle: "Near Kishanganj" },
      ],
      socialLinks: {
        youtube: "https://youtube.com",
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
      },
    });
  }

  if (!(await Settings.findOne())) {
    await Settings.create({
      siteName: "Josh English Academy",
      supportEmail: "info@joshenglishacademy.com",
      contactPhone: "8759137380",
    });
  }
}

module.exports = { seedDefaults };
