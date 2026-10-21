import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { getContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [seo, settings] = await Promise.all([getContent("seo"), getContent("settings")]);
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: seo.siteTitle, template: `%s | ${settings.companyName}` },
    description: seo.siteDescription,
    keywords: seo.keywords.split(",").map((k) => k.trim()).filter(Boolean),
    applicationName: settings.companyName,
    openGraph: {
      type: "website",
      siteName: settings.companyName,
      title: seo.siteTitle,
      description: seo.siteDescription,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: seo.siteTitle, description: seo.siteDescription },
    alternates: { canonical: "/" },
  };
}

export const viewport: Viewport = { themeColor: "#081526" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        {plausible && (
          <Script defer data-domain={plausible} src="https://plausible.io/js/script.tagged-events.js" strategy="afterInteractive" />
        )}
        {ga && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
