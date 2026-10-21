import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getActiveIndustries, getContent } from "@/lib/content";
import { MANUFACTURER_PROCESS, WHAT_YOU_RECEIVE } from "@/lib/process";
import { Icon } from "@/components/Icon";
import { FormPanel } from "@/components/FormPanel";
import { ManufacturerForm } from "@/components/forms/Forms";
import { CheckList, NumberedSteps, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "For Manufacturers & Suppliers",
  description:
    "Find importers, distributors and commercial buyers in international markets. Mirsons Global builds targeted outbound B2B sales pipelines for manufacturers and suppliers.",
  alternates: { canonical: "/manufacturers" },
};

const PAINS = [
  {
    title: "Trade fairs are expensive and occasional",
    text: "A single exhibition can cost more than months of targeted outreach — and the leads go cold soon after.",
  },
  {
    title: "B2B portals are crowded",
    text: "Marketplaces put you next to hundreds of competitors and attract price-shoppers rather than serious distributors.",
  },
  {
    title: "Your sales team is already busy",
    text: "Researching new markets and cold prospecting rarely gets priority over serving existing customers.",
  },
];

export default async function ManufacturersPage() {
  const [settings, industries, markets, buyerTypes] = await Promise.all([
    getContent("settings"),
    getActiveIndustries(),
    getContent("markets"),
    getContent("buyerTypes"),
  ]);

  return (
    <>
      <PageHero
        eyebrow="For manufacturers & suppliers"
        title="We build B2B sales pipelines for industrial manufacturers"
        intro="Find distributors, importers and commercial buyers in international markets — and turn them into qualified sales conversations."
      >
        <Link href="#inquiry" className="btn-gold">
          Find Qualified Buyers <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link href="/contact#consultation" className="btn-outline-light">
          Book a Strategy Call
        </Link>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="The challenge"
            title="Stop waiting for distributors to find you"
            intro="Your products may already have demand in international markets. The problem is finding the companies actually capable of buying, importing, distributing or selling them."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {PAINS.map((p) => (
              <li key={p.title} className="border-t-2 border-gold-500 pt-6">
                <h3 className="text-xl font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark bg-navy-900 py-20 text-white sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Who we find for you"
            title="We build the outbound pipeline for you"
            intro="We identify the companies with real buying potential for your products, then identify the decision-makers and start targeted conversations."
            dark
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {buyerTypes.map((b) => (
              <li key={b.title} className="flex gap-4 rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
                <Icon name={b.icon} className="h-6 w-6 shrink-0 text-gold-400" />
                <div>
                  <h3 className="font-sans text-base font-semibold">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{b.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Our process" title="Six steps from target market to booked meeting" />
          <div className="mt-14">
            <NumberedSteps steps={MANUFACTURER_PROCESS} />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="What you receive"
              title="Everything required to open a new market"
              intro="We don't sell generic “digital marketing”. We build targeted B2B sales pipelines."
            />
            <div className="mt-10">
              <CheckList items={WHAT_YOU_RECEIVE} cols={2} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-navy-900">Markets we target</h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {markets.map((m) => (
                <li key={m.name} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="font-serif text-lg font-semibold text-navy-900">{m.name}</span>
                  <span className="text-sm text-muted sm:text-right">{m.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FormPanel
        id="inquiry"
        eyebrow="Find qualified buyers"
        title="Tell us about your products"
        intro="Share what you manufacture, where you sell today and which markets you want to enter. We'll identify potential buyer segments and show you what an outbound campaign could look like."
        settings={settings}
        aside={
          <div className="card p-7">
            <h3 className="text-lg font-semibold text-navy-900">What happens next</h3>
            <ol className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <strong className="text-navy-900">1.</strong> We review your products and target markets.
              </li>
              <li>
                <strong className="text-navy-900">2.</strong> We arrange a short strategy call.
              </li>
              <li>
                <strong className="text-navy-900">3.</strong> You receive a proposed buyer profile and campaign outline.
              </li>
            </ol>
          </div>
        }
      >
        <ManufacturerForm categories={industries.map((i) => i.name)} />
      </FormPanel>
    </>
  );
}
