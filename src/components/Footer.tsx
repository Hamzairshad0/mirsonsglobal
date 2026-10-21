import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Settings } from "@/lib/content-schema";
import { whatsappLink } from "@/lib/site";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/industries", label: "Industries We Serve" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/services", label: "Our Services" },
      { href: "/manufacturers", label: "For Manufacturers & Suppliers" },
      { href: "/buyers", label: "For Buyers" },
      { href: "/contact#consultation", label: "Book a Consultation" },
    ],
  },
];

export function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 text-white/70">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:py-20">
        <div>
          <Link href="/" aria-label={`${settings.companyName} — home`} className="inline-block">
            <Image src="/brand/logo-full.png" alt={settings.companyName} width={720} height={628} className="h-auto w-44" />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            B2B lead generation, buyer–supplier matchmaking and international sourcing support for manufacturers,
            suppliers and industrial buyers.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{col.title}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Get in touch</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={`mailto:${settings.email}`} className="flex items-start gap-3 hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                {settings.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(settings.whatsapp, settings.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                WhatsApp {settings.phone}
              </a>
            </li>
            <li>
              <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} className="flex items-start gap-3 hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                {settings.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
              {settings.address}
            </li>
            {settings.linkedin && (
              <li>
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white">
                  <Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.companyName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
