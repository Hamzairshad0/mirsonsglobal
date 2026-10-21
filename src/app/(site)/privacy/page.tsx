import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mirsons Global collects, uses and protects the information you share with us.",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyPage() {
  const s = await getContent("settings");
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" intro="Last updated: October 2026" />
      <section className="py-16 sm:py-20">
        <article className="container-x prose-legal max-w-3xl">
          <p>
            This policy explains how {s.companyName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and uses information when you
            visit this website or submit an inquiry. We only collect what we need to respond to business requests and to
            provide our services.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>Contact details you provide, such as your name, company, job title, email address, phone/WhatsApp number and country.</li>
            <li>Business information you provide, such as products, specifications, quantities, target markets and requirements.</li>
            <li>Basic technical information, such as browser type and pages visited, collected through privacy-conscious analytics.</li>
          </ul>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your inquiry and arrange consultations or meetings.</li>
            <li>To identify potential buyers, suppliers or partners relevant to your request.</li>
            <li>To send you acknowledgements and follow-up communication about your request.</li>
            <li>To improve our website and services.</li>
          </ul>
          <p>We do not sell your personal information. We do not use it for unrelated marketing without your consent.</p>

          <h2>Sharing</h2>
          <p>
            Where our service involves an introduction, we share only the details needed for that introduction, and only with
            your agreement. We use trusted service providers (for example website hosting, database and email providers) who
            process data on our behalf under appropriate safeguards.
          </p>

          <h2>Retention</h2>
          <p>
            We keep inquiry records for as long as needed to handle your request and maintain a business relationship, or as
            required by law. You can ask us to delete your information at any time.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you are located, you may have the right to access, correct or delete your personal data, or to
            object to its processing. To make a request, contact us at <a href={`mailto:${s.email}`} className="text-navy-900 underline">{s.email}</a>.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This website uses only essential cookies and, where enabled, privacy-friendly analytics to understand overall traffic.
            We do not use advertising cookies.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to <a href={`mailto:${s.email}`} className="text-navy-900 underline">{s.email}</a>.
          </p>
        </article>
      </section>
    </>
  );
}
