import type { Metadata } from "next";
import { getActiveIndustries, getContent } from "@/lib/content";
import Image from "next/image";
import { industryImage, lines } from "@/lib/content-schema";
import { CtaBand, delay, PageHero, SectionHeading, WorldMap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Industrial raw materials and B2B product categories we serve: minerals, metals and steel, chemicals and polymers, construction materials, textiles, agri-commodities, packaging and industrial equipment.",
  alternates: { canonical: "/industries" },
};

export default async function IndustriesPage() {
  const [industries, markets, settings] = await Promise.all([
    getActiveIndustries(),
    getContent("markets"),
    getContent("settings"),
  ]);

  return (
    <>
      <PageHero
        image="/images/containers-aerial.webp"
        eyebrow="Industries we serve"
        title="Industrial raw materials and B2B product categories"
        intro="We focus on categories where international buyers purchase in volume, specifications matter and long-term supplier relationships create value."
      />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <ul className="grid gap-6 md:grid-cols-2">
            {industries.map((ind, i) => (
              <li
                key={ind.slug}
                id={ind.slug}
                data-reveal
                style={delay(i % 2, 120)}
                className="card lift photo-zoom flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/7] overflow-hidden bg-navy-900">
                  <Image
                    src={industryImage(ind)}
                    alt={ind.name}
                    fill
                    quality={60}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" aria-hidden />
                  <div className="absolute inset-x-8 bottom-5 flex items-end justify-between gap-4 sm:inset-x-10">
                    <h2 className="text-2xl font-semibold text-white">{ind.name}</h2>
                    <span className="font-serif text-sm text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-8 sm:p-10">
                <p className="leading-relaxed text-muted">{ind.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {lines(ind.products).map((p) => (
                    <li key={p} className="rounded-full border border-line bg-ivory px-3.5 py-1.5 text-sm text-navy-900 transition-colors hover:border-gold-500">
                      {p}
                    </li>
                  ))}
                </ul>
                </div>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10 rounded-xl border border-dashed border-gold-500/60 bg-white p-8 text-center">
            <p className="font-serif text-xl text-navy-900">Don&apos;t see your product category?</p>
            <p className="mt-2 text-muted">
              We regularly take on new B2B categories. Tell us what you manufacture or need to source and we&apos;ll assess the fit.
            </p>
          </div>
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
              <li key={m.name} data-reveal="fade" style={delay(i, 70)} className="bg-navy-900/90 p-8 backdrop-blur-sm transition-colors duration-300 hover:bg-navy-800/90">
                <h3 className="text-xl font-semibold text-gold-300">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{m.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Discuss your product category"
        text="Whether you sell or buy, we'll tell you honestly whether we can help — and how."
        settings={settings}
        primary={{ href: "/contact#consultation", label: "Discuss Your Requirements" }}
      />
    </>
  );
}
