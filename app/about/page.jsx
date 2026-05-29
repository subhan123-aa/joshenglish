import Image from "next/image";
import Link from "next/link";
import { defaultSiteContent } from "@/lib/siteContent";

export const metadata = {
  title: "About | Josh English Academy",
  description: "Meet R.K.D Sir and learn about Josh English Academy's spoken English training.",
};

export default function AboutPage() {
  const content = defaultSiteContent;

  return (
    <main className="bg-[#f6f8fb] text-slate-900">
      <section className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/josh-english-logo-transparent.png"
              alt="Josh English Academy logo"
              width={380}
              height={164}
              className="h-10 w-auto object-contain sm:h-12"
            />
          </Link>
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition hover:border-[#f97316]/25 hover:text-[#f97316]"
          >
            Back to Home
          </Link>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_22%),linear-gradient(180deg,#f7f8fb_0%,#ffffff_100%)] px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-[#f97316]/20 bg-[#f97316]/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-[#ea580c]">
              {content.aboutExperience}
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {content.aboutTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {content.aboutCopy}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.aboutPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700 shadow-[0_14px_34px_rgba(15,23,42,0.05)]"
                >
                  {point}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#f97316] px-4 py-2 text-sm font-semibold text-black">
                {content.experienceBadge}
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                {content.govtBadge}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_28px_70px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="aspect-[4/5] overflow-hidden rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_55%,#eef2f7_100%)]">
                <div className="flex h-full items-center justify-center p-6 text-center">
                  <div className="max-w-sm">
                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#f97316]/20 bg-[#f97316]/10 text-3xl font-semibold text-[#ea580c]">
                      R.K.D
                    </div>
                    <p className="mt-6 text-lg font-semibold text-slate-900">
                      R.K.D Sir Portrait Placeholder
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Replace this block with the official coaching portrait when the image is available.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">
                <p className="text-sm font-medium tracking-[0.18em] text-[#f97316]">
                  Official Coaching Profile
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  Spoken English, personality development, interview preparation, and communication skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
