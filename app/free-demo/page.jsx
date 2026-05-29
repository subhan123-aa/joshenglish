"use client";

import { useState } from "react";
import Link from "next/link";
import { defaultSiteContent } from "@/lib/siteContent";

export default function FreeDemoPage() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    preferredTime: "Morning",
    branch: "",
    learningGoal: "Spoken English",
  });
  const [status, setStatus] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const message = [
      "I want to book a free demo class.",
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Preferred Time: ${form.preferredTime}`,
      `Branch: ${form.branch || "Not selected"}`,
      `Goal: ${form.learningGoal}`,
    ].join("\n");

    setStatus("Opening WhatsApp for your free demo booking.");
    window.open(
      `https://wa.me/${defaultSiteContent.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-5 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-medium text-white/60 transition hover:text-[#fdba74]">
          Back to Home
        </Link>

        <div className="mt-8 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#161616_0%,#0b0b0b_100%)] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <section>
              <span className="inline-flex rounded-full border border-[#f97316]/30 bg-[#f97316]/10 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-[#fdba74]">
                Free Demo
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
                Book Your Free Consultation
              </h1>
              <p className="mt-4 text-base leading-8 text-white/70">
                Fill in your details and our team will contact you shortly.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Live speaking experience with real guidance",
                  "Short batch discussion and counselling support",
                  "Ideal for students, job seekers, and beginners",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/82">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <form
              className="rounded-[28px] border border-white/10 bg-white p-6 text-black shadow-[0_24px_60px_rgba(0,0,0,0.2)] sm:p-8"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-black/80 sm:col-span-2">
                  Full Name
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={updateField}
                    required
                    className="h-14 rounded-[14px] border border-black/10 bg-white px-4 outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/15"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-black/80">
                  Phone Number
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    required
                    className="h-14 rounded-[14px] border border-black/10 bg-white px-4 outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/15"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-black/80">
                  Preferred Time
                  <select
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={updateField}
                    className="h-14 rounded-[14px] border border-black/10 bg-white px-4 outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/15"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-black/80">
                  Branch
                  <select
                    name="branch"
                    value={form.branch}
                    onChange={updateField}
                    className="h-14 rounded-[14px] border border-black/10 bg-white px-4 outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/15"
                  >
                    <option value="">Select branch</option>
                    {defaultSiteContent.branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-black/80 sm:col-span-2">
                  Learning Goal
                  <select
                    name="learningGoal"
                    value={form.learningGoal}
                    onChange={updateField}
                    className="h-14 rounded-[14px] border border-black/10 bg-white px-4 outline-none transition focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/15"
                  >
                    <option value="Spoken English">Spoken English</option>
                    <option value="Interview Preparation">Interview Preparation</option>
                    <option value="Personality Development">Personality Development</option>
                    <option value="Communication Skills">Communication Skills</option>
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#f97316] px-6 text-sm font-semibold text-black transition hover:bg-[#fdba74]"
              >
                Book Free Demo
              </button>

              {status ? (
                <p className="mt-4 rounded-2xl bg-black/5 px-4 py-3 text-center text-sm font-medium text-black/70">
                  {status}
                </p>
              ) : null}

              <p className="mt-4 text-center text-xs uppercase tracking-[0.22em] text-black/40">
                Limited demo slots available every month.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

