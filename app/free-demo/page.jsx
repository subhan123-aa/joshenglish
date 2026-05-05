"use client";

import { useEffect, useState } from "react";

const initialForm = {
  fullName: "",
  phone: "",
  whatsapp: "",
  preferredTime: "Morning",
  branch: "Islampur",
  learningGoal: "Spoken English",
};

export default function FreeDemoPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setLoaded(true), 60);
    return () => window.clearTimeout(timeoutId);
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.fullName.trim() || !form.phone.trim() || !form.whatsapp.trim() || !form.preferredTime || !form.branch || !form.learningGoal) {
      window.alert("All fields are required.");
      return;
    }

    setSubmitting(true);
    setStatus("Redirecting to WhatsApp...");

    const message = [
      "I want to book a free demo class.",
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `WhatsApp: ${form.whatsapp}`,
      `Preferred Batch Time: ${form.preferredTime}`,
      `Branch: ${form.branch}`,
      `Learning Goal: ${form.learningGoal}`,
    ].join("\n");

    window.open(
      `https://wa.me/918759137380?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    window.setTimeout(() => setSubmitting(false), 400);
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[600px]">
        <div
          className={`mb-8 text-center transition-all duration-700 ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <a
            href="/"
            className="inline-flex text-sm font-medium text-[#6B7280] transition hover:text-[#0F172A]"
          >
            Back to Home
          </a>
          <h1 className="mt-4 text-3xl font-semibold text-[#0F172A] sm:text-[40px]">
            Book Your Free Demo Class
          </h1>
          <p className="mt-3 text-[15px] leading-7 text-[#6B7280]">
            Fill the form and our team will contact you shortly.
          </p>
        </div>

        <div
          className={`rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition-all duration-700 ease-out sm:p-10 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium text-[#0F172A]">
              Full Name *
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                required
                className="h-[52px] rounded-[10px] border border-[#E2E8F0] bg-white px-4 text-[#0F172A] outline-none transition duration-300 focus:border-[#FACC15] focus:shadow-[0_0_0_4px_rgba(250,204,21,0.16)]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#0F172A]">
              Phone Number *
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={updateField}
                required
                className="h-[52px] rounded-[10px] border border-[#E2E8F0] bg-white px-4 text-[#0F172A] outline-none transition duration-300 focus:border-[#FACC15] focus:shadow-[0_0_0_4px_rgba(250,204,21,0.16)]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#0F172A]">
              WhatsApp Number *
              <input
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={updateField}
                required
                className="h-[52px] rounded-[10px] border border-[#E2E8F0] bg-white px-4 text-[#0F172A] outline-none transition duration-300 focus:border-[#FACC15] focus:shadow-[0_0_0_4px_rgba(250,204,21,0.16)]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#0F172A]">
              Preferred Batch Time *
              <select
                name="preferredTime"
                value={form.preferredTime}
                onChange={updateField}
                required
                className="h-[52px] rounded-[10px] border border-[#E2E8F0] bg-white px-4 text-[#0F172A] outline-none transition duration-300 focus:border-[#FACC15] focus:shadow-[0_0_0_4px_rgba(250,204,21,0.16)]"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#0F172A]">
              Branch Selection *
              <select
                name="branch"
                value={form.branch}
                onChange={updateField}
                required
                className="h-[52px] rounded-[10px] border border-[#E2E8F0] bg-white px-4 text-[#0F172A] outline-none transition duration-300 focus:border-[#FACC15] focus:shadow-[0_0_0_4px_rgba(250,204,21,0.16)]"
              >
                <option value="Islampur">Islampur</option>
                <option value="Chakulia">Chakulia</option>
                <option value="Bardahia">Bardahia</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#0F172A]">
              Learning Goal *
              <select
                name="learningGoal"
                value={form.learningGoal}
                onChange={updateField}
                required
                className="h-[52px] rounded-[10px] border border-[#E2E8F0] bg-white px-4 text-[#0F172A] outline-none transition duration-300 focus:border-[#FACC15] focus:shadow-[0_0_0_4px_rgba(250,204,21,0.16)]"
              >
                <option value="Spoken English">Spoken English</option>
                <option value="Job Interview Preparation">Job Interview Preparation</option>
                <option value="Grammar Improvement">Grammar Improvement</option>
                <option value="Personality Development">Personality Development</option>
                <option value="Competitive Exam English">Competitive Exam English</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#fde047_0%,#facc15_100%)] px-6 text-sm font-semibold text-[#0F172A] shadow-[0_16px_30px_rgba(250,204,21,0.22)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_20px_36px_rgba(250,204,21,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Book Free Demo Now"}
            </button>

            {status ? (
              <p className="rounded-[10px] bg-[#F0FDF4] px-4 py-3 text-center text-sm font-medium text-[#16A34A]">
                {status}
              </p>
            ) : null}

            <p className="text-center text-sm text-[#6B7280]">
              Limited demo slots available this week.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
