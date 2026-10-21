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
export type Industry = { slug: string; name: string; description: string; products: string; active: boolean };
export type Market = { name: string; description: string };
export type BuyerType = { title: string; description: string; icon: string };
export type Faq = { question: string; answer: string };
export type Seo = { siteTitle: string; siteDescription: string; keywords: string };

export type ContentMap = {
  settings: Settings;
  home: Home;
  services: Service[];
  industries: Industry[];
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
    phone: "+92 300 0000000",
    whatsapp: "923000000000",
    whatsappMessage: "Hello Mirsons Global, I would like to discuss a B2B requirement.",
    address: "Operating remotely — serving clients internationally",
    hours: "Monday – Saturday, 9:00 – 18:00 (GMT+5)",
    linkedin: "https://www.linkedin.com/company/mirsons-global",
  },
  home: {
    heroEyebrow: "B2B Lead Generation & Buyer–Supplier Matchmaking",
    heroTitle: "Connecting Manufacturers with Qualified International Buyers",
    heroSubtitle:
      "We identify importers, distributors and commercial buyers in your target markets — and turn them into qualified sales conversations and pre-arranged business meetings.",
    heroNote: "For manufacturers, suppliers, importers, distributors and industrial buyers.",
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
  industries: [
    {
      slug: "industrial-minerals",
      name: "Industrial Minerals & Raw Materials",
      description: "Bulk minerals and natural raw materials for construction, chemical and manufacturing use.",
      products: "Rock salt & industrial salt\nGypsum & limestone\nBarite & talc\nMarble & granite\nSilica sand",
      active: true,
    },
    {
      slug: "metals-steel",
      name: "Metals & Steel Products",
      description: "Ferrous and non-ferrous metals, semi-finished and finished steel products.",
      products: "Steel pipes & tubes\nRebar & structural steel\nAluminium & copper products\nMetal scrap\nFasteners & fittings",
      active: true,
    },
    {
      slug: "chemicals-polymers",
      name: "Chemicals & Polymers",
      description: "Industrial chemicals, plastics and polymer raw materials for processors and converters.",
      products: "PVC, PET & PP resins\nCaustic soda & soda ash\nIndustrial solvents\nMasterbatches & additives",
      active: true,
    },
    {
      slug: "construction-materials",
      name: "Construction & Building Materials",
      description: "Materials and products for contractors, developers and building-material distributors.",
      products: "Cement & clinker\nCeramic & porcelain tiles\nSanitary ware\nGlass & aluminium profiles",
      active: true,
    },
    {
      slug: "textiles",
      name: "Textiles & Technical Fabrics",
      description: "Yarns, fabrics and made-ups for garment makers, wholesalers and industrial users.",
      products: "Cotton & blended yarns\nGrey & finished fabrics\nHome textiles & towels\nWorkwear & technical fabrics",
      active: true,
    },
    {
      slug: "agri-commodities",
      name: "Agri-Commodities & Food Ingredients",
      description: "Agricultural commodities and ingredients for importers, processors and food manufacturers.",
      products: "Rice & pulses\nSesame & oilseeds\nSpices & dried herbs\nHimalayan pink salt",
      active: true,
    },
    {
      slug: "packaging",
      name: "Packaging Materials",
      description: "Industrial and consumer packaging for manufacturers, exporters and distributors.",
      products: "Corrugated cartons\nWoven polypropylene bags\nFlexible packaging films\nPaper & board",
      active: true,
    },
    {
      slug: "electrical-equipment",
      name: "Electrical, Solar & Industrial Equipment",
      description: "Equipment and components for EPC contractors, OEMs and industrial projects.",
      products: "Cables & wires\nSolar panels & mounting structures\nPumps & motors\nSwitchgear & components",
      active: true,
    },
  ],
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
        "We currently focus on selected industrial raw materials and B2B product categories such as minerals, metals, chemicals, construction materials, textiles, agri-commodities, packaging and industrial equipment. If your category is not listed, contact us — we assess each request individually.",
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
      "B2B lead generation, international buyers, find distributors, importers, buyer supplier matchmaking, sourcing agent, appointment setting, export sales pipeline",
  },
};

// ---- Field definitions for the admin editor ----

export type FieldType = "text" | "textarea" | "lines" | "boolean" | "icon";
export type FieldSpec = { name: string; label: string; type: FieldType; help?: string };
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
    key: "industries",
    title: "Industries",
    description: "Industry categories you serve. Untick “Show on website” to hide one without deleting it.",
    kind: "list",
    itemLabel: "industry",
    titleField: "name",
    fields: [
      { name: "name", label: "Industry name", type: "text" },
      { name: "slug", label: "Anchor (url-friendly)", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "products", label: "Example products", type: "lines", help: "One product per line" },
      { name: "active", label: "Show on website", type: "boolean" },
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

export function lines(value: string): string[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
