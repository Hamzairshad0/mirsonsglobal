"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { checkPassword, createSession, destroySession, isAuthenticated } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { addNote, deleteLead, deleteNote, updateLead } from "@/lib/leads";
import { CONTENT_TAG, resetContent, saveContent } from "@/lib/content";
import { sections, type ContentKey } from "@/lib/content-schema";

async function guard() {
  if (!(await isAuthenticated())) throw new Error("Not authorised");
}

export async function loginAction(_prev: { error?: string } | undefined, formData: FormData) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`login:${ip}`, 8, 15 * 60 * 1000)) {
    return { error: "Too many attempts. Please wait 15 minutes and try again." };
  }
  if (!checkPassword(String(formData.get("password") ?? ""))) {
    return { error: "Incorrect password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function updateLeadAction(formData: FormData) {
  await guard();
  const id = Number(formData.get("id"));
  await updateLead(id, String(formData.get("status")), String(formData.get("followUpDate") ?? "") || null);
  revalidatePath("/admin", "layout");
}

export async function addNoteAction(formData: FormData) {
  await guard();
  const id = Number(formData.get("id"));
  const body = String(formData.get("body") ?? "").trim();
  if (body) await addNote(id, body);
  revalidatePath(`/admin/leads/${id}`);
}

export async function deleteNoteAction(formData: FormData) {
  await guard();
  await deleteNote(Number(formData.get("noteId")));
  revalidatePath(`/admin/leads/${formData.get("id")}`);
}

export async function deleteLeadAction(formData: FormData) {
  await guard();
  await deleteLead(Number(formData.get("id")));
  revalidatePath("/admin", "layout");
  redirect("/admin/leads");
}

function refreshSite() {
  revalidateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}

export async function saveContentAction(key: ContentKey, value: unknown): Promise<{ ok: boolean; error?: string }> {
  await guard();
  if (!sections.some((s) => s.key === key)) return { ok: false, error: "Unknown section" };
  try {
    await saveContent(key, value);
    refreshSite();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Could not save" };
  }
}

export async function resetContentAction(key: ContentKey) {
  await guard();
  await resetContent(key);
  refreshSite();
  redirect(`/admin/content/${key}?reset=1`);
}
