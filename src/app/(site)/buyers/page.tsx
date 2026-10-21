import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getActiveIndustries, getContent } from "@/lib/content";
import { BUYER_PROCESS } from "@/lib/process";
import { Icon } from "@/components/Icon";
import { FormPanel } from "@/components/FormPanel";
import { BuyerForm } from "@/components/forms/Forms";
import Image from "next/image";
import { CheckList, delay, NumberedSteps, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "For Buyers — Submit Sourcing Requirements",
  description:
    "Importers, distributors, wholesalers and industrial buyers: submit your sourcing requirements and Mirsons Global will shortlist suitable manufacturers and arrange introductions.",
  alternates: { canonical: "/buyers" },
};

const HELP = [
  { icon: "search", title: "Supplier search", text: "We search beyond portals to find manufacturers that match your specification and volume." },
  { icon: "shield", title: "Background checks", text: "Shortlisted suppliers are checked for capability, capacity and export experience." },
  { icon: "chart", title: "Comparable quotations", text: "We collect quotes on the same basis so you can compare offers like-for-like." },
  { icon: "handshake", title: "Introductions", text: "We introduce you directly to the most suitable suppliers and arrange meetings." },
];

export default async function BuyersPage() {
  const [settings, industries] = await Promise.all([getContent("settings"), getActiveIndustries()]);

  return (
    <>
      <PageHero
        image="/images/warehouse.webp"
        eyebrow="For buyers"
        title="Source industrial products from reliable manufacturers"
        intro="Importers, distributors, wholesalers and industrial purchasers: tell us what you need and we'll find suppliers able to deliver it."
      >
        <Link href="#requirements" className="btn-gold">
          Submit Sourcing Requirements <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="How we help buyers"
            title="Less searching. Better-matched suppliers."
            intro="Finding a dependable manufacturer abroad takes time. We do the research, screening and first conversations for you."
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HELP.map((h, i) => (
              <li key={h.title} data-reveal style={delay(i)} className="card lift group p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                  <Icon name={h.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <Image src="/images/containers-aerial.webp" alt="" fill quality={50} sizes="100vw" className="-z-20 object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900 via-navy-900/85 to-navy-900" aria-hidden />
        <div className="container-x">
          <SectionHeading eyebrow="The sourcing process" title="From requirement to supplier meeting" dark />
          <div className="mt-14">
            <NumberedSteps steps={BUYER_PROCESS} dark />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal className="photo-zoom relative order-last aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-navy-900/20 lg:order-first">
            <Image
              src="/images/industries/packaging.webp"
              alt="Packed cartons ready for export"
              fill
              quality={62}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
          <SectionHeading
            eyebrow="Before you submit"
            title="A clear requirement gets faster, better matches"
            intro="The more detail you share, the more precisely we can shortlist suppliers. Helpful information includes:"
          />
          <div data-reveal className="mt-8">
          <CheckList
            items={[
              "Product name, grade and technical specifications",
              "Applicable standards and certifications",
              "Quantity per order and expected frequency",
              "Packaging and labelling requirements",
              "Destination port or city and preferred Incoterm",
              "Target price, budget or current supplier benchmark",
              "When you need the first delivery",
            ]}
          />
          </div>
          </div>
        </div>
      </section>

      <FormPanel
        id="requirements"
        eyebrow="Sourcing request"
        title="Submit your sourcing requirements"
        intro="Submitting a requirement is free and without obligation. We'll confirm the details and explain how we can help before any work begins."
        settings={settings}
      >
        <BuyerForm categories={industries.map((i) => i.name)} />
      </FormPanel>
    </>
  );
}
