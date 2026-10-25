"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { CalendarClock, GripVertical } from "lucide-react";
import { STATUSES, STATUS_LABELS, type Status } from "@/lib/inquiry";
import { moveLeadAction } from "@/app/admin/actions";

export type BoardCard = {
  id: number;
  ref: string;
  type: "manufacturer" | "buyer" | "consultation";
  status: Status;
  title: string;
  subtitle: string;
  product: string;
  followUpDate: string | null;
};

const COLUMN_ACCENT: Record<Status, string> = {
  new: "border-t-blue-500",
  contacted: "border-t-amber-500",
  qualified: "border-t-violet-500",
  meeting: "border-t-emerald-500",
  won: "border-t-emerald-700",
  closed: "border-t-slate-400",
};

const TYPE_STYLE = {
  manufacturer: "bg-navy-900 text-gold-300",
  buyer: "bg-gold-500/20 text-gold-700",
  consultation: "bg-slate-100 text-slate-700",
};

export function PipelineBoard({ initial, today }: { initial: BoardCard[]; today: string }) {
  const [cards, setCards] = useState(initial);
  const [dragId, setDragId] = useState<number | null>(null);
  const [over, setOver] = useState<Status | null>(null);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  function move(id: number, status: Status) {
    const before = cards;
    const card = cards.find((c) => c.id === id);
    if (!card || card.status === status) return;
    setError("");
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, status } : c))); // optimistic
    startTransition(async () => {
      const res = await moveLeadAction(id, status);
      if (!res.ok) {
        setCards(before);
        setError(res.error ?? "Could not move the lead.");
      }
    });
  }

  return (
    <>
      {error && (
        <p role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <div className="-mx-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="grid min-w-[1200px] grid-cols-6 gap-4">
          {STATUSES.map((status) => {
            const column = cards.filter((c) => c.status === status);
            return (
              <section
                key={status}
                aria-label={STATUS_LABELS[status]}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOver(status);
                }}
                onDragLeave={() => setOver((o) => (o === status ? null : o))}
                onDrop={(e) => {
                  e.preventDefault();
                  setOver(null);
                  if (dragId !== null) move(dragId, status);
                  setDragId(null);
                }}
                className={`flex min-h-[60vh] flex-col rounded-xl border-t-4 bg-white/60 ring-1 ring-line transition-colors ${COLUMN_ACCENT[status]} ${
                  over === status ? "bg-gold-500/10 ring-gold-500" : ""
                }`}
              >
                <header className="flex items-center justify-between px-4 py-3">
                  <h2 className="font-sans text-sm font-semibold text-navy-900">{STATUS_LABELS[status]}</h2>
                  <span className="rounded-full bg-ivory px-2 py-0.5 text-xs font-semibold text-muted ring-1 ring-line">{column.length}</span>
                </header>
                <ul className="flex-1 space-y-3 px-3 pb-3">
                  {column.map((c) => {
                    const overdue = c.followUpDate && c.followUpDate < today && !["won", "closed"].includes(c.status);
                    return (
                      <li
                        key={c.id}
                        draggable
                        onDragStart={() => setDragId(c.id)}
                        onDragEnd={() => setDragId(null)}
                        className={`group cursor-grab rounded-lg border border-line bg-white p-3 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing ${
                          dragId === c.id ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 group-hover:text-slate-400" aria-hidden />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${TYPE_STYLE[c.type]}`}>{c.type}</span>
                              <span className="text-[11px] text-muted">{c.ref}</span>
                            </div>
                            <Link href={`/admin/leads/${c.id}`} className="mt-1.5 block truncate text-sm font-semibold text-navy-900 hover:underline">
                              {c.title}
                            </Link>
                            <p className="truncate text-xs text-muted">{c.subtitle}</p>
                            {c.product && <p className="mt-1.5 truncate text-xs text-ink/80">{c.product}</p>}
                            {c.followUpDate && (
                              <p className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${overdue ? "text-red-600" : "text-navy-900"}`}>
                                <CalendarClock className="h-3.5 w-3.5" aria-hidden /> {c.followUpDate}
                              </p>
                            )}
                            <label className="mt-2 block">
                              <span className="sr-only">Move {c.title} to</span>
                              <select
                                value={c.status}
                                onChange={(e) => move(c.id, e.target.value as Status)}
                                className="w-full rounded border border-line bg-ivory px-2 py-1 text-xs text-navy-900"
                              >
                                {STATUSES.map((s) => (
                                  <option key={s} value={s}>
                                    {STATUS_LABELS[s]}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  {column.length === 0 && <li className="px-1 py-6 text-center text-xs text-muted">Drop leads here</li>}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
