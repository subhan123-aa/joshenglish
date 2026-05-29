"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { AdminShell } from "@/components/AdminShell";
import { OverviewSection } from "@/components/dashboard/OverviewSection";
import { StudentsSection } from "@/components/dashboard/StudentsSection";
import { CoursesSection } from "@/components/dashboard/CoursesSection";
import { EnrollmentsSection } from "@/components/dashboard/EnrollmentsSection";
import { ContentSection } from "@/components/dashboard/ContentSection";
import { SettingsSection } from "@/components/dashboard/SettingsSection";
import { SeminarGallerySection } from "@/components/dashboard/SeminarGallerySection";
import { defaultSiteContent } from "@/lib/siteContent";

const emptyStudent = { name: "", phone: "", course: "", paymentStatus: "Pending" };
const emptyCourse = { name: "", description: "", price: "", duration: "" };
const emptyEnrollment = { name: "", phone: "", course: "" };

export default function DashboardPage() {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [dashboard, setDashboard] = useState({
    stats: { totalStudents: 0, totalEnrollments: 0, activeCourses: 0 },
    recentEnrollments: [],
  });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [content, setContent] = useState(defaultSiteContent);
  const [settings, setSettings] = useState({
    siteName: "Josh English Academy",
    supportEmail: "contact@joshenglishacademy.in",
    contactPhone: "8759137380",
  });
  const [notifications, setNotifications] = useState([]);
  const [studentForm, setStudentForm] = useState(emptyStudent);
  const [courseForm, setCourseForm] = useState(emptyCourse);
  const [enrollmentForm, setEnrollmentForm] = useState(emptyEnrollment);
  const [editingStudentId, setEditingStudentId] = useState("");
  const [editingCourseId, setEditingCourseId] = useState("");
  const [filters, setFilters] = useState({ query: "", course: "", paymentStatus: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [credentialsForm, setCredentialsForm] = useState({
    currentPassword: "",
    newEmail: "",
    newPassword: "",
  });

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      const token =
        typeof window !== "undefined" ? window.localStorage.getItem("adminToken") : null;

      console.log("Dashboard token:", token);

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      try {
        if (!mounted) return;

        const localAdmin = {
          name: "Josh English Admin",
          email: "admin@joshenglishacademy.com",
        };

        setAdmin(localAdmin);
        setCredentialsForm((current) => ({ ...current, newEmail: localAdmin.email }));

        try {
          const data = await Promise.all([
            api.get("/dashboard", { credentials: "include" }),
            api.get("/students", { credentials: "include" }),
            api.get("/courses", { credentials: "include" }),
            api.get("/enrollments", { credentials: "include" }),
            api.get("/content", { credentials: "include" }),
            api.get("/settings", { credentials: "include" }),
            api.get("/notifications", { credentials: "include" }),
          ]);

          if (!mounted) return;
          setDashboard(data[0]);
          setStudents(data[1]);
          setCourses(data[2]);
          setEnrollments(data[3]);
          setContent({
            ...defaultSiteContent,
            ...data[4],
            socialLinks: {
              ...defaultSiteContent.socialLinks,
              ...(data[4]?.socialLinks || {}),
            },
            seminarGallery:
              data[4]?.seminarGallery?.length
                ? data[4].seminarGallery
                : defaultSiteContent.seminarGallery,
            courses: data[4]?.courses?.length ? data[4].courses : defaultSiteContent.courses,
            aboutPoints:
              data[4]?.aboutPoints?.length
                ? data[4].aboutPoints
                : defaultSiteContent.aboutPoints,
            highlights:
              data[4]?.highlights?.length
                ? data[4].highlights
                : defaultSiteContent.highlights,
          });
          setSettings((current) => ({ ...current, ...(data[5] || {}) }));
          setNotifications(data[6]);
        } catch (apiError) {
          console.log("Dashboard API fallback:", apiError);
        }
      } catch (_error) {
        router.replace("/admin/login");
      } finally {
        if (mounted) setAuthReady(true);
      }
    }

    bootstrap();
    const interval = setInterval(async () => {
      try {
        const notificationData = await api.get("/notifications", { credentials: "include" });
        if (mounted) setNotifications(notificationData);
      } catch (_error) {}
    }, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [router]);

  const filteredStudents = useMemo(
    () =>
      students.filter((student) => {
        const query = filters.query.toLowerCase();
        const matchesQuery =
          !filters.query ||
          student.name.toLowerCase().includes(query) ||
          student.phone.includes(filters.query);
        const matchesCourse = !filters.course || student.course === filters.course;
        const matchesPayment =
          !filters.paymentStatus || student.paymentStatus === filters.paymentStatus;
        return matchesQuery && matchesCourse && matchesPayment;
      }),
    [students, filters]
  );

  function showMessage(type, text) {
    setMessage({ type, text });
    window.clearTimeout(showMessage.timeoutId);
    showMessage.timeoutId = window.setTimeout(
      () => setMessage({ type: "", text: "" }),
      3500
    );
  }

  async function refreshDashboard() {
    const [
      dashboardData,
      studentData,
      courseData,
      enrollmentData,
      notificationData,
      contentData,
      settingsData,
    ] =
      await Promise.all([
        api.get("/dashboard", { credentials: "include" }),
        api.get("/students", { credentials: "include" }),
        api.get("/courses", { credentials: "include" }),
        api.get("/enrollments", { credentials: "include" }),
        api.get("/notifications", { credentials: "include" }),
        api.get("/content", { credentials: "include" }),
        api.get("/settings", { credentials: "include" }),
      ]);

    setDashboard(dashboardData);
    setStudents(studentData);
    setCourses(courseData);
    setEnrollments(enrollmentData);
    setNotifications(notificationData);
    setContent({
      ...defaultSiteContent,
      ...contentData,
      socialLinks: {
        ...defaultSiteContent.socialLinks,
        ...(contentData?.socialLinks || {}),
      },
      seminarGallery:
        contentData?.seminarGallery?.length
          ? contentData.seminarGallery
          : defaultSiteContent.seminarGallery,
      courses: contentData?.courses?.length ? contentData.courses : defaultSiteContent.courses,
      aboutPoints:
        contentData?.aboutPoints?.length ? contentData.aboutPoints : defaultSiteContent.aboutPoints,
      highlights:
        contentData?.highlights?.length ? contentData.highlights : defaultSiteContent.highlights,
    });
    setSettings((current) => ({ ...current, ...(settingsData || {}) }));
  }

  async function handleStudentSubmit(event) {
    event.preventDefault();
    try {
      if (editingStudentId) {
        await api.put(`/students/${editingStudentId}`, studentForm, { credentials: "include" });
        showMessage("success", "Student updated successfully.");
      } else {
        await api.post("/students", studentForm, { credentials: "include" });
        showMessage("success", "Student added successfully.");
      }
      setStudentForm(emptyStudent);
      setEditingStudentId("");
      await refreshDashboard();
    } catch (error) {
      showMessage("error", error.message || "Unable to save student.");
    }
  }

  async function handleCourseSubmit(event) {
    event.preventDefault();
    try {
      if (editingCourseId) {
        await api.put(`/courses/${editingCourseId}`, courseForm, { credentials: "include" });
        showMessage("success", "Course updated successfully.");
      } else {
        await api.post("/courses", courseForm, { credentials: "include" });
        showMessage("success", "Course created successfully.");
      }
      setCourseForm(emptyCourse);
      setEditingCourseId("");
      await refreshDashboard();
    } catch (error) {
      showMessage("error", error.message || "Unable to save course.");
    }
  }

  async function handleManualEnrollmentSubmit(event) {
    event.preventDefault();
    try {
      await api.post("/enrollments", enrollmentForm, { credentials: "include" });
      setEnrollmentForm(emptyEnrollment);
      showMessage("success", "Manual enrollment added successfully.");
      await refreshDashboard();
    } catch (error) {
      showMessage("error", error.message || "Unable to add enrollment.");
    }
  }

  async function handleDelete(path, id, label) {
    if (!window.confirm(`Delete this ${label}? This action cannot be undone.`)) return;
    try {
      await api.delete(`${path}/${id}`, { credentials: "include" });
      showMessage("success", `${label} deleted successfully.`);
      await refreshDashboard();
    } catch (error) {
      showMessage("error", error.message || `Unable to delete ${label}.`);
    }
  }

  async function updateEnrollmentStatus(id, status) {
    try {
      await api.patch(`/enrollments/${id}/status`, { status }, { credentials: "include" });
      showMessage("success", `Enrollment ${status.toLowerCase()}.`);
      await refreshDashboard();
    } catch (error) {
      showMessage("error", error.message || "Unable to update enrollment.");
    }
  }

  async function updatePaymentStatus(id, paymentStatus) {
    try {
      await api.patch(`/students/${id}/payment`, { paymentStatus }, { credentials: "include" });
      showMessage("success", "Payment status updated.");
      await refreshDashboard();
    } catch (error) {
      showMessage("error", error.message || "Unable to update payment.");
    }
  }

  async function saveContent(event) {
    event.preventDefault();
    try {
      await api.put("/content", content, { credentials: "include" });
      showMessage("success", "Website content updated.");
    } catch (error) {
      showMessage("error", error.message || "Unable to update content.");
    }
  }

  async function saveSettings(event) {
    event.preventDefault();
    try {
      await api.put("/settings", settings, { credentials: "include" });
      showMessage("success", "Site settings updated.");
    } catch (error) {
      showMessage("error", error.message || "Unable to update settings.");
    }
  }

  async function changeCredentials(event) {
    event.preventDefault();
    try {
      const response = await api.patch("/auth/change-credentials", credentialsForm, {
        credentials: "include",
      });
      setAdmin(response.admin);
      setCredentialsForm((current) => ({
        ...current,
        currentPassword: "",
        newPassword: "",
      }));
      showMessage("success", "Admin credentials updated.");
    } catch (error) {
      showMessage("error", error.message || "Unable to change credentials.");
    }
  }

  async function handleLogout() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("adminToken");
    }
    router.replace("/admin/login");
  }

  async function markNotificationsRead() {
    try {
      await api.patch("/notifications/read-all", {}, { credentials: "include" });
      setNotifications(await api.get("/notifications", { credentials: "include" }));
    } catch (_error) {}
  }

  if (!authReady) return <main className="dashboard-loading">Loading dashboard...</main>;

  return (
    <AdminShell
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onLogout={handleLogout}
      notificationCount={notifications.filter((item) => !item.read).length}
      adminName={admin?.name || "Admin"}
    >
      {message.text ? <div className={`inline-alert ${message.type}`}>{message.text}</div> : null}
      {activeSection === "overview" ? (
        <OverviewSection
          dashboard={dashboard}
          notifications={notifications}
          onMarkRead={markNotificationsRead}
        />
      ) : null}
      {activeSection === "students" ? (
        <StudentsSection
          studentForm={studentForm}
          setStudentForm={setStudentForm}
          editingStudentId={editingStudentId}
          setEditingStudentId={setEditingStudentId}
          courses={courses}
          filters={filters}
          setFilters={setFilters}
          filteredStudents={filteredStudents}
          onSubmit={handleStudentSubmit}
          onDelete={handleDelete}
          onPaymentUpdate={updatePaymentStatus}
        />
      ) : null}
      {activeSection === "courses" ? (
        <CoursesSection
          courseForm={courseForm}
          setCourseForm={setCourseForm}
          editingCourseId={editingCourseId}
          setEditingCourseId={setEditingCourseId}
          courses={courses}
          onSubmit={handleCourseSubmit}
          onDelete={handleDelete}
        />
      ) : null}
      {activeSection === "enquiries" ? (
        <EnrollmentsSection
          enrollmentForm={enrollmentForm}
          setEnrollmentForm={setEnrollmentForm}
          courses={courses}
          enrollments={enrollments}
          onSubmit={handleManualEnrollmentSubmit}
          onStatusChange={updateEnrollmentStatus}
        />
      ) : null}
      {activeSection === "seminars" ? (
        <SeminarGallerySection content={content} setContent={setContent} onSubmit={saveContent} />
      ) : null}
      {activeSection === "content" ? (
        <ContentSection
          content={content}
          setContent={setContent}
          onSubmit={saveContent}
        />
      ) : null}
      {activeSection === "settings" ? (
        <SettingsSection
          settings={settings}
          setSettings={setSettings}
          credentialsForm={credentialsForm}
          setCredentialsForm={setCredentialsForm}
          onSettingsSubmit={saveSettings}
          onCredentialsSubmit={changeCredentials}
        />
      ) : null}
    </AdminShell>
  );
}
