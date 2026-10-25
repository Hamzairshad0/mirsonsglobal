import "server-only";
import nodemailer from "nodemailer";
import { FIELD_LABELS, TYPE_LABELS, type InquiryType } from "./inquiry";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function transport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function rows(data: Record<string, unknown>) {
  return Object.entries(data)
    .filter(([k, v]) => k !== "consent" && v !== "" && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => {
      const val = Array.isArray(v) ? v.join(", ") : String(v);
      return `<tr><td style="padding:6px 12px 6px 0;color:#5b6676;vertical-align:top;white-space:nowrap">${esc(FIELD_LABELS[k] ?? k)}</td><td style="padding:6px 0;color:#0f1b2a;white-space:pre-wrap">${esc(val)}</td></tr>`;
    })
    .join("");
}

function layout(title: string, body: string) {
  return `<div style="background:#f5f2ec;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e7e1d6">
    <div style="background:#081526;padding:20px 28px;color:#d8b978;font-family:Georgia,serif;font-size:20px;letter-spacing:1px">MIRSONS GLOBAL</div>
    <div style="padding:28px">
      <h1 style="font-family:Georgia,serif;font-size:22px;color:#081526;margin:0 0 16px">${esc(title)}</h1>
      ${body}
    </div>
  </div>
</div>`;
}

export type InquiryEmail = {
  ref: string;
  id: number;
  type: InquiryType;
  data: Record<string, unknown>;
  companyName: string;
  replyEmail: string;
};

/** Sends the team alert and the visitor acknowledgement. Returns "sent", "failed" or "skipped". */
export async function sendInquiryEmails(i: InquiryEmail): Promise<"sent" | "failed" | "skipped"> {
  const t = transport();
  if (!t) {
    console.warn(`[email] SMTP not configured — inquiry ${i.ref} saved without email notification`);
    return "skipped";
  }
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER!;
  const team = process.env.NOTIFY_EMAIL || process.env.SMTP_USER!;
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  const name = String(i.data.name ?? "");
  const company = String(i.data.company ?? "");

  try {
    await t.sendMail({
      from,
      to: team,
      replyTo: String(i.data.email),
      subject: `New ${TYPE_LABELS[i.type].toLowerCase()} — ${company || name} [${i.ref}]`,
      html: layout(
        `New inquiry ${i.ref}`,
        `<p style="color:#5b6676;margin:0 0 16px">${esc(TYPE_LABELS[i.type])}</p>
         <table style="border-collapse:collapse;font-size:14px">${rows(i.data)}</table>
         ${site ? `<p style="margin:24px 0 0"><a href="${site}/admin/leads/${i.id}" style="background:#c9a45c;color:#081526;padding:10px 18px;border-radius:4px;text-decoration:none;font-weight:bold">Open in lead dashboard</a></p>` : ""}`
      ),
    });
    await t.sendMail({
      from,
      to: String(i.data.email),
      replyTo: i.replyEmail,
      subject: `We received your request — ${i.companyName} [${i.ref}]`,
      html: layout(
        `Thank you, ${name}`,
        `<p style="color:#334155;line-height:1.6">We have received your ${esc(TYPE_LABELS[i.type].toLowerCase())}. Your reference number is <strong>${esc(i.ref)}</strong>.</p>
         <p style="color:#334155;line-height:1.6">A member of our business development team will review the details and contact you within one to two business days. If anything changes in the meantime, simply reply to this email.</p>
         <p style="color:#334155;line-height:1.6;margin-top:24px">Kind regards,<br/>${esc(i.companyName)}</p>`
      ),
    });
    return "sent";
  } catch (err) {
    console.error(`[email] failed for ${i.ref}:`, err);
    return "failed";
  }
}

type DigestLead = { id: number; ref: string; type: string; company: string; name: string; country: string; summary: string; followUpDate: string | null; status: string };

/** Morning summary for the team: follow-ups due today/overdue and leads from the last 24 hours. */
export async function sendDigestEmail(due: DigestLead[], fresh: DigestLead[]): Promise<"sent" | "failed" | "skipped"> {
  const t = transport();
  if (!t) return "skipped";
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER!;
  const team = process.env.NOTIFY_EMAIL || process.env.SMTP_USER!;
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  const today = new Date().toISOString().slice(0, 10);

  const list = (items: DigestLead[], showDate: boolean) =>
    items.length === 0
      ? `<p style="color:#5b6676;margin:0 0 8px">None.</p>`
      : `<table style="border-collapse:collapse;width:100%;font-size:14px">${items
          .map(
            (l) => `<tr>
              <td style="padding:8px 0;border-bottom:1px solid #eee;vertical-align:top">
                <a href="${site}/admin/leads/${l.id}" style="color:#081526;font-weight:bold;text-decoration:none">${esc(l.company || l.name)}</a>
                <span style="color:#5b6676"> · ${esc(l.country)} · ${esc(l.ref)}</span><br/>
                <span style="color:#334155">${esc(l.summary)}</span>
              </td>
              ${
                showDate
                  ? `<td style="padding:8px 0 8px 12px;border-bottom:1px solid #eee;white-space:nowrap;vertical-align:top;color:${
                      (l.followUpDate ?? "") < today ? "#dc2626" : "#081526"
                    };font-weight:bold">${esc(l.followUpDate ?? "")}</td>`
                  : ""
              }
            </tr>`
          )
          .join("")}</table>`;

  try {
    await t.sendMail({
      from,
      to: team,
      subject: `Mirsons daily follow-ups — ${due.length} due, ${fresh.length} new`,
      html: layout(
        "Your follow-ups for today",
        `<h2 style="font-size:15px;color:#8a6b30;margin:0 0 8px">Follow-ups due or overdue (${due.length})</h2>
         ${list(due, true)}
         <h2 style="font-size:15px;color:#8a6b30;margin:24px 0 8px">New inquiries in the last 24 hours (${fresh.length})</h2>
         ${list(fresh, false)}
         ${site ? `<p style="margin:24px 0 0"><a href="${site}/admin/pipeline" style="background:#c9a45c;color:#081526;padding:10px 18px;border-radius:4px;text-decoration:none;font-weight:bold">Open pipeline</a></p>` : ""}`
      ),
    });
    return "sent";
  } catch (err) {
    console.error("[email] digest failed:", err);
    return "failed";
  }
}
