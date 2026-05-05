"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const email = form.email.trim();
      const password = form.password;

      console.log("Sending login request...");

      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        window.location.href = "/admin/dashboard";
        return;
      }

      setStatus({
        loading: false,
        error: data.message || "Login failed",
      });
      return;
    } catch (error) {
      const isNetworkError =
        error instanceof TypeError ||
        String(error.message || "").toLowerCase().includes("fetch");

      setStatus({
        loading: false,
        error: isNetworkError
          ? "Unable to connect to the login server. Please make sure the backend is running on http://localhost:5000."
          : "Login failed",
      });
      return;
    }

    setStatus({ loading: false, error: "" });
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="auth-copy">
          <span className="eyebrow">Admin Access</span>
          <h1>Welcome back to Josh English Academy</h1>
          <p>
            Securely manage students, courses, enrollments, content, and admin
            settings from one dashboard.
          </p>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              required
            />
          </label>
          {status.error ? <div className="inline-alert error">{status.error}</div> : null}
          <button type="submit" className="btn btn-primary full-width" disabled={status.loading}>
            {status.loading ? "Signing in..." : "Login"}
          </button>
          <a href="/admin/forgot-password" className="subtle-link">
            Forgot password?
          </a>
        </form>
      </section>
    </main>
  );
}
