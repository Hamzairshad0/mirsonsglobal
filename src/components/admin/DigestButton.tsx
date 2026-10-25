"use client";

import { useState, useTransition } from "react";
import { Mail } from "lucide-react";
import { sendDigestNowAction } from "@/app/admin/actions";

export function DigestButton() {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={() => start(async () => setResult(await sendDigestNowAction()))}
        className="btn-navy !py-2.5"
      >
        <Mail className="h-4 w-4" aria-hidden /> {pending ? "Sending…" : "Send reminder email now"}
      </button>
      {result && (
        <p role="status" className={`mt-3 text-sm ${result.ok ? "text-emerald-700" : "text-red-600"}`}>
          {result.message}
        </p>
      )}
    </div>
  );
}
