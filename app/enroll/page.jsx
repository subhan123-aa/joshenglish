"use client";

import { useEffect, useState } from "react";

const initialForm = {
  fullName: "",
  phone: "",
  whatsapp: "",
  course: "Complete English Master Program",
  branch: "",
  batchTime: "",
  learningGoal: "",
};

const trustPoints = [
  { icon: "⏱️", text: "Limited Seats" },
  { icon: "👨‍🏫", text: "Expert Faculty" },
  { icon: "🌐", text: "Online + Offline" },
  { icon: "🎯", text: "Placement Guidance" },
];

const branches = [
  "Islampur, Uttar Dinajpur",
  "Chakulia, Uttar Dinajpur",
  "Barodhia, Kishanganj",
];

export default function EnrollPage() {
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

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.fullName.trim() || !form.phone.trim() || !form.whatsapp.trim() || !form.branch || !form.batchTime || !form.learningGoal) {
      window.alert("All fields are required.");
      return;
    }

    setSubmitting(true);
    setStatus("");

    try {
      const details = [
        "Hi, I want to book a seat.",
        `Name: ${form.fullName}`,
        `Phone: ${form.phone}`,
        `WhatsApp: ${form.whatsapp}`,
        `Branch: ${form.branch}`,
        `Course: ${form.course}`,
        `Preferred Batch: ${form.batchTime}`,
        `Learning Goal: ${form.learningGoal}`,
      ].join("\n");

      setStatus("Redirecting to WhatsApp...");
      window.open(
        `https://wa.me/918759137380?text=${encodeURIComponent(details)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (_submitError) {
      window.alert("Unable to open WhatsApp right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F5F7FB] to-[#EEF2F7] px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <a
          href="/"
          className="inline-flex text-sm font-medium text-[#6B7280] transition hover:text-[#0B1F3A] mb-12"
        >
          ← Back to Home
        </a>

        {/* 2-Column Layout */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* LEFT SIDE: Premium Content */}
          <div
            className={`transition-all duration-700 ease-out ${
              loaded ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex rounded-full border border-[#FBBF24]/40 bg-[#FBBF24]/10 px-4 py-2 text-xs font-bold tracking-widest text-[#B8860B]">
              ✨ ADMISSIONS OPEN
            </div>

            {/* Main Heading */}
            <h1 className="mt-6 text-4xl font-bold leading-[1.15] text-[#0B1F3A] sm:text-[52px]">
              Join Complete English Master Program
            </h1>

            {/* Description */}
            <p className="mt-5 text-lg leading-8 text-[#6B7280]">
              Spoken English, IELTS, Interview Skills, Confidence Building and Career Growth in one powerful course.
            </p>

            {/* Trust Points */}
            <div className="mt-10 space-y-4">
              {trustPoints.map((point) => (
                <div key={point.text} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBBF24]/20 text-lg">
                    {point.icon}
                  </div>
                  <p className="text-base font-semibold text-[#0B1F3A]">{point.text}</p>
                </div>
              ))}
            </div>

            {/* Student Count */}
            <div className="mt-10 rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-sm font-semibold tracking-wide text-[#6B7280]">TRAINED STUDENTS</p>
              <p className="mt-2 text-4xl font-bold text-[#0B1F3A]">10,000+</p>
              <p className="mt-1 text-sm text-[#6B7280]">Successfully completed our programs</p>
            </div>
          </div>

          {/* RIGHT SIDE: Premium Form Card */}
          <div
            className={`transition-all duration-700 ease-out ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.1)] backdrop-blur-lg sm:p-10">
              {/* Form Header */}
              <h2 className="text-2xl font-bold text-[#0B1F3A] sm:text-[28px]">
                Book Your Seat
              </h2>
              <p className="mt-2 text-sm text-[#6B7280]">
                Free counselling & batch guidance available.
              </p>

              {/* Form */}
              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={updateField}
                    placeholder="e.g., Rahul Kumar"
                    required
                    className="h-14 w-full rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[#0F172A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#FBBF24] focus:ring-2 focus:ring-[#FBBF24]/20"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    placeholder="e.g., 9876543210"
                    required
                    className="h-14 w-full rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[#0F172A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#FBBF24] focus:ring-2 focus:ring-[#FBBF24]/20"
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={updateField}
                    placeholder="e.g., 9876543210"
                    required
                    className="h-14 w-full rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[#0F172A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#FBBF24] focus:ring-2 focus:ring-[#FBBF24]/20"
                  />
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Course Selection *</label>
                  <select
                    name="course"
                    value={form.course}
                    onChange={updateField}
                    required
                    className="h-14 w-full rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[#0F172A] outline-none transition focus:border-[#FBBF24] focus:ring-2 focus:ring-[#FBBF24]/20"
                  >
                    <option value="Complete English Master Program">Complete English Master Program</option>
                  </select>
                </div>

                {/* Branch Selection */}
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Select Branch *</label>
                  <select
                    name="branch"
                    value={form.branch}
                    onChange={updateField}
                    required
                    className="h-14 w-full rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[#0F172A] outline-none transition focus:border-[#FBBF24] focus:ring-2 focus:ring-[#FBBF24]/20"
                  >
                    <option value="">Choose a branch</option>
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                {/* Preferred Batch Time */}
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Preferred Batch Time *</label>
                  <select
                    name="batchTime"
                    value={form.batchTime}
                    onChange={updateField}
                    required
                    className="h-14 w-full rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[#0F172A] outline-none transition focus:border-[#FBBF24] focus:ring-2 focus:ring-[#FBBF24]/20"
                  >
                    <option value="">Select batch time</option>
                    <option value="Morning (6-8 AM)">Morning (6-8 AM)</option>
                    <option value="Afternoon (2-4 PM)">Afternoon (2-4 PM)</option>
                    <option value="Evening (4-6 PM)">Evening (4-6 PM)</option>
                  </select>
                </div>

                {/* Learning Goal */}
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Learning Goal *</label>
                  <select
                    name="learningGoal"
                    value={form.learningGoal}
                    onChange={updateField}
                    required
                    className="h-14 w-full rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[#0F172A] outline-none transition focus:border-[#FBBF24] focus:ring-2 focus:ring-[#FBBF24]/20"
                  >
                    <option value="">Choose your goal</option>
                    <option value="Spoken English">Spoken English</option>
                    <option value="Job Interview">Job Interview</option>
                    <option value="IELTS Preparation">IELTS Preparation</option>
                    <option value="Confidence Building">Confidence Building</option>
                    <option value="Full English Improvement">Full English Improvement</option>
                  </select>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 w-full h-14 rounded-[12px] bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] px-6 text-base font-bold text-[#0B1F3A] shadow-[0_12px_32px_rgba(251,191,36,0.3)] transition duration-300 hover:shadow-[0_16px_40px_rgba(251,191,36,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Book My Seat Now"
                  )}
                </button>

                {/* Trust Message */}
                <p className="text-center text-xs text-[#6B7280] mt-4">
                  🔒 Your details are safe with us.
                </p>

                {status && (
                  <div className="mt-4 rounded-lg bg-[#F0FDF4] p-3 text-center text-sm font-medium text-[#16A34A]">
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Adjustment Note */}
        <div className="mt-12 text-center text-sm text-[#6B7280] lg:hidden">
          <p>💡 Best viewed on desktop for the full premium experience</p>
        </div>
      </div>
    </main>
  );
}
