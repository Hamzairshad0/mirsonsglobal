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
