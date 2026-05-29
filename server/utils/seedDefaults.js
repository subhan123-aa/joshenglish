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
      heroEyebrow: "Premium English Coaching Institute",
      bannerTitle: "Josh English Academy By R.K.D Sir",
      bannerTagline: "Transform Your English Communication Skills",
      bannerCopy:
        "Professional spoken English training with personality development, interview preparation, fluency practice, and confidence building for students, job seekers, and working professionals.",
      experienceBadge: "11 Years of Excellence in English Speaking Training",
      aboutTitle: "About R.K.D Sir",
      aboutExperience: "11+ Years of Experience in Spoken English Training",
      aboutCopy:
        "R.K.D Sir leads Josh English Academy with a practical coaching style focused on spoken English, personality development, interview preparation, public speaking, and effective communication skills. The training is built for real-world speaking confidence, not just classroom theory.",
      aboutPoints: [
        "Spoken English for daily and professional use",
        "Personality development and stage confidence",
        "Interview and group discussion preparation",
        "Communication skills for students and job seekers",
      ],
      officialEmail: "contact@joshenglishacademy.in",
      govtBadge: "Registered Under Govt. of India",
      consultationTitle: "Book Your Free Consultation",
      consultationSubtitle: "Fill in your details and our team will contact you shortly.",
      consultationButton: "Book Free Demo",
      consultationNote: "No demo charges. Limited consultation slots available every week.",
      contactPhone: "8759137380",
      whatsappNumber: "918759137380",
      highlights: [
        { label: "Training Focus", value: "Spoken English + Communication" },
        { label: "Class Style", value: "Practical, guided, and interactive" },
        { label: "Support", value: "Consultation, demo, and follow-up" },
      ],
      courses: [
        {
          title: "Spoken English Training",
          description:
            "Build everyday fluency, pronunciation, sentence formation, and conversation confidence through structured practice.",
        },
        {
          title: "Personality Development",
          description:
            "Develop presentation skills, body language, voice control, and a confident speaking presence.",
        },
        {
          title: "Interview Preparation",
          description:
            "Learn how to answer confidently, introduce yourself professionally, and communicate clearly in interviews.",
        },
        {
          title: "Communication Skills",
          description:
            "Improve classroom participation, office communication, and public speaking using practical exercises.",
        },
      ],
      seminarSectionTitle: "Monthly Seminar & Live Speaking Sessions",
      seminarSectionCopy:
        "Upload-ready seminar cards for every monthly event, workshop, and live speaking session. Replace the placeholder image link with the latest event photo whenever a new seminar is held.",
      seminarGallery: [
        {
          title: "Monthly Seminar Launch",
          month: "May 2026",
          caption: "Orientation session with student interaction and live speaking practice.",
          imageUrl: "",
          status: "Upload image",
        },
        {
          title: "Confidence Building Workshop",
          month: "April 2026",
          caption: "Stage speaking exercises, pronunciation drills, and group participation.",
          imageUrl: "",
          status: "Upload image",
        },
        {
          title: "Interview Preparation Session",
          month: "March 2026",
          caption: "Mock interviews, answer framing, and professional communication tips.",
          imageUrl: "",
          status: "Upload image",
        },
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
      supportEmail: "contact@joshenglishacademy.in",
      contactPhone: "8759137380",
    });
  }
}

module.exports = { seedDefaults };
