"use client";

import { useRef } from "react";

// Concept 5: a gold spotlight that follows the pointer (CSS variables only, no re-renders).
export function Spotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={className}
      style={{ "--x": "65%", "--y": "45%" } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
