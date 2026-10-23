import "server-only";
import { db } from "./db";
import { makeRepo } from "./repo";

export type { Lead, LeadFilters } from "./repo";

export const repo = makeRepo(db);
export const { listLeads, getLead, updateLead, addNote, deleteNote, deleteLead, leadStats } = repo;
