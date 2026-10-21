import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { BUYER_PROCESS, MANUFACTURER_PROCESS } from "@/lib/process";
import { CtaBand, FaqList, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Our process: understand your requirements, research suitable prospects, qualify potential matches and arrange introductions or meetings between manufacturers and buyers.",
  alternates: { canonical: "/how-it-works" },
};

const OVERVIEW = [
  { title: "Understand", text: "We learn your products or sourcing needs, target markets and what a good match looks like." },
  { title: "Research", text: "We research suitable companies and identify the decision-makers inside them." },
  { title: "Qualify", text: "We reach out, follow up and screen responses against agreed criteria." },
  { title: "Introduce", text: "We arrange introductions and meetings between qualified parties." },
];

function Timeline({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="relative space-y-10 border-l border-gold-500/40 pl-8 sm:pl-10">
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <span className="absolute top-0 -left-[3.05rem] inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 font-serif text-sm text-gold-400 ring-4 ring-ivory sm:-left-[3.55rem]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-xl font-semibold text-navy-900">{s.title}</h3>
          <p className="mt-2 max-w-xl leading-relaxed text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export default async function HowItWorksPage() {
  const [faqs, settings] = await Promise.all([getContent("faqs"), getContent("settings")]);
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="A clear, structured process from first brief to first meeting"
        intro="Whether you are a manufacturer looking for buyers or a buyer looking for suppliers, every engagement follows the same disciplined approach."
      />

      <section className="border-b border-line bg-white">
        <ol className="container-x grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {OVERVIEW.map((o, i) => (
            <li key={o.title} className={`py-10 sm:px-6 ${i === 0 ? "lg:pl-0" : ""}`}>
              <span className="font-serif text-3xl font-semibold text-gold-500">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-xl font-semibold text-navy-900">{o.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{o.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="For manufacturers & suppliers" title="Finding your buyers" />
            <div className="mt-12">
              <Timeline steps={MANUFACTURER_PROCESS} />
            </div>
            <Link href="/manufacturers#inquiry" className="btn-navy mt-12">
              Find Qualified Buyers <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div>
            <SectionHeading eyebrow="For buyers" title="Finding your suppliers" />
            <div className="mt-12">
              <Timeline steps={BUYER_PROCESS} />
            </div>
            <Link href="/buyers#requirements" className="btn-outline mt-12">
              Submit Sourcing Requirements <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading
            eyebrow="After you submit"
            title="What happens to your inquiry"
            intro="Every submission is recorded and reviewed by our team — nothing is lost in an inbox."
          />
          <ol className="grid gap-4 sm:grid-cols-2">
            {[
              ["Confirmation", "You receive an acknowledgement email with your reference number."],
              ["Review", "A team member reviews the details, usually within one to two business days."],
              ["Conversation", "We contact you by your preferred method to clarify goals and scope."],
              ["Proposal & action", "We outline the approach, then begin research, outreach and introductions."],
            ].map(([t, d], i) => (
              <li key={t} className="card p-6">
                <span className="text-xs font-semibold tracking-[0.18em] text-gold-600 uppercase">Step {i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold text-navy-900">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading eyebrow="FAQs" title="Common questions" />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBand
        title="Ready to start?"
        text="Book a consultation and we'll map out the first steps for your products or sourcing requirement."
        settings={settings}
      />
    </>
  );
}
