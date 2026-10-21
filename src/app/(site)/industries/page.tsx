import type { Metadata } from "next";
import { getActiveIndustries, getContent } from "@/lib/content";
import { lines } from "@/lib/content-schema";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";

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
        eyebrow="Industries we serve"
        title="Industrial raw materials and B2B product categories"
        intro="We focus on categories where international buyers purchase in volume, specifications matter and long-term supplier relationships create value."
      />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <ul className="grid gap-6 md:grid-cols-2">
            {industries.map((ind, i) => (
              <li key={ind.slug} id={ind.slug} className="card flex flex-col p-8 sm:p-10">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-2xl font-semibold text-navy-900">{ind.name}</h2>
                  <span className="font-serif text-sm text-gold-600">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-3 leading-relaxed text-muted">{ind.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {lines(ind.products).map((p) => (
                    <li key={p} className="rounded-full border border-line bg-ivory px-3.5 py-1.5 text-sm text-navy-900">
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-xl border border-dashed border-gold-500/60 bg-white p-8 text-center">
            <p className="font-serif text-xl text-navy-900">Don&apos;t see your product category?</p>
            <p className="mt-2 text-muted">
              We regularly take on new B2B categories. Tell us what you manufacture or need to source and we&apos;ll assess the fit.
            </p>
          </div>
        </div>
      </section>

      <section className="on-dark bg-navy-900 py-20 text-white sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="International markets"
            title="Where we find buyers and suppliers"
            intro="We research and reach companies across established and emerging trade regions."
            dark
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => (
              <li key={m.name} className="bg-navy-900 p-8">
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
