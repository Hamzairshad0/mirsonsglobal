// Small database abstraction so the same queries run on SQLite/libSQL (local file or Turso)
// and on Postgres (Neon). Queries use "?" placeholders and only SQL both engines understand;
// dates are stored as UTC text "YYYY-MM-DD HH:MM:SS" and computed in JavaScript.

export type Row = Record<string, unknown>;
export type Statement = { sql: string; args?: unknown[] };
export type Dialect = "sqlite" | "postgres";

export interface Db {
  dialect: Dialect;
  query(sql: string, args?: unknown[]): Promise<Row[]>;
  /** Runs all statements in one transaction. */
  batch(statements: Statement[]): Promise<void>;
}

/** UTC timestamp in the stored format, optionally shifted by whole days. */
export function nowUtc(offsetDays = 0): string {
  return new Date(Date.now() + offsetDays * 86_400_000).toISOString().slice(0, 19).replace("T", " ");
}

/** UTC date "YYYY-MM-DD", optionally shifted by whole days. */
export function todayUtc(offsetDays = 0): string {
  return nowUtc(offsetDays).slice(0, 10);
}

/** Converts "?" placeholders to Postgres "$1, $2, …". */
export function toPositional(sql: string): string {
  let i = 0;
  return sql.replace(/\?/g, () => `$${++i}`);
}

export function schema(dialect: Dialect): string[] {
  const id = dialect === "postgres" ? "SERIAL PRIMARY KEY" : "INTEGER PRIMARY KEY AUTOINCREMENT";
  const ts =
    dialect === "postgres"
      ? "TEXT NOT NULL DEFAULT to_char(timezone('utc', now()), 'YYYY-MM-DD HH24:MI:SS')"
      : "TEXT NOT NULL DEFAULT (datetime('now'))";
  return [
    `CREATE TABLE IF NOT EXISTS inquiries (
      id ${id},
      ref TEXT UNIQUE,
      type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      country TEXT,
      summary TEXT,
      data TEXT NOT NULL,
      follow_up_date TEXT,
      email_status TEXT,
      source_page TEXT,
      user_agent TEXT,
      created_at ${ts},
      updated_at ${ts}
    )`,
    `CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at)`,
    `CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status)`,
    `CREATE TABLE IF NOT EXISTS inquiry_notes (
      id ${id},
      inquiry_id INTEGER NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
      body TEXT NOT NULL,
      created_at ${ts}
    )`,
    `CREATE TABLE IF NOT EXISTS content (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at ${ts}
    )`,
  ];
}

type LibsqlLike = {
  execute(stmt: { sql: string; args: never[] }): Promise<{ rows: unknown[] }>;
  batch(stmts: { sql: string; args: never[] }[], mode: "write"): Promise<unknown>;
};

export function sqliteDb(client: LibsqlLike): Db {
  return {
    dialect: "sqlite",
    async query(sql, args = []) {
      const rs = await client.execute({ sql, args: args as never[] });
      return rs.rows as Row[];
    },
    async batch(statements) {
      await client.batch(
        statements.map((s) => ({ sql: s.sql, args: (s.args ?? []) as never[] })),
        "write"
      );
    },
  };
}

type PgLike = {
  query(sql: string, params?: unknown[]): PromiseLike<unknown>;
  transaction(queries: never[]): Promise<unknown>;
};

export function postgresDb(sql: PgLike): Db {
  return {
    dialect: "postgres",
    async query(text, args = []) {
      return (await sql.query(toPositional(text), args)) as Row[];
    },
    async batch(statements) {
      await sql.transaction(statements.map((s) => sql.query(toPositional(s.sql), s.args ?? [])) as never[]);
    },
  };
}
