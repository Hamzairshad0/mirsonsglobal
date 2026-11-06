"use client";

import { useEffect } from "react";

// Only the hero on screen animates: the others get no data-active and their CSS animations stay paused.
export function ActiveSections() {
  useEffect(() => {
    // The negative margin keeps a hero that only touches the viewport edge paused.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute("data-active", e.isIntersecting);
      },
      { rootMargin: "-4px 0px" },
    );
    document.querySelectorAll("[data-hc]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
