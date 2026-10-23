import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, ShoppingCart } from "lucide-react";
import { getActiveIndustries, getContent } from "@/lib/content";
import { industryImage } from "@/lib/content-schema";
import { MANUFACTURER_PROCESS, WHAT_YOU_RECEIVE } from "@/lib/process";
import { Icon } from "@/components/Icon";
import { MatchmakingDiagram, Marquee, Ornament } from "@/components/Graphics";
import { CheckList, CtaBand, delay, FaqList, NumberedSteps, SectionHeading, WorldMap } from "@/components/ui";

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
  const [home, services, buyerTypes, faqs, settings, industries, markets] = await Promise.all([
    getContent("home"),
    getContent("services"),
    getContent("buyerTypes"),
    getContent("faqs"),
    getContent("settings"),
    getActiveIndustries(),
    getContent("markets"),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="on-dark relative isolate flex min-h-[92svh] items-center overflow-hidden bg-navy-950 pt-36 pb-20 text-white">
        <Image
          src="/images/hero-port.webp"
          alt=""
          fill
          priority
          quality={60}
          sizes="100vw"
          className="ken-burns -z-20 object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/88 to-navy-950/35" aria-hidden />
        <WorldMap className="absolute top-1/2 left-1/2 -z-10 w-[190%] max-w-none -translate-x-[38%] -translate-y-1/2 opacity-75 sm:w-[130%] lg:w-[105%] lg:-translate-x-[42%]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy-950 to-transparent" aria-hidden />

        <div className="container-x">
          <div className="max-w-3xl">
            <span className="line-grow block h-0.5 w-14 bg-gold-500" aria-hidden />
            <p className="rise mt-7 text-xs font-semibold tracking-[0.22em] text-gold-400 uppercase">{home.heroEyebrow}</p>
            <h1
              className="rise mt-5 text-[2.6rem] leading-[1.06] font-semibold sm:text-6xl lg:text-[4.25rem]"
              style={{ "--d": "80ms" } as React.CSSProperties}
            >
              {home.heroTitle}
            </h1>
            <p className="rise mt-7 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg" style={{ "--d": "180ms" } as React.CSSProperties}>
              {home.heroSubtitle}
            </p>
            <div className="rise mt-10 flex flex-col gap-4 sm:flex-row" style={{ "--d": "280ms" } as React.CSSProperties}>
              <Link href="/manufacturers#inquiry" className="btn-gold">
                Find Qualified Buyers <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/buyers#requirements" className="btn-outline-light backdrop-blur-sm">
                Submit Sourcing Requirements
              </Link>
            </div>
            <p className="rise mt-6 text-sm text-white/50" style={{ "--d": "360ms" } as React.CSSProperties}>
              {home.heroNote}
            </p>
          </div>
        </div>
      </section>

      {/* Markets ticker */}
      <section className="border-y border-white/10 bg-navy-950 py-5" aria-label="Markets we serve">
        <Marquee items={markets.map((m) => m.name)} />
      </section>

      {/* Pillars */}
      <section className="border-b border-line bg-white">
        <div className="container-x grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {PILLARS.map((p, i) => (
            <div key={p.title} data-reveal style={delay(i)} className={`py-8 sm:px-6 lg:py-10 ${i === 0 ? "lg:pl-0" : ""}`}>
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
              image="/images/steel-mill.webp"
              icon={<Factory className="h-6 w-6" strokeWidth={1.5} aria-hidden />}
              label="Manufacturers & suppliers"
              title="Find qualified international buyers"
              text="We identify importers, distributors and commercial buyers in your target markets, reach their decision-makers and book qualified meetings with your sales team."
              href="/manufacturers"
              cta="Find Qualified Buyers"
              dark
            />
            <AudienceCard
              image="/images/warehouse.webp"
              icon={<ShoppingCart className="h-6 w-6" strokeWidth={1.5} aria-hidden />}
              label="Importers, distributors & industrial buyers"
              title="Source from reliable manufacturers"
              text="Share your product specifications, quantities and destination. We shortlist suitable suppliers, collect quotations and arrange introductions."
              href="/buyers"
              cta="Submit Sourcing Requirements"
              index={1}
            />
          </div>
        </div>
      </section>

      {/* Who we connect */}
      <section className="bg-grid relative bg-sand py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Who we connect"
            title="The buyers that move industrial products"
            intro="We identify the companies capable of purchasing, importing and distributing your products — then the decision-makers inside them."
            center
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {buyerTypes.map((b, i) => (
              <li key={b.title} data-reveal style={delay(i, 60)} className="card lift group p-7 hover:border-gold-500/60">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                  <Icon name={b.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-navy-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.description}</p>
              </li>
            ))}
            <li data-reveal style={delay(buyerTypes.length, 60)} className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-navy-900 p-7 text-white">
              <WorldMap className="absolute -right-10 -bottom-6 w-[180%] max-w-none opacity-30" />
              <p className="relative font-serif text-xl leading-snug">Not sure which buyer type fits your product?</p>
              <Link href="/contact#consultation" className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300">
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
            {services.map((s, i) => (
              <li key={s.slug} data-reveal="fade" style={delay(i, 70)} className="group relative bg-white p-8 transition-colors duration-300 hover:bg-ivory">
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
                <Icon name={s.icon} className="h-8 w-8 text-gold-600 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <h3 className="mt-6 text-xl font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.summary}</p>
                <Link
                  href={`/services#${s.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-gold-700"
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                  <span className="sr-only">about {s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="on-dark relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <Image src="/images/containers-aerial.webp" alt="" fill quality={50} sizes="100vw" className="-z-20 object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900 via-navy-900/85 to-navy-900" aria-hidden />
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
          <div data-reveal className="mx-auto mt-14 hidden max-w-4xl sm:block">
            <MatchmakingDiagram className="mx-auto h-auto w-full" />
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
              <li key={ind.slug} data-reveal style={delay(i, 60)}>
                <Link
                  href={`/industries#${ind.slug}`}
                  className="photo-zoom group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl bg-navy-900 p-6 text-white sm:aspect-[3/4]"
                >
                  <Image
                    src={industryImage(ind)}
                    alt=""
                    fill
                    quality={60}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/5 transition-opacity duration-500 group-hover:opacity-90" aria-hidden />
                  <span className="relative font-serif text-sm text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative mt-2 flex items-end justify-between gap-3">
                    <span className="font-serif text-xl leading-snug font-semibold">{ind.name}</span>
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
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
          className="pointer-events-none absolute -top-10 -right-48 w-[36rem] opacity-[0.12]"
        />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal className="relative pb-16 sm:pr-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-navy-900/20">
              <Image src="/images/handshake.webp" alt="Two business partners shaking hands" fill quality={62} sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 overflow-hidden rounded-xl border-4 border-sand shadow-xl shadow-navy-900/20">
              <div className="relative aspect-[4/3]">
                <Image src="/images/video-call.webp" alt="International video meeting on a laptop" fill quality={60} sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
              </div>
            </div>
            <div className="absolute top-6 -left-3 rounded-lg bg-navy-900 px-5 py-4 text-white shadow-xl sm:-left-6">
              <p className="text-xs tracking-[0.18em] text-gold-400 uppercase">Our objective</p>
              <p className="mt-1 font-serif text-lg">More relevant buyer conversations</p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow={`Why ${settings.companyName}`}
              title="Built for manufacturers that want international growth"
              intro="Here is what every engagement includes."
            />
            <Ornament className="mt-6" />
            <div data-reveal className="mt-8">
              <CheckList items={WHAT_YOU_RECEIVE} cols={2} />
            </div>
          </div>
        </div>
        <ul className="container-x relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <li key={w.title} data-reveal style={delay(i)} className="card lift p-7">
              <Icon name={w.icon} className="h-7 w-7 text-gold-600" />
              <h3 className="mt-5 text-lg leading-snug font-semibold text-navy-900">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
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
          <div data-reveal>
            <FaqList faqs={faqs} />
          </div>
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
  image,
  icon,
  label,
  title,
  text,
  href,
  cta,
  dark,
  index = 0,
}: {
  image: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  dark?: boolean;
  index?: number;
}) {
  return (
    <div
      data-reveal
      style={delay(index, 120)}
      className={`photo-zoom lift group relative flex flex-col overflow-hidden rounded-2xl ${dark ? "bg-navy-900 text-white" : "border border-line bg-white"}`}
    >
      <div className="relative">
        <div className="relative aspect-[16/8] overflow-hidden">
          <Image src={image} alt="" fill quality={60} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          <span
            className={`absolute inset-0 bg-gradient-to-t ${dark ? "from-navy-900 via-navy-900/20" : "from-white via-white/0"} to-transparent`}
            aria-hidden
          />
        </div>
        {/* Outside the photo's overflow-hidden box so the badge can overlap the text panel without being clipped */}
        <span
          className={`absolute bottom-0 left-8 z-10 inline-flex h-14 w-14 translate-y-1/2 items-center justify-center rounded-xl shadow-lg sm:left-10 ${
            dark ? "bg-gold-500 text-navy-950 shadow-black/30" : "bg-navy-900 text-gold-400"
          }`}
        >
          {icon}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-8 pt-12 sm:p-10 sm:pt-12">
        <p className={`text-xs font-semibold tracking-[0.18em] uppercase ${dark ? "text-gold-400" : "text-gold-600"}`}>{label}</p>
        <h3 className={`mt-3 text-2xl font-semibold sm:text-3xl ${dark ? "text-white" : "text-navy-900"}`}>{title}</h3>
        <p className={`mt-4 flex-1 leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{text}</p>
        <div className="mt-8">
          <Link href={href} className={dark ? "btn-gold" : "btn-navy"}>
            {cta} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
