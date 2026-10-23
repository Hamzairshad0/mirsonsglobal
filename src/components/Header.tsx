"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-white/10 bg-navy-950/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between gap-6 transition-[height] duration-300 ${
          solid ? "h-20" : "h-20 lg:h-28"
        }`}
      >
        <Logo compact={solid} />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative text-[13.5px] font-medium transition-colors ${
                      active ? "text-gold-400" : "text-white/85 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact#consultation" className="btn-gold hidden !px-5 !py-2.5 sm:inline-flex">
            Book a Consultation
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 xl:hidden">
          <ul className="container-x flex flex-col py-4">
            <li>
              <Link href="/" className="block border-b border-white/10 py-4 text-lg text-white">
                Home
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block border-b border-white/10 py-4 text-lg ${
                    pathname === item.href ? "text-gold-400" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link href="/contact#consultation" className="btn-gold w-full">
                Book a Consultation
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
