"use client";

import {
  BUYER_COMPANY_TYPES,
  BUYER_TYPE_OPTIONS,
  CONSULT_ROLES,
  CONTACT_METHODS,
  EXPORT_EXPERIENCE,
  INCOTERMS,
  ORDER_FREQUENCY,
  TIMELINES,
} from "@/lib/inquiry";
import { CheckboxGroup, FormSection, InquiryForm, SelectField, TextArea, TextField } from "./FormKit";

function ContactFields({ companyRequired = true }: { companyRequired?: boolean }) {
  return (
    <>
      <TextField name="name" label="Full name" required autoComplete="name" />
      <TextField name="company" label="Company name" required={companyRequired} autoComplete="organization" />
      <TextField name="email" label="Business email" type="email" required autoComplete="email" />
      <TextField name="phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" placeholder="+971 50 123 4567" />
      <TextField name="country" label="Country" required autoComplete="country-name" />
    </>
  );
}

export function ManufacturerForm({ categories }: { categories: string[] }) {
  return (
    <InquiryForm type="manufacturer" submitLabel="Find Qualified Buyers">
      <FormSection title="Your company">
        <ContactFields />
        <TextField name="jobTitle" label="Job title" autoComplete="organization-title" />
        <TextField name="website" label="Company website" type="url" placeholder="https://" className="sm:col-span-2" />
      </FormSection>

      <FormSection title="Your products">
        <SelectField name="category" label="Product category" required options={[...categories, "Other"]} />
        <SelectField name="exportExperience" label="Export experience" options={EXPORT_EXPERIENCE} />
        <TextArea
          name="products"
          label="Products you want to sell"
          required
          rows={3}
          placeholder="e.g. Galvanised steel pipes, 1/2” – 8”, ASTM A53"
          className="sm:col-span-2"
        />
        <TextField name="capacity" label="Production / supply capacity" placeholder="e.g. 2,000 MT per month" />
        <TextField name="certifications" label="Certifications" placeholder="e.g. ISO 9001, CE, SGS" />
      </FormSection>

      <FormSection title="Your target markets">
        <TextField name="currentMarkets" label="Where do you sell today?" placeholder="e.g. Domestic, UAE" />
        <TextField name="targetMarkets" label="Markets you want to enter" required placeholder="e.g. Saudi Arabia, Germany, Kenya" />
        <div className="sm:col-span-2">
          <CheckboxGroup name="buyerTypes" label="Preferred buyer types" options={BUYER_TYPE_OPTIONS} />
        </div>
        <TextArea name="message" label="Anything else we should know?" rows={3} className="sm:col-span-2" />
      </FormSection>
    </InquiryForm>
  );
}

export function BuyerForm({ categories }: { categories: string[] }) {
  return (
    <InquiryForm type="buyer" submitLabel="Submit Sourcing Requirements">
      <FormSection title="Your company">
        <ContactFields />
        <SelectField name="buyerType" label="Company type" required options={BUYER_COMPANY_TYPES} />
      </FormSection>

      <FormSection title="Product requirement">
        <SelectField name="category" label="Product category" required options={[...categories, "Other"]} />
        <TextField name="product" label="Product required" required placeholder="e.g. PVC resin K67" />
        <TextArea
          name="specifications"
          label="Specifications & quality requirements"
          required
          rows={4}
          placeholder="Grade, size, standards, packaging, certifications, inspection…"
          className="sm:col-span-2"
        />
        <TextField name="quantity" label="Quantity" required placeholder="e.g. 500 MT / 2 x 40ft containers" />
        <SelectField name="frequency" label="Order frequency" options={ORDER_FREQUENCY} />
      </FormSection>

      <FormSection title="Delivery & timeline">
        <TextField name="destination" label="Destination port / city" required placeholder="e.g. Jebel Ali, UAE" />
        <SelectField name="incoterm" label="Preferred Incoterm" options={INCOTERMS} />
        <SelectField name="timeline" label="Purchasing timeline" required options={TIMELINES} />
        <TextField name="targetPrice" label="Target price / budget" placeholder="e.g. USD 780 / MT CIF" />
        <TextArea name="message" label="Additional information" rows={3} className="sm:col-span-2" />
      </FormSection>
    </InquiryForm>
  );
}

export function ConsultationForm() {
  return (
    <InquiryForm type="consultation" submitLabel="Request a Consultation">
      <FormSection title="Your details">
        <ContactFields companyRequired={false} />
        <SelectField name="role" label="I am a" required options={CONSULT_ROLES} />
      </FormSection>
      <FormSection title="Your requirements">
        <TextArea
          name="requirements"
          label="What would you like to discuss?"
          required
          rows={5}
          placeholder="Tell us what you manufacture or need to source, where you sell today and which markets you are targeting."
          className="sm:col-span-2"
        />
        <SelectField name="contactMethod" label="Preferred contact method" options={CONTACT_METHODS} />
        <TextField name="preferredTime" label="Preferred day / time (with time zone)" placeholder="e.g. Weekdays 10:00–13:00 GST" />
      </FormSection>
    </InquiryForm>
  );
}
