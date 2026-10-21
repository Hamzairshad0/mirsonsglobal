// Inline SVG graphics: no extra requests, crisp at any size, themed with the brand colours.

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={`h-3 w-28 text-gold-500 ${className}`} aria-hidden fill="none">
      <path d="M0 6h48M72 6h48" stroke="currentColor" strokeWidth="1" />
      <path d="M60 1l5 5-5 5-5-5z" fill="currentColor" />
      <circle cx="51" cy="6" r="1.2" fill="currentColor" />
      <circle cx="69" cy="6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function Node({ x, label, sub, children }: { x: number; label: string; sub: string; children: React.ReactNode }) {
  return (
    <g transform={`translate(${x} 110)`}>
      <circle r="44" fill="#0d1f35" stroke="#c9a45c" strokeOpacity="0.5" />
      <g transform="translate(-14 -14)" stroke="#d8b978" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
      <text y="76" textAnchor="middle" fill="#ffffff" fontSize="15" fontFamily="var(--font-playfair), Georgia, serif" fontWeight="600">
        {label}
      </text>
      <text y="96" textAnchor="middle" fill="#ffffff" fillOpacity="0.55" fontSize="11.5" fontFamily="var(--font-inter), sans-serif">
        {sub}
      </text>
    </g>
  );
}

/** Manufacturer → Mirsons Global → Buyer, with flowing connections. */
export function MatchmakingDiagram({ className = "" }: { className?: string }) {
  const steps = ["Research", "Outreach", "Qualify", "Meet"];
  return (
    <svg
      viewBox="0 0 760 240"
      className={className}
      role="img"
      aria-label="Mirsons Global connects manufacturers and buyers through research, outreach, qualification and meetings"
    >
      <defs>
        <linearGradient id="mg-gold" x1="0" x2="1">
          <stop offset="0" stopColor="#ad8942" />
          <stop offset="0.5" stopColor="#f0e2bf" />
          <stop offset="1" stopColor="#ad8942" />
        </linearGradient>
      </defs>

      {/* connections */}
      <g stroke="url(#mg-gold)" strokeWidth="1.6" fill="none">
        <path className="dash-flow" d="M144 110 C 220 60, 270 60, 334 104" />
        <path className="dash-flow" d="M144 110 C 220 160, 270 160, 334 116" style={{ animationDirection: "reverse" }} />
        <path className="dash-flow" d="M426 104 C 490 60, 540 60, 616 110" />
        <path className="dash-flow" d="M426 116 C 490 160, 540 160, 616 110" style={{ animationDirection: "reverse" }} />
      </g>

      {/* step labels along the routes */}
      {steps.map((s, i) => {
        const x = [215, 270, 490, 545][i];
        const y = i % 2 === 0 ? 58 : 172;
        return (
          <g key={s} transform={`translate(${x} ${y})`}>
            <rect x="-38" y="-12" width="76" height="24" rx="12" fill="#081526" stroke="#c9a45c" strokeOpacity="0.45" />
            <text textAnchor="middle" y="4" fill="#e6cf9c" fontSize="11" fontFamily="var(--font-inter), sans-serif" letterSpacing="0.6">
              {s.toUpperCase()}
            </text>
          </g>
        );
      })}

      <Node x={100} label="Manufacturer" sub="Products & capacity">
        <path d="M2 26V12l7 5V12l7 5V6h10v20z" />
        <path d="M6 22h3M13 22h3M20 22h3" />
      </Node>

      {/* centre hub */}
      <g transform="translate(380 110)">
        <circle className="pulse-ring" r="52" fill="none" stroke="#c9a45c" strokeOpacity="0.6" />
        <circle r="52" fill="#081526" stroke="url(#mg-gold)" strokeWidth="2" />
        <text y="12" textAnchor="middle" fill="url(#mg-gold)" fontSize="38" fontFamily="var(--font-playfair), Georgia, serif" fontWeight="700">
          M
        </text>
        <text y="86" textAnchor="middle" fill="#ffffff" fontSize="15" fontFamily="var(--font-playfair), Georgia, serif" fontWeight="600">
          Mirsons Global
        </text>
        <text y="106" textAnchor="middle" fill="#ffffff" fillOpacity="0.55" fontSize="11.5" fontFamily="var(--font-inter), sans-serif">
          Matchmaking & qualification
        </text>
      </g>

      <Node x={660} label="Buyer" sub="Importer · Distributor">
        <path d="M3 9h22l-2 14H5z" />
        <path d="M9 9V6a5 5 0 0 1 10 0v3" />
      </Node>
    </svg>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((m) => (
        <li key={m} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-serif text-lg text-white/80 sm:text-xl">{m}</span>
          <svg viewBox="0 0 10 10" className="h-2 w-2 text-gold-500" aria-hidden>
            <path d="M5 0l5 5-5 5-5-5z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track flex w-max">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
