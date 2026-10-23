// All database queries. Written once in SQL that both SQLite and Postgres accept
// (see sql.ts), and given the database through makeRepo() so they can be tested on either engine.
import { nowUtc, todayUtc, type Db, type Row } from "./sql";
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

export type NewInquiry = {
  type: InquiryType;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  summary: string;
  data: Record<string, unknown>;
  sourcePage: string;
  userAgent: string;
};

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

const OPEN = "status NOT IN ('won','closed')";

function where(f: LeadFilters) {
  const clauses: string[] = [];
  const args: unknown[] = [];
  if (f.q) {
    // lower() + LIKE behaves the same in SQLite and Postgres (Postgres LIKE is case-sensitive)
    const cols = ["name", "email", "company", "country", "summary", "ref"];
    clauses.push(`(${cols.map((c) => `lower(${c}) LIKE ?`).join(" OR ")})`);
    const like = `%${f.q.toLowerCase()}%`;
    cols.forEach(() => args.push(like));
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
    clauses.push(`follow_up_date IS NOT NULL AND follow_up_date <= ? AND ${OPEN}`);
    args.push(todayUtc());
  }
  return { sql: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", args };
}

export function makeRepo(getDb: () => Promise<Db>) {
  return {
    // ---- Inquiries ----

    async createInquiry(i: NewInquiry): Promise<{ id: number; ref: string }> {
      const d = await getDb();
      const rows = await d.query(
        `INSERT INTO inquiries (type, name, email, phone, company, country, summary, data, source_page, user_agent)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
        [i.type, i.name, i.email, i.phone, i.company, i.country, i.summary, JSON.stringify(i.data), i.sourcePage, i.userAgent]
      );
      const id = Number(rows[0].id);
      const ref = `MG-${new Date().getUTCFullYear().toString().slice(2)}${String(id).padStart(5, "0")}`;
      await d.query("UPDATE inquiries SET ref = ? WHERE id = ?", [ref, id]);
      return { id, ref };
    },

    async setEmailStatus(id: number, status: string) {
      await (await getDb()).query("UPDATE inquiries SET email_status = ? WHERE id = ?", [status, id]);
    },

    async listLeads(f: LeadFilters, limit = 500): Promise<Lead[]> {
      const w = where(f);
      const rows = await (await getDb()).query(
        `SELECT * FROM inquiries ${w.sql} ORDER BY created_at DESC, id DESC LIMIT ?`,
        [...w.args, limit]
      );
      return rows.map(toLead);
    },

    async getLead(id: number) {
      const d = await getDb();
      const rows = await d.query("SELECT * FROM inquiries WHERE id = ?", [id]);
      if (!rows[0]) return null;
      const notes = await d.query(
        "SELECT id, body, created_at FROM inquiry_notes WHERE inquiry_id = ? ORDER BY created_at DESC, id DESC",
        [id]
      );
      return {
        lead: toLead(rows[0]),
        notes: notes.map((n) => ({ id: Number(n.id), body: String(n.body), createdAt: String(n.created_at) })),
      };
    },

    async updateLead(id: number, status: string, followUpDate: string | null) {
      if (!STATUSES.includes(status as Status)) throw new Error("Invalid status");
      if (followUpDate && !/^\d{4}-\d{2}-\d{2}$/.test(followUpDate)) throw new Error("Invalid date");
      await (await getDb()).query("UPDATE inquiries SET status = ?, follow_up_date = ?, updated_at = ? WHERE id = ?", [
        status,
        followUpDate || null,
        nowUtc(),
        id,
      ]);
    },

    async addNote(id: number, body: string) {
      await (await getDb()).batch([
        { sql: "INSERT INTO inquiry_notes (inquiry_id, body) VALUES (?, ?)", args: [id, body.slice(0, 5000)] },
        { sql: "UPDATE inquiries SET updated_at = ? WHERE id = ?", args: [nowUtc(), id] },
      ]);
    },

    async deleteNote(noteId: number) {
      await (await getDb()).query("DELETE FROM inquiry_notes WHERE id = ?", [noteId]);
    },

    async deleteLead(id: number) {
      await (await getDb()).batch([
        { sql: "DELETE FROM inquiry_notes WHERE inquiry_id = ?", args: [id] },
        { sql: "DELETE FROM inquiries WHERE id = ?", args: [id] },
      ]);
    },

    async leadStats() {
      const d = await getDb();
      const [totals, byType, byStatus, due, daily] = await Promise.all([
        d.query(
          `SELECT
             COUNT(*) AS total,
             SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS fresh,
             SUM(CASE WHEN created_at >= ? THEN 1 ELSE 0 END) AS last30,
             SUM(CASE WHEN created_at >= ? THEN 1 ELSE 0 END) AS last7,
             SUM(CASE WHEN status IN ('meeting','won') THEN 1 ELSE 0 END) AS meetings
           FROM inquiries`,
          [nowUtc(-30), nowUtc(-7)]
        ),
        d.query("SELECT type, COUNT(*) AS n FROM inquiries GROUP BY type"),
        d.query("SELECT status, COUNT(*) AS n FROM inquiries GROUP BY status"),
        d.query(
          `SELECT * FROM inquiries WHERE follow_up_date IS NOT NULL AND follow_up_date <= ? AND ${OPEN}
           ORDER BY follow_up_date ASC LIMIT 10`,
          [todayUtc(7)]
        ),
        d.query(
          `SELECT substr(created_at, 1, 10) AS d, COUNT(*) AS n FROM inquiries
           WHERE created_at >= ? GROUP BY substr(created_at, 1, 10)`,
          [todayUtc(-29)]
        ),
      ]);
      const t = totals[0] ?? {};
      return {
        total: Number(t.total ?? 0),
        fresh: Number(t.fresh ?? 0),
        last30: Number(t.last30 ?? 0),
        last7: Number(t.last7 ?? 0),
        meetings: Number(t.meetings ?? 0),
        byType: Object.fromEntries(byType.map((r) => [String(r.type), Number(r.n)])) as Record<string, number>,
        byStatus: Object.fromEntries(byStatus.map((r) => [String(r.status), Number(r.n)])) as Record<string, number>,
        followUps: due.map(toLead),
        daily: Object.fromEntries(daily.map((r) => [String(r.d), Number(r.n)])) as Record<string, number>,
      };
    },

    // ---- Editable content ----

    async loadContent(): Promise<Record<string, string>> {
      const rows = await (await getDb()).query("SELECT key, value FROM content");
      return Object.fromEntries(rows.map((r) => [String(r.key), String(r.value)]));
    },

    async saveContent(key: string, json: string) {
      await (await getDb()).query(
        `INSERT INTO content (key, value, updated_at) VALUES (?, ?, ?)
         ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
        [key, json, nowUtc()]
      );
    },

    async resetContent(key: string) {
      await (await getDb()).query("DELETE FROM content WHERE key = ?", [key]);
    },

    async contentUpdatedAt(): Promise<Record<string, string>> {
      const rows = await (await getDb()).query("SELECT key, updated_at FROM content");
      return Object.fromEntries(rows.map((r) => [String(r.key), String(r.updated_at)]));
    },
  };
}
