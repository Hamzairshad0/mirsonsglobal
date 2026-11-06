import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardList, PackageCheck } from "lucide-react";
import { lines, productImage, type Offer, type Product } from "@/lib/content-schema";
import { delay } from "./ui";

export function productHref(p: Pick<Product, "category" | "slug">) {
  return `/industries/${p.category}#${p.slug}`;
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <li data-reveal style={delay(index, 70)}>
      <Link
        href={productHref(product)}
        className="photo-zoom lift group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white hover:border-gold-500/60"
      >
        <span className="relative block aspect-[16/10] overflow-hidden bg-navy-900">
          <Image src={productImage(product)} alt="" fill quality={60} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        </span>
        <span className="flex flex-1 flex-col p-6">
          <span className="font-serif text-lg leading-snug font-semibold text-navy-900">{product.name}</span>
          <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.summary}</span>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-gold-700">
            Product details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </span>
      </Link>
    </li>
  );
}

/** "What you receive / What we need from you" — the concrete offer for manufacturers. */
export function OfferSection({ offer, id = "offer" }: { offer: Offer; id?: string }) {
  const blocks = [
    {
      icon: PackageCheck,
      title: "What you receive",
      intro: "A defined, accountable piece of work — not open-ended “marketing”.",
      items: lines(offer.receive),
      dark: true,
    },
    {
      icon: ClipboardList,
      title: "What we need from you",
      intro: "The information that lets us target the right buyers and qualify them properly.",
      items: lines(offer.need),
      dark: false,
    },
  ];
  return (
    <section id={id} className="py-14 sm:py-20">
      <div className="container-x">
        <div data-reveal className="max-w-3xl">
          <p className="eyebrow">For manufacturers & suppliers</p>
          <h2 className="mt-4 text-3xl leading-tight font-semibold text-navy-900 sm:text-4xl">Exactly what working with us involves</h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Before any outreach starts, both sides know what will be delivered and what information is required.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {blocks.map((b, i) => (
            <div
              key={b.title}
              data-reveal
              style={delay(i, 120)}
              className={`rounded-2xl p-8 sm:p-10 ${b.dark ? "bg-navy-900 text-white" : "border border-line bg-white"}`}
            >
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                  b.dark ? "bg-gold-500 text-navy-950" : "bg-navy-900 text-gold-400"
                }`}
              >
                <b.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <h3 className={`mt-6 text-2xl font-semibold ${b.dark ? "text-white" : "text-navy-900"}`}>{b.title}</h3>
              <p className={`mt-2 text-sm ${b.dark ? "text-white/60" : "text-muted"}`}>{b.intro}</p>
              <ol className="mt-7 space-y-4">
                {b.items.map((item, n) => (
                  <li key={item} className="flex gap-4">
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-serif text-xs font-semibold ${
                        b.dark ? "bg-white/10 text-gold-300" : "bg-gold-500/15 text-gold-700"
                      }`}
                    >
                      {n + 1}
                    </span>
                    <span className={`text-[15px] leading-relaxed ${b.dark ? "text-white/85" : "text-ink/85"}`}>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/pilot" className="btn-navy">
            See the Pilot Programme <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/sample-report" className="btn-outline">
            View a sample report
          </Link>
        </div>
      </div>
    </section>
  );
}
