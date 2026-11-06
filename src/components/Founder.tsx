import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Founder } from "@/lib/content-schema";
import { Ornament } from "./Graphics";

function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 36" className={className} aria-hidden fill="currentColor">
      <path d="M0 36V22.4C0 9.9 6.6 2.4 19.8 0l2 4.6C14.7 6.5 11 10.6 10.6 17H20v19H0zm28 0V22.4C28 9.9 34.6 2.4 47.8 0l2 4.6C42.7 6.5 39 10.6 38.6 17H48v19H28z" />
    </svg>
  );
}

/** Full "Meet the Founder" section (About page). */
export function FounderSection({ founder }: { founder: Founder }) {
  if (!founder.show) return null;
  return (
    <section id="founder" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div data-reveal className="relative mx-auto w-full max-w-md lg:mx-0">
          <div className="absolute -top-4 -left-4 h-full w-full rounded-2xl border-2 border-gold-500/60" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-900 shadow-2xl shadow-navy-900/25">
            <Image
              src={founder.image || "/images/founder.webp"}
              alt={`${founder.name}, ${founder.title}`}
              fill
              quality={75}
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover object-top"
            />
            <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/70 to-transparent" aria-hidden />
          </div>
          <div className="absolute -right-3 -bottom-6 rounded-xl bg-navy-900 px-6 py-4 text-white shadow-xl sm:-right-8">
            <p className="font-serif text-lg font-semibold">{founder.name}</p>
            <p className="text-xs tracking-[0.14em] text-gold-400 uppercase">{founder.title}</p>
          </div>
        </div>

        <div data-reveal>
          <p className="eyebrow">Meet the Founder</p>
          <h2 className="mt-4 text-4xl font-semibold text-navy-900 sm:text-5xl">{founder.name}</h2>
          <p className="mt-3 text-lg font-medium text-navy-900">{founder.title}</p>
          <p className="mt-1 text-sm font-semibold tracking-[0.16em] text-gold-700 uppercase">{founder.role}</p>
          <Ornament className="mt-6" />
          <figure className="relative mt-8">
            <QuoteMark className="h-9 w-12 text-gold-500/40" />
            <blockquote className="mt-4 font-serif text-2xl leading-snug text-navy-900 sm:text-[1.7rem]">“{founder.quote}”</blockquote>
            <figcaption className="mt-6 text-sm text-muted">
              — {founder.name}, {founder.title.split("|")[0].trim()}
            </figcaption>
          </figure>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact#consultation" className="btn-gold">
              Speak with {founder.name.split(" ")[0]} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/manufacturers" className="btn-outline">
              How we help manufacturers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Compact founder quote band (homepage). */
export function FounderQuote({ founder }: { founder: Founder }) {
  if (!founder.show) return null;
  return (
    <section className="on-dark relative overflow-hidden bg-navy-900 py-16 text-white sm:py-20">
      <div className="container-x relative grid items-center gap-10 md:grid-cols-[auto_1fr]">
        <div data-reveal className="relative mx-auto h-40 w-40 shrink-0 md:mx-0 md:h-48 md:w-48">
          <span className="absolute -inset-2 rounded-full border border-gold-500/50" aria-hidden />
          <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-navy-800">
            <Image src="/images/founder-square.webp" alt={founder.name} fill quality={75} sizes="12rem" className="object-cover" />
          </div>
        </div>
        <figure data-reveal className="text-center md:text-left">
          <QuoteMark className="mx-auto h-7 w-10 text-gold-500/60 md:mx-0" />
          <blockquote className="mt-4 max-w-3xl font-serif text-xl leading-snug sm:text-2xl">“{founder.quote}”</blockquote>
          <figcaption className="mt-5">
            <span className="block font-semibold text-gold-300">{founder.name}</span>
            <span className="text-sm text-white/60">
              {founder.title} · {founder.role}
            </span>
          </figcaption>
          <Link href="/about#founder" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300">
            Meet the founder <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </figure>
      </div>
    </section>
  );
}
