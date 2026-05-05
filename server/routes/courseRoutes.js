const express = require("express");
const Course = require("../models/Course");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/public", async (_request, response) => {
  response.json(await Course.find({ isActive: true }).sort({ createdAt: 1 }));
});

router.get("/", requireAuth, async (_request, response) => {
  response.json(await Course.find().sort({ createdAt: 1 }));
});

router.post("/", requireAuth, async (request, response) => {
  response.status(201).json(await Course.create(request.body));
});

router.put("/:id", requireAuth, async (request, response) => {
  const course = await Course.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    return response.status(404).json({ message: "Course not found" });
  }
  return response.json(course);
});

router.delete("/:id", requireAuth, async (request, response) => {
  const course = await Course.findByIdAndDelete(request.params.id);
  if (!course) {
    return response.status(404).json({ message: "Course not found" });
  }
  return response.json({ ok: true });
});

module.exports = router;
