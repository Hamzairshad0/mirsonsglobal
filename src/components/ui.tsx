import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import type { Faq, Settings } from "@/lib/content-schema";
import { whatsappLink } from "@/lib/site";

export function WorldMap({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/world-map.svg" alt="" aria-hidden className={`pointer-events-none select-none ${className}`} />
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy-900 pt-36 pb-20 text-white sm:pt-40 sm:pb-24">
      <WorldMap className="absolute top-1/2 right-[-12%] w-[110%] max-w-none -translate-y-1/2 opacity-45 sm:w-[85%] lg:right-[-6%] lg:w-[68%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/30" aria-hidden />
      <div className="container-x relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-[3.4rem]">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{intro}</p>}
        {children && <div className="mt-9 flex flex-wrap gap-4">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
  dark,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${dark ? "eyebrow-light" : ""} ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2 className={`mt-4 text-3xl leading-tight font-semibold sm:text-4xl ${dark ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-white/70" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

export function CheckList({ items, dark, cols = 1 }: { items: string[]; dark?: boolean; cols?: 1 | 2 }) {
  return (
    <ul className={`grid gap-x-8 gap-y-3.5 ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 text-[15px] ${dark ? "text-white/85" : "text-ink/85"}`}>
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details key={f.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-lg font-medium text-navy-900 sm:text-xl">{f.question}</span>
            <Plus className="h-5 w-5 shrink-0 text-gold-600 transition-transform duration-200 group-open:rotate-45" aria-hidden />
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title,
  text,
  settings,
  primary = { href: "/contact#consultation", label: "Book a Consultation" },
}: {
  title: string;
  text: string;
  settings: Settings;
  primary?: { href: string; label: string };
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
      <Image
        src="/brand/watermark.png"
        alt=""
        aria-hidden
        width={900}
        height={683}
        className="pointer-events-none absolute -right-24 -bottom-24 w-[34rem] opacity-[0.07]"
      />
      <div className="container-x relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="block h-px w-12 bg-gold-500" aria-hidden />
          <h2 className="mt-6 text-3xl leading-tight font-semibold sm:text-4xl">{title}</h2>
          <p className="mt-5 leading-relaxed text-white/70 sm:text-lg">{text}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-4">
          <Link href={primary.href} className="btn-gold">
            {primary.label} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <a
            href={whatsappLink(settings.whatsapp, settings.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export function NumberedSteps({
  steps,
  dark,
}: {
  steps: { title: string; text: string }[];
  dark?: boolean;
}) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-3 border-transparent">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={`relative p-8 ${dark ? "bg-navy-800/70 ring-1 ring-white/10" : "bg-white ring-1 ring-line"}`}
        >
          <span className="font-serif text-4xl font-semibold text-gold-500">{String(i + 1).padStart(2, "0")}</span>
          <h3 className={`mt-4 text-xl font-semibold ${dark ? "text-white" : "text-navy-900"}`}>{s.title}</h3>
          <p className={`mt-3 text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-muted"}`}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
