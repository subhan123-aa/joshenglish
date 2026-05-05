const express = require("express");
const Student = require("../models/Student");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, async (_request, response) => {
  response.json(await Student.find().sort({ createdAt: -1 }));
});

router.post("/", requireAuth, async (request, response) => {
  response.status(201).json(await Student.create(request.body));
});

router.put("/:id", requireAuth, async (request, response) => {
  const student = await Student.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    return response.status(404).json({ message: "Student not found" });
  }
  return response.json(student);
});

router.patch("/:id/payment", requireAuth, async (request, response) => {
  const student = await Student.findByIdAndUpdate(
    request.params.id,
    { paymentStatus: request.body.paymentStatus },
    { new: true, runValidators: true }
  );
  if (!student) {
    return response.status(404).json({ message: "Student not found" });
  }
  return response.json(student);
});

router.delete("/:id", requireAuth, async (request, response) => {
  const student = await Student.findByIdAndDelete(request.params.id);
  if (!student) {
    return response.status(404).json({ message: "Student not found" });
  }
  return response.json({ ok: true });
});

module.exports = router;
