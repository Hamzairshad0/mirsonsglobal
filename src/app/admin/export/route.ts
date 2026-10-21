import { isAuthenticated } from "@/lib/auth";
import { listLeads } from "@/lib/leads";
import { FIELD_LABELS, STATUS_LABELS, TYPE_LABELS } from "@/lib/inquiry";

export const dynamic = "force-dynamic";

function cell(v: unknown) {
  let s = Array.isArray(v) ? v.join("; ") : String(v ?? "");
  // Prevent spreadsheet formula injection (phone numbers like "+971 50…" are left as-is)
  if (/^[=@\t\r]/.test(s) || /^[+-](?![\d\s()-]+$)/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
  if (!(await isAuthenticated())) return new Response("Unauthorized", { status: 401 });
  const sp = new URL(req.url).searchParams;
  const leads = await listLeads(
    {
      q: sp.get("q") || undefined,
      type: sp.get("type") || undefined,
      status: sp.get("status") || undefined,
      due: sp.get("due") || undefined,
    },
    10000
  );

  const dataKeys = Object.keys(FIELD_LABELS).filter((k) => !["name", "email", "phone", "company", "country"].includes(k));
  const header = [
    "Reference", "Received (UTC)", "Type", "Status", "Follow-up date",
    "Contact name", "Email", "Phone", "Company", "Country", "Summary",
    ...dataKeys.map((k) => FIELD_LABELS[k]),
  ];
  const rows = leads.map((l) => [
    l.ref, l.createdAt, TYPE_LABELS[l.type], STATUS_LABELS[l.status], l.followUpDate ?? "",
    l.name, l.email, l.phone, l.company, l.country, l.summary,
    ...dataKeys.map((k) => l.data[k] ?? ""),
  ]);

  const csv = "﻿" + [header, ...rows].map((r) => r.map(cell).join(",")).join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="mirsons-leads-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
