import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Founder } from "@/lib/content-schema";
import { Ornament } from "./Graphics";
import { Parallax } from "./Parallax";

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
    <section id="founder" className="relative overflow-hidden bg-white py-14 sm:py-20">
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

/** Founder feature for the homepage: portrait, quote and commitments over a parallax background. */
export function FounderQuote({ founder }: { founder: Founder }) {
  if (!founder.show) return null;
  const first = founder.name.split(" ")[0];
  const commitments = ["Research-driven buyer acquisition", "Professional outreach", "Reliable business introductions"];
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-950 py-16 text-white sm:py-20">
      <Parallax speed={0.18}>
        <Image src="/images/port-cranes-night.webp" alt="" fill quality={50} sizes="100vw" className="object-cover opacity-20" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/70" aria-hidden />
      <div className="absolute top-1/2 left-[18%] -z-10 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />

      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-reveal className="relative mx-auto w-full max-w-sm lg:mx-0">
          <span className="absolute -top-4 -left-4 h-full w-full rounded-2xl border border-gold-500/60" aria-hidden />
          <span className="absolute -right-4 -bottom-4 h-24 w-24 rounded-br-2xl border-r-2 border-b-2 border-gold-500" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-800 shadow-2xl shadow-black/40">
            <Image
              src={founder.image || "/images/founder.webp"}
              alt={`${founder.name}, ${founder.title}`}
              fill
              quality={75}
              sizes="(min-width: 1024px) 24rem, 90vw"
              className="object-cover object-top"
            />
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" aria-hidden />
            <span className="absolute inset-x-6 bottom-6">
              <span className="block font-serif text-2xl font-semibold">{founder.name}</span>
              <span className="mt-1 block text-xs tracking-[0.16em] text-gold-400 uppercase">{founder.title}</span>
            </span>
          </div>
        </div>

        <div data-reveal>
          <p className="eyebrow">A word from our founder</p>
          <QuoteMark className="mt-8 h-10 w-14 text-gold-500" />
          <blockquote className="mt-6 font-serif text-2xl leading-snug sm:text-3xl lg:text-[2.1rem] lg:leading-[1.25]">{founder.quote}</blockquote>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-12 bg-gold-500" aria-hidden />
            <p>
              <span className="font-semibold text-gold-300">{founder.name}</span>
              <span className="text-white/60"> · {founder.role}</span>
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {commitments.map((c) => (
              <li key={c} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 backdrop-blur-sm">
                <span className="mb-1.5 block h-0.5 w-6 bg-gold-500" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/contact#consultation" className="btn-gold">
              Speak with {first} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/about#founder" className="btn-outline-light">
              Meet the founder
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
