import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MessageCircle, Trash2 } from "lucide-react";
import { getLead } from "@/lib/leads";
import { FIELD_LABELS, STATUSES, STATUS_LABELS, TYPE_LABELS } from "@/lib/inquiry";
import { whatsappLink } from "@/lib/site";
import { formatDate, StatusBadge, TypeBadge } from "@/components/admin/AdminUi";
import { addNoteAction, deleteLeadAction, deleteNoteAction, updateLeadAction } from "../../../actions";
import { ConfirmButton } from "./ConfirmButton";

export const metadata = { title: "Lead" };

const EMAIL_STATUS: Record<string, string> = {
  sent: "Notification & acknowledgement emails sent",
  failed: "Email sending failed — follow up manually",
  skipped: "Email not configured — no emails sent",
};

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getLead(Number(id));
  if (!result) notFound();
  const { lead, notes } = result;

  const fields = Object.entries(lead.data).filter(
    ([k, v]) => k !== "consent" && v !== "" && v != null && !(Array.isArray(v) && v.length === 0)
  );

  return (
    <>
      <Link href="/admin/leads" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-navy-900">
        <ArrowLeft className="h-4 w-4" aria-hidden /> All leads
      </Link>

      <div className="mt-4 mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={lead.type} />
            <StatusBadge status={lead.status} />
            <span className="text-xs text-muted">{lead.ref}</span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-navy-900">{lead.company || lead.name}</h1>
          <p className="mt-1 text-sm text-muted">
            {TYPE_LABELS[lead.type]} · received {formatDate(lead.createdAt, true)}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${lead.email}?subject=${encodeURIComponent(`Your inquiry ${lead.ref}`)}`} className="btn-navy !py-2.5">
            <Mail className="h-4 w-4" aria-hidden /> Email
          </a>
          {lead.phone && (
            <a href={whatsappLink(lead.phone)} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2.5">
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="card p-6 sm:p-8">
          <h2 className="font-sans text-sm font-semibold text-navy-900">Submitted details</h2>
          <dl className="mt-5 divide-y divide-line">
            {fields.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-[200px_1fr] sm:gap-4">
                <dt className="text-sm text-muted">{FIELD_LABELS[k] ?? k}</dt>
                <dd className="text-sm break-words whitespace-pre-wrap text-navy-900">
                  {k === "email" ? (
                    <a className="underline" href={`mailto:${v}`}>
                      {String(v)}
                    </a>
                  ) : Array.isArray(v) ? (
                    v.join(", ")
                  ) : (
                    String(v)
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-muted">
            {lead.emailStatus ? EMAIL_STATUS[lead.emailStatus] ?? lead.emailStatus : "Email status unknown"}
            {lead.sourcePage && ` · submitted from ${lead.sourcePage}`}
          </p>
        </section>

        <div className="space-y-6">
          <section className="card p-6">
            <h2 className="font-sans text-sm font-semibold text-navy-900">Pipeline</h2>
            {/* key remounts the form after a save so the fields show the stored values */}
            <form key={`${lead.status}-${lead.followUpDate}`} action={updateLeadAction} className="mt-4 space-y-4">
              <input type="hidden" name="id" value={lead.id} />
              <div>
                <label htmlFor="status" className="field-label">
                  Status
                </label>
                <select id="status" name="status" defaultValue={lead.status} className="field-input">
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="followUpDate" className="field-label">
                  Follow-up date
                </label>
                <input id="followUpDate" type="date" name="followUpDate" defaultValue={lead.followUpDate ?? ""} className="field-input" />
              </div>
              <button className="btn-gold w-full !py-2.5">Save</button>
            </form>
            <p className="mt-3 text-xs text-muted">Last updated {formatDate(lead.updatedAt, true)}</p>
          </section>

          <section className="card p-6">
            <h2 className="font-sans text-sm font-semibold text-navy-900">Notes</h2>
            <form action={addNoteAction} className="mt-4 space-y-3">
              <input type="hidden" name="id" value={lead.id} />
              <label htmlFor="note" className="sr-only">
                New note
              </label>
              <textarea
                id="note"
                name="body"
                rows={3}
                required
                placeholder="Call summary, qualification notes, next steps…"
                className="field-input"
              />
              <button className="btn-navy !py-2">Add note</button>
            </form>
            <ul className="mt-6 space-y-4">
              {notes.length === 0 && <li className="text-sm text-muted">No notes yet.</li>}
              {notes.map((n) => (
                <li key={n.id} className="rounded-md bg-ivory p-4">
                  <p className="text-sm whitespace-pre-wrap text-navy-900">{n.body}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted">{formatDate(n.createdAt, true)}</span>
                    <form action={deleteNoteAction}>
                      <input type="hidden" name="id" value={lead.id} />
                      <input type="hidden" name="noteId" value={n.id} />
                      <button className="text-xs text-muted hover:text-red-600">Delete</button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <form action={deleteLeadAction} className="text-right">
            <input type="hidden" name="id" value={lead.id} />
            <ConfirmButton message="Permanently delete this lead and its notes?">
              <Trash2 className="h-3.5 w-3.5" aria-hidden /> Delete lead
            </ConfirmButton>
          </form>
        </div>
      </div>
    </>
  );
}
