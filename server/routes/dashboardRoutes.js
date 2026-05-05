const express = require("express");
const { requireAuth } = require("../middleware/auth");
const Student = require("../models/Student");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const router = express.Router();

router.get("/", requireAuth, async (_request, response) => {
  const [totalStudents, totalEnrollments, activeCourses, recentEnrollments] = await Promise.all([
    Student.countDocuments(),
    Enrollment.countDocuments(),
    Course.countDocuments({ isActive: true }),
    Enrollment.find().sort({ createdAt: -1 }).limit(6),
  ]);

  response.json({
    stats: { totalStudents, totalEnrollments, activeCourses },
    recentEnrollments,
  });
});

module.exports = router;
