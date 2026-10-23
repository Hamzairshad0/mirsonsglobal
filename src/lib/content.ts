import "server-only";
import { unstable_cache } from "next/cache";
import { repo } from "./leads";
import { defaults, sections, type ContentKey, type ContentMap } from "./content-schema";

export const CONTENT_TAG = "content";

const loadAll = unstable_cache(
  async (): Promise<Partial<Record<ContentKey, string>>> => {
    try {
      return await repo.loadContent();
    } catch (err) {
      console.error("[content] falling back to defaults:", err);
      return {};
    }
  },
  ["site-content"],
  { tags: [CONTENT_TAG], revalidate: 3600 }
);

export async function getContent<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  const all = await loadAll();
  const raw = all[key];
  if (!raw) return defaults[key];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(defaults[key])) return (Array.isArray(parsed) ? parsed : defaults[key]) as ContentMap[K];
    return { ...(defaults[key] as object), ...parsed } as ContentMap[K];
  } catch {
    return defaults[key];
  }
}

export async function getSiteContent() {
  const [settings, seo] = await Promise.all([getContent("settings"), getContent("seo")]);
  return { settings, seo };
}

export async function getActiveIndustries() {
  return (await getContent("industries")).filter((i) => i.active);
}

// Coerce editor input to the shape defined in content-schema so bad input can't break pages.
export function sanitizeContent(key: ContentKey, input: unknown): unknown {
  const spec = sections.find((s) => s.key === key);
  if (!spec) throw new Error("Unknown content section");
  const clean = (obj: unknown) => {
    const src = (obj ?? {}) as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const f of spec.fields) {
      const v = src[f.name];
      out[f.name] = f.type === "boolean" ? Boolean(v) : String(v ?? "").slice(0, 5000);
    }
    if ("slug" in out) {
      const base = String(out.slug || out.title || out.name || "");
      out.slug = base.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
    }
    return out;
  };
  if (spec.kind === "list") {
    if (!Array.isArray(input)) throw new Error("Expected a list");
    return input.slice(0, 100).map(clean);
  }
  return clean(input);
}

export async function saveContent(key: ContentKey, value: unknown) {
  await repo.saveContent(key, JSON.stringify(sanitizeContent(key, value)));
}

export async function resetContent(key: ContentKey) {
  await repo.resetContent(key);
}

export async function getContentUpdatedAt(): Promise<Record<string, string>> {
  return repo.contentUpdatedAt();
}
