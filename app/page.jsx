"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const courses = [
  {
    title: "Spoken English Course",
    description:
      "Master day-to-day communication, vocabulary, grammar, and speaking confidence with practical classroom training.",
  },
  {
    title: "IELTS Coaching",
    description:
      "Structured guidance for speaking, listening, reading, and writing with exam-focused strategies and feedback.",
  },
  {
    title: "Competitive Exam English",
    description:
      "Special coaching for UPSC, SSC, PSC, and RRB aspirants to strengthen grammar, comprehension, and accuracy.",
  },
  {
    title: "Personality Development",
    description:
      "Build interview confidence, communication presence, and personal expression to stand out academically and professionally.",
  },
];

const reasons = [
  "11+ Years Experience",
  "Offline & Online Classes",
  "Expert Faculty (RKD Sir)",
  "Practical Training",
  "Affordable Fees",
];

const branches = [
  { title: "Islampur", subtitle: "Near Union Bank" },
  { title: "Chakulia", subtitle: "Uttar Dinajpur" },
  { title: "Barodhia", subtitle: "Near Kishanganj" },
];

const testimonials = [
  {
    name: "Ayaan Khan",
    feedback:
      "RKD Sir helped me improve my confidence in speaking English. Highly recommended!",
  },
  {
    name: "Priya Sharma",
    feedback:
      "Best institute for spoken English. My communication skills improved a lot.",
  },
  {
    name: "Rohit Verma",
    feedback:
      "Very practical teaching style. I gained confidence in interviews.",
  },
  {
    name: "Sana Ali",
    feedback: "IELTS preparation was amazing. I scored better than expected!",
  },
  {
    name: "Aman Gupta",
    feedback: "Friendly environment and expert guidance. Loved the classes.",
  },
  {
    name: "Neha Singh",
    feedback: "Personality development sessions really helped me grow.",
  },
];

const results = [
  {
    badge: "IELTS Success",
    title: "Band 7.5 Overall",
    student: "Sana Ali",
    summary:
      "Focused speaking drills and writing feedback helped her exceed her target score with confidence.",
    highlight: "Listening 8.0 | Speaking 7.5",
  },
  {
    badge: "Before & After",
    title: "From Hesitant to Fluent",
    student: "Ayaan Khan",
    summary:
      "Moved from limited classroom participation to confident daily English communication in real situations.",
    highlight: "Before: Low confidence | After: Fluent conversation",
  },
  {
    badge: "Success Story",
    title: "Interview Ready Growth",
    student: "Rohit Verma",
    summary:
      "Improved speaking clarity, grammar accuracy, and interview answers through practical mock sessions.",
    highlight: "Before: Nervous replies | After: Confident delivery",
  },
];

const stats = [
  { value: 10000, suffix: "+", label: "Students" },
  { value: 11, suffix: "+", label: "Years Experience" },
  { value: 1000, suffix: "+", label: "Success Stories" },
  { value: 100, suffix: "%", label: "Practical Guidance" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <path d="M14 8h2V4.5A26.3 26.3 0 0 0 13.1 4C10.2 4 8.2 5.8 8.2 9.1V12H5v4h3.2v8h4.1v-8H16l.6-4h-4.2V9.5c0-1.2.3-2 1.6-2Z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="#0B0B0B" stroke="none" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2A37 37 0 0 0 12 4.7a37 37 0 0 0-7.6.5 2.9 2.9 0 0 0-2 2A30.7 30.7 0 0 0 2 12a30.7 30.7 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2 37 37 0 0 0 7.6.5 37 37 0 0 0 7.6-.5 2.9 2.9 0 0 0 2-2A30.7 30.7 0 0 0 22 12a30.7 30.7 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />,
  },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M5.5 4.5h3l1.5 5-2 1.5c1.4 2.8 3.2 4.6 6 6l1.5-2 5 1.5v3c0 1.1-.9 2-2 2C12.7 22.5 1.5 11.3 1.5 6c0-1.1.9-2 2-2Z" />
    </svg>
  );
}

function StatCounter({ suffix, label, active }) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-6 text-center shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
      <p className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-[46px]">
        {active}
        {suffix}
      </p>
      <p className="mt-3 text-sm font-medium tracking-[0.14em] text-slate-500">{label}</p>
    </article>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      document.documentElement.style.setProperty(
        "--hero-parallax",
        `${window.scrollY * 0.7}px`
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const statsSection = document.querySelector("[data-stats-section]");
    if (!statsSection) return;

    let started = false;
    const duration = 1400;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started) return;
          started = true;

          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setAnimatedStats(stats.map((item) => Math.round(item.value * eased)));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
          observer.disconnect();
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#f6f8fb] text-slate-900">
      <section
        id="home"
        className="relative overflow-hidden border-b border-white/10 bg-[#0b0b0b]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(7, 18, 38, 0.66), rgba(7, 18, 38, 0.82), rgba(249, 115, 22, 0.18)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=90')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <header
          className={`sticky top-0 z-40 transition-all duration-300 ${
            scrolled
              ? "border-b border-white/10 bg-black/92 backdrop-blur-xl"
              : "border-b border-white/8 bg-black/82 backdrop-blur-md"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <a href="#home" className="flex items-center py-1 text-white">
                <Image
                  src="/josh-english-logo-transparent.png"
                  alt="Josh English Academy logo"
                  width={415}
                  height={180}
                  priority
                  className="h-11 w-auto object-contain bg-transparent px-1 drop-shadow-[0_8px_18px_rgba(249,115,22,0.14)] sm:h-14"
                />
              </a>
              <span className="hidden rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs font-medium text-white/72 backdrop-blur-sm lg:inline-flex">
                11+ Years Experience
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white md:hidden"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              <span className="space-y-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-white" />
                <span className="block h-0.5 w-5 rounded-full bg-white" />
                <span className="block h-0.5 w-5 rounded-full bg-white" />
              </span>
            </button>

            <nav className="hidden items-center gap-10 text-sm font-medium text-white/82 md:flex">
              <a href="#home" className="transition duration-300 hover:text-[#f97316]">
                Home
              </a>
              <a href="#courses" className="transition duration-300 hover:text-[#f97316]">
                Courses
              </a>
              <a href="#contact" className="transition duration-300 hover:text-[#f97316]">
                Contact
              </a>
              <a
                href="/admin/login"
                className="rounded-full border border-white/15 bg-white px-5 py-2.5 text-black shadow-[0_16px_32px_rgba(11,31,58,0.18)] transition hover:bg-[#f97316] hover:text-black"
              >
                Admin
              </a>
            </nav>
          </div>

          {menuOpen ? (
            <div className="border-t border-white/10 bg-[#0b0b0b]/96 px-5 py-4 backdrop-blur-xl md:hidden">
              <nav className="flex flex-col gap-4 text-sm font-medium text-white/82">
                <a href="#home">Home</a>
                <a href="#courses">Courses</a>
                <a href="#contact">Contact</a>
                <a href="/admin/login" className="text-[#fdba74]">
                  Admin
                </a>
              </nav>
            </div>
          ) : null}
        </header>

        <div className="mx-auto max-w-7xl px-5 pb-18 pt-16 sm:px-6 md:pb-24 md:pt-22 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="max-w-2xl text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#fdba74] sm:text-[12px]">
                PREMIUM ENGLISH COACHING INSTITUTE
              </p>

              <h1 className="mt-7 max-w-xl text-4xl font-bold leading-[1.04] sm:text-[56px] lg:text-[68px]">
                Boost Your Spoken English Today!
              </h1>

              <p className="mt-3 text-[18px] font-semibold tracking-[0.5px] text-[#fdba74]">
                Most Trusted Since 2015
              </p>

              <p className="mt-5 max-w-xl text-base leading-8 text-[#d7dde7] sm:text-[17px]">
                Learn with confidence under RKD Sir and build the fluency,
                personality, and exam-ready English skills needed for real success.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/enroll"
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f97316_0%,#fdba74_100%)] px-7 text-sm font-semibold text-black shadow-[0_18px_42px_rgba(249,115,22,0.28)] transition hover:brightness-[1.03]"
                >
                  Enroll Now
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/28 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  Contact Us
                </a>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="rounded-[20px] border border-white/16 bg-[rgba(255,255,255,0.08)] p-6 text-white shadow-[0_24px_60px_rgba(4,13,28,0.24)] backdrop-blur-md sm:p-8">
                <span className="inline-flex rounded-full bg-[#f97316] px-3.5 py-1.5 text-xs font-semibold text-black">
                  Admissions Open
                </span>

                <h2 className="mt-5 max-w-sm text-2xl font-semibold leading-snug sm:text-[32px]">
                  Results-focused coaching for modern learners
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/78 sm:text-[15px]">
                  Spoken English, IELTS, competitive exam English, and confidence
                  building through practical training.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {[
                    "11+ Years Experience",
                    "contact@joshenglishacademy.in",
                    "Registered Under Govt. of India",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[18px] border border-white/14 bg-white/10 px-4 py-4 text-sm font-medium leading-6 text-white/88"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f7f8fb_0%,#ffffff_100%)] px-5 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="max-w-md fade-up-reveal">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#f97316]">ABOUT US</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-[42px]">
              About Josh English Academy
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="fade-up-reveal overflow-hidden rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
              <div className="aspect-[16/9] overflow-hidden rounded-[20px] border border-slate-200 bg-[#f8fafc]">
                <Image
                  src="/josh-english-logo.jpeg"
                  alt="Josh English Academy about section image"
                  width={1170}
                  height={540}
                  className="h-full w-full object-contain object-center p-4"
                  priority={false}
                />
              </div>
            </div>

            <div className="fade-up-reveal rounded-[20px] border border-slate-200 bg-white p-7 text-[15px] leading-8 text-slate-600 shadow-[0_20px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_rgba(15,23,42,0.1)] sm:p-9">
              Josh English Academy, led by RKD Sir, has been helping students improve
              spoken English and crack competitive exams since 2015. We focus on
              practical learning, fluency, and confidence building.

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4 text-sm font-medium text-slate-700">
                  11+ Years Experience
                </div>
                <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4 text-sm font-medium text-slate-700">
                  Registered Under Govt. of India
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-slate-500">
                Official email:{" "}
                <a
                  href="mailto:contact@joshenglishacademy.in"
                  className="font-semibold text-[#f97316] transition hover:text-[#ea580c]"
                >
                  contact@joshenglishacademy.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fb] px-5 py-18 sm:px-6 lg:px-8" data-stats-section>
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCounter
              key={stat.label}
              suffix={stat.suffix}
              label={stat.label}
              active={animatedStats[index]}
            />
          ))}
        </div>
      </section>

      <section id="courses" className="bg-white px-5 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center fade-up-reveal">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#f97316]">OUR PROGRAMS</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-[42px]">
              Courses Designed for Real Progress
            </h2>
          </div>

          <div className="mt-12 flex justify-center">
            <article className="fade-up-reveal w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:shadow-[0_28px_80px_rgba(15,23,42,0.1)] sm:p-10 lg:p-12">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Complete English Master Program
                </h3>
                <p className="mt-2 text-lg font-medium text-[#f97316]">
                  All-in-One Professional Course
                </p>
              </div>

              <p className="mt-6 text-center text-[15px] leading-7 text-slate-600 sm:text-base">
                We teach Spoken English, IELTS Preparation, Competitive Exam English,
                Personality Development, Grammar, Communication Skills, Interview
                Preparation, and Confidence Building in one complete program.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {[
                  "Spoken English",
                  "IELTS Coaching",
                  "Competitive Exam English",
                  "Personality Development",
                  "Grammar & Vocabulary",
                  "Interview Skills",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center justify-center rounded-lg border border-slate-200 bg-[#f8fafc] px-3 py-3 text-center text-xs font-medium text-slate-700 shadow-sm"
                  >
                    <span className="mr-1.5 text-[#f97316]">✦</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 text-center text-sm text-slate-600 sm:grid-cols-3">
                <div>
                  <span className="font-semibold text-slate-900">Duration:</span> 3 / 6 Month Batches
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Mode:</span> Offline + Online
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Trainer:</span> Expert Faculty (RKD Sir)
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="/enroll"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-black shadow-[0_8px_24px_rgba(249,115,22,0.3)] transition duration-300 hover:bg-[#fdba74] hover:shadow-[0_12px_32px_rgba(249,115,22,0.4)]"
                >
                  Enroll Now
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#f97316] bg-transparent px-8 text-sm font-bold text-slate-900 transition duration-300 hover:bg-[#f97316] hover:text-black"
                >
                  Book Free Demo
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fb] px-5 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl fade-up-reveal">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#f97316]">WHY CHOOSE US</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-[42px]">
              A trusted academy for confident growth
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {reasons.map((reason, index) => (
              <article
                key={reason}
                className="fade-up-reveal rounded-[20px] border border-slate-200 bg-white p-6 text-slate-900 shadow-[0_22px_52px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.1)]"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <p className="text-sm font-semibold tracking-[0.2em] text-[#f97316]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-xl font-semibold leading-snug">{reason}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl fade-up-reveal">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#f97316]">BRANCHES</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-[42px]">
              Learn from the branch nearest to you
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {branches.map((branch, index) => (
              <article
                key={branch.title}
                className="fade-up-reveal rounded-[20px] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(15,23,42,0.1)]"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <h3 className="text-xl font-semibold text-slate-900">{branch.title}</h3>
                <p className="mt-2 text-[15px] text-slate-600">{branch.subtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fb] px-5 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl fade-up-reveal">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#f97316]">
              STUDENT RESULTS
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-[42px]">
              Results that speak for themselves
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              IELTS scores, success stories, and visible before-after improvement
              from our learners.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {results.map((result, index) => (
              <article
                key={result.title}
                className="fade-up-reveal rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(15,23,42,0.1)]"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <span className="inline-flex rounded-full bg-[#f97316]/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[#ea580c]">
                  {result.badge}
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-slate-900">{result.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-500">{result.student}</p>
                <p className="mt-4 text-[15px] leading-7 text-slate-600">{result.summary}</p>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-4 text-sm font-medium leading-6 text-slate-700 shadow-[0_16px_32px_rgba(15,23,42,0.06)]">
                  {result.highlight}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center fade-up-reveal">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#f97316]">
              TESTIMONIALS
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-[42px]">
              What Our Students Say
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Real feedback from our successful students
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className="fade-up-reveal rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(15,23,42,0.1)]"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#f97316]/20 bg-[#f8fafc] text-lg font-semibold text-[#ea580c]">
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{testimonial.name}</h3>
                    <p className="mt-1 text-sm tracking-[0.16em] text-[#f97316]">5/5</p>
                  </div>
                </div>

                <p className="mt-5 text-[15px] leading-7 text-slate-600">{testimonial.feedback}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fb] px-5 py-18 sm:px-6 lg:px-8">
        <div className="fade-up-reveal mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white px-7 py-10 text-slate-900 shadow-[0_26px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)] sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#f97316]">JOIN NOW</p>
            <span className="mt-4 inline-flex rounded-full border border-[#f97316]/20 bg-[#f97316]/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[#ea580c]">
              Limited Seats Available
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-[42px]">
              Admissions Open!
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-8 text-slate-600">
              Reserve your seat for upcoming batches and begin your journey toward
              fluent English and stronger exam performance.
            </p>
            <p className="mt-4 text-sm font-semibold tracking-[0.12em] text-[#f97316]">
              Only 15 seats left
            </p>
          </div>

          <a
            href="/enroll"
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-[#f97316] px-7 text-sm font-semibold text-black transition hover:bg-[#fdba74] lg:mt-0"
          >
            Book Your Seat
          </a>
        </div>
      </section>

      <section className="bg-white px-5 py-18 sm:px-6 lg:px-8">
        <div className="fade-up-reveal mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-[#f8fafc] px-7 py-10 shadow-[0_22px_54px_rgba(15,23,42,0.06)] sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#f97316]">
              FREE DEMO CLASS
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-[42px]">
              Try a Free Demo Class
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-slate-600">
              Experience our teaching style, interact with expert guidance, and
              see how Josh English Academy can help you grow with confidence.
            </p>
          </div>

          <a
            href="/free-demo"
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-[#f97316] px-7 text-sm font-semibold text-black shadow-[0_16px_34px_rgba(249,115,22,0.22)] transition hover:bg-[#fdba74] lg:mt-0"
          >
            Book Free Demo
          </a>
        </div>
      </section>

      <section id="contact" className="bg-[linear-gradient(180deg,#f7f8fb_0%,#ffffff_100%)] px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-[#f97316] uppercase">Contact Us</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
              Let&apos;s help you take the next step
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Call or message us to ask about batches, fees, course details, and seat availability.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)] transition duration-300 hover:shadow-[0_24px_56px_rgba(15,23,42,0.12)] sm:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#f97316]/20 bg-[#f97316]/10 px-4 py-2 text-sm font-semibold text-[#ea580c]">
                Registered Under Govt. of India
              </span>
              <span className="rounded-full border border-slate-200 bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-slate-600">
                Trusted coaching environment
              </span>
            </div>

            <p className="mt-5 text-xs font-semibold tracking-wider text-[#f97316] uppercase">
              Official Email
            </p>
            <a
              href="mailto:contact@joshenglishacademy.in"
              className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 transition hover:text-[#f97316]"
            >
              <MailIcon />
              contact@joshenglishacademy.in
            </a>

            <p className="mt-5 text-xs font-semibold tracking-wider text-[#f97316] uppercase">
              Phone
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">8759137380</p>

            <a
              href="https://wa.me/918759137380"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#f97316] px-6 text-xs font-bold text-black transition duration-300 hover:bg-[#fdba74]"
            >
              WhatsApp Us
            </a>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-[#f8fafc] text-slate-700 transition duration-300 hover:border-[#f97316]/25 hover:bg-white hover:text-[#f97316]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}








