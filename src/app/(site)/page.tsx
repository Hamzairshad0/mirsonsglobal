import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, FileText, Search } from "lucide-react";
import { getCatalog, getContent } from "@/lib/content";
import { categoryImage } from "@/lib/content-schema";
import { OfferSection, productHref } from "@/components/Catalog";
import { FounderQuote } from "@/components/Founder";
import { MANUFACTURER_PROCESS } from "@/lib/process";
import { Icon } from "@/components/Icon";
import { MatchmakingDiagram, Marquee, Ornament } from "@/components/Graphics";
import { CtaBand, delay, FaqList, NumberedSteps, SectionHeading, WorldMap } from "@/components/ui";

const PILLARS = [
  { title: "Research-led targeting", text: "Every campaign starts with a defined buyer profile and verified company data." },
  { title: "Decision-maker outreach", text: "We reach owners, procurement heads and category managers — not info@ inboxes." },
  { title: "Qualified, not just “leads”", text: "Prospects are screened against your criteria before they reach your team." },
  { title: "Meetings, not reports", text: "The goal is simple: more relevant conversations with potential buyers." },
];

const PAINS = [
  {
    title: "Trade fairs are expensive and occasional",
    text: "One exhibition can cost more than months of targeted outreach — and the contacts go cold soon after.",
  },
  {
    title: "B2B portals attract price-shoppers",
    text: "Marketplaces put your factory next to hundreds of competitors instead of in front of serious distributors.",
  },
  {
    title: "Your sales team is already busy",
    text: "Researching new countries and cold prospecting rarely gets priority over serving existing customers.",
  },
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
    text: "We hold no stock and take no sides in pricing — contracts stay directly between your company and the buyer.",
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

const STATUS_STYLE: Record<string, string> = {
  Qualified: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Interested: "bg-blue-50 text-blue-700 ring-blue-200",
  "In conversation": "bg-violet-50 text-violet-700 ring-violet-200",
};

export default async function HomePage() {
  const [home, services, buyerTypes, faqs, settings, catalog, markets, offer, founder, sampleMeta, sampleRows] = await Promise.all([
    getContent("home"),
    getContent("services"),
    getContent("buyerTypes"),
    getContent("faqs"),
    getContent("settings"),
    getCatalog(),
    getContent("markets"),
    getContent("offer"),
    getContent("founder"),
    getContent("sampleMeta"),
    getContent("sampleRows"),
  ]);
  // The homepage speaks to manufacturers; buyer-side sourcing has its own page.
  const makerServices = services.filter((s) => s.slug !== "supplier-sourcing").slice(0, 5);
  const makerFaqs = faqs.filter((f) => !/^i am a buyer/i.test(f.question));
  const preview = sampleRows.filter((r) => r.status in STATUS_STYLE).slice(0, 3);

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
                Find Buyers for Your Products <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/pilot" className="btn-outline-light backdrop-blur-sm">
                See the Pilot Programme
              </Link>
            </div>
            <ul className="rise mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70" style={{ "--d": "360ms" } as React.CSSProperties}>
              {["Researched buyer lists", "Decision-maker outreach", "Qualified meetings"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold-400" strokeWidth={2.5} aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <p className="rise mt-5 text-sm text-white/50" style={{ "--d": "420ms" } as React.CSSProperties}>
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

      {/* The manufacturer's problem */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="For manufacturers & exporters"
              title="Stop waiting for distributors to find you"
              intro="Your products may already have demand abroad. The hard part is finding the importers, distributors and industrial buyers that can actually purchase them — and reaching the people who decide."
            />
            <ul className="mt-10 space-y-6">
              {PAINS.map((p, i) => (
                <li key={p.title} data-reveal style={delay(i, 100)} className="flex gap-5">
                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-sm text-gold-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-serif text-lg font-semibold text-navy-900">{p.title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-muted">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-10 rounded-xl border-l-4 border-gold-500 bg-sand px-6 py-5">
              <p className="font-serif text-xl text-navy-900">We do the research, outreach and follow-up — your team takes the meetings.</p>
              <Link href="/manufacturers" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-700">
                How we help manufacturers <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div data-reveal className="relative pb-20 sm:pr-14">
            <div className="photo-zoom relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-navy-900/20 sm:aspect-[4/4.4]">
              <Image src="/images/steel-mill.webp" alt="Steel production inside a factory" fill quality={62} sizes="(min-width: 1024px) 42vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute right-0 bottom-0 w-[55%] overflow-hidden rounded-xl border-4 border-ivory shadow-xl shadow-navy-900/25">
              <div className="relative aspect-[4/3]">
                <Image src="/images/products/ss-coils.webp" alt="Stainless steel coils ready for export" fill quality={60} sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
              </div>
            </div>
            <div className="absolute top-6 -left-3 rounded-lg bg-navy-900 px-5 py-4 text-white shadow-xl sm:-left-6">
              <p className="text-xs tracking-[0.18em] text-gold-400 uppercase">Our objective</p>
              <p className="mt-1 font-serif text-lg">More buyer conversations for your factory</p>
            </div>
          </div>
        </div>
      </section>

      {/* Concrete offer */}
      <div className="border-t border-line bg-white">
        <OfferSection offer={offer} />
      </div>

      {/* Sample deliverable preview */}
      <section className="bg-grid border-y border-line bg-sand py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="See what you receive"
              title="A buyer-research report for your product"
              intro="Every pilot produces a researched list of companies — with country, website, product fit, the decision-maker's role and a clear qualification status."
            />
            <div data-reveal className="mt-8 flex flex-wrap gap-4">
              <Link href="/sample-report" className="btn-navy">
                <FileText className="h-4 w-4" aria-hidden /> View the sample report
              </Link>
              <Link href="/pilot" className="btn-outline">
                Pilot Programme
              </Link>
            </div>
          </div>
          <Link
            href="/sample-report"
            data-reveal
            className="lift group relative block overflow-hidden rounded-2xl bg-white shadow-2xl shadow-navy-900/10 ring-1 ring-line"
            aria-label="Open the sample buyer-research report"
          >
            <span className="pointer-events-none absolute top-6 -right-12 rotate-45 bg-gold-500 px-14 py-1 text-center text-[10px] font-bold tracking-[0.3em] text-navy-950 uppercase">
              Sample
            </span>
            <span className="block bg-navy-900 px-6 py-5 text-white">
              <span className="block text-[11px] tracking-[0.16em] text-gold-400 uppercase">Illustrative sample</span>
              <span className="mt-1 block font-serif text-lg">{sampleMeta.title}</span>
              <span className="mt-1 block text-xs text-white/60">{sampleMeta.markets}</span>
            </span>
            <span className="block divide-y divide-line px-6">
              {preview.map((r) => (
                <span key={r.company} className="flex items-start justify-between gap-4 py-4">
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-navy-900">{r.company}</span>
                    <span className="block truncate text-xs text-muted">
                      {r.country} · {r.role}
                    </span>
                    <span className="mt-1 block truncate text-sm text-ink/75">{r.fit}</span>
                  </span>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLE[r.status]}`}>
                    {r.status}
                  </span>
                </span>
              ))}
            </span>
            <span className="flex items-center justify-between bg-ivory px-6 py-4 text-sm font-semibold text-navy-900 group-hover:text-gold-700">
              Open the full sample report <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
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
              title="From your product to booked buyer meetings"
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

      {/* Initial industrial focus */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Initial industrial focus"
              title="Three industries we research in depth"
              intro="A focused range means better buyer research: clearly defined products, grades and the companies that buy them."
            />
            <Link href="/industries" className="btn-outline shrink-0 self-start lg:self-auto">
              Industries & products <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {catalog.map((c, i) => (
              <div key={c.slug} data-reveal style={delay(i, 120)} className="photo-zoom group relative overflow-hidden rounded-2xl bg-navy-900 text-white">
                <Image src={categoryImage(c)} alt="" fill quality={55} sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-45" />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/30" aria-hidden />
                <div className="relative flex min-h-[26rem] flex-col justify-end p-8">
                  <span className="font-serif text-sm text-gold-400">{i + 1}.</span>
                  <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">{c.name}</h3>
                  <p className="mt-2 text-white/75">{c.summary}</p>
                  {c.products.length > 0 ? (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {c.products.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={productHref(p)}
                            className="inline-block rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs backdrop-blur-sm transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950"
                          >
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 inline-flex self-start rounded-full border border-white/25 px-3 py-1 text-xs text-white/80">
                      Assessed case by case
                    </p>
                  )}
                  <Link href={`/industries/${c.slug}`} className="mt-7 inline-flex items-center gap-2 self-start text-sm font-semibold text-gold-400 hover:text-gold-300">
                    Explore <ArrowRight className="h-4 w-4" aria-hidden />
                    <span className="sr-only">{c.name}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyers we find */}
      <section className="bg-grid relative bg-sand py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Who we find for you"
            title="The buyers we find for your factory"
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

      {/* Services for manufacturers */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Our services"
              title="Everything needed to turn a market into meetings"
              intro="From identifying the right buyers to arranging the first meeting — delivered as one focused service for manufacturers."
            />
            <Link href="/services" className="btn-outline shrink-0 self-start lg:self-auto">
              All services <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {makerServices.map((s, i) => (
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
            <li data-reveal="fade" style={delay(makerServices.length, 70)} className="relative flex flex-col justify-between bg-navy-900 p-8 text-white">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-gold-400 uppercase">Paid service</p>
                <h3 className="mt-4 text-xl font-semibold">Pilot Programme</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Test one product in one target country with a fixed-scope, fixed-fee campaign.
                </p>
              </div>
              <Link href="/pilot" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300">
                See what's included <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <FounderQuote founder={founder} />

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
          </div>
          <div>
            <SectionHeading
              eyebrow={`Why ${settings.companyName}`}
              title="Built for manufacturers that want international growth"
              intro="A focused business-development partner — not an agency selling clicks, and not a trader taking a margin on your product."
            />
            <Ornament className="mt-6" />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {WHY.map((w, i) => (
                <li key={w.title} data-reveal style={delay(i)} className="card lift p-6">
                  <Icon name={w.icon} className="h-6 w-6 text-gold-600" />
                  <h3 className="mt-4 text-base leading-snug font-semibold text-navy-900">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="FAQs" title="Questions manufacturers often ask" />
            <p className="mt-5 text-muted">
              Can&apos;t find your answer?{" "}
              <Link href="/contact" className="font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4">
                Contact our team
              </Link>
              .
            </p>
          </div>
          <div data-reveal>
            <FaqList faqs={makerFaqs} />
          </div>
        </div>
      </section>

      {/* Secondary: buyer-side sourcing */}
      <section className="border-t border-line bg-white py-10">
        <div className="container-x flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-muted">
            <Search className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden />
            <span>
              <span className="font-semibold text-navy-900">Are you a buyer looking for suppliers?</span> We also help importers and industrial
              buyers source from suitable manufacturers.
            </span>
          </p>
          <Link href="/buyers#requirements" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-700">
            Submit a sourcing requirement <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <CtaBand
        title={home.ctaTitle}
        text={home.ctaText}
        settings={settings}
        primary={{ href: "/manufacturers#inquiry", label: "Find Buyers for Your Products" }}
      />
    </>
  );
}
