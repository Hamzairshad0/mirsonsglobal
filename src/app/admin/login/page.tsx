import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");
  return (
    <main className="flex min-h-svh items-center justify-center bg-navy-950 px-5">
      <div className="w-full max-w-sm">
        <Image src="/brand/logo-full.png" alt="Mirsons Global" width={720} height={628} className="mx-auto h-auto w-40" priority />
        <div className="mt-10 rounded-xl bg-white p-8">
          <h1 className="text-2xl font-semibold text-navy-900">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted">Lead dashboard and website content.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
