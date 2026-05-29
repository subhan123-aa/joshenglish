"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const data = await api.post(
        "/auth/login",
        { email: form.email.trim(), password: form.password },
        { credentials: "include" }
      );

      if (data.admin) {
        localStorage.setItem("adminToken", "authenticated");
        router.push("/admin/dashboard");
        return;
      }

      setStatus({ loading: false, error: "Login failed" });
    } catch (error) {
      setStatus({
        loading: false,
        error: error.message || "Unable to sign in right now.",
      });
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="auth-copy">
          <span className="eyebrow">Admin Access</span>
          <h1>Welcome back to Josh English Academy</h1>
          <p>
            Manage enquiry leads, seminar gallery updates, website content, and academy settings
            from one clean dashboard.
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
        </form>
      </section>
    </main>
  );
}
