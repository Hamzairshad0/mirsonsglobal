import "server-only";
import { dailyDigest } from "./leads";
import { sendDigestEmail } from "./email";

export async function sendDailyDigest(): Promise<{ status: "sent" | "failed" | "skipped"; message: string; due: number; fresh: number }> {
  const { due, fresh } = await dailyDigest();
  if (due.length === 0 && fresh.length === 0) {
    return { status: "skipped", message: "Nothing due today and no new inquiries — no email sent.", due: 0, fresh: 0 };
  }
  const status = await sendDigestEmail(due, fresh);
  const message =
    status === "sent"
      ? `Reminder email sent (${due.length} follow-ups due, ${fresh.length} new inquiries).`
      : status === "skipped"
        ? "Email is not configured yet (SMTP settings missing in Vercel)."
        : "Sending failed — check the SMTP settings.";
  return { status, message, due: due.length, fresh: fresh.length };
}
