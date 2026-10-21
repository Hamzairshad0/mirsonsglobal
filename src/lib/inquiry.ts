import { z } from "zod";

// Shared by the forms (options) and the API (validation).

export const INQUIRY_TYPES = ["manufacturer", "buyer", "consultation"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const TYPE_LABELS: Record<InquiryType, string> = {
  manufacturer: "Manufacturer / Supplier",
  buyer: "Buyer sourcing request",
  consultation: "Consultation request",
};

export const STATUSES = ["new", "contacted", "qualified", "meeting", "won", "closed"] as const;
export type Status = (typeof STATUSES)[number];
export const STATUS_LABELS: Record<Status, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  meeting: "Meeting arranged",
  won: "Deal / client won",
  closed: "Closed – not a fit",
};

export const BUYER_TYPE_OPTIONS = [
  "Importers",
  "Distributors",
  "Wholesalers",
  "Dealers",
  "EPC contractors",
  "Commercial / industrial buyers",
  "OEM / private label",
];

export const EXPORT_EXPERIENCE = ["Not exporting yet", "Exporting to a few markets", "Established exporter"];
export const BUYER_COMPANY_TYPES = [
  "Importer",
  "Distributor",
  "Wholesaler",
  "Dealer / reseller",
  "EPC contractor",
  "Manufacturer / industrial user",
  "Retail chain",
  "Other",
];
export const ORDER_FREQUENCY = ["One-time order", "Monthly", "Quarterly", "Annual contract", "Not sure yet"];
export const INCOTERMS = ["FOB", "CIF", "CFR", "EXW", "DAP", "DDP", "Not sure"];
export const TIMELINES = ["Immediately", "Within 1 month", "1–3 months", "3+ months", "Just exploring"];
export const CONTACT_METHODS = ["Email", "Phone call", "WhatsApp", "Video call"];
export const CONSULT_ROLES = ["Manufacturer / supplier", "Buyer / importer / distributor", "Other"];

const str = (max: number) => z.string().trim().max(max);
const req = (label: string, max = 200) => str(max).min(1, `${label} is required`);
const email = z.string().trim().toLowerCase().email("Enter a valid email address").max(200);
const phone = str(40).regex(/^[+()\d\s-]*$/, "Use digits, spaces and + only").optional().default("");
const consent = z.literal(true, { errorMap: () => ({ message: "Please accept the privacy policy" }) });

const contact = {
  name: req("Your name", 120),
  email,
  phone,
  company: req("Company name", 160),
  country: req("Country", 80),
  consent,
};

export const manufacturerSchema = z.object({
  ...contact,
  jobTitle: str(120).optional().default(""),
  website: str(200).optional().default(""),
  category: req("Product category", 120),
  products: req("Products", 2000),
  capacity: str(200).optional().default(""),
  exportExperience: str(80).optional().default(""),
  currentMarkets: str(500).optional().default(""),
  targetMarkets: req("Target markets", 500),
  buyerTypes: z.array(str(80)).max(10).optional().default([]),
  certifications: str(500).optional().default(""),
  message: str(3000).optional().default(""),
});

export const buyerSchema = z.object({
  ...contact,
  buyerType: req("Company type", 80),
  category: req("Product category", 120),
  product: req("Product required", 300),
  specifications: req("Specifications", 3000),
  quantity: req("Quantity", 200),
  frequency: str(80).optional().default(""),
  destination: req("Destination", 200),
  incoterm: str(40).optional().default(""),
  timeline: req("Purchasing timeline", 80),
  targetPrice: str(200).optional().default(""),
  message: str(3000).optional().default(""),
});

export const consultationSchema = z.object({
  ...contact,
  company: str(160).optional().default(""),
  role: req("Your role", 80),
  requirements: req("Requirements", 3000),
  contactMethod: str(40).optional().default(""),
  preferredTime: str(200).optional().default(""),
});

export const schemas = {
  manufacturer: manufacturerSchema,
  buyer: buyerSchema,
  consultation: consultationSchema,
} as const;

// Human-readable labels for every stored field (used in emails, dashboard and CSV export).
export const FIELD_LABELS: Record<string, string> = {
  name: "Contact name",
  email: "Email",
  phone: "Phone / WhatsApp",
  company: "Company",
  country: "Country",
  jobTitle: "Job title",
  website: "Website",
  category: "Product category",
  products: "Products",
  capacity: "Production capacity",
  exportExperience: "Export experience",
  currentMarkets: "Current markets",
  targetMarkets: "Target markets",
  buyerTypes: "Preferred buyer types",
  certifications: "Certifications",
  buyerType: "Company type",
  product: "Product required",
  specifications: "Specifications",
  quantity: "Quantity",
  frequency: "Order frequency",
  destination: "Destination",
  incoterm: "Incoterm",
  timeline: "Purchasing timeline",
  targetPrice: "Target price",
  role: "Role",
  requirements: "Requirements",
  contactMethod: "Preferred contact method",
  preferredTime: "Preferred contact time",
  message: "Additional information",
};

export function summarize(type: InquiryType, d: Record<string, unknown>): string {
  if (type === "manufacturer") return `${d.category} — targeting ${d.targetMarkets}`;
  if (type === "buyer") return `${d.product} · ${d.quantity} → ${d.destination}`;
  return String(d.requirements ?? "").slice(0, 140);
}
