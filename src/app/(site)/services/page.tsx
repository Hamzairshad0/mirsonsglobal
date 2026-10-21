import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { lines } from "@/lib/content-schema";
import { WHAT_YOU_RECEIVE } from "@/lib/process";
import { Icon } from "@/components/Icon";
import { CheckList, CtaBand, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "B2B lead generation, buyer identification, supplier sourcing, market research, appointment setting and buyer–supplier matchmaking for manufacturers and industrial buyers.",
  alternates: { canonical: "/services" },
};

const ENGAGEMENTS = [
  {
    name: "Market Assessment",
    text: "A focused research project to validate a target market and identify the most promising buyer segments before investing in outreach.",
    points: ["Buyer segment analysis", "Sample list of target companies", "Recommended campaign approach"],
  },
  {
    name: "Pilot Campaign",
    text: "A time-boxed outbound campaign in one market and buyer segment to generate first qualified conversations and prove the channel.",
    points: ["One market, one buyer segment", "Email & LinkedIn outreach", "Qualified meetings and reporting"],
    featured: true,
  },
  {
    name: "Ongoing Pipeline",
    text: "A continuous, multi-market programme that keeps your sales team supplied with qualified buyer conversations every month.",
    points: ["Multiple markets and segments", "Monthly optimisation", "CRM updates and pipeline reviews"],
  },
];

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getContent("services"), getContent("settings")]);
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="B2B growth services for manufacturers and buyers"
        intro="We combine market research, targeted outreach and professional follow-up to create qualified opportunities — and arrange the meetings that turn them into business."
      >
        <Link href="/contact#consultation" className="btn-gold">
          Book a Consultation <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x space-y-6">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="card grid gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1.2fr_1fr] lg:items-start lg:gap-12"
            >
              <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <span className="font-serif text-sm text-gold-600">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-navy-900 sm:text-3xl">{s.title}</h2>
                <p className="mt-4 leading-relaxed text-muted">{s.summary}</p>
              </div>
              <CheckList items={lines(s.points)} />
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Ways to work with us"
            title="Start small, then scale what works"
            intro="Every engagement is scoped to your products, markets and goals. We'll recommend the right starting point in your consultation."
            center
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {ENGAGEMENTS.map((e) => (
              <div
                key={e.name}
                className={`flex flex-col rounded-2xl p-8 sm:p-10 ${
                  e.featured ? "bg-navy-900 text-white ring-1 ring-gold-500/40" : "border border-line bg-white"
                }`}
              >
                {e.featured && (
                  <span className="mb-5 self-start rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-950">
                    Recommended start
                  </span>
                )}
                <h3 className={`text-2xl font-semibold ${e.featured ? "text-white" : "text-navy-900"}`}>{e.name}</h3>
                <p className={`mt-4 flex-1 leading-relaxed ${e.featured ? "text-white/70" : "text-muted"}`}>{e.text}</p>
                <div className="mt-8">
                  <CheckList items={e.points} dark={e.featured} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="What you receive"
            title="A complete outbound sales function — without hiring one"
            intro="Research, outreach, follow-up and qualification handled by one accountable team, with clear reporting at every step."
          />
          <CheckList items={WHAT_YOU_RECEIVE} cols={2} />
        </div>
      </section>

      <CtaBand
        title="Not sure which service fits?"
        text="Tell us what you manufacture or need to source. We'll recommend a practical starting point."
        settings={settings}
        primary={{ href: "/contact#consultation", label: "Discuss Your Requirements" }}
      />
    </>
  );
}
