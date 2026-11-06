import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, FileText } from "lucide-react";
import { Marquee } from "@/components/Graphics";
import { Spotlight } from "./Spotlight";

// Internal preview of five alternative homepage heroes. Not linked anywhere, not in the sitemap, noindex.
export const metadata: Metadata = {
  title: "Hero concepts (internal preview)",
  robots: { index: false, follow: false, nocache: true },
};

const CSS = `
@keyframes hc-spin { to { transform: rotate(360deg); } }
@keyframes hc-spin-rev { to { transform: rotate(-360deg); } }
@keyframes hc-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
@keyframes hc-grid { to { background-position: 0 64px, 0 0; } }
@keyframes hc-shimmer { to { background-position: 200% center; } }
@keyframes hc-bar { from { width: 0 } }
@keyframes hc-ping { 0% { transform: scale(1); opacity: .8 } 100% { transform: scale(2.6); opacity: 0 } }
@keyframes hc-scan { 0% { transform: translateY(-100%) } 100% { transform: translateY(400%) } }
@keyframes hc-dash { to { stroke-dashoffset: -400; } }
.hc-orbit { transform-box: fill-box; transform-origin: center; animation: hc-spin 40s linear infinite; }
.hc-orbit-rev { transform-box: fill-box; transform-origin: center; animation: hc-spin-rev 60s linear infinite; }
.hc-float { animation: hc-float 6s ease-in-out infinite; }
.hc-float-slow { animation: hc-float 8s ease-in-out infinite; animation-delay: -3s; }
.hc-gold-text {
  background: linear-gradient(100deg, #ad8942 0%, #f0e2bf 25%, #c9a45c 50%, #f0e2bf 75%, #ad8942 100%);
  background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: hc-shimmer 8s linear infinite;
}
.hc-floor {
  background-image:
    linear-gradient(to bottom, rgb(201 164 92 / .28) 1px, transparent 1px),
    linear-gradient(to right, rgb(201 164 92 / .18) 1px, transparent 1px);
  background-size: 64px 64px, 64px 64px;
  transform: perspective(520px) rotateX(62deg);
  transform-origin: center top;
  animation: hc-grid 2.4s linear infinite;
  mask-image: linear-gradient(to bottom, transparent, #000 25%, #000 70%, transparent);
}
.hc-bar { animation: hc-bar 1.6s cubic-bezier(.2,.7,.2,1) both; animation-delay: var(--d, 0s); }
.hc-ping { animation: hc-ping 1.8s ease-out infinite; }
.hc-scan { animation: hc-scan 5s linear infinite; }
.hc-dash { stroke-dasharray: 6 10; animation: hc-dash 12s linear infinite; }
.hc-spot {
  background: radial-gradient(520px circle at var(--x) var(--y), rgb(5 13 24 / .15), rgb(5 13 24 / .78) 45%, rgb(5 13 24 / .95) 75%);
}
.hc-glass { background: linear-gradient(160deg, rgb(255 255 255 / .09), rgb(255 255 255 / .03)); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
`;

/* ---------- shared bits ---------- */

function MockNav({ light = false }: { light?: boolean }) {
  const link = light ? "text-navy-900/80" : "text-white/80";
  return (
    <div className="absolute inset-x-0 top-0 z-20">
      <div className="container-x flex h-24 items-center justify-between gap-6">
        <Image src="/brand/logo-header.png" alt="Mirsons Global" width={480} height={389} className="h-16 w-auto" />
        <ul className={`hidden items-center gap-7 text-[13.5px] font-medium xl:flex ${link}`}>
          <li>About</li>
          <li>Services</li>
          <li>For Manufacturers</li>
          <li>Industries &amp; Products</li>
          <li>Contact</li>
        </ul>
        <span className={light ? "btn-navy !px-5 !py-2.5" : "btn-gold !px-5 !py-2.5"}>Book a Consultation</span>
      </div>
    </div>
  );
}

function Label({ n, name, idea, light = false }: { n: number; name: string; idea: string; light?: boolean }) {
  return (
    <div className="absolute bottom-6 left-1/2 z-30 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 sm:left-6 sm:translate-x-0">
      <div
        className={`flex items-center gap-3 rounded-full px-4 py-2 text-xs shadow-lg ring-1 ${
          light ? "bg-white text-navy-900 ring-line" : "bg-black/60 text-white ring-white/15 backdrop-blur"
        }`}
      >
        <span className="rounded-full bg-gold-500 px-2 py-0.5 font-bold text-navy-950">0{n}</span>
        <span className="font-semibold">{name}</span>
        <span className={light ? "hidden text-muted sm:inline" : "hidden text-white/60 sm:inline"}>— {idea}</span>
      </div>
    </div>
  );
}

function Ctas({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Link href="/manufacturers#inquiry" className={light ? "btn-navy" : "btn-gold"}>
        Find Buyers for Your Products <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <Link href="/pilot" className={light ? "btn-outline" : "btn-outline-light backdrop-blur-sm"}>
        See the Pilot Programme
      </Link>
    </div>
  );
}

/* ---------- 1. Orbit ---------- */

function Orbit() {
  const nodes = [
    { r: 300, a: 20 }, { r: 300, a: 160 }, { r: 300, a: 250 },
    { r: 370, a: 70 }, { r: 370, a: 200 }, { r: 370, a: 320 },
  ];
  return (
    <section id="concept-1" className="on-dark relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden bg-navy-950 text-white">
      <MockNav />
      <div className="absolute top-1/2 left-1/2 -z-10 h-[900px] w-[900px] -translate-x-1/2 -translate-y-[58%] rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
      {/* Globe + orbits */}
      <div className="pointer-events-none absolute top-[3%] left-1/2 -z-10 w-[min(780px,120vw)] -translate-x-1/2" aria-hidden>
        <div className="relative aspect-square">
          <div className="absolute inset-[22%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_35%_30%,#1d3a5e,#081526_60%,#050d18)] shadow-[0_0_120px_rgba(201,164,92,0.25)] ring-1 ring-gold-500/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/world-map.svg" alt="" className="absolute top-1/2 left-1/2 h-full max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70" style={{ width: "170%" }} />
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_80%,transparent_40%,rgba(5,13,24,0.85))]" />
          </div>
          <svg viewBox="-400 -400 800 800" className="absolute inset-0 h-full w-full">
            <g className="hc-orbit">
              <ellipse rx="300" ry="300" fill="none" stroke="#c9a45c" strokeOpacity="0.25" strokeDasharray="2 8" />
              {nodes.filter((n) => n.r === 300).map((n) => (
                <circle key={n.a} cx={Math.cos((n.a * Math.PI) / 180) * 300} cy={Math.sin((n.a * Math.PI) / 180) * 300} r="5" fill="#e6cf9c" />
              ))}
            </g>
            <g className="hc-orbit-rev">
              <ellipse rx="370" ry="370" fill="none" stroke="#c9a45c" strokeOpacity="0.15" />
              {nodes.filter((n) => n.r === 370).map((n) => (
                <g key={n.a} transform={`translate(${Math.cos((n.a * Math.PI) / 180) * 370} ${Math.sin((n.a * Math.PI) / 180) * 370})`}>
                  <circle r="14" fill="#c9a45c" fillOpacity="0.15" />
                  <circle r="4" fill="#f0e2bf" />
                </g>
              ))}
            </g>
            <ellipse rx="390" ry="110" fill="none" stroke="#c9a45c" strokeOpacity="0.35" transform="rotate(-18)" className="hc-dash" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[62%] bg-gradient-to-t from-navy-950 from-40% via-navy-950/95 to-transparent" aria-hidden />

      <div className="container-x relative mt-auto mb-24 pt-[44vh] text-center sm:pt-[48vh]">
        <p className="rise text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase">International buyer acquisition for manufacturers</p>
        <h1 className="rise mx-auto mt-5 max-w-4xl text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl lg:text-7xl" style={{ "--d": "80ms" } as React.CSSProperties}>
          Your next international buyer is <span className="hc-gold-text italic">already out there</span>
        </h1>
        <p className="rise mx-auto mt-6 max-w-2xl text-white/70 sm:text-lg" style={{ "--d": "160ms" } as React.CSSProperties}>
          We find the importers, distributors and industrial buyers in your target markets — and bring them to the table.
        </p>
        <div className="rise mt-9 flex justify-center" style={{ "--d": "240ms" } as React.CSSProperties}>
          <Ctas />
        </div>
      </div>
      <Label n={1} name="Orbit" idea="Centred statement under a living globe; calm, premium, global." />
    </section>
  );
}

/* ---------- 2. Command Center ---------- */

function CommandCenter() {
  const steps = [
    { name: "Companies researched", value: "148", w: "100%" },
    { name: "Decision-makers reached", value: "96", w: "72%" },
    { name: "Interested & qualified", value: "11", w: "38%" },
    { name: "Meetings booked", value: "4", w: "18%" },
  ];
  const rows = [
    { c: "Falconcrest Coil Processing", k: "UAE · Procurement Manager", s: "Qualified", cl: "bg-emerald-400/15 text-emerald-300" },
    { c: "Azure Dunes Steel Stockholders", k: "Saudi Arabia · Purchasing Director", s: "Meeting set", cl: "bg-gold-500/20 text-gold-300" },
    { c: "Coralgate Metals Trading", k: "Saudi Arabia · General Manager", s: "In talks", cl: "bg-blue-400/15 text-blue-300" },
  ];
  return (
    <section id="concept-2" className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pt-28 pb-24 text-white">
      <MockNav />
      <Image src="/images/steel-mill.webp" alt="" fill quality={50} sizes="100vw" className="-z-20 object-cover opacity-25 blur-[2px]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,#050d18_35%,rgba(5,13,24,0.75)_65%,rgba(5,13,24,0.55))]" aria-hidden />
      <div className="bg-grid absolute inset-0 -z-10 opacity-[0.08] invert" aria-hidden />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] [&>*]:min-w-0">
        <div>
          <p className="rise inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="hc-ping absolute inline-flex h-full w-full rounded-full bg-gold-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            Outbound pipelines for manufacturers
          </p>
          <h1 className="rise mt-6 text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            We Help Manufacturers Find <span className="hc-gold-text">International Buyers</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-white/70 sm:text-lg" style={{ "--d": "160ms" } as React.CSSProperties}>
            Research, outreach, follow-up and qualification — run as one measurable pipeline, so your team only spends time on real buyers.
          </p>
          <div className="rise mt-9" style={{ "--d": "240ms" } as React.CSSProperties}>
            <Ctas />
          </div>
        </div>

        {/* Live pipeline panel */}
        <div className="relative">
          <div className="hc-glass relative overflow-hidden rounded-2xl p-6 ring-1 ring-white/15 shadow-2xl shadow-black/50 sm:p-7">
            <span className="hc-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-gold-400/10 to-transparent" aria-hidden />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[0.18em] text-gold-400 uppercase">Pilot · Stainless steel coils</p>
                <p className="mt-1 font-serif text-xl">UAE &amp; Saudi Arabia</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Live
              </span>
            </div>
            <ul className="mt-6 space-y-4">
              {steps.map((s, i) => (
                <li key={s.name}>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/75">{s.name}</span>
                    <span className="font-semibold">{s.value}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="hc-bar h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-300" style={{ width: s.w, "--d": `${0.3 + i * 0.25}s` } as React.CSSProperties} />
                  </div>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-2.5">
              {rows.map((r) => (
                <li key={r.c} className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{r.c}</span>
                    <span className="block truncate text-xs text-white/55">{r.k}</span>
                  </span>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${r.cl}`}>{r.s}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] text-white/40">Illustrative pilot — fictional companies.</p>
          </div>
          <div className="hc-float absolute -bottom-6 -left-4 hidden rounded-xl bg-gold-500 px-5 py-3 text-navy-950 shadow-xl sm:block">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase">Next step</p>
            <p className="font-serif text-lg font-semibold">Buyer meeting · Thursday</p>
          </div>
        </div>
      </div>
      <Label n={2} name="Command Center" idea="Shows the product itself: a live, measurable buyer pipeline." />
    </section>
  );
}

/* ---------- 3. Trade Lanes ---------- */

function TradeLanes() {
  return (
    <section id="concept-3" className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-white">
      <MockNav />
      {/* Horizon glow + animated perspective floor */}
      <div className="absolute inset-x-0 top-[66%] -z-10 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 top-[56%] -z-10 h-48 bg-[radial-gradient(ellipse_at_center,rgba(201,164,92,0.35),transparent_70%)] blur-2xl" aria-hidden />
      <div className="absolute inset-x-[-50%] top-[66%] bottom-0 -z-10 overflow-hidden" aria-hidden>
        <div className="hc-floor absolute inset-x-0 top-0 h-[160%]" />
      </div>
      {/* Trade-route arcs */}
      <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="absolute inset-x-0 top-[14%] -z-10 h-[38%] w-full opacity-40" aria-hidden>
        <defs>
          <linearGradient id="hc-arc" x1="0" x2="1">
            <stop offset="0" stopColor="#c9a45c" stopOpacity="0" />
            <stop offset="0.5" stopColor="#f0e2bf" />
            <stop offset="1" stopColor="#c9a45c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          "M0,360 C300,40 900,40 1200,360",
          "M100,380 C380,120 820,120 1100,380",
          "M-100,300 C400,0 800,0 1300,300",
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="url(#hc-arc)" strokeWidth={i === 0 ? 1.6 : 1} className="hc-dash" style={{ animationDuration: `${10 + i * 4}s` }} />
        ))}
      </svg>

      <div className="container-x relative z-10 flex flex-1 flex-col items-center justify-center pt-28 text-center">
        <p className="rise text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase">Stainless steel · Copper · Industrial raw materials</p>
        <h1 className="rise mt-6 font-serif text-[2.8rem] leading-[0.98] font-semibold sm:text-7xl lg:text-[6.5rem]" style={{ "--d": "80ms" } as React.CSSProperties}>
          From your factory floor
          <br />
          <span className="hc-gold-text">to foreign buyers.</span>
        </h1>
        <p className="rise mt-7 max-w-2xl text-white/70 sm:text-lg" style={{ "--d": "160ms" } as React.CSSProperties}>
          Mirsons Global builds the trade lanes between manufacturers and the importers, distributors and industrial buyers who need their products.
        </p>
        <div className="rise mt-9" style={{ "--d": "240ms" } as React.CSSProperties}>
          <Ctas />
        </div>
      </div>
      <div className="relative z-10 mb-20 border-y border-white/10 bg-navy-950/60 py-4 backdrop-blur">
        <Marquee
          items={[
            "Stainless Steel Coils", "Stainless Steel Sheets", "Pipes & Tubes", "Stainless Steel Plates",
            "Copper Busbars", "Copper Wire Rods", "Copper Tubes", "Copper Cathodes", "Industrial Raw Materials",
          ]}
        />
      </div>
      <Label n={3} name="Trade Lanes" idea="Futuristic: giant gold type, animated routes and perspective grid." />
    </section>
  );
}

/* ---------- 4. Editorial Mosaic (light) ---------- */

function Mosaic() {
  return (
    <section id="concept-4" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ivory pt-28 pb-24">
      <MockNav light />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/watermark.png" alt="" aria-hidden className="pointer-events-none absolute -bottom-24 -left-32 -z-10 w-[40rem] opacity-25" />
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="line-grow block h-0.5 w-14 bg-gold-500" aria-hidden />
          <p className="rise mt-6 text-xs font-semibold tracking-[0.24em] text-gold-700 uppercase">For manufacturers &amp; exporters</p>
          <h1 className="rise mt-5 text-[2.5rem] leading-[1.05] font-semibold text-navy-900 sm:text-6xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            International buyers for <em className="text-gold-600">stainless steel</em>, <em className="text-gold-600">copper</em> &amp; raw materials.
          </h1>
          <p className="rise mt-6 max-w-xl text-muted sm:text-lg" style={{ "--d": "160ms" } as React.CSSProperties}>
            We research the right importers and distributors, reach the people who decide and arrange qualified meetings with your team.
          </p>
          <div className="rise mt-9" style={{ "--d": "240ms" } as React.CSSProperties}>
            <Ctas light />
          </div>
          <ul className="rise mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-900/80" style={{ "--d": "320ms" } as React.CSSProperties}>
            {["Researched buyer lists", "Decision-maker outreach", "Qualified meetings"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold-600" strokeWidth={2.5} aria-hidden /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="grid h-[34rem] grid-cols-6 grid-rows-6 gap-3 sm:h-[38rem]">
            <div className="photo-zoom relative col-span-3 row-span-4 overflow-hidden rounded-2xl shadow-xl shadow-navy-900/15">
              <Image src="/images/steel-mill.webp" alt="Steel production" fill quality={60} sizes="30vw" className="object-cover" />
            </div>
            <div className="photo-zoom relative col-span-3 row-span-2 overflow-hidden rounded-2xl shadow-xl shadow-navy-900/15">
              <Image src="/images/products/ss-coils.webp" alt="Stainless steel coils" fill quality={60} sizes="30vw" className="object-cover" />
            </div>
            <div className="photo-zoom relative col-span-3 row-span-2 overflow-hidden rounded-2xl shadow-xl shadow-navy-900/15">
              <Image src="/images/products/cu-wire-rods.webp" alt="Copper wire rod coil" fill quality={60} sizes="30vw" className="object-cover" />
            </div>
            <div className="photo-zoom relative col-span-6 row-span-2 overflow-hidden rounded-2xl shadow-xl shadow-navy-900/15">
              <Image src="/images/hero-port.webp" alt="Container port at night" fill quality={60} sizes="55vw" className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-r from-navy-950/70 to-transparent" />
              <span className="absolute bottom-4 left-5 font-serif text-lg text-white">From the factory to the port to the buyer</span>
            </div>
          </div>
          {/* Floating sample-report card */}
          <div className="hc-float absolute top-[46%] -left-6 w-64 rounded-xl bg-white p-4 shadow-2xl shadow-navy-900/25 ring-1 ring-line sm:-left-12">
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-gold-700 uppercase">
              <FileText className="h-3.5 w-3.5" aria-hidden /> Buyer research report
            </p>
            <ul className="mt-3 space-y-2 text-xs">
              {[
                ["Falconcrest Coil Processing", "Qualified", "bg-emerald-50 text-emerald-700"],
                ["Azure Dunes Steel", "Interested", "bg-blue-50 text-blue-700"],
              ].map(([n, s, c]) => (
                <li key={n} className="flex items-center justify-between gap-2">
                  <span className="truncate font-medium text-navy-900">{n}</span>
                  <span className={`rounded-full px-2 py-0.5 ${c}`}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Floating founder chip */}
          <div className="hc-float-slow absolute -top-5 right-4 flex items-center gap-3 rounded-full bg-navy-900 py-2 pr-5 pl-2 text-white shadow-xl">
            <span className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-gold-500">
              <Image src="/images/founder-square.webp" alt="" fill sizes="40px" className="object-cover" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold">Led by Taha Mir</span>
              <span className="text-xs text-white/60">Founder, Mirsons Global</span>
            </span>
          </div>
        </div>
      </div>
      <Label n={4} name="Editorial Mosaic" idea="Light, magazine-like; real photos, report and founder up front." light />
    </section>
  );
}

/* ---------- 5. Cinematic Spotlight ---------- */

function Cinematic() {
  const words = ["Built", "for", "manufacturers", "ready", "to", "export."];
  return (
    <section id="concept-5" className="on-dark relative isolate overflow-hidden bg-navy-950 text-white">
      <Spotlight className="relative flex min-h-[100svh] items-center">
        <MockNav />
        <Image src="/images/steel-mill.webp" alt="" fill quality={60} sizes="100vw" className="ken-burns -z-20 object-cover" />
        <div className="hc-spot absolute inset-0 -z-10" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950 to-transparent" aria-hidden />

        <div className="container-x relative z-10 pt-24">
          <p className="rise flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase">
            <span className="h-px w-10 bg-gold-500" /> Mirsons Global
          </p>
          <h1 className="mt-6 max-w-4xl text-[2.8rem] leading-[1.02] font-semibold sm:text-7xl lg:text-[5.5rem]">
            {words.map((w, i) => (
              <span key={i} className="rise mr-[0.25em] inline-block" style={{ "--d": `${100 + i * 90}ms` } as React.CSSProperties}>
                {w === "export." ? <span className="hc-gold-text">{w}</span> : w}
              </span>
            ))}
          </h1>
          <p className="rise mt-7 max-w-xl text-white/75 sm:text-lg" style={{ "--d": "700ms" } as React.CSSProperties}>
            We find, reach and qualify the international buyers for your products — then put them in a meeting with your team.
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-6" style={{ "--d": "800ms" } as React.CSSProperties}>
            <Ctas />
            <Link href="/how-it-works" className="group hidden items-center gap-3 text-sm text-white/70 hover:text-white lg:inline-flex">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
              How it works
            </Link>
          </div>
        </div>

        <ul className="absolute right-6 bottom-24 z-10 hidden flex-col gap-2 text-right text-xs tracking-[0.2em] text-white/60 uppercase md:flex">
          <li>Stainless steel</li>
          <li>Copper</li>
          <li>Industrial raw materials</li>
        </ul>
        <Label n={5} name="Cinematic Spotlight" idea="Full-bleed photo; a gold spotlight follows the mouse." />
      </Spotlight>
    </section>
  );
}

export default function HeroConceptsPage() {
  const list = [
    ["Orbit", "concept-1"],
    ["Command Center", "concept-2"],
    ["Trade Lanes", "concept-3"],
    ["Editorial Mosaic", "concept-4"],
    ["Cinematic Spotlight", "concept-5"],
  ];
  return (
    <main className="bg-navy-950">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <header className="border-b border-white/10 bg-navy-950 text-white">
        <div className="container-x flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-400 uppercase">Internal preview · not public</p>
            <p className="font-serif text-xl">Mirsons Global — 5 homepage hero concepts</p>
          </div>
          <nav aria-label="Concepts" className="flex flex-wrap gap-2">
            {list.map(([name, id], i) => (
              <a key={id} href={`#${id}`} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:border-gold-500 hover:text-white">
                0{i + 1} {name}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <Orbit />
      <CommandCenter />
      <TradeLanes />
      <Mosaic />
      <Cinematic />
    </main>
  );
}
