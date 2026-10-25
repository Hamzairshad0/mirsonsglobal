// Default copy for the Industries & Products pages, the concrete offer, the pilot programme
// and the sample report. Everything here is editable from Admin → Website content.
// Multi-paragraph fields use a blank line between paragraphs; list fields use one item per line.
import type { Category, IndustriesPage, Offer, Pilot, Product, SampleMeta, SampleRow } from "./content-schema";

export const industriesPageDefault: IndustriesPage = {
  eyebrow: "Industries & Products",
  title: "Stainless Steel & Copper Solutions for Global Industries",
  subtitle: "Connecting Manufacturers, Suppliers and International Buyers",
  intro: [
    "At Mirsons Global, we support manufacturers, suppliers, importers, distributors, and industrial buyers by facilitating international B2B connections across the stainless steel and copper industries.",
    "We focus on identifying suitable business partners, researching target markets, connecting manufacturers with potential buyers, and supporting business development opportunities across industrial supply chains.",
    "Our product coverage includes stainless steel flat products, pipes, tubes and plates, alongside copper conductors, wire rods, tubes and refined copper raw materials.",
    "Through market research, buyer identification, supplier sourcing, and targeted business outreach, we help businesses explore new markets and build meaningful international commercial relationships.",
  ].join("\n\n"),
};

export const categoriesDefault: Category[] = [
  {
    slug: "stainless-steel",
    name: "Stainless Steel Products",
    summary: "Sheets, coils, pipes and tubes, and plates for fabrication, processing and industrial equipment.",
    intro: [
      "Stainless steel is an essential material across manufacturing, construction, food processing, industrial engineering, transportation and commercial equipment production. Its corrosion resistance, durability, strength and versatility make it suitable for a wide range of industrial applications.",
      "Mirsons Global supports business connections involving stainless steel products, helping manufacturers and suppliers identify relevant importers, distributors, stockholders, processors and industrial end users.",
    ].join("\n\n"),
    image: "/images/products/stainless-steel.webp",
    active: true,
  },
  {
    slug: "copper",
    name: "Copper Products",
    summary: "Busbars, wire rods, tubes and pipes, and cathodes for electrical, HVAC and processing industries.",
    intro: [
      "Copper is an important industrial metal valued for its electrical conductivity, thermal conductivity, formability and suitability for a broad range of electrical and mechanical applications.",
      "It plays a significant role in power distribution, electrical equipment, cable manufacturing, renewable energy systems, electronics, heating and cooling equipment, and industrial processing.",
      "Mirsons Global supports business connections across selected copper product categories, helping manufacturers, processors, distributors and industrial suppliers explore relevant international markets.",
    ].join("\n\n"),
    image: "/images/products/copper.webp",
    active: true,
  },
];

export const productsDefault: Product[] = [
  {
    slug: "stainless-steel-sheets",
    category: "stainless-steel",
    name: "Stainless Steel Sheets",
    summary: "Flat-rolled sheets in grades such as 201, 304 and 316L with 2B, BA, No. 4 and mirror finishes.",
    overview: [
      "Stainless steel sheets are flat-rolled metal products supplied in specified thicknesses, widths, lengths, grades and surface finishes. They are widely used in applications requiring corrosion resistance, durability, hygiene and an attractive surface appearance.",
      "Common grades include 201, 304 and 316L, selected according to the intended application, operating environment and technical requirements. Available finishes may include 2B, BA, brushed No. 4 and mirror finishes, subject to supplier availability.",
    ].join("\n\n"),
    applications: [
      "Commercial kitchens, sinks, worktables and food-service equipment.",
      "Household appliances and equipment enclosures.",
      "Architectural panels, interior finishes and decorative applications.",
      "Food-processing machinery and hygienic equipment.",
      "General metal fabrication and industrial components.",
    ].join("\n"),
    buyers:
      "Stainless steel sheet manufacturers, metal importers, steel stockholders, sheet-metal fabricators, kitchen-equipment manufacturers, appliance producers and industrial distributors.",
    support:
      "We help identify potential international buyers based on product grade, thickness, surface finish, intended application and target market. Our services can include buyer research, market mapping, prospect identification and business outreach to help suppliers develop relevant commercial opportunities.",
    notice: "",
    image: "/images/products/ss-sheets.webp",
    active: true,
  },
  {
    slug: "stainless-steel-coils",
    category: "stainless-steel",
    name: "Stainless Steel Coils",
    summary: "Hot- and cold-rolled coils for slitting, forming and component manufacturing.",
    overview: [
      "Stainless steel coils are continuous lengths of flat-rolled stainless steel wound into coils for storage, transportation and further processing. They allow manufacturers and metal service centres to cut, slit, form or process material according to their production requirements.",
      "Coils may be supplied as hot-rolled or cold-rolled products, with different grades, thicknesses, widths, finishes and mechanical properties depending on the intended application.",
    ].join("\n\n"),
    applications: [
      "Sheet-metal fabrication and component manufacturing.",
      "Kitchenware, cookware and cutlery production.",
      "Automotive and appliance components.",
      "Industrial equipment and machinery.",
      "Metal service centres and precision slitting operations.",
    ].join("\n"),
    buyers:
      "Stainless steel importers, coil distributors, metal stockholders, service centres, slitting and processing companies, kitchenware manufacturers and industrial component producers.",
    support:
      "We help suppliers identify potential buyers with relevant processing capabilities and purchasing requirements. Our research can focus on companies handling specific stainless steel grades, coil widths, thicknesses and product finishes, enabling more relevant supplier–buyer introductions.",
    notice: "",
    image: "/images/products/ss-coils.webp",
    active: true,
  },
  {
    slug: "stainless-steel-pipes-tubes",
    category: "stainless-steel",
    name: "Stainless Steel Pipes and Tubes",
    summary: "Welded and seamless pipes and tubes for process, fluid-handling and structural uses.",
    overview: [
      "Stainless steel pipes and tubes are hollow metal products used to transport fluids, gases and process materials, or to manufacture structural and mechanical components. Product selection depends on the application, pressure and temperature conditions, corrosion exposure, dimensions and applicable standards.",
      "Products may include welded or seamless pipes and tubes, with different diameters, wall thicknesses, grades and surface finishes.",
    ].join("\n\n"),
    applications: [
      "Food and beverage processing systems.",
      "Chemical and industrial process equipment.",
      "Water treatment and industrial fluid handling.",
      "Heating, ventilation, air conditioning and related equipment.",
      "Pharmaceutical equipment and hygienic process systems.",
      "Industrial fabrication and structural applications.",
    ].join("\n"),
    buyers:
      "Pipe and tube importers, stainless steel distributors, engineering contractors, process-equipment manufacturers, industrial fabricators, water-treatment equipment suppliers and mechanical component manufacturers.",
    support:
      "We help identify companies whose product portfolios and technical requirements match available pipe and tube products. Buyer research can be organised by industry, product type, grade, dimensions, manufacturing standards and destination market.",
    notice: "",
    image: "/images/products/ss-pipes-tubes.webp",
    active: true,
  },
  {
    slug: "stainless-steel-plates",
    category: "stainless-steel",
    name: "Stainless Steel Plates",
    summary: "Thicker flat products for tanks, vessels, process equipment and heavy fabrication.",
    overview: [
      "Stainless steel plates are flat metal products generally supplied in thicker sections than standard sheets, although the precise distinction depends on the applicable product standard and supplier specifications. They are commonly used in heavy-duty fabrication, industrial equipment and applications requiring specific mechanical and corrosion-resistance properties.",
      "Available grades, thicknesses, dimensions and finishes depend on the manufacturer and the intended operating environment.",
    ].join("\n\n"),
    applications: [
      "Industrial storage tanks and vessels.",
      "Chemical and process equipment.",
      "Food-processing machinery.",
      "Heavy engineering and industrial fabrication.",
      "Industrial structures and specialised machinery.",
      "Equipment used in demanding corrosion environments.",
    ].join("\n"),
    buyers:
      "Heavy engineering companies, stainless steel plate distributors, industrial fabricators, tank and vessel manufacturers, process-equipment producers and engineering, procurement and construction contractors.",
    support:
      "We help manufacturers research industrial markets and identify potential buyers whose projects and manufacturing operations require stainless steel plates. Our business-development support can include prospect mapping, buyer identification and introductions based on specified grades, dimensions, quantities and technical requirements.",
    notice: "",
    image: "/images/products/ss-plates.webp",
    active: true,
  },
  {
    slug: "copper-busbars",
    category: "copper",
    name: "Copper Busbars",
    summary: "Conductive bars and strips for switchgear, panels, transformers and power systems.",
    overview: [
      "Copper busbars are conductive copper bars or strips used to distribute electrical power within electrical systems and equipment. They are commonly manufactured in flat, rectangular or other specified cross-sections and may be supplied in different dimensions, tempers and levels of processing.",
      "Copper busbars are valued for their high electrical conductivity and their ability to support compact, organised power-distribution arrangements when correctly engineered for the application.",
    ].join("\n\n"),
    applications: [
      "Electrical switchgear and distribution panels.",
      "Power distribution boards and control panels.",
      "Transformers and electrical power equipment.",
      "Industrial electrical systems.",
      "Renewable energy installations and energy storage systems.",
      "Electrical infrastructure and power-management equipment.",
    ].join("\n"),
    buyers:
      "Copper busbar manufacturers, switchgear manufacturers, electrical panel builders, transformer manufacturers, electrical equipment distributors, power-system integrators and industrial electrical contractors.",
    support:
      "We help identify potential buyers according to their electrical equipment manufacturing activities, required copper dimensions, conductivity requirements, processing needs and target markets. Our business-development services can connect suitable suppliers with companies seeking copper busbars or related conductive materials.",
    notice: "",
    image: "/images/products/cu-busbars.webp",
    active: true,
  },
  {
    slug: "copper-wire-rods",
    category: "copper",
    name: "Copper Wire Rods",
    summary: "Semi-finished feedstock for wire drawing, cables and electrical conductors.",
    overview: [
      "Copper wire rods are semi-finished copper products used as feedstock for drawing into wires and manufacturing electrical conductors. They are commonly produced through industrial casting and rolling processes and supplied according to specified dimensions, conductivity, purity and applicable standards.",
      "Copper wire rods serve as an important input material for manufacturers producing electrical cables, building wires, power conductors and other copper-wire products.",
    ].join("\n\n"),
    applications: [
      "Electrical cable and wire manufacturing.",
      "Power transmission and distribution.",
      "Building wiring and electrical installations.",
      "Industrial electrical conductors.",
      "Telecommunications and selected electronic applications.",
      "Wire drawing and downstream copper processing.",
    ].join("\n"),
    buyers:
      "Copper wire-rod distributors, cable manufacturers, wire-drawing plants, electrical conductor manufacturers, copper processors and industrial raw-material importers.",
    support:
      "We help suppliers identify manufacturers and processors with relevant copper wire-rod requirements. Our research can consider target industries, manufacturing capabilities, required specifications, purchasing volumes and import markets to facilitate relevant business introductions.",
    notice: "",
    image: "/images/products/cu-wire-rods.webp",
    active: true,
  },
  {
    slug: "copper-tubes-pipes",
    category: "copper",
    name: "Copper Tubes and Pipes",
    summary: "Tubes in lengths or coils for HVAC, refrigeration, heat exchangers and plumbing.",
    overview: [
      "Copper tubes are hollow copper products manufactured in different diameters, wall thicknesses, tempers and lengths or coil formats. Their thermal conductivity, corrosion characteristics and formability make them useful in various heat-transfer, refrigeration and plumbing applications.",
      "Product specifications vary according to the intended use. Refrigeration and air-conditioning tubes, for example, may require specific dimensions, cleanliness, pressure suitability and applicable product standards.",
    ].join("\n\n"),
    applications: [
      "Air-conditioning and refrigeration systems.",
      "Heat exchangers and thermal-management equipment.",
      "HVAC equipment manufacturing.",
      "Plumbing and water-distribution systems where copper is suitable.",
      "Industrial cooling systems.",
      "Refrigeration equipment and related components.",
    ].join("\n"),
    buyers:
      "Copper tube manufacturers, HVAC and refrigeration equipment producers, heat-exchanger manufacturers, copper tube distributors, plumbing wholesalers and industrial cooling-system suppliers.",
    support:
      "We help identify manufacturers, distributors and industrial buyers whose requirements align with available copper tube products. Our market research can focus on applications, product dimensions, standards, target countries and the types of companies that purchase copper tubes for manufacturing or distribution.",
    notice: "",
    image: "/images/products/cu-tubes-pipes.webp",
    active: true,
  },
  {
    slug: "copper-cathodes",
    category: "copper",
    name: "Copper Cathodes",
    summary: "High-purity refined copper for rod, wire, tube and sheet production.",
    overview: [
      "Copper cathodes are high-purity refined copper products produced through industrial refining processes. They are an important raw material for downstream copper manufacturing, particularly the production of copper rods, wires, tubes, sheets and other semi-finished products.",
      "Commercial transactions typically require careful verification of copper purity, chemical composition, applicable quality standards, origin, producer documentation, quantity, delivery terms and payment arrangements.",
      "Copper cathodes are primarily intended for industrial processors and established metal-trading businesses rather than ordinary end users.",
    ].join("\n\n"),
    applications: [
      "Copper wire-rod production.",
      "Electrical cable and conductor manufacturing.",
      "Copper tube and pipe production.",
      "Copper sheet, strip and other semi-finished product manufacturing.",
      "Industrial copper processing and refining supply chains.",
    ].join("\n"),
    buyers:
      "Copper smelters and refiners, copper processors, wire-rod manufacturers, established non-ferrous metal traders and industrial raw-material importers.",
    support:
      "We help identify potential industrial buyers and relevant trading partners, research target markets and facilitate initial business introductions. For copper cathode opportunities, we recognise the importance of supplier due diligence, verified documentation, traceable origin, trade compliance and secure commercial arrangements.",
    notice: "All transactions should be independently verified by the parties involved before commitments are made.",
    image: "/images/products/cu-cathodes.webp",
    active: true,
  },
];

export const offerDefault: Offer = {
  receive: [
    "An agreed ideal customer profile: the buyer types, company sizes and countries to target for your product.",
    "A researched list of relevant companies in each target country — website, product fit and decision-maker role for every company.",
    "Personalised outreach to the right decision-makers, with structured follow-ups.",
    "Qualified opportunities passed to you with a short summary of each buyer's requirement.",
    "Introductions and meetings arranged with interested buyers.",
    "Regular progress updates and a final report covering outreach, responses and next steps.",
  ].join("\n"),
  need: [
    "Product specifications or catalogue — grades, sizes, finishes and applicable standards.",
    "Production capacity, minimum order quantity and typical lead times.",
    "Certifications and quality documents, such as ISO certificates or mill test certificates.",
    "Your pricing basis and preferred Incoterms (for example FOB or CIF).",
    "Target countries and buyer types — and any markets or existing customers to exclude.",
    "Packaging, export documentation and payment terms you can offer.",
    "A contact person for introductions and meetings.",
  ].join("\n"),
};

export const pilotDefault: Pilot = {
  intro:
    "The pilot is a paid, time-limited outbound campaign that tests one product in one target market. It gives you a clear view of real buyer interest before you commit to an ongoing programme.",
  inclusions: [
    "Agreement on the ideal customer profile and target country.",
    "A researched and reviewed list of relevant companies.",
    "Personalised outreach and follow-ups.",
    "Qualification of interested prospects against agreed criteria.",
    "A final report summarising outreach, responses, and next steps.",
  ].join("\n"),
  whoFor: [
    "Stainless steel and copper manufacturers entering a new export market.",
    "Suppliers who want to test demand in one country before investing further.",
    "Exporters looking for distributors, stockholders or industrial end users.",
  ].join("\n"),
  timeline: [
    "Week 1 — Agree the product, target country, buyer profile and qualification criteria.",
    "Weeks 2–3 — Research the market and build the company list; you review it before outreach starts.",
    "Weeks 3–6 — Personalised outreach to decision-makers, with structured follow-ups.",
    "End of pilot — Qualified prospects handed over, meetings arranged and the final report delivered.",
  ].join("\n"),
  pricing:
    "The pilot is offered for a fixed fee agreed in advance, based on the product, the target market and the size of the company list. Request a proposal and we will confirm the scope, timeline and fee before any work begins.",
};

export const sampleMetaDefault: SampleMeta = {
  title: "Buyer Research Report — Stainless Steel Coils",
  client: "Sample stainless steel coil manufacturer",
  product: "Cold-rolled stainless steel coils — grades 304 and 316L, 2B finish, 0.4–3.0 mm",
  markets: "United Arab Emirates and Saudi Arabia",
  period: "Pilot weeks 1–6",
  disclaimer:
    "This is an illustrative sample. Company names, websites and details are fictional and shown only to demonstrate the format and depth of a Mirsons Global buyer-research report.",
};

export const sampleRowsDefault: SampleRow[] = [
  {
    company: "Falconcrest Coil Processing LLC",
    country: "United Arab Emirates",
    website: "falconcrest-coils.example",
    fit: "Service centre slitting 304 cold-rolled coils for local fabricators",
    role: "Procurement Manager",
    status: "Qualified",
    note: "Buys monthly; open to a second supplier. Meeting requested.",
  },
  {
    company: "Azure Dunes Steel Stockholders",
    country: "Saudi Arabia",
    website: "azuredunes-steel.example",
    fit: "Stockholder of 304/316L sheets and coils for regional distribution",
    role: "Purchasing Director",
    status: "Interested",
    note: "Asked for mill test certificates and CIF Dammam pricing.",
  },
  {
    company: "Oasisline Kitchen Equipment Co.",
    country: "United Arab Emirates",
    website: "oasisline-kitchens.example",
    fit: "Fabricates commercial kitchen equipment from 304 2B coil",
    role: "Head of Supply Chain",
    status: "In conversation",
    note: "Reviewing samples; decision expected next quarter.",
  },
  {
    company: "Coralgate Metals Trading",
    country: "Saudi Arabia",
    website: "coralgate-metals.example",
    fit: "Imports stainless coils for re-sale to processors",
    role: "General Manager",
    status: "Qualified",
    note: "Container-load volumes; requests quarterly contract terms.",
  },
  {
    company: "Sandhaven Appliance Components",
    country: "United Arab Emirates",
    website: "sandhaven-components.example",
    fit: "Appliance enclosures — mainly uses grade 430, limited 304",
    role: "Sourcing Engineer",
    status: "Not a fit",
    note: "Grade requirement does not match the client's range.",
  },
  {
    company: "Najmfield Fabrication Works",
    country: "Saudi Arabia",
    website: "najmfield-fab.example",
    fit: "Tanks and process equipment — needs plates more than coils",
    role: "Projects Procurement Lead",
    status: "Researching",
    note: "Possible fit for the client's plate range; verifying volumes.",
  },
  {
    company: "Palmshore Precision Slitting",
    country: "United Arab Emirates",
    website: "palmshore-slitting.example",
    fit: "Precision slitting of 0.4–2.0 mm 304/316L for electronics",
    role: "Commercial Director",
    status: "Interested",
    note: "Requested thickness tolerance data.",
  },
  {
    company: "Qamar Cookware Manufacturing",
    country: "Saudi Arabia",
    website: "qamar-cookware.example",
    fit: "Deep-drawing 304 coil for cookware production",
    role: "Operations Manager",
    status: "No response yet",
    note: "Second follow-up scheduled.",
  },
];
