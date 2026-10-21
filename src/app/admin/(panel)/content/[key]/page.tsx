import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { sections } from "@/lib/content-schema";
import { PageTitle } from "@/components/admin/AdminUi";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { resetContentAction } from "../../../actions";

export const metadata = { title: "Edit content" };

export default async function EditContent({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ reset?: string }>;
}) {
  const [{ key }, { reset }] = await Promise.all([params, searchParams]);
  const spec = sections.find((s) => s.key === key);
  if (!spec) notFound();
  const value = await getContent(spec.key);

  return (
    <>
      <Link href="/admin/content" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-navy-900">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Website content
      </Link>
      <div className="mt-4">
        <PageTitle title={spec.title} subtitle={spec.description} />
      </div>
      {reset && (
        <p className="mb-6 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Restored to the default text.
        </p>
      )}
      <ContentEditor spec={spec} initial={value as never} />
      <form action={resetContentAction.bind(null, spec.key)} className="mt-10 border-t border-line pt-6">
        <button className="text-xs text-muted underline hover:text-red-600">Restore default text for this section</button>
      </form>
    </>
  );
}
