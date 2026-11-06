import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCatalog, getContent } from "@/lib/content";
import { categoryImage, paragraphs } from "@/lib/content-schema";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/Catalog";
import { CtaBand, delay, PageHero, SectionHeading, WorldMap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Industries & Products — Stainless Steel and Copper",
  description:
    "Mirsons Global connects manufacturers, suppliers and international buyers of stainless steel sheets, coils, pipes, tubes and plates, and copper busbars, wire rods, tubes and cathodes.",
  alternates: { canonical: "/industries" },
};

const SUPPORT = [
  { icon: "chart", title: "Market research", text: "Which countries import your product, who buys it and how it is distributed." },
  { icon: "search", title: "Buyer identification", text: "Importers, distributors, stockholders, processors and industrial end users — and their decision-makers." },
  { icon: "package", title: "Supplier sourcing", text: "Manufacturers matching a buyer's grade, dimensions, standards, volumes and destination." },
  { icon: "target", title: "Targeted outreach", text: "Personalised, specification-led conversations instead of generic mass mailing." },
];

export default async function IndustriesPage() {
  const [page, catalog, markets, settings] = await Promise.all([
    getContent("industriesPage"),
    getCatalog(),
    getContent("markets"),
    getContent("settings"),
  ]);
  const intro = paragraphs(page.intro);

  return (
    <>
      <PageHero image="/images/industries-hero.webp" eyebrow={page.eyebrow} title={page.title} intro={page.subtitle}>
        <Link href="#products" className="btn-gold">
          Explore products <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link href="/contact#consultation" className="btn-outline-light">
          Discuss a product
        </Link>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div data-reveal className="space-y-5 text-[17px] leading-relaxed text-muted">
            {intro.map((p, i) => (
              <p key={i} className={i === 0 ? "font-serif text-2xl leading-snug text-navy-900" : ""}>
                {p}
              </p>
            ))}
          </div>
          <ul className="space-y-4">
            {catalog.map((c, i) => (
              <li key={c.slug} data-reveal style={delay(i, 120)}>
                <Link
                  href={`/industries/${c.slug}`}
                  className="photo-zoom group relative flex min-h-48 flex-col justify-end overflow-hidden rounded-2xl bg-navy-900 p-7 text-white"
                >
                  <Image src={categoryImage(c)} alt="" fill quality={55} sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover opacity-60" />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" aria-hidden />
                  <span className="relative text-xs font-semibold tracking-[0.18em] text-gold-400 uppercase">
                    {c.products.length > 0 ? `${c.products.length} priority products` : "Assessed case by case"}
                  </span>
                  <span className="relative mt-2 flex items-end justify-between gap-4">
                    <span className="font-serif text-2xl font-semibold">{c.name}</span>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="products" className="bg-grid border-y border-line bg-sand py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Priority industries & products"
            title="The exact product categories we support"
            intro="Our initial focus is three industries where we can research suppliers and buyers in depth, rather than covering many unrelated markets."
          />
          <div className="mt-16 space-y-20">
            {catalog.map((c, ci) => (
              <div key={c.slug}>
                <div data-reveal className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-serif text-sm text-gold-600">{String(ci + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 text-2xl font-semibold text-navy-900 sm:text-3xl">{c.name}</h3>
                    <p className="mt-2 max-w-2xl text-muted">{c.summary}</p>
                  </div>
                  <Link href={`/industries/${c.slug}`} className="btn-outline shrink-0 self-start !py-2.5 sm:self-auto">
                    All {c.name.replace(/ Products$/, "").toLowerCase()} details <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
                {c.products.length > 0 ? (
                  <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {c.products.map((p, i) => (
                      <ProductCard key={p.slug} product={p} index={i} />
                    ))}
                  </ul>
                ) : (
                  <Link
                    href={`/industries/${c.slug}`}
                    data-reveal
                    className="photo-zoom group relative mt-8 flex min-h-56 items-end overflow-hidden rounded-xl bg-navy-900 p-8 text-white"
                  >
                    <Image src={categoryImage(c)} alt="" fill quality={50} sizes="100vw" className="object-cover opacity-50" />
                    <span className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/70 to-transparent" aria-hidden />
                    <span className="relative max-w-xl">
                      <span className="block font-serif text-2xl font-semibold">Selected materials, assessed case by case</span>
                      <span className="mt-2 block text-white/70">
                        Tell us the material, grade, volumes and target market — we will confirm whether we can support it.
                      </span>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 group-hover:text-gold-300">
                        Discuss a raw material <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="How we support these industries"
            title="Research and introductions built around your product specification"
            center
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORT.map((s, i) => (
              <li key={s.title} data-reveal style={delay(i)} className="card lift group p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <WorldMap className="absolute top-1/2 left-1/2 w-[160%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-30 lg:w-[110%]" />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="International markets"
            title="Where we find buyers and suppliers"
            intro="We research and reach companies across established and emerging trade regions."
            dark
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m, i) => (
              <li
                key={m.name}
                data-reveal="fade"
                style={delay(i, 70)}
                className="bg-navy-900/90 p-8 backdrop-blur-sm transition-colors duration-300 hover:bg-navy-800/90"
              >
                <h3 className="text-xl font-semibold text-gold-300">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{m.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Working with stainless steel or copper?"
        text="Tell us the product, grade and target market. We'll explain how we would find and qualify buyers — or suppliers — for it."
        settings={settings}
        primary={{ href: "/contact#consultation", label: "Discuss Your Product" }}
      />
    </>
  );
}
