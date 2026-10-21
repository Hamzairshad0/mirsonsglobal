import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, ShoppingCart } from "lucide-react";
import { getActiveIndustries, getContent } from "@/lib/content";
import { MANUFACTURER_PROCESS, WHAT_YOU_RECEIVE } from "@/lib/process";
import { Icon } from "@/components/Icon";
import { CheckList, CtaBand, FaqList, NumberedSteps, SectionHeading, WorldMap } from "@/components/ui";

const PILLARS = [
  { title: "Research-led targeting", text: "Every campaign starts with a defined buyer profile and verified company data." },
  { title: "Decision-maker outreach", text: "We reach owners, procurement heads and category managers — not info@ inboxes." },
  { title: "Qualified, not just “leads”", text: "Prospects are screened against your criteria before they reach your team." },
  { title: "Meetings, not reports", text: "The goal is simple: more relevant conversations with potential buyers." },
];

const WHY = [
  {
    icon: "target",
    title: "Specialists in B2B, not generic marketing",
    text: "We don't sell “digital marketing”. We build targeted B2B sales pipelines for industrial products.",
  },
  {
    icon: "shield",
    title: "Confidential and independent",
    text: "We hold no stock and take no sides in pricing — contracts stay directly between buyer and supplier.",
  },
  {
    icon: "globe",
    title: "International by design",
    text: "Remote-first team working across time zones with buyers in the Middle East, Europe, Asia and Africa.",
  },
  {
    icon: "chart",
    title: "Transparent reporting",
    text: "You see who was contacted, who responded and why each opportunity was qualified.",
  },
];

export default async function HomePage() {
  const [home, services, buyerTypes, faqs, settings, industries] = await Promise.all([
    getContent("home"),
    getContent("services"),
    getContent("buyerTypes"),
    getContent("faqs"),
    getContent("settings"),
    getActiveIndustries(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="on-dark relative isolate flex min-h-[92svh] items-center overflow-hidden bg-navy-950 pt-28 pb-20 text-white">
        <WorldMap className="absolute top-1/2 left-1/2 -z-10 w-[190%] max-w-none -translate-x-[38%] -translate-y-1/2 opacity-70 sm:w-[130%] lg:w-[105%] lg:-translate-x-[42%]" />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/10"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950 to-transparent" aria-hidden />

        <div className="container-x">
          <div className="max-w-3xl">
            <span className="block h-0.5 w-14 bg-gold-500" aria-hidden />
            <p className="mt-7 text-xs font-semibold tracking-[0.22em] text-gold-400 uppercase">{home.heroEyebrow}</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.06] font-semibold sm:text-6xl lg:text-[4.25rem]">{home.heroTitle}</h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{home.heroSubtitle}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/manufacturers#inquiry" className="btn-gold">
                Find Qualified Buyers <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/buyers#requirements" className="btn-outline-light">
                Submit Sourcing Requirements
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/50">{home.heroNote}</p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-line bg-white">
        <div className="container-x grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {PILLARS.map((p, i) => (
            <div key={p.title} className={`py-8 sm:px-6 lg:py-10 ${i === 0 ? "lg:pl-0" : ""}`}>
              <h2 className="font-serif text-lg font-semibold text-navy-900">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two audiences */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Who we help"
            title="Stop waiting for distributors to find you"
            intro="Your products may already have demand in international markets. The challenge is finding the companies that are actually capable of buying, importing, distributing or selling them — and reaching the people who decide."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <AudienceCard
              icon={<Factory className="h-7 w-7" strokeWidth={1.5} aria-hidden />}
              label="Manufacturers & suppliers"
              title="Find qualified international buyers"
              text="We identify importers, distributors and commercial buyers in your target markets, reach their decision-makers and book qualified meetings with your sales team."
              href="/manufacturers"
              cta="Find Qualified Buyers"
              dark
            />
            <AudienceCard
              icon={<ShoppingCart className="h-7 w-7" strokeWidth={1.5} aria-hidden />}
              label="Importers, distributors & industrial buyers"
              title="Source from reliable manufacturers"
              text="Share your product specifications, quantities and destination. We shortlist suitable suppliers, collect quotations and arrange introductions."
              href="/buyers"
              cta="Submit Sourcing Requirements"
            />
          </div>
        </div>
      </section>

      {/* Who we connect */}
      <section className="bg-sand py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Who we connect"
            title="The buyers that move industrial products"
            intro="We identify the companies capable of purchasing, importing and distributing your products — then the decision-makers inside them."
            center
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {buyerTypes.map((b) => (
              <li key={b.title} className="card p-7 transition-shadow hover:shadow-lg hover:shadow-navy-900/5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-gold-400">
                  <Icon name={b.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-navy-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.description}</p>
              </li>
            ))}
            <li className="flex flex-col justify-between rounded-xl bg-navy-900 p-7 text-white">
              <p className="font-serif text-xl leading-snug">Not sure which buyer type fits your product?</p>
              <Link href="/contact#consultation" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300">
                Ask our team <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Our services"
              title="Everything needed to turn a market into meetings"
              intro="From identifying the right buyers to arranging the first meeting — delivered as one focused service."
            />
            <Link href="/services" className="btn-outline shrink-0 self-start lg:self-auto">
              All services <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} className="group bg-white p-8 transition-colors hover:bg-ivory">
                <Icon name={s.icon} className="h-8 w-8 text-gold-600" />
                <h3 className="mt-6 text-xl font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.summary}</p>
                <Link
                  href={`/services#${s.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-gold-700"
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  <span className="sr-only">about {s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="on-dark relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <WorldMap className="absolute -top-20 -right-1/4 w-[90%] max-w-none opacity-20" />
        <div className="container-x relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Our process"
              title="From research to booked meetings"
              intro="A structured, repeatable outbound process — built around your product and your ideal buyer."
              dark
            />
            <Link href="/how-it-works" className="btn-outline-light shrink-0 self-start lg:self-auto">
              How it works <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-14">
            <NumberedSteps steps={MANUFACTURER_PROCESS} dark />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Industries we serve"
              title="Focused on industrial raw materials and B2B categories"
              intro="We concentrate on categories where international buyers purchase in volume and relationships matter."
            />
            <Link href="/industries" className="btn-outline shrink-0 self-start lg:self-auto">
              View industries <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, i) => (
              <li key={ind.slug}>
                <Link
                  href={`/industries#${ind.slug}`}
                  className="group flex h-full flex-col justify-between rounded-xl border border-line bg-white p-6 transition-colors hover:border-gold-500"
                >
                  <span className="font-serif text-sm text-gold-600">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-8 flex items-end justify-between gap-3">
                    <span className="font-serif text-lg leading-snug font-semibold text-navy-900">{ind.name}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gold-600 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Mirsons */}
      <section className="relative overflow-hidden bg-sand py-20 sm:py-28">
        <Image
          src="/brand/watermark.png"
          alt=""
          aria-hidden
          width={900}
          height={683}
          className="pointer-events-none absolute top-10 -left-40 w-[40rem] opacity-25"
        />
        <div className="container-x relative grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={`Why ${settings.companyName}`}
              title="Built for manufacturers that want international growth"
              intro="Our objective is simple: more relevant conversations with potential buyers. Here is what every engagement includes."
            />
            <div className="mt-10">
              <CheckList items={WHAT_YOU_RECEIVE} cols={2} />
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {WHY.map((w) => (
              <li key={w.title} className="card p-7">
                <Icon name={w.icon} className="h-7 w-7 text-gold-600" />
                <h3 className="mt-5 text-lg leading-snug font-semibold text-navy-900">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="FAQs" title="Questions we are often asked" />
            <p className="mt-5 text-muted">
              Can&apos;t find your answer?{" "}
              <Link href="/contact" className="font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4">
                Contact our team
              </Link>
              .
            </p>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBand
        title={home.ctaTitle}
        text={home.ctaText}
        settings={settings}
        primary={{ href: "/contact#consultation", label: "Discuss Your Requirements" }}
      />
    </>
  );
}

function AudienceCard({
  icon,
  label,
  title,
  text,
  href,
  cta,
  dark,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl p-8 sm:p-10 ${
        dark ? "bg-navy-900 text-white" : "border border-line bg-white"
      }`}
    >
      <span
        className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${
          dark ? "bg-gold-500/15 text-gold-400" : "bg-navy-900 text-gold-400"
        }`}
      >
        {icon}
      </span>
      <p className={`mt-8 text-xs font-semibold tracking-[0.18em] uppercase ${dark ? "text-gold-400" : "text-gold-600"}`}>{label}</p>
      <h3 className={`mt-3 text-2xl font-semibold sm:text-3xl ${dark ? "text-white" : "text-navy-900"}`}>{title}</h3>
      <p className={`mt-4 flex-1 leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{text}</p>
      <div className="mt-8">
        <Link href={href} className={dark ? "btn-gold" : "btn-navy"}>
          {cta} <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
