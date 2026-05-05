const express = require("express");
const Enrollment = require("../models/Enrollment");
const Notification = require("../models/Notification");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

async function createEnrollmentNotification(enrollment) {
  await Notification.create({
    title: "New Enrollment",
    message: `${enrollment.name} requested ${enrollment.course} from ${enrollment.source.toLowerCase()}${enrollment.branch ? ` (${enrollment.branch})` : ""}.`,
  });
}

async function createPublicEnrollment(request, response) {
  const enrollment = await Enrollment.create({
    name: request.body.name,
    phone: request.body.phone,
    course: request.body.course,
    branch: request.body.branch,
    message: request.body.message,
    source: "Website",
  });
  await createEnrollmentNotification(enrollment);
  response.status(201).json(enrollment);
}

router.post("/public", createPublicEnrollment);

router.get("/", requireAuth, async (_request, response) => {
  response.json(await Enrollment.find().sort({ createdAt: -1 }));
});

router.post("/", requireAuth, async (request, response) => {
  const enrollment = await Enrollment.create({ ...request.body, source: "Manual" });
  await createEnrollmentNotification(enrollment);
  response.status(201).json(enrollment);
});

router.patch("/:id/status", requireAuth, async (request, response) => {
  const enrollment = await Enrollment.findByIdAndUpdate(
    request.params.id,
    { status: request.body.status },
    { new: true, runValidators: true }
  );
  if (!enrollment) {
    return response.status(404).json({ message: "Enrollment not found" });
  }
  return response.json(enrollment);
});

module.exports = router;
module.exports.createPublicEnrollment = createPublicEnrollment;
