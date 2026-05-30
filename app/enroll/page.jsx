"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { defaultSiteContent } from "@/lib/siteContent";

const statusOptions = [
  "School Student",
  "College Student",
  "PG Student",
  "Job Seeker",
  "Working Professional",
  "House Wife",
  "Adults",
  "Kids",
  "Govt. Employee",
  "Private Job Employee",
];

const problemOptions = [
  "I can't speak fluently & want to develop my personality.",
  "I feel nervous while speaking.",
  "My grammar is weak.",
  "I face interview problems.",
  "Lack of confidence.",
  "I want to prepare English Language and Grammar for competitive Examination.",
  "Looking for International English Language Testing System (IELTS).",
  "Looking for tuition for all subjects belonging to ENGLISH MEDIUM school (Class 1st to 8th) & (9th to 12th - English Literature along with Grammar).",
  "Learn English for Abroad / Foreign Country.",
];

const reasonOptions = [
  "For Job / Interview",
  "For Career Growth",
  "For Confidence",
  "Just for Knowledge",
];

const startOptions = ["Immediately", "Within 7 Days", "Within 1 Month", "Just Exploring"];

const investOptions = ["Yes", "Maybe", "No"];

const guidanceOptions = ["Personal Coaching", "Group Classes", "Online Classes"];

const timeOptions = ["Morning", "Afternoon", "Evening", "Night by 10 PM (Sharp)"];

const fieldMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut" },
};

function buildWhatsAppMessage(data) {
  return [
    "*New Enrollment Request - Josh English By R.K.D Sir*",
    "",
    `Name: ${data.fullName}`,
    `Mobile: ${data.mobileNumber}`,
    `WhatsApp: ${data.whatsappNumber}`,
    `City/Area: ${data.cityArea}`,
    `Current Status: ${data.currentStatus}`,
    `English Problem: ${data.englishProblem}`,
    `Why Learn English: ${data.englishReason}`,
    `Course Start: ${data.courseStart}`,
    `Investment Ready: ${data.investReady}`,
    `Guidance Type: ${data.guidanceType}`,
    `Preferred Time: ${data.preferredTime}`,
    `Declaration: ${data.declaration ? "Agreed" : "Not agreed"}`,
  ].join("\n");
}

function OptionGroup({ label, name, options, register, watch, error, columns = "grid-cols-1 sm:grid-cols-2" }) {
  return (
    <motion.fieldset
      {...fieldMotion}
      className="rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,255,255,0.66))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-6"
    >
      <legend className="px-1 text-sm font-semibold text-slate-900">{label}</legend>
      <div className={`mt-5 grid gap-3 ${columns}`}>
        {options.map((option) => {
          const active = watch(name) === option;
          return (
            <label key={option} className="group relative cursor-pointer">
              <input
                type="radio"
                value={option}
                className="peer sr-only"
                {...register(name, { required: `${label} is required` })}
              />
              <div
                className={`flex h-full items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition duration-300 ${
                  active
                    ? "border-orange-400 bg-orange-50 shadow-[0_16px_36px_rgba(249,115,22,0.18)]"
                    : "border-slate-200 bg-white/80 hover:border-orange-300 hover:bg-white hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                }`}
              >
                <span className="text-sm font-medium leading-6 text-slate-900">{option}</span>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                    active ? "border-orange-500 bg-orange-500" : "border-slate-300 bg-white"
                  }`}
                >
                  {active ? <CheckCircle2 className="h-3.5 w-3.5 text-white" /> : null}
                </span>
              </div>
            </label>
          );
        })}
      </div>
      {error ? <p className="mt-3 text-xs font-medium text-red-500">{error.message}</p> : null}
    </motion.fieldset>
  );
}

function TextInput({ label, register, name, error, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-900">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-14 w-full rounded-2xl border border-slate-200 bg-white/95 px-4 text-[15px] text-slate-950 shadow-[0_14px_30px_rgba(15,23,42,0.06)] outline-none transition duration-300 placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/15"
        {...register(name, { required: `${label} is required` })}
      />
      {error ? <p className="mt-2 text-xs font-medium text-red-500">{error.message}</p> : null}
    </label>
  );
}

export default function EnrollPage() {
  const [submitState, setSubmitState] = useState({ sending: false, successOpen: false });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      whatsappNumber: "",
      cityArea: "",
      currentStatus: "",
      englishProblem: "",
      englishReason: "",
      courseStart: "",
      investReady: "",
      guidanceType: "",
      preferredTime: "",
      declaration: false,
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!submitState.successOpen) return undefined;

    const timer = window.setTimeout(() => {
      setSubmitState((current) => ({ ...current, successOpen: false }));
    }, 4800);

    return () => window.clearTimeout(timer);
  }, [submitState.successOpen]);

  const onSubmit = (data) => {
    setSubmitState((current) => ({ ...current, sending: true }));

    const finalMessage = buildWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/${defaultSiteContent.whatsappNumber}?text=${encodeURIComponent(finalMessage)}`;

    window.location.assign(whatsappUrl);
  };

  return (
    <main className="relative isolate min-h-[100dvh] w-full overflow-x-hidden bg-[#060606] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-orange-500/18 blur-3xl" />
        <div className="absolute right-[-8rem] top-[10rem] h-[24rem] w-[24rem] rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-[18%] h-[18rem] w-[18rem] rounded-full bg-white/6 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[900px] flex-col px-3 py-4 sm:px-5 sm:py-6 lg:px-0 lg:py-8">
        <div className="flex items-center justify-between gap-4 px-1 sm:px-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/72 backdrop-blur-xl transition hover:border-orange-400/40 hover:bg-white/10 hover:text-white"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Home
          </Link>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_30%),linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] shadow-[0_28px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:mt-6 sm:rounded-[34px]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/90 to-transparent" />

          <div className="flex justify-center px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
            <motion.section
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full"
            >
              <div className="rounded-[26px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(255,251,245,0.94))] p-4 text-slate-950 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:rounded-[30px] sm:p-6 lg:p-8">
                <div className="border-b border-slate-200/80 pb-4 sm:pb-5">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    Enroll Now
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    Enroll Now
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                    Fill in your details to join Josh English By R.K.D Sir.
                  </p>
                </div>

                <form className="mt-5 space-y-5 sm:mt-6 sm:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <motion.section
                    {...fieldMotion}
                    className="rounded-[24px] border border-slate-200 bg-white/75 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl sm:rounded-[28px] sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-700">
                          Section 1
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-slate-950">Basic Details</h3>
                      </div>
                      <div className="hidden items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 sm:inline-flex">
                        <Users className="h-3.5 w-3.5" />
                        Start with essentials
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <TextInput
                          label="Full Name"
                          register={register}
                          name="fullName"
                          error={errors.fullName}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <TextInput
                        label="Mobile Number"
                        register={register}
                        name="mobileNumber"
                        error={errors.mobileNumber}
                        type="tel"
                        placeholder="Enter your mobile number"
                      />
                      <TextInput
                        label="WhatsApp Number"
                        register={register}
                        name="whatsappNumber"
                        error={errors.whatsappNumber}
                        type="tel"
                        placeholder="Enter your WhatsApp number"
                      />
                      <div className="md:col-span-2">
                        <TextInput
                          label="City / Area"
                          register={register}
                          name="cityArea"
                          error={errors.cityArea}
                          placeholder="Enter your city / area"
                        />
                      </div>
                    </div>
                  </motion.section>

                  <OptionGroup
                    label="What is your current status?"
                    name="currentStatus"
                    options={statusOptions}
                    register={register}
                    watch={watch}
                    error={errors.currentStatus}
                    columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  />

                  <OptionGroup
                    label="What is your biggest problem in English?"
                    name="englishProblem"
                    options={problemOptions}
                    register={register}
                    watch={watch}
                    error={errors.englishProblem}
                    columns="grid-cols-1"
                  />

                  <div className="grid gap-6">
                    <OptionGroup
                      label="Why do you want to learn English?"
                      name="englishReason"
                      options={reasonOptions}
                      register={register}
                      watch={watch}
                      error={errors.englishReason}
                      columns="grid-cols-1 sm:grid-cols-2"
                    />

                    <OptionGroup
                      label="When do you want to start your course?"
                      name="courseStart"
                      options={startOptions}
                      register={register}
                      watch={watch}
                      error={errors.courseStart}
                      columns="grid-cols-1 sm:grid-cols-2"
                    />

                    <OptionGroup
                      label="Are you ready to invest in a Spoken English course?"
                      name="investReady"
                      options={investOptions}
                      register={register}
                      watch={watch}
                      error={errors.investReady}
                      columns="grid-cols-1 sm:grid-cols-3"
                    />
                </div>

                  <div className="grid gap-6">
                    <OptionGroup
                      label="What type of guidance do you prefer?"
                      name="guidanceType"
                      options={guidanceOptions}
                      register={register}
                      watch={watch}
                      error={errors.guidanceType}
                      columns="grid-cols-1 sm:grid-cols-3"
                    />

                    <OptionGroup
                      label="Preferred Time Slot"
                      name="preferredTime"
                      options={timeOptions}
                      register={register}
                      watch={watch}
                      error={errors.preferredTime}
                      columns="grid-cols-1 sm:grid-cols-2"
                    />
                </div>

                <motion.label
                  {...fieldMotion}
                  className="flex cursor-pointer items-start gap-4 rounded-[22px] border border-slate-200 bg-white/80 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.05)] backdrop-blur-xl sm:rounded-[26px] sm:p-5"
                >
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 shrink-0 rounded-md border-slate-300 text-orange-500 focus:ring-orange-400"
                      {...register("declaration", {
                        required: "Please confirm the declaration to continue",
                      })}
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-950">Declaration</p>
                      <p className="mt-1 text-sm leading-7 text-slate-600">
                        I am serious about improving my English and ready to take action.
                      </p>
                      {errors.declaration ? (
                        <p className="mt-2 text-xs font-medium text-red-500">
                          {errors.declaration.message}
                        </p>
                      ) : null}
                    </div>
                  </motion.label>

                <div className="rounded-[28px] border border-orange-200 bg-[linear-gradient(135deg,rgba(249,115,22,0.08),rgba(255,255,255,0.92))] p-5 shadow-[0_20px_45px_rgba(249,115,22,0.08)]">
                  <button
                    type="submit"
                    disabled={submitState.sending}
                    className="group relative inline-flex min-h-14 w-full items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#f97316_0%,#fdba74_100%)] px-7 text-sm font-semibold text-black shadow-[0_18px_50px_rgba(249,115,22,0.34)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_24px_70px_rgba(249,115,22,0.42)] disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.45),transparent)] opacity-0 transition duration-500 group-hover:translate-x-full group-hover:opacity-100" />
                    <span className="relative inline-flex items-center gap-2">
                      {submitState.sending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Book Free Demo
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </span>
                  </button>

                  <p className="mt-3 text-center text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                    Only serious candidates will be selected for admission.
                  </p>
                </div>
                </form>
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {submitState.successOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(17,17,17,0.98),rgba(8,8,8,0.96))] p-6 text-white shadow-[0_28px_100px_rgba(0,0,0,0.55)] sm:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
              <div className="absolute right-[-4rem] top-[-4rem] h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />

              <button
                type="button"
                onClick={() => setSubmitState((current) => ({ ...current, successOpen: false }))}
                className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Close
              </button>

              <div className="relative space-y-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-orange-400/20 bg-orange-400/12 text-orange-200 shadow-[0_0_0_1px_rgba(249,115,22,0.1)]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {"\u2705 \u0906\u0935\u0947\u0926\u0928 \u0938\u092b\u0932!"}
                  </h3>
                  <p className="text-base leading-8 text-white/76">
                    {"\u{1F4DE}"} Our team will contact you shortly.
                  </p>
                  <p className="rounded-2xl border border-orange-400/15 bg-orange-400/10 px-4 py-3 text-sm leading-7 text-orange-100">
                    {"\u26A0\uFE0F"} Only serious candidates will be selected for admission.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/72">
                    Premium support
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/72">
                    Fast follow-up
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/72">
                    Consultation queued
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/70">
                  <span className="inline-flex items-center gap-2">
                    <Video className="h-4 w-4 text-orange-200" />
                    Free demo booking in progress
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-orange-200" />
                    24-48 hrs
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
