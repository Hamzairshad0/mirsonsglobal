"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-outline !py-2.5">
      <Printer className="h-4 w-4" aria-hidden /> Print / save as PDF
    </button>
  );
}
