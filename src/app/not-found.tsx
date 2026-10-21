import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WorldMap } from "@/components/ui";
import { getContent } from "@/lib/content";

export default async function NotFound() {
  const settings = await getContent("settings");
  return (
    <>
      <Header />
      <main>
        <section className="on-dark relative flex min-h-[80svh] items-center overflow-hidden bg-navy-900 pt-32 pb-24 text-white">
          <WorldMap className="absolute top-1/2 left-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-25 lg:w-full" />
          <div className="container-x relative max-w-2xl text-center">
            <p className="font-serif text-7xl font-semibold text-gold-400">404</p>
            <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">This page could not be found</h1>
            <p className="mt-4 text-white/70">The page may have moved, or the link may be incorrect.</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/" className="btn-gold">Go to homepage</Link>
              <Link href="/contact" className="btn-outline-light">Contact us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
