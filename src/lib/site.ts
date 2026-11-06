export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export type NavItem = { href: string; label: string; children?: { href: string; label: string; note?: string }[] };

export const NAV: NavItem[] = [
  { href: "/about", label: "About" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services", label: "Our Services", note: "Lead generation, sourcing and matchmaking" },
      { href: "/pilot", label: "Pilot Programme", note: "Paid, time-limited market test" },
      { href: "/sample-report", label: "Sample Report", note: "See a buyer-research deliverable" },
      { href: "/how-it-works", label: "How It Works", note: "Our step-by-step process" },
      { href: "/buyers", label: "Supplier Sourcing (for buyers)", note: "For importers and industrial buyers" },
    ],
  },
  { href: "/manufacturers", label: "For Manufacturers" },
  {
    href: "/industries",
    label: "Industries & Products",
    children: [
      { href: "/industries", label: "Overview", note: "Our priority industries" },
      { href: "/industries/stainless-steel", label: "Stainless Steel", note: "Coils, sheets, plates, pipes & tubes" },
      { href: "/industries/copper", label: "Copper", note: "Busbars, wire rods, cathodes, tubes & pipes" },
      { href: "/industries/industrial-raw-materials", label: "Industrial Raw Materials", note: "Selected materials, case by case" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export function whatsappLink(number: string, message?: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
