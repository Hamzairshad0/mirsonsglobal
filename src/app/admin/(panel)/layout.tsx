import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileText, LayoutDashboard, LogOut, Users } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "../actions";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin · Mirsons Global" },
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/content", label: "Website content", icon: FileText },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-svh bg-ivory lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="bg-navy-950 text-white/80 lg:sticky lg:top-0 lg:h-svh">
        <div className="flex items-center justify-between gap-4 px-5 py-5 lg:block">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/brand/logo-mark.png" alt="" width={360} height={257} className="h-8 w-auto" />
            <span className="font-serif text-sm tracking-[0.12em] text-gold-400">MIRSONS · ADMIN</span>
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:pb-0">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm whitespace-nowrap hover:bg-white/10 hover:text-white"
            >
              <n.icon className="h-4 w-4 text-gold-500" aria-hidden /> {n.label}
            </Link>
          ))}
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm whitespace-nowrap hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-4 w-4 text-gold-500" aria-hidden /> View website
          </a>
          <form action={logoutAction} className="lg:mt-6 lg:border-t lg:border-white/10 lg:pt-4">
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm whitespace-nowrap hover:bg-white/10 hover:text-white">
              <LogOut className="h-4 w-4 text-gold-500" aria-hidden /> Sign out
            </button>
          </form>
        </nav>
      </aside>
      <div className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">{children}</div>
    </div>
  );
}
