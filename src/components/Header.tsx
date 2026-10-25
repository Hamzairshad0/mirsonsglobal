"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
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
              const active = item.children
                ? item.children.some((c) => pathname === c.href || pathname.startsWith(`${c.href}/`))
                : pathname === item.href;
              const linkClass = `relative inline-flex items-center gap-1 text-[13.5px] font-medium transition-colors ${
                active ? "text-gold-400" : "text-white/85 hover:text-white"
              }`;
              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                // Opens on hover and on keyboard focus (focus-within); no JavaScript needed
                <li key={item.href} className="group relative">
                  <Link href={item.href} aria-haspopup="true" className={linkClass}>
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
                  </Link>
                  <div className="invisible absolute top-full left-1/2 z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="overflow-hidden rounded-xl border border-white/10 bg-navy-950/98 p-2 shadow-2xl shadow-black/40 backdrop-blur">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            aria-current={pathname === c.href ? "page" : undefined}
                            className="block rounded-lg px-4 py-3 transition-colors hover:bg-white/5 focus-visible:bg-white/5"
                          >
                            <span className={`block text-sm font-medium ${pathname === c.href ? "text-gold-400" : "text-white"}`}>{c.label}</span>
                            {c.note && <span className="mt-0.5 block text-xs text-white/50">{c.note}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
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
            {NAV.map((item) =>
              item.children ? (
                <li key={item.href} className="border-b border-white/10 py-4">
                  <span className="block text-xs font-semibold tracking-[0.18em] text-gold-400 uppercase">{item.label}</span>
                  <ul className="mt-2">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className={`block py-2 pl-3 text-lg ${pathname === c.href ? "text-gold-400" : "text-white"}`}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block border-b border-white/10 py-4 text-lg ${pathname === item.href ? "text-gold-400" : "text-white"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
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
