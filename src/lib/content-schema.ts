import {
  categoriesDefault,
  industriesPageDefault,
  founderDefault,
  offerDefault,
  pilotDefault,
  productsDefault,
  sampleMetaDefault,
  sampleRowsDefault,
} from "./catalog-defaults";

// Editable website content: types, default values and the field definitions the
// admin content editor uses. Anything here can be changed from /admin/content
// without touching code; the defaults are used until a section is saved.

export type Settings = {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  address: string;
  hours: string;
  linkedin: string;
};

export type Home = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroNote: string;
  ctaTitle: string;
  ctaText: string;
};

export type Service = { slug: string; title: string; summary: string; points: string; icon: string };
export type IndustriesPage = { eyebrow: string; title: string; subtitle: string; intro: string };
export type Category = { slug: string; name: string; summary: string; intro: string; image: string; active: boolean };
export type Product = {
  slug: string;
  category: string;
  name: string;
  summary: string;
  overview: string;
  applications: string;
  buyers: string;
  support: string;
  notice: string;
  image: string;
  active: boolean;
};
export type Offer = { receive: string; need: string };
export type Founder = { name: string; title: string; role: string; quote: string; image: string; show: boolean };
export type Pilot = { intro: string; inclusions: string; whoFor: string; timeline: string; pricing: string };
export type SampleMeta = { title: string; client: string; product: string; markets: string; period: string; disclaimer: string };
export type SampleRow = { company: string; country: string; website: string; fit: string; role: string; status: string; note: string };
export type Market = { name: string; description: string };
export type BuyerType = { title: string; description: string; icon: string };
export type Faq = { question: string; answer: string };
export type Seo = { siteTitle: string; siteDescription: string; keywords: string };

export type ContentMap = {
  settings: Settings;
  home: Home;
  services: Service[];
  industriesPage: IndustriesPage;
  categories: Category[];
  products: Product[];
  offer: Offer;
  founder: Founder;
  pilot: Pilot;
  sampleMeta: SampleMeta;
  sampleRows: SampleRow[];
  markets: Market[];
  buyerTypes: BuyerType[];
  faqs: Faq[];
  seo: Seo;
};
export type ContentKey = keyof ContentMap;

export const defaults: ContentMap = {
  settings: {
    companyName: "Mirsons Global",
    tagline: "Global Sourcing • B2B Partnerships",
    email: "info@mirsonsglobal.com",
    phone: "+92 324 4440040",
    whatsapp: "923244440040",
    whatsappMessage: "Hello Mirsons Global, I would like to discuss a B2B requirement.",
    address: "Operating remotely — serving clients internationally",
    hours: "9:00 am – 6:00 pm (Pakistan Standard Time)",
    linkedin: "",
  },
  home: {
    heroEyebrow: "International buyer acquisition for manufacturers",
    heroTitle: "We Help Manufacturers Find International Buyers",
    heroSubtitle:
      "Mirsons Global researches importers, distributors and industrial buyers in your target markets, reaches the people who make purchasing decisions and arranges qualified meetings with your sales team.",
    heroNote: "Specialising in stainless steel products, copper products and industrial raw materials.",
    ctaTitle: "Ready to Find Your Next Market?",
    ctaText:
      "Tell us what you manufacture, where you currently sell and which markets you want to enter. We will identify potential buyer segments and show you what an outbound campaign could look like.",
  },
  services: [
    {
      slug: "lead-generation",
      title: "B2B Lead Generation",
      icon: "target",
      summary: "Targeted outbound campaigns that create qualified sales conversations with real commercial buyers.",
      points:
        "Ideal customer profiling\nVerified prospect data\nTargeted email campaigns\nLinkedIn prospecting\nStructured follow-up sequences",
    },
    {
      slug: "buyer-identification",
      title: "Buyer Identification",
      icon: "search",
      summary: "We find the importers, distributors, wholesalers and industrial purchasers capable of buying your products.",
      points:
        "Company research by country, size and product fit\nDecision-maker identification\nBuying-potential assessment\nCompetitor and channel mapping",
    },
    {
      slug: "supplier-sourcing",
      title: "Supplier Sourcing",
      icon: "package",
      summary: "For buyers: we locate and shortlist manufacturers that match your specifications, volumes and timelines.",
      points:
        "Requirement and specification brief\nSupplier search and shortlisting\nCapability and background checks\nQuotation collection and comparison",
    },
    {
      slug: "market-research",
      title: "Market Research",
      icon: "chart",
      summary: "Practical market intelligence to decide where to sell next and which buyer segments to prioritise.",
      points:
        "Target-market assessment\nImporter and distributor landscape\nDemand and pricing signals\nEntry-route recommendations",
    },
    {
      slug: "appointment-setting",
      title: "Appointment Setting",
      icon: "calendar",
      summary: "Interested, qualified prospects are booked directly into your calendar for introductory meetings.",
      points:
        "Lead qualification against agreed criteria\nMeeting coordination across time zones\nPre-meeting briefing notes\nCRM updates and reporting",
    },
    {
      slug: "matchmaking",
      title: "Buyer–Supplier Matchmaking",
      icon: "handshake",
      summary: "Curated introductions between manufacturers and buyers with aligned products, volumes and markets.",
      points:
        "Two-sided requirement matching\nConfidential introductions\nFacilitated first meetings\nFollow-up until a clear outcome",
    },
  ],
  industriesPage: industriesPageDefault,
  categories: categoriesDefault,
  products: productsDefault,
  offer: offerDefault,
  founder: founderDefault,
  pilot: pilotDefault,
  sampleMeta: sampleMetaDefault,
  sampleRows: sampleRowsDefault,
  markets: [
    { name: "Middle East & GCC", description: "UAE, Saudi Arabia, Qatar, Oman, Kuwait and Bahrain." },
    { name: "Europe", description: "Western, Central and Eastern European importers and distributors." },
    { name: "Central Asia", description: "Kazakhstan, Uzbekistan and neighbouring growth markets." },
    { name: "Africa", description: "East and West African importers, wholesalers and project buyers." },
    { name: "South & Southeast Asia", description: "Regional manufacturers, traders and industrial buyers." },
    { name: "North America", description: "Selected categories for US and Canadian distributors." },
  ],
  buyerTypes: [
    { title: "Importers", icon: "ship", description: "Companies bringing products into their home market at volume." },
    { title: "Distributors", icon: "network", description: "Regional partners with established sales channels and stock." },
    { title: "Wholesalers", icon: "warehouse", description: "Bulk buyers supplying retailers, workshops and resellers." },
    { title: "Dealers", icon: "store", description: "Authorised resellers representing your brand locally." },
    { title: "EPC Contractors", icon: "hardhat", description: "Engineering and construction firms buying for projects." },
    { title: "Commercial Buyers", icon: "briefcase", description: "Procurement teams at manufacturers and industrial users." },
    { title: "OEM Opportunities", icon: "factory", description: "Brands seeking contract or private-label manufacturing." },
  ],
  faqs: [
    {
      question: "What exactly does Mirsons Global do?",
      answer:
        "We are a B2B lead generation and buyer–supplier matchmaking agency. We research international markets, identify the right companies and decision-makers, run targeted outreach, qualify the responses and arrange introductions or meetings between manufacturers and buyers.",
    },
    {
      question: "Do you buy or hold stock?",
      answer:
        "No. We do not hold inventory or act as a trader. We work as your business development partner — the commercial relationship and contract remain directly between the manufacturer and the buyer.",
    },
    {
      question: "Which industries do you work with?",
      answer:
        "Our initial focus is three industries where we can research buyers and suppliers in depth: stainless steel products (coils, sheets, plates, pipes and tubes), copper products (busbars, wire rods, cathodes, tubes and pipes) and selected industrial raw materials. Other industrial products are assessed individually.",
    },
    {
      question: "How do you qualify a lead?",
      answer:
        "Before a campaign starts we agree on qualification criteria with you — for example company type, country, buying volume, product fit and decision-making authority. Only prospects who meet those criteria and show genuine commercial interest are passed on as qualified opportunities.",
    },
    {
      question: "I am a buyer. Is there a cost to submit a sourcing requirement?",
      answer:
        "Submitting a requirement is free and without obligation. We review it, confirm the details with you and let you know how we can help and whether any service fee applies before work begins.",
    },
    {
      question: "How long before we see the first meetings?",
      answer:
        "Research and campaign set-up usually take two to three weeks. First responses typically arrive within the first month of outreach, although timelines vary by product, market and buyer type.",
    },
    {
      question: "Is my information kept confidential?",
      answer:
        "Yes. Requirements, pricing and company details you share are used only to find suitable matches, and are not published or shared with third parties without your permission.",
    },
  ],
  seo: {
    siteTitle: "Mirsons Global — B2B Lead Generation & International Buyer Matchmaking",
    siteDescription:
      "Mirsons Global helps manufacturers and suppliers find qualified international buyers — importers, distributors, wholesalers and industrial purchasers — through targeted research, outreach and pre-arranged business meetings.",
    keywords:
      "international buyers for manufacturers, stainless steel buyers, copper buyers, industrial raw materials, stainless steel coils, copper busbars, copper cathodes, B2B lead generation, international buyers, find distributors, buyer supplier matchmaking, export sales pipeline",
  },
};

// ---- Field definitions for the admin editor ----

export type FieldType = "text" | "textarea" | "lines" | "boolean" | "icon" | "select";
export type FieldSpec = { name: string; label: string; type: FieldType; help?: string; options?: string[] };
export type SectionSpec = {
  key: ContentKey;
  title: string;
  description: string;
  kind: "object" | "list";
  itemLabel?: string;
  titleField?: string;
  fields: FieldSpec[];
};

export const ICONS = [
  "target", "search", "package", "chart", "calendar", "handshake", "ship", "network", "warehouse",
  "store", "hardhat", "briefcase", "factory", "globe", "shield", "mail",
] as const;

export const sections: SectionSpec[] = [
  {
    key: "settings",
    title: "Contact details & company",
    description: "Business email, phone, WhatsApp number and address shown across the site.",
    kind: "object",
    fields: [
      { name: "companyName", label: "Company name", type: "text" },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "email", label: "Business email", type: "text" },
      { name: "phone", label: "Phone (as displayed)", type: "text" },
      { name: "whatsapp", label: "WhatsApp number", type: "text", help: "International format, digits only — e.g. 923001234567" },
      { name: "whatsappMessage", label: "WhatsApp greeting message", type: "text" },
      { name: "address", label: "Address / location line", type: "text" },
      { name: "hours", label: "Business hours", type: "text" },
      { name: "linkedin", label: "LinkedIn URL", type: "text" },
    ],
  },
  {
    key: "home",
    title: "Homepage text",
    description: "Hero headline, introduction and the closing call to action.",
    kind: "object",
    fields: [
      { name: "heroEyebrow", label: "Small heading above title", type: "text" },
      { name: "heroTitle", label: "Main headline", type: "text" },
      { name: "heroSubtitle", label: "Introduction", type: "textarea" },
      { name: "heroNote", label: "Note under buttons", type: "text" },
      { name: "ctaTitle", label: "Closing section title", type: "text" },
      { name: "ctaText", label: "Closing section text", type: "textarea" },
    ],
  },
  {
    key: "founder",
    title: "Founder",
    description: "The “Meet the Founder” section on the About page and homepage.",
    kind: "object",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "role", label: "Role / speciality", type: "text" },
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "image", label: "Photo", type: "text", help: "e.g. /images/founder.webp" },
      { name: "show", label: "Show on website", type: "boolean" },
    ],
  },
  {
    key: "services",
    title: "Services",
    description: "Service cards on the homepage and the Our Services page.",
    kind: "list",
    itemLabel: "service",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "slug", label: "Anchor (url-friendly)", type: "text", help: "Lowercase words joined by hyphens" },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "points", label: "Key points", type: "lines", help: "One point per line" },
    ],
  },
  {
    key: "industriesPage",
    title: "Industries & Products page",
    description: "Headline and introduction of the Industries & Products page.",
    kind: "object",
    fields: [
      { name: "eyebrow", label: "Small heading above title", type: "text" },
      { name: "title", label: "Main headline", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "intro", label: "Introduction", type: "textarea", help: "Leave a blank line between paragraphs" },
    ],
  },
  {
    key: "categories",
    title: "Product categories",
    description: "Stainless steel and copper category pages. Untick “Show on website” to hide a category.",
    kind: "list",
    itemLabel: "category",
    titleField: "name",
    fields: [
      { name: "name", label: "Category name", type: "text" },
      { name: "slug", label: "Page address", type: "text", help: "Used in the URL: /industries/<this>. Products link to it." },
      { name: "summary", label: "Short summary (cards)", type: "textarea" },
      { name: "intro", label: "Introduction", type: "textarea", help: "Leave a blank line between paragraphs" },
      { name: "image", label: "Photo", type: "text", help: "e.g. /images/products/copper.webp — leave empty for the default" },
      { name: "active", label: "Show on website", type: "boolean" },
    ],
  },
  {
    key: "products",
    title: "Products",
    description: "Products shown on the category pages and in the inquiry forms. Untick “Show on website” to hide one.",
    kind: "list",
    itemLabel: "product",
    titleField: "name",
    fields: [
      { name: "name", label: "Product name", type: "text" },
      { name: "category", label: "Category", type: "select", options: ["stainless-steel", "copper", "industrial-raw-materials"], help: "Must match a category's page address" },
      { name: "slug", label: "Anchor (url-friendly)", type: "text" },
      { name: "summary", label: "Short summary (cards)", type: "textarea" },
      { name: "overview", label: "Product overview", type: "textarea", help: "Leave a blank line between paragraphs" },
      { name: "applications", label: "Key industrial applications", type: "lines", help: "One per line" },
      { name: "buyers", label: "Target industries and buyers", type: "textarea" },
      { name: "support", label: "How Mirsons Global supports this sector", type: "textarea" },
      { name: "notice", label: "Important notice (optional)", type: "textarea", help: "Shown as a highlighted note, e.g. due-diligence reminders" },
      { name: "image", label: "Photo", type: "text", help: "e.g. /images/products/cu-busbars.webp — leave empty for the category photo" },
      { name: "active", label: "Show on website", type: "boolean" },
    ],
  },
  {
    key: "offer",
    title: "What manufacturers receive",
    description: "The concrete offer shown on the homepage, Manufacturers and Pilot pages.",
    kind: "object",
    fields: [
      { name: "receive", label: "What the manufacturer receives", type: "lines", help: "One item per line" },
      { name: "need", label: "What we need from the manufacturer", type: "lines", help: "One item per line" },
    ],
  },
  {
    key: "pilot",
    title: "Pilot Programme (paid service)",
    description: "Content of the Pilot Programme page.",
    kind: "object",
    fields: [
      { name: "intro", label: "Introduction", type: "textarea" },
      { name: "inclusions", label: "What the pilot includes", type: "lines", help: "One item per line" },
      { name: "whoFor", label: "Who it is for", type: "lines", help: "One item per line" },
      { name: "timeline", label: "Typical timeline", type: "lines", help: "One step per line, e.g. “Week 1 — …”" },
      { name: "pricing", label: "Pricing note", type: "textarea" },
    ],
  },
  {
    key: "sampleMeta",
    title: "Sample report — header",
    description: "Title, scope and disclaimer of the sample buyer-research report.",
    kind: "object",
    fields: [
      { name: "title", label: "Report title", type: "text" },
      { name: "client", label: "Prepared for", type: "text" },
      { name: "product", label: "Product", type: "text" },
      { name: "markets", label: "Target markets", type: "text" },
      { name: "period", label: "Period", type: "text" },
      { name: "disclaimer", label: "Disclaimer (keep if data is illustrative)", type: "textarea" },
    ],
  },
  {
    key: "sampleRows",
    title: "Sample report — companies",
    description: "Rows of the sample buyer-research report.",
    kind: "list",
    itemLabel: "company",
    titleField: "company",
    fields: [
      { name: "company", label: "Company name", type: "text" },
      { name: "country", label: "Country", type: "text" },
      { name: "website", label: "Website", type: "text" },
      { name: "fit", label: "Product fit", type: "textarea" },
      { name: "role", label: "Decision-maker role", type: "text" },
      {
        name: "status",
        label: "Qualification status",
        type: "select",
        options: ["Qualified", "Interested", "In conversation", "Researching", "No response yet", "Not a fit"],
      },
      { name: "note", label: "Note", type: "text" },
    ],
  },
  {
    key: "markets",
    title: "International markets",
    description: "Regions listed on the Industries and Manufacturers pages.",
    kind: "list",
    itemLabel: "market",
    titleField: "name",
    fields: [
      { name: "name", label: "Region / market", type: "text" },
      { name: "description", label: "Description", type: "text" },
    ],
  },
  {
    key: "buyerTypes",
    title: "Who we connect",
    description: "Buyer categories shown on the homepage.",
    kind: "list",
    itemLabel: "buyer type",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "description", label: "Description", type: "text" },
    ],
  },
  {
    key: "faqs",
    title: "FAQs",
    description: "Frequently asked questions on the homepage and How It Works page.",
    kind: "list",
    itemLabel: "question",
    titleField: "question",
    fields: [
      { name: "question", label: "Question", type: "text" },
      { name: "answer", label: "Answer", type: "textarea" },
    ],
  },
  {
    key: "seo",
    title: "SEO",
    description: "Default page title and description used by search engines and link previews.",
    kind: "object",
    fields: [
      { name: "siteTitle", label: "Default site title", type: "text", help: "Around 50–60 characters" },
      { name: "siteDescription", label: "Default description", type: "textarea", help: "Around 150–160 characters" },
      { name: "keywords", label: "Keywords", type: "textarea", help: "Comma separated" },
    ],
  },
];

const FALLBACK_IMAGE = "/images/industries-hero.webp";

export function categoryImage(c: Pick<Category, "slug" | "image">): string {
  if (c.image?.startsWith("/")) return c.image;
  return defaults.categories.find((d) => d.slug === c.slug)?.image ?? FALLBACK_IMAGE;
}

export function productImage(p: Pick<Product, "slug" | "image" | "category">): string {
  if (p.image?.startsWith("/")) return p.image;
  return defaults.products.find((d) => d.slug === p.slug)?.image ?? categoryImage({ slug: p.category, image: "" });
}

/** Splits a textarea into paragraphs (blank line between paragraphs). */
export function paragraphs(value: string): string[] {
  return value
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function lines(value: string): string[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
