import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarRange, FileText, Receipt } from "lucide-react";
import { getContent } from "@/lib/content";
import { lines } from "@/lib/content-schema";
import { OfferSection } from "@/components/Catalog";
import { Ornament } from "@/components/Graphics";
import { CheckList, CtaBand, delay, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pilot Programme — Paid Buyer-Development Service",
  description:
    "A paid, time-limited pilot: ideal customer profile, researched company list, personalised outreach and follow-ups, qualification against agreed criteria and a final report.",
  alternates: { canonical: "/pilot" },
};

export default async function PilotPage() {
  const [pilot, offer, settings] = await Promise.all([getContent("pilot"), getContent("offer"), getContent("settings")]);
  const inclusions = lines(pilot.inclusions);
  const timeline = lines(pilot.timeline).map((l) => {
    const [when, ...rest] = l.split(/\s+[—–-]\s+/);
    return rest.length ? { when, what: rest.join(" — ") } : { when: "", what: l };
  });

  return (
    <>
      <PageHero
        image="/images/business-meeting.webp"
        eyebrow="Paid service · Pilot Programme"
        title="Test a new market with a focused pilot"
        intro={pilot.intro}
      >
        <Link href="/contact#consultation" className="btn-gold">
          Request a Pilot Proposal <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link href="/sample-report" className="btn-outline-light">
          View a sample report
        </Link>
      </PageHero>

      {/* What the pilot includes */}
      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="What a pilot may include"
              title="Five defined deliverables, from target profile to final report"
              intro="Every pilot is scoped in writing before work begins, so you know exactly what you are paying for."
            />
            <Ornament className="mt-8" />
          </div>
          <ol className="relative space-y-4">
            {inclusions.map((item, i) => (
              <li key={item} data-reveal style={delay(i, 90)} className="card lift flex items-start gap-5 p-6">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 font-serif text-lg font-semibold text-gold-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-2.5 text-[17px] leading-relaxed text-navy-900">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Timeline */}
      <section className="on-dark bg-navy-900 py-20 text-white sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Typical timeline"
            title="How a pilot runs"
            intro="Timings are indicative and confirmed in your proposal."
            dark
          />
          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <li key={i} data-reveal="fade" style={delay(i, 90)} className="bg-navy-900 p-8">
                <CalendarRange className="h-6 w-6 text-gold-400" strokeWidth={1.5} aria-hidden />
                {t.when && <p className="mt-5 font-serif text-xl font-semibold text-gold-300">{t.when}</p>}
                <p className="mt-2 text-sm leading-relaxed text-white/75">{t.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's for + pricing */}
      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <div data-reveal className="card p-8 sm:p-10 lg:col-span-2">
            <BadgeCheck className="h-7 w-7 text-gold-600" strokeWidth={1.5} aria-hidden />
            <h2 className="mt-5 text-2xl font-semibold text-navy-900">Who the pilot is for</h2>
            <div className="mt-6">
              <CheckList items={lines(pilot.whoFor)} />
            </div>
          </div>
          <div data-reveal style={delay(1, 120)} className="flex flex-col rounded-2xl bg-navy-900 p-8 text-white sm:p-10">
            <Receipt className="h-7 w-7 text-gold-400" strokeWidth={1.5} aria-hidden />
            <h2 className="mt-5 text-2xl font-semibold">Pricing</h2>
            <p className="mt-4 flex-1 leading-relaxed text-white/75">{pilot.pricing}</p>
            <Link href="/contact#consultation" className="btn-gold mt-8">
              Request a Proposal <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <OfferSection offer={offer} id="what-you-receive" />

      <section className="border-t border-line bg-white py-16">
        <div data-reveal className="container-x flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <FileText className="mt-1 h-8 w-8 shrink-0 text-gold-600" strokeWidth={1.5} aria-hidden />
            <div>
              <p className="font-serif text-2xl text-navy-900">See what the final report looks like</p>
              <p className="mt-1 text-muted">A sample buyer-research report with company, country, product fit, decision-maker role and qualification status.</p>
            </div>
          </div>
          <Link href="/sample-report" className="btn-navy shrink-0">
            View sample report <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <CtaBand
        title="Ready to test a market?"
        text="Tell us your product and the country you want to enter. We'll send a pilot proposal with scope, timeline and fixed fee."
        settings={settings}
        primary={{ href: "/contact#consultation", label: "Request a Pilot Proposal" }}
      />
    </>
  );
}
