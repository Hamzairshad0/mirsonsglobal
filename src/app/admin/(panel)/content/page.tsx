import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContentUpdatedAt } from "@/lib/content";
import { sections } from "@/lib/content-schema";
import { formatDate, PageTitle } from "@/components/admin/AdminUi";

export const metadata = { title: "Website content" };

export default async function ContentIndex() {
  const updated = await getContentUpdatedAt();
  return (
    <>
      <PageTitle
        title="Website content"
        subtitle="Edit text, contact details, services, industries, FAQs and SEO. Changes go live as soon as you save."
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <li key={s.key}>
            <Link href={`/admin/content/${s.key}`} className="card group flex h-full items-start justify-between gap-6 p-6 hover:border-gold-500">
              <span>
                <span className="block font-serif text-xl font-semibold text-navy-900">{s.title}</span>
                <span className="mt-1 block text-sm text-muted">{s.description}</span>
                <span className="mt-3 block text-xs text-muted">
                  {updated[s.key] ? `Last edited ${formatDate(updated[s.key], true)}` : "Using default text"}
                </span>
              </span>
              <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gold-600 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
