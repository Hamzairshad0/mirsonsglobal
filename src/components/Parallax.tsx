/**
 * Background layer that moves slower than the page while scrolling (see ParallaxController).
 * It is taller than its section so the edges never show; the section needs `relative isolate overflow-hidden`.
 * `speed` 0.1–0.3 is subtle; negative values move the other way.
 */
export function Parallax({
  speed = 0.2,
  className = "-z-20",
  children,
}: {
  speed?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-parallax={speed} className={`pointer-events-none absolute inset-x-0 -top-[18%] -bottom-[18%] will-change-transform ${className}`} aria-hidden>
      {children}
    </div>
  );
}
