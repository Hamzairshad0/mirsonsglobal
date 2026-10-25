import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { leadStats, listLeads } from "@/lib/leads";
import { INQUIRY_TYPES, STATUSES, STATUS_LABELS, TYPE_LABELS } from "@/lib/inquiry";
import { formatDate, PageTitle, StatusBadge, TypeBadge } from "@/components/admin/AdminUi";
import { DigestButton } from "@/components/admin/DigestButton";

export const metadata = { title: "Overview" };

function last30Days() {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export default async function AdminHome() {
  const [stats, recent, all] = await Promise.all([leadStats(), listLeads({}, 8), listLeads({}, 2000)]);
  const byProduct = Object.entries(
    all.reduce<Record<string, number>>((acc, l) => {
      const p = String(l.data.category ?? "");
      if (p) acc[p] = (acc[p] ?? 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);
  const maxProduct = Math.max(1, ...byProduct.map(([, n]) => n));
  const days = last30Days();
  const max = Math.max(1, ...days.map((d) => stats.daily[d] ?? 0));
  const today = new Date().toISOString().slice(0, 10);

  const tiles = [
    { label: "Total inquiries", value: stats.total, href: "/admin/leads" },
    { label: "New — not yet reviewed", value: stats.fresh, href: "/admin/leads?status=new" },
    { label: "Last 7 days", value: stats.last7 },
    { label: "Last 30 days", value: stats.last30 },
    { label: "Meetings & won", value: stats.meetings, href: "/admin/leads?status=meeting" },
  ];

  return (
    <>
      <PageTitle title="Overview" subtitle="Inquiries received through the website." />

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {tiles.map((t) => {
          const inner = (
            <>
              <span className="text-xs font-medium tracking-wide text-muted uppercase">{t.label}</span>
              <span className="mt-2 block font-serif text-4xl font-semibold text-navy-900">{t.value}</span>
            </>
          );
          return (
            <li key={t.label} className="card p-5">
              {t.href ? (
                <Link href={t.href} className="block hover:opacity-80">
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="card p-6">
          <h2 className="font-sans text-sm font-semibold text-navy-900">Inquiries per day — last 30 days</h2>
          <div className="mt-6 flex h-40 items-end gap-1" role="img" aria-label={`${stats.last30} inquiries in the last 30 days`}>
            {days.map((d) => {
              const n = stats.daily[d] ?? 0;
              return (
                <div key={d} className="group relative flex h-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-sm ${n ? "bg-navy-700 group-hover:bg-gold-500" : "bg-line"}`}
                    style={{ height: n ? `${Math.max(6, (n / max) * 100)}%` : "2px" }}
                  />
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded bg-navy-950 px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                    {formatDate(d)}: {n}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted">
            <span>{formatDate(days[0])}</span>
            <span>Today</span>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="font-sans text-sm font-semibold text-navy-900">By type</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {INQUIRY_TYPES.map((t) => (
              <li key={t} className="flex justify-between">
                <Link href={`/admin/leads?type=${t}`} className="text-muted hover:text-navy-900">
                  {TYPE_LABELS[t]}
                </Link>
                <span className="font-semibold text-navy-900">{stats.byType[t] ?? 0}</span>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 font-sans text-sm font-semibold text-navy-900">By status</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {STATUSES.map((s) => (
              <li key={s} className="flex justify-between">
                <Link href={`/admin/leads?status=${s}`} className="text-muted hover:text-navy-900">
                  {STATUS_LABELS[s]}
                </Link>
                <span className="font-semibold text-navy-900">{stats.byStatus[s] ?? 0}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h2 className="font-sans text-sm font-semibold text-navy-900">Follow-ups due (next 7 days)</h2>
            <Link href="/admin/leads?due=1" className="text-xs font-semibold text-gold-700">
              Overdue only
            </Link>
          </div>
          {stats.followUps.length === 0 ? (
            <p className="px-6 py-8 text-sm text-muted">No follow-ups scheduled.</p>
          ) : (
            <ul className="divide-y divide-line">
              {stats.followUps.map((l) => (
                <li key={l.id}>
                  <Link href={`/admin/leads/${l.id}`} className="flex items-center justify-between gap-4 px-6 py-3 hover:bg-ivory">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-navy-900">{l.company || l.name}</span>
                      <span className="block truncate text-xs text-muted">{l.summary}</span>
                    </span>
                    <span className={`shrink-0 text-xs font-semibold ${l.followUpDate! < today ? "text-red-600" : "text-navy-900"}`}>
                      {formatDate(l.followUpDate!)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h2 className="font-sans text-sm font-semibold text-navy-900">Latest inquiries</h2>
            <Link href="/admin/leads" className="inline-flex items-center gap-1 text-xs font-semibold text-gold-700">
              All leads <ArrowRight className="h-3 w-3" aria-hidden />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="px-6 py-8 text-sm text-muted">No inquiries yet. Submissions from the website forms will appear here.</p>
          ) : (
            <ul className="divide-y divide-line">
              {recent.map((l) => (
                <li key={l.id}>
                  <Link href={`/admin/leads/${l.id}`} className="flex items-center justify-between gap-4 px-6 py-3 hover:bg-ivory">
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <TypeBadge type={l.type} />
                        <span className="truncate text-sm font-medium text-navy-900">{l.company || l.name}</span>
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {l.country} · {formatDate(l.createdAt, true)}
                      </span>
                    </span>
                    <StatusBadge status={l.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="card p-6">
          <h2 className="font-sans text-sm font-semibold text-navy-900">Inquiries by product</h2>
          {byProduct.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No product inquiries yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {byProduct.map(([product, n]) => (
                <li key={product}>
                  <Link href={`/admin/leads?product=${encodeURIComponent(product)}`} className="group block">
                    <span className="flex justify-between text-sm">
                      <span className="text-muted group-hover:text-navy-900">{product}</span>
                      <span className="font-semibold text-navy-900">{n}</span>
                    </span>
                    <span className="mt-1 block h-1.5 rounded-full bg-line">
                      <span className="block h-full rounded-full bg-gold-500" style={{ width: `${(n / maxProduct) * 100}%` }} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="card p-6">
          <h2 className="font-sans text-sm font-semibold text-navy-900">Daily reminder email</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Every morning at 09:00 (Pakistan time) the team receives an email with follow-ups due today or overdue and
            inquiries from the last 24 hours. It needs the email (SMTP) settings and a <code>CRON_SECRET</code> in Vercel.
          </p>
          <div className="mt-5">
            <DigestButton />
          </div>
        </section>
      </div>
    </>
  );
}
