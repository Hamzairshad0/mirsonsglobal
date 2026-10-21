import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { getContent } from "@/lib/content";
import { whatsappLink } from "@/lib/site";
import { WorldMap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

const COPY: Record<string, { title: string; text: string }> = {
  manufacturer: {
    title: "Thank you — we've received your details",
    text: "Our team will review your products and target markets and contact you to arrange a short strategy call.",
  },
  buyer: {
    title: "Thank you — your sourcing request is in",
    text: "We'll review your requirement, confirm any open details with you and begin identifying suitable suppliers.",
  },
  consultation: {
    title: "Thank you — consultation requested",
    text: "We'll contact you using your preferred method to confirm a convenient meeting time.",
  },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ type?: string; ref?: string }> }) {
  const [{ type, ref }, settings] = await Promise.all([searchParams, getContent("settings")]);
  const copy = COPY[type ?? ""] ?? COPY.consultation;
  const showRef = ref && /^MG-\d+$/.test(ref);

  return (
    <section className="on-dark relative flex min-h-[85svh] items-center overflow-hidden bg-navy-900 pt-32 pb-24 text-white">
      <WorldMap className="absolute top-1/2 left-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-25 lg:w-full" />
      <div className="container-x relative max-w-2xl text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold-400" strokeWidth={1.25} aria-hidden />
        <h1 className="mt-8 text-4xl leading-tight font-semibold sm:text-5xl">{copy.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-white/75">{copy.text}</p>
        {showRef && (
          <p className="mt-8 inline-block rounded-md border border-gold-500/40 bg-white/5 px-5 py-3 text-sm text-white/80">
            Your reference: <strong className="font-semibold text-gold-300">{ref}</strong>
          </p>
        )}
        <p className="mt-6 text-sm text-white/55">A confirmation has been sent to your email. Expect a reply within 1–2 business days.</p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-gold">
            Back to home
          </Link>
          <a href={whatsappLink(settings.whatsapp, settings.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
            <MessageCircle className="h-4 w-4" aria-hidden /> Message us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
