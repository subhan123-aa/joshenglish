const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { signToken } = require("../utils/jwt");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

function setAuthCookie(response, token) {
  response.cookie("adminToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
}

router.post("/login", async (request, response) => {
  const admin = await Admin.findOne({ email: String(request.body.email).toLowerCase() });
  if (!admin) {
    return response.status(401).json({ message: "Invalid email or password" });
  }

  const passwordMatches = await bcrypt.compare(request.body.password, admin.passwordHash);
  if (!passwordMatches) {
    return response.status(401).json({ message: "Invalid email or password" });
  }

  setAuthCookie(response, signToken({ id: admin._id.toString(), email: admin.email }));
  return response.json({ admin: { id: admin._id, name: admin.name, email: admin.email } });
});

router.get("/me", requireAuth, async (request, response) => {
  response.json({ admin: request.admin });
});

router.post("/logout", async (_request, response) => {
  response.clearCookie("adminToken");
  response.json({ ok: true });
});

router.post("/forgot-password", async (request, response) => {
  const admin = await Admin.findOne({ email: String(request.body.email).toLowerCase() });
  if (!admin) {
    return response.json({ message: "If the email exists, reset instructions were generated." });
  }

  const resetToken = crypto.randomBytes(24).toString("hex");
  admin.resetToken = resetToken;
  admin.resetTokenExpires = new Date(Date.now() + 1000 * 60 * 30);
  await admin.save();

  return response.json({
    message: "Reset instructions generated.",
    resetToken: process.env.NODE_ENV === "production" ? undefined : resetToken,
  });
});

router.post("/reset-password", async (request, response) => {
  const admin = await Admin.findOne({
    resetToken: request.body.token,
    resetTokenExpires: { $gt: new Date() },
  });

  if (!admin) {
    return response.status(400).json({ message: "Reset token is invalid or expired" });
  }

  admin.passwordHash = await bcrypt.hash(request.body.password, 10);
  admin.resetToken = undefined;
  admin.resetTokenExpires = undefined;
  await admin.save();
  response.json({ message: "Password updated successfully" });
});

router.patch("/change-credentials", requireAuth, async (request, response) => {
  const admin = await Admin.findById(request.admin._id);
  const passwordMatches = await bcrypt.compare(
    request.body.currentPassword,
    admin.passwordHash
  );

  if (!passwordMatches) {
    return response.status(400).json({ message: "Current password is incorrect" });
  }

  admin.email = String(request.body.newEmail).toLowerCase();
  if (request.body.newPassword) {
    admin.passwordHash = await bcrypt.hash(request.body.newPassword, 10);
  }
  await admin.save();

  setAuthCookie(response, signToken({ id: admin._id.toString(), email: admin.email }));
  return response.json({ admin: { id: admin._id, name: admin.name, email: admin.email } });
});

module.exports = router;
