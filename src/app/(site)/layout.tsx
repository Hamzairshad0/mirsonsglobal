import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RevealObserver } from "@/components/RevealObserver";
import { getContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getContent("settings");
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.companyName,
    url: siteUrl(),
    logo: `${siteUrl()}/brand/logo-full.png`,
    email: settings.email,
    telephone: settings.phone,
    sameAs: settings.linkedin ? [settings.linkedin] : [],
    description: "B2B lead generation, buyer–supplier matchmaking and international sourcing agency.",
  };
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton settings={settings} />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
    </>
  );
}
