"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext, useRef, useState } from "react";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import type { InquiryType } from "@/lib/inquiry";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const ErrorsContext = createContext<Record<string, string>>({});

function formToObject(form: HTMLFormElement) {
  const out: Record<string, unknown> = {};
  const fd = new FormData(form);
  for (const [key, value] of fd.entries()) {
    if (key.endsWith("[]")) {
      const k = key.slice(0, -2);
      out[k] = [...((out[k] as string[]) ?? []), String(value)];
    } else if (key === "consent") {
      out.consent = true;
    } else {
      out[key] = String(value);
    }
  }
  return out;
}

export function InquiryForm({
  type,
  submitLabel,
  children,
}: {
  type: InquiryType;
  submitLabel: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const startedAt = useRef(Date.now());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setFormError("");
    const form = e.currentTarget;
    const { fax, ...fields } = formToObject(form);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, fields, fax, startedAt: startedAt.current, page: window.location.pathname }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(json.fieldErrors ?? {});
        setFormError(json.error ?? "Something went wrong. Please try again.");
        const first = json.fieldErrors && Object.keys(json.fieldErrors)[0];
        if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus?.();
        setPending(false);
        return;
      }
      window.plausible?.("Inquiry", { props: { type } });
      window.gtag?.("event", "generate_lead", { form_type: type });
      router.push(`/thank-you?type=${type}&ref=${encodeURIComponent(json.ref ?? "")}`);
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setPending(false);
    }
  }

  return (
    <ErrorsContext.Provider value={errors}>
      <form onSubmit={onSubmit} noValidate={false} className="space-y-6">
        {/* Honeypot: hidden from people, often filled by bots */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label>
            Fax
            <input type="text" name="fax" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {children}

        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-navy-900"
          />
          <span>
            I agree that Mirsons Global may store and use these details to respond to my request, as described in the{" "}
            <Link href="/privacy" className="underline decoration-gold-500 underline-offset-2" target="_blank">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && <p className="-mt-3 text-sm text-red-600">{errors.consent}</p>}

        {formError && (
          <div role="alert" className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {formError}
          </div>
        )}

        <button type="submit" className="btn-gold w-full sm:w-auto" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              {submitLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </form>
    </ErrorsContext.Provider>
  );
}

function useFieldError(name: string) {
  return useContext(ErrorsContext)[name];
}

type BaseProps = { name: string; label: string; required?: boolean; hint?: string; className?: string };

function FieldShell({ name, label, required, hint, className = "", children }: BaseProps & { children: React.ReactNode }) {
  const error = useFieldError(name);
  return (
    <div className={className}>
      <label htmlFor={`f-${name}`} className="field-label">
        {label}
        {required ? <span className="text-gold-600"> *</span> : <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`f-${name}-err`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>
      )}
    </div>
  );
}

export function TextField({
  type = "text",
  placeholder,
  autoComplete,
  ...props
}: BaseProps & { type?: string; placeholder?: string; autoComplete?: string }) {
  const error = useFieldError(props.name);
  return (
    <FieldShell {...props}>
      <input
        id={`f-${props.name}`}
        name={props.name}
        type={type}
        required={props.required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `f-${props.name}-err` : undefined}
        maxLength={500}
        className="field-input"
      />
    </FieldShell>
  );
}

export function TextArea({ placeholder, rows = 4, ...props }: BaseProps & { placeholder?: string; rows?: number }) {
  const error = useFieldError(props.name);
  return (
    <FieldShell {...props}>
      <textarea
        id={`f-${props.name}`}
        name={props.name}
        required={props.required}
        placeholder={placeholder}
        rows={rows}
        maxLength={3000}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `f-${props.name}-err` : undefined}
        className="field-input resize-y"
      />
    </FieldShell>
  );
}

export function SelectField({ options, ...props }: BaseProps & { options: string[] }) {
  const error = useFieldError(props.name);
  return (
    <FieldShell {...props}>
      <select
        id={`f-${props.name}`}
        name={props.name}
        required={props.required}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        className="field-input"
      >
        <option value="" disabled={props.required}>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function CheckboxGroup({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="field-label">
        {label} <span className="font-normal text-muted">(optional)</span>
      </legend>
      <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o}
            className="flex cursor-pointer items-center gap-3 rounded-md border border-line bg-white px-3.5 py-2.5 text-sm has-[:checked]:border-gold-500 has-[:checked]:bg-gold-500/5"
          >
            <input type="checkbox" name={`${name}[]`} value={o} className="h-4 w-4 accent-navy-900" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-5">
      <legend className="mb-5 w-full border-b border-line pb-3 font-serif text-lg font-semibold text-navy-900">{title}</legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
