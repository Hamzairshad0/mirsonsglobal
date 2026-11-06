import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// Internal preview of five alternative homepage heroes. Not linked anywhere, not in the sitemap, noindex.
export const metadata: Metadata = {
  title: "Hero concepts (internal preview)",
  robots: { index: false, follow: false, nocache: true },
};

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const CSS = `
@keyframes hc-spin { to { transform: rotate(360deg); } }
@keyframes hc-ping { 0% { transform: scale(1); opacity: .8 } 100% { transform: scale(2.4); opacity: 0 } }
@keyframes hc-shimmer { to { background-position: 200% center; } }
@keyframes hc-draw { 0% { stroke-dashoffset: 1; opacity: 0 } 8% { opacity: 1 } 55% { stroke-dashoffset: 0; opacity: 1 } 85%, 100% { stroke-dashoffset: 0; opacity: 0 } }
@keyframes hc-land { 0%, 50% { opacity: 0; transform: scale(.4) } 58% { opacity: 1; transform: scale(1.3) } 66%, 80% { opacity: 1; transform: scale(1) } 92%, 100% { opacity: 0 } }
@keyframes hc-turn { to { background-position: 540px 0; } }
@keyframes hc-row { to { transform: translateX(-50%); } }
@keyframes hc-blob { 0% { transform: translate(0,0) scale(1) } 50% { transform: translate(-9%,7%) scale(1.18) } 100% { transform: translate(5%,-5%) scale(.92) } }
@keyframes hc-sheen { from { background-position: 160% 0, 0 0; } to { background-position: -60% 0, 0 0; } }
@keyframes hc-scanline { 0% { transform: translateY(6rem); opacity: 0 } 10% { opacity: 1 } 90% { opacity: 1 } 100% { transform: translateY(100svh); opacity: 0 } }
@keyframes hc-cycle { 0% { opacity: 0; transform: translateY(8px) } 4%, 30% { opacity: 1; transform: none } 34%, 100% { opacity: 0; transform: translateY(-8px) } }
@keyframes hc-blink { 50% { opacity: 0 } }

.hc-rotate { animation: hc-spin 26s linear infinite; }
.hc-ping { animation: hc-ping 2s ease-out infinite; }
.hc-gold-text {
  background: linear-gradient(100deg, #ad8942 0%, #f0e2bf 25%, #c9a45c 50%, #f0e2bf 75%, #ad8942 100%);
  background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: hc-shimmer 8s linear infinite;
}
.hc-grain { background-image: ${GRAIN}; opacity: .07; mix-blend-mode: overlay; }
.hc-glass { background: linear-gradient(160deg, rgb(255 255 255 / .10), rgb(255 255 255 / .03)); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }

/* 01 Horizon */
.hc-planet {
  background: radial-gradient(circle at 50% 0%, #12305a 0%, #081a33 22%, #040b16 55%);
  box-shadow: 0 0 0 1px rgb(240 226 191 / .45), 0 -10px 60px -6px rgb(201 164 92 / .65), 0 -40px 220px 10px rgb(201 164 92 / .22), inset 0 40px 90px -40px rgb(240 226 191 / .55);
}
.hc-planet-dots {
  background-image: radial-gradient(rgb(216 185 120 / .55) 1.1px, transparent 1.6px);
  background-size: 18px 18px;
  -webkit-mask-image: radial-gradient(circle at 50% 0%, #000 0%, transparent 34%);
  mask-image: radial-gradient(circle at 50% 0%, #000 0%, transparent 34%);
  animation: hc-turn 40s linear infinite;
}
.hc-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hc-draw 7s ease-in-out infinite; animation-delay: var(--d); }
.hc-land { transform-box: fill-box; transform-origin: center; opacity: 0; animation: hc-land 7s ease-out infinite; animation-delay: var(--d); }

/* 02 Triptych */
@media (min-width: 1024px) {
  .hc-panels > * { flex: 1 1 0%; transition: flex-grow .8s cubic-bezier(.2,.7,.2,1); }
  .hc-panels > *:hover, .hc-panels:not(:hover) > *:first-child { flex-grow: 2.6; }
  .hc-panels .hc-reveal { max-height: 0; opacity: 0; transform: translateY(10px); transition: all .6s cubic-bezier(.2,.7,.2,1); }
  .hc-panels > *:hover .hc-reveal, .hc-panels:not(:hover) > *:first-child .hc-reveal { max-height: 12rem; opacity: 1; transform: none; transition-delay: .15s; }
  .hc-panels > *:hover .hc-img, .hc-panels:not(:hover) > *:first-child .hc-img { transform: scale(1); filter: none; }
}
.hc-img { transform: scale(1.12); transition: transform 1.4s cubic-bezier(.2,.7,.2,1), filter .8s; }

/* 03 Arch */
.hc-outline { -webkit-text-stroke: 1px rgb(173 137 66 / .45); color: transparent; }
.hc-row { animation: hc-row 70s linear infinite; }
.hc-row-rev { animation-direction: reverse; animation-duration: 90s; }

/* 04 Liquid metal */
.hc-blob { animation: hc-blob 16s ease-in-out infinite alternate; will-change: transform; }
.hc-blob-2 { animation-duration: 21s; animation-delay: -7s; }
.hc-blob-3 { animation-duration: 26s; animation-delay: -13s; }
.hc-metal {
  background-image:
    linear-gradient(100deg, transparent 38%, rgb(255 255 255 / .85) 50%, transparent 62%),
    linear-gradient(180deg, #fff6dc 0%, #e6cf9c 28%, #8a6b30 52%, #d8b978 70%, #fff1cc 100%);
  background-size: 260% 100%, 100% 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: hc-sheen 6s ease-in-out infinite;
}

/* 05 Signal (HUD) */
.hc-hudgrid {
  background-image: linear-gradient(rgb(230 207 156 / .07) 1px, transparent 1px), linear-gradient(90deg, rgb(230 207 156 / .07) 1px, transparent 1px);
  background-size: 72px 72px;
  -webkit-mask-image: linear-gradient(90deg, transparent 30%, #000 75%);
  mask-image: linear-gradient(90deg, transparent 30%, #000 75%);
}
.hc-scanline { animation: hc-scanline 7s linear infinite; }
.hc-cycle { opacity: 0; animation: hc-cycle 9s infinite; animation-delay: var(--d); }
.hc-blink { animation: hc-blink 1.1s steps(1) infinite; }
`;

/* ---------- shared bits ---------- */

const LINKS = ["About", "Services", "For Manufacturers", "Industries & Products", "Contact"];

function Nav({ light = false }: { light?: boolean }) {
  return (
    <div className="absolute inset-x-0 top-0 z-30">
      <div className="container-x flex h-24 items-center justify-between gap-6">
        <Image src="/brand/logo-header.png" alt="Mirsons Global" width={480} height={389} className="h-14 w-auto" />
        <ul
          className={`hidden items-center gap-1 rounded-full border p-1.5 text-[13px] font-medium backdrop-blur-md xl:flex ${
            light ? "border-navy-900/10 bg-white/60 text-navy-900/75" : "border-white/10 bg-white/[0.04] text-white/75"
          }`}
        >
          {LINKS.map((l, i) => (
            <li key={l} className={`rounded-full px-4 py-2 ${i === 0 ? (light ? "bg-navy-900 text-white" : "bg-white/10 text-white") : ""}`}>
              {l}
            </li>
          ))}
        </ul>
        <span className={`${light ? "btn-navy" : "btn-gold"} !rounded-full !px-5 !py-2.5`}>Book a Consultation</span>
      </div>
    </div>
  );
}

function Tag({ n, name, light = false, className = "right-5 bottom-4 sm:right-8" }: { n: number; name: string; light?: boolean; className?: string }) {
  return (
    <p
      className={`absolute z-30 text-[10px] font-semibold tracking-[0.3em] uppercase ${className} ${
        light ? "text-navy-900/35" : "text-white/35"
      }`}
    >
      Concept 0{n} — {name}
    </p>
  );
}

function Ctas({ light = false, center = false, stack = false }: { light?: boolean; center?: boolean; stack?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${center ? "sm:justify-center" : ""} ${stack ? "lg:flex-col lg:items-start" : ""}`}>
      <Link href="/manufacturers#inquiry" className={light ? "btn-navy" : "btn-gold"}>
        Find Buyers for Your Products <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <Link href="/pilot" className={light ? "btn-outline" : "btn-outline-light backdrop-blur-sm"}>
        See the Pilot Programme
      </Link>
    </div>
  );
}

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

/* ---------- 01 Horizon: a planet rising, with trade routes launching from home ---------- */

const R = 1000;
const onPlanet = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [R * Math.sin(a), -R * Math.cos(a)] as const;
};
const ORIGIN = -4;
const ROUTES = [-27, -15, 9, 18, 27].map((to, i) => {
  const [x1, y1] = onPlanet(ORIGIN);
  const [x2, y2] = onPlanet(to);
  const [mx, my] = onPlanet((ORIGIN + to) / 2);
  const lift = 1 + ((Math.abs(to - ORIGIN) * Math.PI) / 180) * 0.3;
  return {
    d: `M${x1.toFixed(1)},${y1.toFixed(1)} Q${(mx * lift).toFixed(1)},${(my * lift).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`,
    end: [x2, y2] as const,
    delay: `${(i * 1.3).toFixed(1)}s`,
  };
});
const STARS = Array.from({ length: 80 }, (_, i) => {
  const x = (i * 73.7) % 100;
  const y = (i * 41.3 + (i % 7) * 9) % 64;
  const a = 0.15 + ((i * 17) % 10) / 22;
  return `${x.toFixed(2)}vw ${y.toFixed(2)}vh 0 ${i % 6 === 0 ? "1px" : "0"} rgb(255 255 255 / ${a.toFixed(2)})`;
}).join(",");

function Horizon() {
  const [ox, oy] = onPlanet(ORIGIN);
  return (
    <section id="concept-1" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#03080f] text-white">
      <Nav />
      <span className="absolute top-0 left-0 -z-20 h-px w-px" style={{ boxShadow: STARS }} aria-hidden />

      <div
        className="hc-planet absolute top-[calc(100%-30vh)] left-1/2 -z-10 aspect-square w-[190vw] -translate-x-1/2 rounded-full sm:top-[calc(100%-38vh)]"
        aria-hidden
      >
        <div className="hc-planet-dots absolute inset-0 rounded-full" />
        <svg viewBox="-1000 -1000 2000 2000" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="hc-route">
              <stop offset="0" stopColor="#c9a45c" stopOpacity="0.15" />
              <stop offset="0.5" stopColor="#f0e2bf" />
              <stop offset="1" stopColor="#c9a45c" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="hc-glow">
              <stop offset="0" stopColor="#f0e2bf" />
              <stop offset="1" stopColor="#c9a45c" stopOpacity="0" />
            </radialGradient>
          </defs>
          {ROUTES.map((r) => (
            <g key={r.d}>
              <path d={r.d} pathLength={1} fill="none" stroke="url(#hc-route)" strokeWidth="1.8" strokeLinecap="round" className="hc-draw" style={d(r.delay)} />
              <circle cx={r.end[0]} cy={r.end[1]} r="9" fill="url(#hc-glow)" className="hc-land" style={d(r.delay)} />
            </g>
          ))}
          <circle cx={ox} cy={oy} r="16" fill="url(#hc-glow)" />
          <circle cx={ox} cy={oy} r="3.5" fill="#fff6dc" />
        </svg>
        <p className="absolute top-[7vh] left-1/2 -translate-x-1/2 text-center text-[10px] font-semibold tracking-[0.35em] whitespace-nowrap text-gold-300/70 uppercase sm:top-[13vh] sm:text-[11px]">
          Stainless steel · Copper · Industrial raw materials
        </p>
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col items-center justify-center pt-28 pb-[34vh] text-center sm:pb-[42vh]">
        <p className="rise inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-white/75 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="hc-ping absolute inline-flex h-full w-full rounded-full bg-gold-400" />
            <span className="relative h-2 w-2 rounded-full bg-gold-400" />
          </span>
          International buyer acquisition for manufacturers
        </p>
        <h1 className="rise mt-6 text-[2.9rem] leading-[0.98] font-semibold tracking-[-0.01em] sm:text-7xl lg:text-[5.6rem]" style={d("80ms")}>
          Your factory.
          <br />
          <span className="hc-gold-text">The world&apos;s buyers.</span>
        </h1>
        <p className="rise mt-6 max-w-xl text-white/65 sm:text-lg" style={d("160ms")}>
          We find, reach and qualify the international buyers for what you make — and put them in a meeting with your team.
        </p>
        <div className="rise mt-9" style={d("240ms")}>
          <Ctas center />
        </div>
      </div>
      <Tag n={1} name="Horizon" />
    </section>
  );
}

/* ---------- 02 Triptych: three materials as expanding panels ---------- */

const MATERIALS = [
  {
    name: "Stainless Steel",
    image: "/images/products/stainless-steel.webp",
    items: ["Sheets", "Coils", "Pipes & Tubes", "Plates"],
    gray: true,
  },
  { name: "Copper", image: "/images/products/copper.webp", items: ["Busbars", "Wire Rods", "Tubes & Pipes", "Cathodes"] },
  {
    name: "Industrial Raw Materials",
    image: "/images/products/raw-materials.webp",
    items: ["Selected materials", "Assessed case by case"],
  },
];

function Triptych() {
  return (
    <section id="concept-2" className="on-dark relative isolate flex min-h-[100svh] flex-col bg-navy-950 text-white lg:flex-row">
      <Nav />
      <div className="relative z-10 flex flex-col justify-center px-5 pt-32 pb-12 sm:px-8 lg:w-[42%] lg:pt-24 lg:pr-14 lg:pb-24 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <span className="hc-grain pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <p className="rise eyebrow">Three focus industries</p>
        <h1 className="rise mt-6 text-[2.8rem] leading-[1] font-semibold sm:text-6xl lg:text-[4.4rem]" style={d("80ms")}>
          Three materials.
          <br />
          <span className="hc-gold-text italic">One global pipeline.</span>
        </h1>
        <p className="rise mt-6 max-w-md text-white/65 sm:text-lg" style={d("160ms")}>
          We connect manufacturers with qualified importers, distributors and industrial buyers abroad.
        </p>
        <div className="rise mt-9" style={d("240ms")}>
          <Ctas stack />
        </div>
        <p className="mt-10 hidden items-center gap-2 text-xs tracking-[0.2em] text-white/40 uppercase lg:flex">
          <span className="h-px w-8 bg-white/30" /> Hover a material
        </p>
      </div>

      <div className="hc-panels flex flex-col lg:w-[58%] lg:flex-row">
        {MATERIALS.map((m, i) => (
          <Link
            key={m.name}
            href="/industries"
            className="group relative flex min-h-44 flex-col justify-end overflow-hidden border-white/10 p-6 sm:min-h-56 lg:min-h-0 lg:border-l lg:px-6 lg:pb-10"
          >
            <Image
              src={m.image}
              alt=""
              fill
              quality={60}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className={`hc-img -z-10 object-cover ${m.gray ? "grayscale" : ""} lg:brightness-75`}
            />
            <span className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/20" aria-hidden />
            <span className="absolute inset-x-0 top-0 -z-10 hidden h-32 bg-gradient-to-b from-navy-950/80 to-transparent lg:block" aria-hidden />
            <span className="flex items-center justify-between gap-3">
              <span className="font-serif text-sm text-gold-400">0{i + 1}</span>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </span>
            <span className="mt-3 font-serif text-2xl leading-tight font-semibold lg:text-[1.7rem]">{m.name}</span>
            <span className="hc-reveal block overflow-hidden">
              <span className="mt-4 flex flex-wrap gap-2">
                {m.items.map((it) => (
                  <span key={it} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs whitespace-nowrap text-white/80 backdrop-blur">
                    {it}
                  </span>
                ))}
              </span>
            </span>
          </Link>
        ))}
      </div>
      <Tag n={2} name="Triptych" className="top-28 right-8 hidden lg:block" />
    </section>
  );
}

/* ---------- 03 Arch: light, luxurious, editorial ---------- */

function Arch() {
  const row = "Stainless Steel · Copper · Raw Materials · ";
  return (
    <section id="concept-3" className="relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden bg-ivory text-navy-900">
      <Nav light />
      {[
        { top: "top-[16%]", cls: "hc-row" },
        { top: "top-[60%] hidden sm:block", cls: "hc-row hc-row-rev" },
      ].map((r) => (
        <div key={r.top} className={`pointer-events-none absolute inset-x-0 ${r.top} -z-10 overflow-hidden`} aria-hidden>
          <div className={`${r.cls} flex w-max`}>
            {[0, 1].map((k) => (
              <span key={k} className="hc-outline pr-[0.3em] font-serif text-[22vw] leading-none whitespace-nowrap italic lg:text-[12rem]">
                {row}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-28 pb-14">
        <div className="rise relative">
          <span className="absolute -inset-3 rounded-t-full border border-b-0 border-gold-500/50 sm:-inset-4" aria-hidden />
          <div className="relative h-[36vh] w-[min(24rem,68vw)] overflow-hidden rounded-t-full shadow-2xl shadow-navy-900/25 sm:h-[46vh]">
            <Image src="/images/products/cu-cathodes.webp" alt="Copper cathodes" fill quality={62} sizes="(min-width: 640px) 24rem, 68vw" className="ken-burns object-cover" />
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ivory via-ivory/40 to-transparent" aria-hidden />
          </div>
          {/* Rotating seal */}
          <div className="absolute top-6 -right-12 h-28 w-28 sm:top-10 sm:-right-24 sm:h-40 sm:w-40">
            <svg viewBox="0 0 200 200" className="hc-rotate absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <path id="hc-ring" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
              </defs>
              <text fill="#0f1b2a" fontSize="13.5" fontWeight="600" letterSpacing="3">
                <textPath href="#hc-ring" textLength="498" lengthAdjust="spacing">
                  BUYER ACQUISITION • MATCHMAKING • SOURCING •
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-[24%] grid place-items-center rounded-full bg-navy-900 shadow-lg ring-1 ring-gold-500/50">
              <Image src="/brand/logo-mark.png" alt="" width={360} height={257} className="w-3/5" />
            </span>
          </div>
        </div>

        <h1 className="rise relative -mt-[0.55em] text-center text-[17vw] leading-[0.92] font-semibold tracking-[-0.02em] sm:text-[7.5rem] lg:text-[9rem]" style={d("100ms")}>
          Built to <em className="text-gold-600">export.</em>
        </h1>
        <p className="rise mt-5 max-w-lg text-center text-muted sm:text-lg" style={d("180ms")}>
          International buyers for stainless steel, copper and industrial raw materials — researched, reached and qualified.
        </p>
        <div className="rise mt-8" style={d("260ms")}>
          <Ctas light center />
        </div>
      </div>
      <Tag n={3} name="Arch" light />
    </section>
  );
}

/* ---------- 04 Liquid Metal: molten gradients and giant metallic type ---------- */

function LiquidMetal() {
  const steps = [
    { t: "Research", s: "We map the companies that import what you make." },
    { t: "Outreach", s: "We reach the people who actually decide." },
    { t: "Meetings", s: "You only talk to qualified, interested buyers." },
  ];
  return (
    <section id="concept-4" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-white">
      <Nav />
      <div className="absolute inset-0 -z-20" aria-hidden>
        <span className="hc-blob absolute -top-[18%] -right-[12%] h-[60vw] max-h-[900px] w-[60vw] max-w-[900px] rounded-full bg-[#e0a447]/35 blur-[120px]" />
        <span className="hc-blob hc-blob-2 absolute -bottom-[25%] left-[18%] h-[48vw] max-h-[760px] w-[48vw] max-w-[760px] rounded-full bg-[#c4602c]/45 blur-[120px]" />
        <span className="hc-blob hc-blob-3 absolute top-[25%] -left-[18%] h-[42vw] max-h-[680px] w-[42vw] max-w-[680px] rounded-full bg-navy-500/70 blur-[110px]" />
      </div>
      <div className="hc-grain pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="container-x pointer-events-none absolute inset-y-0 left-0 right-0 -z-10 grid grid-cols-4" aria-hidden>
        {[0, 1, 2, 3].map((k) => (
          <span key={k} className="border-l border-white/[0.06] last:border-r" />
        ))}
      </div>

      <div className="container-x relative flex flex-1 flex-col justify-end pt-32 pb-12">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <h1 className="rise text-[18vw] leading-[0.86] font-semibold tracking-[-0.03em] sm:text-[8.5rem] lg:col-span-8 lg:text-[9.6rem]">
            Sell
            <br />
            beyond
            <br />
            <span className="hc-metal pr-2 italic">borders.</span>
          </h1>
          <div className="rise lg:col-span-4 lg:pb-5" style={d("160ms")}>
            <p className="max-w-sm text-white/70 sm:text-lg">
              Mirsons Global finds international buyers for manufacturers of stainless steel, copper and industrial raw materials.
            </p>
            <div className="mt-7">
              <Ctas stack />
            </div>
          </div>
        </div>
        <ol className="rise mt-12 grid grid-cols-3 border-t border-white/15 sm:mt-16" style={d("260ms")}>
          {steps.map((s, i) => (
            <li key={s.t} className="pt-5 pr-4 sm:pr-8">
              <span className="font-serif text-sm text-gold-400">0{i + 1}</span>
              <span className="ml-2 text-sm font-semibold sm:ml-3 sm:text-base">{s.t}</span>
              <p className="mt-2 hidden text-sm leading-relaxed text-white/55 sm:block">{s.s}</p>
            </li>
          ))}
        </ol>
      </div>
      <Tag n={4} name="Liquid Metal" />
    </section>
  );
}

/* ---------- 05 Signal: night port with a buyer-tracking HUD ---------- */

const SIGNALS = [
  { k: "Buyer identified", v: "Steel stockholder · UAE" },
  { k: "Decision-maker reached", v: "Purchasing Director" },
  { k: "Meeting booked", v: "Video call · Thursday" },
];

function Signal() {
  const corner = "absolute h-6 w-6 border-gold-400/70";
  return (
    <section id="concept-5" className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-white">
      <Nav />
      <Image src="/images/port-cranes-night.webp" alt="" fill quality={60} sizes="100vw" className="ken-burns -z-30 object-cover object-[65%_50%]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#050d18_0%,rgba(5,13,24,0.82)_38%,rgba(5,13,24,0.2)_72%,rgba(5,13,24,0.45)_100%)]" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-20 h-2/3 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-20 h-40 bg-gradient-to-b from-navy-950/90 to-transparent" aria-hidden />
      <div className="hc-hudgrid absolute inset-0 -z-10" aria-hidden />
      <span className="hc-scanline absolute inset-x-0 top-0 -z-10 h-px bg-gold-300/60 shadow-[0_0_24px_rgba(230,207,156,0.9)]" aria-hidden />

      {/* Frame */}
      <div className="pointer-events-none absolute inset-x-4 top-24 bottom-4 -z-10 sm:inset-x-6 sm:bottom-6" aria-hidden>
        <span className={`${corner} top-0 left-0 border-t border-l`} />
        <span className={`${corner} top-0 right-0 border-t border-r`} />
        <span className={`${corner} bottom-0 left-0 border-b border-l`} />
        <span className={`${corner} right-0 bottom-0 border-r border-b`} />
      </div>

      {/* Readout */}
      <div className="absolute top-32 right-10 z-10 hidden text-right font-mono text-[10px] leading-6 tracking-[0.22em] text-white/55 uppercase md:block" aria-hidden>
        <p>
          <span className="text-gold-300">●</span> Live buyer search<span className="hc-blink">_</span>
        </p>
        <p>Importers · Distributors · End users</p>
        <p>Stainless steel · Copper · Raw materials</p>
      </div>

      {/* Target */}
      <div className="absolute top-[17%] left-1/2 z-10 -translate-x-1/2 sm:top-[40%] sm:left-[62%] sm:translate-x-0" aria-hidden>
        <div className="relative grid h-20 w-20 place-items-center sm:h-24 sm:w-24">
          <span className="hc-ping absolute inset-0 rounded-full border border-gold-400/60" />
          <span className="absolute inset-0 rounded-full border border-gold-300/70" />
          <span className="hc-rotate absolute inset-3 rounded-full border border-dashed border-gold-300/50" />
          <span className="absolute -top-3 left-1/2 h-4 w-px bg-gold-300" />
          <span className="absolute -bottom-3 left-1/2 h-4 w-px bg-gold-300" />
          <span className="absolute top-1/2 -left-3 h-px w-4 bg-gold-300" />
          <span className="absolute top-1/2 -right-3 h-px w-4 bg-gold-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold-200 shadow-[0_0_14px_#e6cf9c]" />
        </div>
        <div className="hc-glass absolute top-[calc(100%+18px)] left-1/2 h-16 w-60 -translate-x-1/2 overflow-hidden rounded-lg ring-1 ring-white/15 sm:top-1/2 sm:left-[calc(100%+28px)] sm:translate-x-0 sm:-translate-y-1/2">
          {SIGNALS.map((s, i) => (
            <div key={s.k} className="hc-cycle absolute inset-0 flex flex-col justify-center px-4" style={d(`${i * 3}s`)}>
              <span className="font-mono text-[10px] tracking-[0.2em] text-gold-300 uppercase">{s.k}</span>
              <span className="mt-0.5 text-sm font-semibold">{s.v}</span>
            </div>
          ))}
        </div>
        <span className="absolute top-1/2 left-full hidden h-px w-7 bg-gold-300/60 sm:block" />
      </div>

      <div className="container-x relative z-10 mt-auto pt-[46vh] pb-16 sm:pt-40 sm:pb-20">
        <p className="rise font-mono text-[11px] tracking-[0.25em] text-gold-300 uppercase">{"// Buyer acquisition for manufacturers"}</p>
        <h1 className="rise mt-5 max-w-4xl text-[2.7rem] leading-[1] font-semibold sm:text-6xl lg:text-[5.4rem]" style={d("80ms")}>
          Every port has a buyer.
          <br />
          <span className="hc-gold-text">We find yours.</span>
        </h1>
        <p className="rise mt-6 max-w-xl text-white/70 sm:text-lg" style={d("160ms")}>
          Research, outreach and qualification — until a real buyer is in a meeting with your team.
        </p>
        <div className="rise mt-9" style={d("240ms")}>
          <Ctas />
        </div>
      </div>
      <Tag n={5} name="Signal" className="right-12 bottom-9 sm:right-14 sm:bottom-11" />
    </section>
  );
}

export default function HeroConceptsPage() {
  const list = ["Horizon", "Triptych", "Arch", "Liquid Metal", "Signal"];
  return (
    <main className="bg-navy-950">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <header className="border-b border-white/10 bg-navy-950 text-white">
        <div className="container-x flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-400 uppercase">Internal preview · not public</p>
            <p className="font-serif text-xl">Mirsons Global — homepage hero concepts</p>
          </div>
          <nav aria-label="Concepts" className="flex flex-wrap gap-2">
            {list.map((name, i) => (
              <a
                key={name}
                href={`#concept-${i + 1}`}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:border-gold-500 hover:text-white"
              >
                0{i + 1} {name}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <Horizon />
      <Triptych />
      <Arch />
      <LiquidMetal />
      <Signal />
    </main>
  );
}
