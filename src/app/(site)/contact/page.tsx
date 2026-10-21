import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getContent } from "@/lib/content";
import { whatsappLink } from "@/lib/site";
import { FormPanel } from "@/components/FormPanel";
import { ConsultationForm } from "@/components/forms/Forms";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact Us — Request a Consultation",
  description:
    "Contact Mirsons Global by email or WhatsApp, or request a consultation to discuss finding international buyers or sourcing suppliers.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getContent("settings");
  const channels = [
    { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: settings.phone,
      href: whatsappLink(settings.whatsapp, settings.whatsappMessage),
      external: true,
    },
    { icon: Phone, label: "Phone", value: settings.phone, href: `tel:${settings.phone.replace(/[^\d+]/g, "")}` },
    { icon: Clock, label: "Business hours", value: settings.hours },
    { icon: MapPin, label: "Location", value: settings.address },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's discuss your requirements"
        intro="Request a consultation, email our team or message us on WhatsApp. We respond to every genuine business inquiry."
      />

      <section className="border-b border-line bg-white">
        <ul className="container-x grid gap-px sm:grid-cols-2 lg:grid-cols-5">
          {channels.map((c) => {
            const body = (
              <>
                <c.icon className="h-5 w-5 text-gold-600" strokeWidth={1.75} aria-hidden />
                <span className="mt-3 block text-xs font-semibold tracking-[0.16em] text-muted uppercase">{c.label}</span>
                <span className="mt-1 block text-sm font-medium break-words text-navy-900">{c.value}</span>
              </>
            );
            return (
              <li key={c.label} className="py-7 sm:px-4 lg:first:pl-0">
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="block hover:opacity-80"
                  >
                    {body}
                  </a>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <FormPanel
        id="consultation"
        eyebrow="Request a consultation"
        title="Book a consultation"
        intro="Share a few details and your preferred contact time. Our team will confirm a meeting time with you by email, phone or WhatsApp."
        settings={settings}
      >
        <ConsultationForm />
      </FormPanel>
    </>
  );
}
