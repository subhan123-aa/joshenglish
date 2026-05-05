const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;
const allowedOrigins = ["http://localhost:3000", "http://localhost:3002"];
const enrollments = [];
const notifications = [];
const students = [];
const courses = [
  { _id: "spoken-english", name: "Spoken English" },
  { _id: "ielts", name: "IELTS" },
  { _id: "competitive-english", name: "Competitive English" },
  { _id: "personality-development", name: "Personality Development" },
];
const content = {};
const settings = {
  siteName: "Josh English Academy",
  supportEmail: "info@joshenglishacademy.com",
  contactPhone: "8759137380",
};

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(express.json());

function buildDashboard() {
  return {
    stats: {
      totalStudents: students.length,
      totalEnrollments: enrollments.length,
      activeCourses: courses.length,
    },
    recentEnrollments: [...enrollments]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6),
  };
}

function validateEnrollment(body) {
  if (!body.name || !String(body.name).trim()) {
    return "Name is required";
  }

  if (!body.phone || !String(body.phone).trim()) {
    return "Phone is required";
  }

  return "";
}

app.get("/", (_request, response) => {
  response.json({
    success: true,
    message: "Josh English Academy backend is running",
  });
});

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN DATA:", email, password);

  if (
    email === "admin@joshenglishacademy.com" &&
    password === "123456"
  ) {
    return res.json({
      success: true,
      token: "demo-token-123",
      user: { email },
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
});

app.get("/api/dashboard", (_request, response) => {
  response.json(buildDashboard());
});

app.get("/api/students", (_request, response) => {
  response.json(students);
});

app.get("/api/courses", (_request, response) => {
  response.json(courses);
});

app.get("/api/enrollments", (_request, response) => {
  response.json([...enrollments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.post("/api/enroll", (request, response) => {
  const validationMessage = validateEnrollment(request.body);

  if (validationMessage) {
    return response.status(400).json({ message: validationMessage });
  }

  const enrollment = {
    _id: `${Date.now()}`,
    name: String(request.body.name).trim(),
    phone: String(request.body.phone).trim(),
    course: String(request.body.course || "").trim(),
    branch: String(request.body.branch || "").trim(),
    message: String(request.body.message || "").trim(),
    source: "Website",
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  enrollments.unshift(enrollment);
  notifications.unshift({
    _id: `notification-${Date.now()}`,
    title: "New Enrollment",
    message: `${enrollment.name} requested ${enrollment.course || "a course"}${enrollment.branch ? ` from ${enrollment.branch}` : ""}.`,
    read: false,
    createdAt: new Date().toISOString(),
  });

  return response.status(201).json({ success: true, enrollment });
});

app.post("/api/enrollments", (request, response) => {
  const validationMessage = validateEnrollment(request.body);

  if (validationMessage) {
    return response.status(400).json({ message: validationMessage });
  }

  const enrollment = {
    _id: `${Date.now()}`,
    name: String(request.body.name).trim(),
    phone: String(request.body.phone).trim(),
    course: String(request.body.course || "").trim(),
    branch: String(request.body.branch || "").trim(),
    message: String(request.body.message || "").trim(),
    source: "Manual",
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  enrollments.unshift(enrollment);
  return response.status(201).json(enrollment);
});

app.patch("/api/enrollments/:id/status", (request, response) => {
  const enrollment = enrollments.find((item) => item._id === request.params.id);

  if (!enrollment) {
    return response.status(404).json({ message: "Enrollment not found" });
  }

  enrollment.status = request.body.status || enrollment.status;
  return response.json(enrollment);
});

app.get("/api/content", (_request, response) => {
  response.json(content);
});

app.get("/api/settings", (_request, response) => {
  response.json(settings);
});

app.get("/api/notifications", (_request, response) => {
  response.json(notifications);
});

app.patch("/api/notifications/read-all", (_request, response) => {
  notifications.forEach((item) => {
    item.read = true;
  });
  response.json({ success: true });
});

app.use((error, _request, response, _next) => {
  response.status(500).json({ message: error.message || "Server error" });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
