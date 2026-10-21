"use client";

export function ConfirmButton({ message, children }: { message: string; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
      className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-red-600"
    >
      {children}
    </button>
  );
}
