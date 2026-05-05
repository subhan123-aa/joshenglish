const express = require("express");
const Notification = require("../models/Notification");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, async (_request, response) => {
  response.json(await Notification.find().sort({ createdAt: -1 }).limit(12));
});

router.patch("/read-all", requireAuth, async (_request, response) => {
  await Notification.updateMany({ read: false }, { read: true });
  response.json({ ok: true });
});

module.exports = router;
