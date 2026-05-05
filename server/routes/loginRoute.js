const express = require("express");
const { signToken } = require("../utils/jwt");

const router = express.Router();

const ADMIN_EMAIL = "admin@joshenglishacademy.com";
const ADMIN_PASSWORD = "123456";

function setAuthCookie(response, token) {
  response.cookie("adminToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
}

router.post("/login", async (request, response) => {
  const email = String(request.body.email || "").toLowerCase().trim();
  const password = String(request.body.password || "");

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return response.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = signToken({
    id: "static-admin",
    email: ADMIN_EMAIL,
    name: "Josh English Admin",
  });

  setAuthCookie(response, token);

  return response.json({
    success: true,
    message: "Login successful",
    admin: {
      id: "static-admin",
      name: "Josh English Admin",
      email: ADMIN_EMAIL,
    },
  });
});

module.exports = router;
