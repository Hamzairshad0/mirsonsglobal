import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing the use of the Mirsons Global website.",
  alternates: { canonical: "/terms" },
};

export default async function TermsPage() {
  const s = await getContent("settings");
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" intro="Last updated: October 2026" />
      <section className="py-16 sm:py-20">
        <article className="container-x prose-legal max-w-3xl">
          <p>
            By using this website you agree to these terms. If you do not agree, please do not use the website.
          </p>

          <h2>About our services</h2>
          <p>
            {s.companyName} provides business development services, including B2B lead generation, buyer identification,
            supplier sourcing, market research, appointment setting and buyer–supplier matchmaking. We are not a party to any
            sale or purchase contract between manufacturers and buyers, do not hold inventory, and do not guarantee the
            conclusion of any transaction.
          </p>

          <h2>Information on this website</h2>
          <p>
            Content on this website is provided for general information. While we aim to keep it accurate and current, we make no
            warranties about its completeness or suitability for any purpose. Specific services are governed by a separate written
            agreement.
          </p>

          <h2>Your submissions</h2>
          <p>
            When you submit a form, you confirm that the information is accurate and that you are authorised to share it on behalf
            of your company. You must not submit unlawful, misleading or harmful content.
          </p>

          <h2>Due diligence</h2>
          <p>
            Introductions are made in good faith based on information available to us. Buyers and suppliers remain responsible for
            their own due diligence, contracts, inspections, payments, compliance and logistics.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The {s.companyName} name, logo and website content are our property and may not be used without permission.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by law, we are not liable for any indirect or consequential loss arising from use of this
            website or from transactions between parties we introduce.
          </p>

          <h2>Changes</h2>
          <p>We may update these terms from time to time. The latest version will always be available on this page.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to <a href={`mailto:${s.email}`} className="text-navy-900 underline">{s.email}</a>.
          </p>
        </article>
      </section>
    </>
  );
}
