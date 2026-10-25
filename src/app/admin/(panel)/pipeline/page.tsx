import { listLeads } from "@/lib/leads";
import { todayUtc } from "@/lib/sql";
import { PageTitle } from "@/components/admin/AdminUi";
import { PipelineBoard, type BoardCard } from "@/components/admin/PipelineBoard";

export const metadata = { title: "Pipeline" };

export default async function PipelinePage() {
  const leads = await listLeads({}, 400);
  const cards: BoardCard[] = leads.map((l) => ({
    id: l.id,
    ref: l.ref,
    type: l.type,
    status: l.status,
    title: l.company || l.name,
    subtitle: [l.name, l.country].filter(Boolean).join(" · "),
    product: String(l.data.category ?? ""),
    followUpDate: l.followUpDate,
  }));

  return (
    <>
      <PageTitle
        title="Pipeline"
        subtitle="Drag a lead to another column to change its status (or use the menu on each card). Changes save automatically."
      />
      <PipelineBoard initial={cards} today={todayUtc()} />
    </>
  );
}
