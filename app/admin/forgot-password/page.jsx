"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState({ type: "", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setResponse({ type: "", message: "" });

    try {
      const data = await api.post("/auth/forgot-password", { email });
      const message = data.resetToken
        ? `Reset token generated for development: ${data.resetToken}`
        : "If that admin email exists, reset instructions have been generated.";
      setResponse({ type: "success", message });
    } catch (error) {
      setResponse({ type: "error", message: error.message || "Request failed" });
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel single">
        <form className="auth-card" onSubmit={handleSubmit}>
          <span className="eyebrow">Password Recovery</span>
          <h1>Forgot password</h1>
          <p>Enter the admin email to generate a reset link or development token.</p>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          {response.message ? (
            <div className={`inline-alert ${response.type}`}>{response.message}</div>
          ) : null}
          <button type="submit" className="btn btn-primary full-width">
            Send Reset Request
          </button>
          <a href="/admin/login" className="subtle-link">
            Back to login
          </a>
        </form>
      </section>
    </main>
  );
}
