import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, Factory, Handshake, Users } from "lucide-react";
import { getCatalog, getContent } from "@/lib/content";
import { categoryImage, defaults, lines, paragraphs, productImage } from "@/lib/content-schema";
import { CheckList, CtaBand, PageHero } from "@/components/ui";

export const dynamicParams = true;

export function generateStaticParams() {
  return defaults.categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getCatalog()).find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `${category.summary} Mirsons Global connects suppliers with importers, distributors and industrial buyers.`,
    alternates: { canonical: `/industries/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [catalog, settings] = await Promise.all([getCatalog(), getContent("settings")]);
  const index = catalog.findIndex((c) => c.slug === slug);
  if (index < 0) notFound();
  const category = catalog[index];
  const others = catalog.filter((c) => c.slug !== slug);
  const intro = paragraphs(category.intro);

  return (
    <>
      <PageHero image={categoryImage(category)} eyebrow="Industries & Products" title={category.name} intro={category.summary}>
        <Link href={`/manufacturers?product=${encodeURIComponent(category.products[0]?.name ?? "")}#inquiry`} className="btn-gold">
          Find Qualified Buyers <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link href="/buyers#requirements" className="btn-outline-light">
          Submit Sourcing Requirements
        </Link>
      </PageHero>

      {/* Intro + jump links */}
      <section className="border-b border-line bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div data-reveal className="space-y-5 text-[17px] leading-relaxed text-muted">
            {intro.map((p, i) => (
              <p key={i} className={i === 0 ? "font-serif text-2xl leading-snug text-navy-900" : ""}>
                {p}
              </p>
            ))}
          </div>
          <nav data-reveal aria-label={`${category.name} on this page`} className="self-start rounded-2xl bg-sand p-7">
            <p className="text-xs font-semibold tracking-[0.18em] text-gold-700 uppercase">On this page</p>
            <ol className="mt-4 space-y-1">
              {category.products.map((p, i) => (
                <li key={p.slug}>
                  <a href={`#${p.slug}`} className="group flex items-center gap-3 rounded-md px-2 py-2 hover:bg-white">
                    <span className="font-serif text-sm text-gold-600">
                      {index + 1}.{i + 1}
                    </span>
                    <span className="font-medium text-navy-900">{p.name}</span>
                    <ArrowRight className="ml-auto h-4 w-4 text-gold-600 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Products */}
      {category.products.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={p.slug} id={p.slug} className={`py-20 sm:py-24 ${flip ? "bg-sand" : ""}`}>
            <div className="container-x">
              <div className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-last" : ""}`}>
                <div data-reveal className="lg:sticky lg:top-28">
                  <div className="photo-zoom relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-900 shadow-2xl shadow-navy-900/15">
                    <Image src={productImage(p)} alt={p.name} fill quality={62} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                    <span className="absolute top-5 left-5 rounded-full bg-navy-950/80 px-4 py-1.5 font-serif text-sm text-gold-300 backdrop-blur">
                      {index + 1}.{i + 1}
                    </span>
                  </div>
                </div>

                <div>
                  <div data-reveal>
                    <p className="eyebrow">Product overview</p>
                    <h2 className="mt-4 text-3xl leading-tight font-semibold text-navy-900 sm:text-4xl">{p.name}</h2>
                    <div className="mt-5 space-y-4 leading-relaxed text-muted">
                      {paragraphs(p.overview).map((para, k) => (
                        <p key={k}>{para}</p>
                      ))}
                    </div>
                  </div>

                  <div data-reveal className="mt-10">
                    <h3 className="flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.14em] text-navy-900 uppercase">
                      <Factory className="h-4 w-4 text-gold-600" aria-hidden /> Key industrial applications
                    </h3>
                    <div className="mt-5">
                      <CheckList items={lines(p.applications)} />
                    </div>
                  </div>

                  <div className="mt-10 grid gap-5 sm:grid-cols-2">
                    <div data-reveal className="card p-6">
                      <h3 className="flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.14em] text-navy-900 uppercase">
                        <Users className="h-4 w-4 text-gold-600" aria-hidden /> Target buyers
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{p.buyers}</p>
                    </div>
                    <div data-reveal className="rounded-xl bg-navy-900 p-6 text-white">
                      <h3 className="flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.14em] text-gold-400 uppercase">
                        <Handshake className="h-4 w-4" aria-hidden /> How we support
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/75">{p.support}</p>
                    </div>
                  </div>

                  {p.notice && (
                    <div data-reveal role="note" className="mt-6 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
                      <p>{p.notice}</p>
                    </div>
                  )}

                  <div data-reveal className="mt-8 flex flex-wrap gap-3">
                    <Link href={`/manufacturers?product=${encodeURIComponent(p.name)}#inquiry`} className="btn-gold !py-3">
                      Find buyers for {p.name.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <Link href={`/buyers?product=${encodeURIComponent(p.name)}#requirements`} className="btn-outline !py-3">
                      Source this product
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {others.length > 0 && (
        <section className="border-t border-line bg-white py-16">
          <div className="container-x flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Also in our focus</p>
              <p className="mt-3 font-serif text-2xl text-navy-900">{others.map((o) => o.name).join(" · ")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {others.map((o) => (
                <Link key={o.slug} href={`/industries/${o.slug}`} className="btn-navy">
                  {o.name} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ))}
              <Link href="/industries" className="btn-outline">
                All industries
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={`Discuss a ${category.name.replace(/ Products$/, "").toLowerCase()} opportunity`}
        text="Share the product, grade, dimensions and target market. We'll outline how we would identify and qualify the right buyers or suppliers."
        settings={settings}
        primary={{ href: "/contact#consultation", label: "Book a Consultation" }}
      />
    </>
  );
}
