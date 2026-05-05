require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const loginRoute = require("./routes/loginRoute");
const dashboardRoutes = require("./routes/dashboardRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const { createPublicEnrollment } = require("./routes/enrollmentRoutes");
const contentRoutes = require("./routes/contentRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const { seedDefaults } = require("./utils/seedDefaults");

const app = express();
const port = Number(process.env.PORT || 5000);
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.use("/api", loginRoute);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.post("/api/enroll", createPublicEnrollment);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((error, _request, response, _next) => {
  response.status(error.status || 500).json({ message: error.message || "Server error" });
});

async function start() {
  await connectDatabase();
  await seedDefaults();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
