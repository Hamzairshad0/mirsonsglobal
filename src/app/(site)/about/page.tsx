import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Eye, Target } from "lucide-react";
import { getContent } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { CheckList, CtaBand, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Mirsons Global is a B2B lead generation, buyer–supplier matchmaking and international sourcing agency helping manufacturers reach qualified international buyers.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    icon: "search",
    title: "Research before outreach",
    text: "We study the product, the market and the buyer before a single message is sent. Precision beats volume.",
  },
  {
    icon: "target",
    title: "Qualification over quantity",
    text: "We measure success in relevant conversations and meetings — not in the number of names on a list.",
  },
  {
    icon: "shield",
    title: "Confidentiality",
    text: "Pricing, specifications and client relationships are treated as commercially sensitive information.",
  },
  {
    icon: "handshake",
    title: "Long-term partnerships",
    text: "We introduce companies that can trade repeatedly, building relationships that outlast a single order.",
  },
];

export default async function AboutPage() {
  const settings = await getContent("settings");
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A business development partner for international B2B trade"
        intro={`${settings.companyName} helps manufacturers and suppliers connect with relevant international buyers — through targeted research, qualified leads and pre-arranged business meetings.`}
      />

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Who we are" title="We build B2B sales pipelines for industrial manufacturers" />
            <div className="mt-6 space-y-5 leading-relaxed text-muted">
              <p>
                Many manufacturers already make products with real demand abroad. What they lack is a reliable way to find the
                importers, distributors and commercial buyers capable of purchasing them — and to reach the people who decide.
              </p>
              <p>
                {settings.companyName} closes that gap. We identify the right companies, reach the right decision-makers and
                turn interest into qualified sales opportunities. For buyers, we work in reverse: we take a sourcing requirement
                and find manufacturers able to meet it.
              </p>
              <p>
                We operate remotely with an international outlook. We do not hold inventory or act as a trader — our role is to
                make the right introductions and keep conversations moving until there is a clear commercial outcome.
              </p>
            </div>
          </div>
          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-navy-900 p-12">
            <Image src="/brand/logo-full.png" alt={`${settings.companyName} logo`} width={720} height={628} className="relative h-auto w-full max-w-sm" />
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-x grid gap-6 md:grid-cols-3">
          <MissionCard
            icon={<Target className="h-7 w-7" strokeWidth={1.5} aria-hidden />}
            title="Our mission"
            text="To help manufacturers and suppliers grow internationally by connecting them with qualified buyers through research-led outreach and professional introductions."
          />
          <MissionCard
            icon={<Eye className="h-7 w-7" strokeWidth={1.5} aria-hidden />}
            title="Our vision"
            text="To be a trusted bridge between producers and buyers across emerging and established markets — known for quality introductions, not volume."
          />
          <MissionCard
            icon={<Compass className="h-7 w-7" strokeWidth={1.5} aria-hidden />}
            title="Our approach"
            text="Define the ideal buyer, research the market, reach decision-makers, follow up with discipline, qualify carefully and arrange meetings."
          />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our principles"
            title="Our commitment to professional B2B partnerships"
            intro="Every engagement follows the same standards, whether we are representing a manufacturer or sourcing for a buyer."
            center
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="card p-7">
                <Icon name={p.icon} className="h-7 w-7 text-gold-600" />
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-white py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="How we are different"
            title="Focused on one outcome: relevant buyer conversations"
            intro="We are not a marketplace, a trading house or a generic marketing agency."
          />
          <CheckList
            items={[
              "Specialised in B2B and industrial categories",
              "Decision-maker level outreach, not mass mailing",
              "Qualification criteria agreed with every client",
              "No stock, no conflict of interest on pricing",
              "Direct relationships between buyer and supplier",
              "Clear reporting on activity and outcomes",
            ]}
          />
        </div>
      </section>

      <CtaBand
        title="Let's discuss your growth plans"
        text="Tell us about your products or sourcing needs. We'll respond with practical next steps."
        settings={settings}
      />
    </>
  );
}

function MissionCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="card p-8 sm:p-10">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-navy-900 text-gold-400">{icon}</span>
      <h2 className="mt-6 text-2xl font-semibold text-navy-900">{title}</h2>
      <p className="mt-3 leading-relaxed text-muted">{text}</p>
    </div>
  );
}
