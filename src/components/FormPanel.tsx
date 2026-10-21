import { Clock, Lock, MessageCircle } from "lucide-react";
import type { Settings } from "@/lib/content-schema";
import { whatsappLink } from "@/lib/site";

// Two-column layout: form on the left, reassurance + direct contact on the right.
export function FormPanel({
  id,
  eyebrow,
  title,
  intro,
  settings,
  aside,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  settings: Settings;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="bg-sand py-20 sm:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
        <div className="card p-6 sm:p-10">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold text-navy-900">{title}</h2>
          <p className="mt-3 mb-10 leading-relaxed text-muted">{intro}</p>
          {children}
        </div>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {aside}
          <div className="rounded-xl bg-navy-900 p-7 text-white">
            <ul className="space-y-5 text-sm">
              <li className="flex gap-3">
                <Clock className="h-5 w-5 shrink-0 text-gold-400" aria-hidden />
                <span className="text-white/80">We review every submission and reply within 1–2 business days.</span>
              </li>
              <li className="flex gap-3">
                <Lock className="h-5 w-5 shrink-0 text-gold-400" aria-hidden />
                <span className="text-white/80">Your information is confidential and never shared without permission.</span>
              </li>
            </ul>
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-sm text-white/60">Prefer to talk directly?</p>
              <a
                href={whatsappLink(settings.whatsapp, settings.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-semibold text-gold-400 hover:text-gold-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp our team
              </a>
              <a href={`mailto:${settings.email}`} className="mt-2 block text-sm text-white/80 hover:text-white">
                {settings.email}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
