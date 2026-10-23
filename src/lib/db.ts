import "server-only";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { createClient } from "@libsql/client";
import { neon } from "@neondatabase/serverless";
import { postgresDb, schema, sqliteDb, type Db } from "./sql";

let instance: Db | null = null;
let ready: Promise<void> | null = null;

// Vercel integrations may add a custom prefix (e.g. STORAGE_TURSO_DATABASE_URL), so accept any prefix.
function envEndingWith(suffix: string) {
  const key = Object.keys(process.env).find((k) => k === suffix || k.endsWith(`_${suffix}`));
  return key ? process.env[key] : undefined;
}

/**
 * Picks the database from the environment:
 * - Postgres (Neon via Vercel Storage): DATABASE_URL / POSTGRES_URL starting with postgres://
 * - Turso: DATABASE_URL libsql://… or TURSO_DATABASE_URL (+ token)
 * - Local development: SQLite file data/mirsons.db
 */
function connect(): Db {
  const url =
    process.env.DATABASE_URL ||
    envEndingWith("POSTGRES_URL") ||
    envEndingWith("TURSO_DATABASE_URL") ||
    "file:data/mirsons.db";

  if (/^postgres(ql)?:\/\//.test(url)) return postgresDb(neon(url));

  if (url.startsWith("file:")) mkdirSync(dirname(url.slice(5)), { recursive: true });
  const authToken = process.env.DATABASE_AUTH_TOKEN || envEndingWith("TURSO_AUTH_TOKEN") || undefined;
  return sqliteDb(createClient({ url, authToken }) as never);
}

export async function db(): Promise<Db> {
  if (!instance) instance = connect();
  if (!ready) {
    const d = instance;
    ready = d.batch(schema(d.dialect).map((sql) => ({ sql })));
    ready.catch(() => (ready = null));
  }
  await ready;
  return instance;
}
