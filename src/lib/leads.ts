import "server-only";
import { db } from "./db";
import { STATUSES, type InquiryType, type Status } from "./inquiry";

export type Lead = {
  id: number;
  ref: string;
  type: InquiryType;
  status: Status;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  summary: string;
  data: Record<string, unknown>;
  followUpDate: string | null;
  emailStatus: string | null;
  sourcePage: string;
  createdAt: string;
  updatedAt: string;
};

export type LeadFilters = { q?: string; type?: string; status?: string; due?: string };

type Row = Record<string, unknown>;

function toLead(r: Row): Lead {
  let data: Record<string, unknown> = {};
  try {
    data = JSON.parse(String(r.data));
  } catch {
    data = {};
  }
  return {
    id: Number(r.id),
    ref: String(r.ref ?? ""),
    type: r.type as InquiryType,
    status: r.status as Status,
    name: String(r.name ?? ""),
    email: String(r.email ?? ""),
    phone: String(r.phone ?? ""),
    company: String(r.company ?? ""),
    country: String(r.country ?? ""),
    summary: String(r.summary ?? ""),
    data,
    followUpDate: r.follow_up_date ? String(r.follow_up_date) : null,
    emailStatus: r.email_status ? String(r.email_status) : null,
    sourcePage: String(r.source_page ?? ""),
    createdAt: String(r.created_at),
    updatedAt: String(r.updated_at),
  };
}

function where(f: LeadFilters) {
  const clauses: string[] = [];
  const args: (string | number)[] = [];
  if (f.q) {
    clauses.push("(name LIKE ? OR email LIKE ? OR company LIKE ? OR country LIKE ? OR summary LIKE ? OR ref LIKE ?)");
    const like = `%${f.q}%`;
    args.push(like, like, like, like, like, like);
  }
  if (f.type) {
    clauses.push("type = ?");
    args.push(f.type);
  }
  if (f.status) {
    clauses.push("status = ?");
    args.push(f.status);
  }
  if (f.due) {
    clauses.push("follow_up_date IS NOT NULL AND follow_up_date <= date('now') AND status NOT IN ('won','closed')");
  }
  return { sql: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", args };
}

export async function listLeads(f: LeadFilters, limit = 500): Promise<Lead[]> {
  const w = where(f);
  const rs = await (await db()).execute({
    sql: `SELECT * FROM inquiries ${w.sql} ORDER BY created_at DESC, id DESC LIMIT ?`,
    args: [...w.args, limit],
  });
  return rs.rows.map((r) => toLead(r as unknown as Row));
}

export async function getLead(id: number) {
  const client = await db();
  const rs = await client.execute({ sql: "SELECT * FROM inquiries WHERE id = ?", args: [id] });
  if (!rs.rows[0]) return null;
  const notes = await client.execute({
    sql: "SELECT id, body, created_at FROM inquiry_notes WHERE inquiry_id = ? ORDER BY created_at DESC, id DESC",
    args: [id],
  });
  return {
    lead: toLead(rs.rows[0] as unknown as Row),
    notes: notes.rows.map((n) => ({ id: Number(n.id), body: String(n.body), createdAt: String(n.created_at) })),
  };
}

export async function updateLead(id: number, status: string, followUpDate: string | null) {
  if (!STATUSES.includes(status as Status)) throw new Error("Invalid status");
  if (followUpDate && !/^\d{4}-\d{2}-\d{2}$/.test(followUpDate)) throw new Error("Invalid date");
  await (await db()).execute({
    sql: "UPDATE inquiries SET status = ?, follow_up_date = ?, updated_at = datetime('now') WHERE id = ?",
    args: [status, followUpDate || null, id],
  });
}

export async function addNote(id: number, body: string) {
  await (await db()).batch(
    [
      { sql: "INSERT INTO inquiry_notes (inquiry_id, body) VALUES (?, ?)", args: [id, body.slice(0, 5000)] },
      { sql: "UPDATE inquiries SET updated_at = datetime('now') WHERE id = ?", args: [id] },
    ],
    "write"
  );
}

export async function deleteNote(noteId: number) {
  await (await db()).execute({ sql: "DELETE FROM inquiry_notes WHERE id = ?", args: [noteId] });
}

export async function deleteLead(id: number) {
  await (await db()).batch(
    [
      { sql: "DELETE FROM inquiry_notes WHERE inquiry_id = ?", args: [id] },
      { sql: "DELETE FROM inquiries WHERE id = ?", args: [id] },
    ],
    "write"
  );
}

export async function leadStats() {
  const client = await db();
  const [totals, byType, byStatus, due, daily] = await Promise.all([
    client.execute(`SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS fresh,
        SUM(CASE WHEN created_at >= datetime('now', '-30 days') THEN 1 ELSE 0 END) AS last30,
        SUM(CASE WHEN created_at >= datetime('now', '-7 days') THEN 1 ELSE 0 END) AS last7,
        SUM(CASE WHEN status IN ('meeting','won') THEN 1 ELSE 0 END) AS meetings
      FROM inquiries`),
    client.execute("SELECT type, COUNT(*) AS n FROM inquiries GROUP BY type"),
    client.execute("SELECT status, COUNT(*) AS n FROM inquiries GROUP BY status"),
    client.execute(
      `SELECT * FROM inquiries WHERE follow_up_date IS NOT NULL AND follow_up_date <= date('now', '+7 days')
       AND status NOT IN ('won','closed') ORDER BY follow_up_date ASC LIMIT 10`
    ),
    client.execute(
      "SELECT date(created_at) AS d, COUNT(*) AS n FROM inquiries WHERE created_at >= datetime('now', '-29 days') GROUP BY d"
    ),
  ]);
  const t = totals.rows[0];
  return {
    total: Number(t?.total ?? 0),
    fresh: Number(t?.fresh ?? 0),
    last30: Number(t?.last30 ?? 0),
    last7: Number(t?.last7 ?? 0),
    meetings: Number(t?.meetings ?? 0),
    byType: Object.fromEntries(byType.rows.map((r) => [String(r.type), Number(r.n)])) as Record<string, number>,
    byStatus: Object.fromEntries(byStatus.rows.map((r) => [String(r.status), Number(r.n)])) as Record<string, number>,
    followUps: due.rows.map((r) => toLead(r as unknown as Row)),
    daily: Object.fromEntries(daily.rows.map((r) => [String(r.d), Number(r.n)])) as Record<string, number>,
  };
}
