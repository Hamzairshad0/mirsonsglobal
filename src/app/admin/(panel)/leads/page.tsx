import Link from "next/link";
import { Download, Search } from "lucide-react";
import { listLeads } from "@/lib/leads";
import { INQUIRY_TYPES, STATUSES, STATUS_LABELS, TYPE_LABELS } from "@/lib/inquiry";
import { formatDate, PageTitle, StatusBadge, TypeBadge } from "@/components/admin/AdminUi";

export const metadata = { title: "Leads" };

type SP = { q?: string; type?: string; status?: string; due?: string };

export default async function LeadsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const filters = {
    q: sp.q?.trim() || undefined,
    type: INQUIRY_TYPES.includes(sp.type as never) ? sp.type : undefined,
    status: STATUSES.includes(sp.status as never) ? sp.status : undefined,
    due: sp.due ? "1" : undefined,
  };
  const leads = await listLeads(filters);
  const qs = new URLSearchParams(Object.entries(filters).filter(([, v]) => v) as [string, string][]).toString();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <PageTitle
        title="Leads"
        subtitle={`${leads.length} ${leads.length === 1 ? "inquiry" : "inquiries"}${qs ? " matching filters" : ""}`}
        actions={
          <a href={`/admin/export${qs ? `?${qs}` : ""}`} className="btn-outline !py-2.5">
            <Download className="h-4 w-4" aria-hidden /> Export CSV
          </a>
        }
      />

      <form className="card mb-6 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_200px_200px_auto_auto] lg:items-center">
        <label className="relative">
          <span className="sr-only">Search</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            name="q"
            defaultValue={filters.q}
            placeholder="Search name, company, email, product, ref…"
            className="field-input !pl-9"
          />
        </label>
        <label>
          <span className="sr-only">Type</span>
          <select name="type" defaultValue={filters.type ?? ""} className="field-input">
            <option value="">All types</option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Status</span>
          <select name="status" defaultValue={filters.status ?? ""} className="field-input">
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-navy-900">
          <input type="checkbox" name="due" value="1" defaultChecked={!!filters.due} className="h-4 w-4 accent-navy-900" />
          Follow-up overdue
        </label>
        <div className="flex gap-2">
          <button className="btn-navy !py-2.5">Filter</button>
          {qs && (
            <Link href="/admin/leads" className="btn-outline !py-2.5">
              Clear
            </Link>
          )}
        </div>
      </form>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-line bg-ivory text-xs tracking-wide text-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Received</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Company / contact</th>
              <th className="px-4 py-3 font-medium">Summary</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Follow-up</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted">
                  No inquiries found.
                </td>
              </tr>
            )}
            {leads.map((l) => (
              <tr key={l.id} className="relative hover:bg-ivory">
                <td className="px-4 py-3 whitespace-nowrap text-muted">
                  {formatDate(l.createdAt)}
                  <span className="block text-xs">{l.ref}</span>
                </td>
                <td className="px-4 py-3">
                  <TypeBadge type={l.type} />
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${l.id}`} className="font-medium text-navy-900 after:absolute after:inset-0">
                    {l.company || l.name}
                  </Link>
                  <span className="block text-xs text-muted">
                    {l.name} · {l.country}
                  </span>
                </td>
                <td className="max-w-xs px-4 py-3 text-muted">
                  <span className="line-clamp-2">{l.summary}</span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={l.status} />
                </td>
                <td
                  className={`px-4 py-3 whitespace-nowrap ${
                    l.followUpDate && l.followUpDate < today && !["won", "closed"].includes(l.status) ? "font-semibold text-red-600" : "text-muted"
                  }`}
                >
                  {l.followUpDate ? formatDate(l.followUpDate) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
