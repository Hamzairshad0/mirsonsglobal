import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { getContent } from "@/lib/content";
import type { SampleRow } from "@/lib/content-schema";
import { CheckList, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Sample Deliverable — Buyer Research Report",
  description:
    "An illustrative sample of a Mirsons Global buyer-research report: company, country, website, product fit, decision-maker role and qualification status.",
  alternates: { canonical: "/sample-report" },
};

const STATUS_STYLE: Record<string, string> = {
  Qualified: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Interested: "bg-blue-50 text-blue-700 ring-blue-200",
  "In conversation": "bg-violet-50 text-violet-700 ring-violet-200",
  Researching: "bg-amber-50 text-amber-800 ring-amber-200",
  "No response yet": "bg-slate-100 text-slate-600 ring-slate-200",
  "Not a fit": "bg-rose-50 text-rose-700 ring-rose-200",
};

function Status({ value }: { value: string }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset ${STATUS_STYLE[value] ?? STATUS_STYLE["No response yet"]}`}>
      {value}
    </span>
  );
}

function summary(rows: SampleRow[]) {
  const count = (s: string[]) => rows.filter((r) => s.includes(r.status)).length;
  return [
    { label: "Companies researched", value: rows.length },
    { label: "Qualified", value: count(["Qualified"]) },
    { label: "Interested / in conversation", value: count(["Interested", "In conversation"]) },
    { label: "Not a fit", value: count(["Not a fit"]) },
  ];
}

const FULL_REPORT = [
  "Market overview: import demand, main buyer segments and distribution routes in each target country.",
  "Complete company list with contact roles and the reasoning behind each product-fit assessment.",
  "Outreach log: messages sent, follow-ups, response rates and buyer questions.",
  "Qualification notes against the criteria agreed at the start of the pilot.",
  "Recommended next steps: meetings, samples, pricing discussions or new segments to test.",
];

export default async function SampleReportPage() {
  const [meta, rows, settings] = await Promise.all([getContent("sampleMeta"), getContent("sampleRows"), getContent("settings")]);
  const stats = summary(rows);
  const qualified = rows.filter((r) => r.status === "Qualified");
  const interested = rows.filter((r) => ["Interested", "In conversation"].includes(r.status));

  return (
    <>
      <PageHero
        image="/images/sample-report.webp"
        eyebrow="Sample of deliverables"
        title="What a buyer-research report looks like"
        intro="Below is an illustrative example of the report delivered during a pilot — the format, the level of detail and how each company is qualified."
      >
        <Link href="/pilot" className="btn-gold">
          About the Pilot Programme <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </PageHero>

      <section className="bg-sand py-12 sm:py-16 print:bg-white print:py-0">
        <div className="container-x">
          <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-sm text-muted">
              <Info className="h-4 w-4 text-gold-600" aria-hidden /> Illustrative data — not a real client.
            </p>
            <PrintButton />
          </div>

          {/* The report document */}
          <article data-reveal className="relative overflow-hidden rounded-2xl bg-white shadow-2xl shadow-navy-900/10 ring-1 ring-line print:shadow-none print:ring-0">
            <div className="pointer-events-none absolute top-10 -right-16 rotate-45 bg-gold-500 px-20 py-1.5 text-center text-xs font-bold tracking-[0.3em] text-navy-950 uppercase print:hidden">
              Sample
            </div>

            <header className="bg-navy-900 px-6 py-8 text-white sm:px-10">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <Image src="/brand/logo-header.png" alt="Mirsons Global" width={480} height={389} className="h-14 w-auto" />
                <span className="rounded-full border border-gold-500/50 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
                  Illustrative sample
                </span>
              </div>
              <h2 className="mt-8 text-2xl font-semibold sm:text-3xl">{meta.title}</h2>
              <dl className="mt-6 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Prepared for", meta.client],
                  ["Product", meta.product],
                  ["Target markets", meta.markets],
                  ["Period", meta.period],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs tracking-[0.14em] text-gold-400 uppercase">{k}</dt>
                    <dd className="mt-1 text-white/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </header>

            <div className="px-6 py-8 sm:px-10">
              <p role="note" className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {meta.disclaimer}
              </p>

              {/* Summary */}
              <h3 className="mt-10 font-sans text-xs font-semibold tracking-[0.18em] text-gold-700 uppercase">1. Summary</h3>
              <dl className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-line bg-ivory p-5">
                    <dt className="text-xs text-muted">{s.label}</dt>
                    <dd className="mt-1 font-serif text-3xl font-semibold text-navy-900">{s.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Table */}
              <h3 className="mt-10 font-sans text-xs font-semibold tracking-[0.18em] text-gold-700 uppercase">2. Researched companies</h3>

              <div className="mt-4 hidden overflow-x-auto rounded-xl border border-line md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-navy-900 text-xs tracking-wide text-white/80 uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Company</th>
                      <th className="px-4 py-3 font-medium">Country</th>
                      <th className="px-4 py-3 font-medium">Website</th>
                      <th className="px-4 py-3 font-medium">Product fit</th>
                      <th className="px-4 py-3 font-medium">Decision-maker role</th>
                      <th className="px-4 py-3 font-medium">Qualification status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {rows.map((r, i) => (
                      <tr key={i} className="align-top odd:bg-white even:bg-ivory">
                        <td className="px-4 py-4 font-semibold text-navy-900">{r.company}</td>
                        <td className="px-4 py-4 text-ink/80">{r.country}</td>
                        <td className="px-4 py-4 text-xs break-all text-ink/70">{r.website}</td>
                        <td className="px-4 py-4 text-ink/80">{r.fit}</td>
                        <td className="px-4 py-4 text-ink/80">{r.role}</td>
                        <td className="px-4 py-4">
                          <Status value={r.status} />
                          {r.note && <span className="mt-1.5 block max-w-56 text-xs text-muted">{r.note}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <ul className="mt-4 space-y-3 md:hidden">
                {rows.map((r, i) => (
                  <li key={i} className="rounded-xl border border-line p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-navy-900">{r.company}</p>
                        <p className="text-xs text-muted">{r.country}</p>
                        <p className="text-xs text-muted">Website: {r.website}</p>
                      </div>
                      <Status value={r.status} />
                    </div>
                    <p className="mt-3 text-sm text-ink/80">
                      <span className="font-medium text-navy-900">Fit: </span>
                      {r.fit}
                    </p>
                    <p className="mt-1 text-sm text-ink/80">
                      <span className="font-medium text-navy-900">Contact role: </span>
                      {r.role}
                    </p>
                    {r.note && <p className="mt-2 text-xs text-muted">{r.note}</p>}
                  </li>
                ))}
              </ul>

              {/* Next steps */}
              <h3 className="mt-10 font-sans text-xs font-semibold tracking-[0.18em] text-gold-700 uppercase">3. Recommended next steps</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/85">
                {qualified.length > 0 && (
                  <li>
                    • Arrange introductory meetings with {qualified.map((r) => r.company).join(", ")}.
                  </li>
                )}
                {interested.length > 0 && (
                  <li>
                    • Send the requested documents and pricing to {interested.map((r) => r.company).join(", ")}.
                  </li>
                )}
                <li>• Continue follow-ups with companies that have not yet responded.</li>
                <li>• Review “not a fit” feedback to refine the buyer profile for the next round.</li>
              </ul>

              <p className="mt-10 border-t border-line pt-5 text-xs text-muted">
                Mirsons Global · {settings.email} · Confidential — prepared for the named client only.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="no-print py-14 sm:py-18">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="In a full report"
            title="The complete report also includes"
            intro="The sample above shows the core table. A real pilot report adds the context behind every recommendation."
          />
          <div data-reveal>
            <CheckList items={FULL_REPORT} />
          </div>
        </div>
      </section>

      <div className="no-print">
        <CtaBand
          title="Want a report like this for your product?"
          text="A pilot delivers this research for your product and target country — followed by outreach, qualification and introductions."
          settings={settings}
          primary={{ href: "/pilot", label: "See the Pilot Programme" }}
        />
      </div>
    </>
  );
}
