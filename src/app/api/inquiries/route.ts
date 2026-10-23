import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { repo } from "@/lib/leads";
import { rateLimit } from "@/lib/rate-limit";
import { sendInquiryEmails } from "@/lib/email";
import { getContent } from "@/lib/content";
import { INQUIRY_TYPES, schemas, summarize, type InquiryType } from "@/lib/inquiry";

const MIN_FILL_MS = 3000;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const type = body.type as InquiryType;
  if (!INQUIRY_TYPES.includes(type)) return NextResponse.json({ error: "Invalid form" }, { status: 400 });

  // Spam controls: hidden honeypot field + minimum time on page + per-IP rate limit.
  const elapsed = Date.now() - Number(body.startedAt || 0);
  if (body.fax || !(elapsed > MIN_FILL_MS)) {
    return NextResponse.json({ ok: true, ref: "MG-RECEIVED" });
  }
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(`inq:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a few minutes or contact us by email." },
      { status: 429 }
    );
  }

  const parsed = schemas[type].safeParse(body.fields);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }

  const data = parsed.data as Record<string, unknown>;
  try {
    const { id, ref } = await repo.createInquiry({
      type,
      name: String(data.name),
      email: String(data.email),
      phone: String(data.phone ?? ""),
      company: String(data.company ?? ""),
      country: String(data.country ?? ""),
      summary: summarize(type, data).slice(0, 300),
      data,
      sourcePage: String(body.page ?? "").slice(0, 200),
      userAgent: (h.get("user-agent") ?? "").slice(0, 300),
    });

    // The record is already saved, so an email failure never loses the inquiry.
    const settings = await getContent("settings");
    const emailStatus = await sendInquiryEmails({
      id,
      ref,
      type,
      data,
      companyName: settings.companyName,
      replyEmail: settings.email,
    });
    await repo.setEmailStatus(id, emailStatus);

    return NextResponse.json({ ok: true, ref });
  } catch (err) {
    console.error("[inquiries] save failed:", err);
    return NextResponse.json(
      { error: "We could not save your request right now. Please email or WhatsApp us directly." },
      { status: 500 }
    );
  }
}
