const { verifyToken } = require("../utils/jwt");
const Admin = require("../models/Admin");

async function requireAuth(request, response, next) {
  try {
    const token = request.cookies.adminToken;
    if (!token) {
      return response.status(401).json({ message: "Authentication required" });
    }

    const payload = verifyToken(token);
    if (payload.id === "static-admin") {
      request.admin = {
        _id: "static-admin",
        id: "static-admin",
        name: payload.name || "Josh English Admin",
        email: payload.email,
      };
      return next();
    }

    const admin = await Admin.findById(payload.id).select("-passwordHash -resetToken -resetTokenExpires");
    if (!admin) {
      return response.status(401).json({ message: "Admin session is invalid" });
    }

    request.admin = admin;
    return next();
  } catch (_error) {
    return response.status(401).json({ message: "Authentication required" });
  }
}

module.exports = { requireAuth };
