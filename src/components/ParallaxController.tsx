"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One passive scroll listener + requestAnimationFrame for every [data-parallax] element.
// Only elements currently on screen are updated, and only `transform` changes, so it stays cheap.
// Disabled for visitors who prefer reduced motion.
export function ParallaxController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    if (els.length === 0) return;

    const visible = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? visible.add(e.target as HTMLElement) : visible.delete(e.target as HTMLElement))),
      { rootMargin: "20% 0px" }
    );
    els.forEach((el) => io.observe(el));

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      visible.forEach((el) => {
        const host = el.parentElement ?? el;
        const r = host.getBoundingClientRect();
        // -1 when the section enters at the bottom, 0 when centred, +1 when it leaves at the top
        const progress = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
        const speed = Number(el.dataset.parallax) || 0.2;
        const shift = Math.max(-1, Math.min(1, progress)) * speed * Math.min(r.height, vh) * 0.5;
        el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
