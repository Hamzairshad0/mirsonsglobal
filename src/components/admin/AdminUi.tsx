import { STATUS_LABELS, TYPE_LABELS, type InquiryType, type Status } from "@/lib/inquiry";

const STATUS_STYLES: Record<Status, string> = {
  new: "bg-blue-50 text-blue-700 ring-blue-200",
  contacted: "bg-amber-50 text-amber-800 ring-amber-200",
  qualified: "bg-violet-50 text-violet-700 ring-violet-200",
  meeting: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  won: "bg-emerald-600 text-white ring-emerald-600",
  closed: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset ${STATUS_STYLES[status] ?? STATUS_STYLES.new}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

const TYPE_SHORT: Record<InquiryType, string> = {
  manufacturer: "Manufacturer",
  buyer: "Buyer",
  consultation: "Consultation",
};

export function TypeBadge({ type }: { type: InquiryType }) {
  const style =
    type === "manufacturer" ? "bg-navy-900 text-gold-300" : type === "buyer" ? "bg-gold-500/20 text-gold-700" : "bg-slate-100 text-slate-700";
  return (
    <span title={TYPE_LABELS[type]} className={`inline-flex rounded px-2 py-0.5 text-xs font-medium whitespace-nowrap ${style}`}>
      {TYPE_SHORT[type] ?? type}
    </span>
  );
}

// SQLite stores UTC as "YYYY-MM-DD HH:MM:SS".
export function formatDate(value: string, withTime = false) {
  const d = new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

export function PageTitle({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-navy-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
