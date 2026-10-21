"use client";

import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Check, ChevronDown, Plus, Trash2 } from "lucide-react";
import { ICONS, type FieldSpec, type SectionSpec } from "@/lib/content-schema";
import { saveContentAction } from "@/app/admin/actions";

type Item = Record<string, string | boolean>;

function blank(fields: FieldSpec[]): Item {
  return Object.fromEntries(fields.map((f) => [f.name, f.type === "boolean" ? true : f.type === "icon" ? "globe" : ""]));
}

function FieldInput({ field, value, onChange, id }: { field: FieldSpec; value: string | boolean; onChange: (v: string | boolean) => void; id: string }) {
  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm font-medium text-navy-900">
        <input id={id} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-navy-900" />
        {field.label}
      </label>
    );
  }
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {field.label}
      </label>
      {field.type === "icon" ? (
        <select id={id} value={String(value)} onChange={(e) => onChange(e.target.value)} className="field-input">
          {ICONS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      ) : field.type === "text" ? (
        <input id={id} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className="field-input" />
      ) : (
        <textarea
          id={id}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          rows={field.type === "lines" ? 5 : 3}
          className="field-input"
        />
      )}
      {field.help && <p className="mt-1 text-xs text-muted">{field.help}</p>}
    </div>
  );
}

export function ContentEditor({ spec, initial }: { spec: SectionSpec; initial: Item | Item[] }) {
  const [value, setValue] = useState<Item | Item[]>(initial);
  const [open, setOpen] = useState<number | null>(null);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function save() {
    setStatus(null);
    startTransition(async () => {
      const res = await saveContentAction(spec.key, value);
      setStatus(res.ok ? { ok: true, msg: "Saved — the website has been updated." } : { ok: false, msg: res.error ?? "Could not save" });
    });
  }

  const saveBar = (
    <div className="sticky bottom-0 z-10 -mx-5 mt-8 flex flex-wrap items-center gap-4 border-t border-line bg-ivory/95 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
      <button type="button" onClick={save} disabled={pending} className="btn-gold !py-2.5">
        {pending ? "Saving…" : "Save changes"}
      </button>
      {status && (
        <span role="status" className={`inline-flex items-center gap-1.5 text-sm ${status.ok ? "text-emerald-700" : "text-red-600"}`}>
          {status.ok && <Check className="h-4 w-4" aria-hidden />} {status.msg}
        </span>
      )}
    </div>
  );

  if (!Array.isArray(value)) {
    return (
      <>
        <div className="card grid gap-5 p-6 sm:p-8 lg:grid-cols-2">
          {spec.fields.map((f) => (
            <div key={f.name} className={f.type === "textarea" || f.type === "lines" ? "lg:col-span-2" : ""}>
              <FieldInput
                id={`c-${f.name}`}
                field={f}
                value={value[f.name] ?? ""}
                onChange={(v) => setValue({ ...value, [f.name]: v })}
              />
            </div>
          ))}
        </div>
        {saveBar}
      </>
    );
  }

  const items = value;
  const update = (i: number, patch: Item) => setValue(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setValue(next);
    setOpen(j);
  };
  const titleOf = (it: Item) => String(it[spec.titleField ?? spec.fields[0].name] || `Untitled ${spec.itemLabel}`);

  return (
    <>
      <ul className="space-y-3">
        {items.map((it, i) => (
          <li key={i} className="card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
                aria-expanded={open === i}
              >
                <ChevronDown className={`h-4 w-4 shrink-0 text-muted transition-transform ${open === i ? "rotate-180" : ""}`} aria-hidden />
                <span className="truncate font-medium text-navy-900">{titleOf(it)}</span>
                {it.active === false && <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">Hidden</span>}
              </button>
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded p-1.5 text-muted hover:bg-ivory disabled:opacity-30" aria-label="Move up">
                <ArrowUp className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="rounded p-1.5 text-muted hover:bg-ivory disabled:opacity-30" aria-label="Move down">
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Remove “${titleOf(it)}”?`)) {
                    setValue(items.filter((_, idx) => idx !== i));
                    setOpen(null);
                  }
                }}
                className="rounded p-1.5 text-muted hover:bg-red-50 hover:text-red-600"
                aria-label="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {open === i && (
              <div className="grid gap-5 border-t border-line p-5 lg:grid-cols-2">
                {spec.fields.map((f) => (
                  <div key={f.name} className={f.type === "textarea" || f.type === "lines" ? "lg:col-span-2" : ""}>
                    <FieldInput id={`c-${i}-${f.name}`} field={f} value={it[f.name] ?? ""} onChange={(v) => update(i, { [f.name]: v })} />
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          setValue([...items, blank(spec.fields)]);
          setOpen(items.length);
        }}
        className="btn-outline mt-4 !py-2.5"
      >
        <Plus className="h-4 w-4" aria-hidden /> Add {spec.itemLabel}
      </button>
      {saveBar}
    </>
  );
}
