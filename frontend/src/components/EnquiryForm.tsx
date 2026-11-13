"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./Button";
import { Field, TextArea } from "./Field";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Enquiry form (Figma "Enquiry form"). Posts to the Laravel API when
 * NEXT_PUBLIC_API_URL is set; otherwise it only confirms locally.
 */
export function EnquiryForm({
  fields = ["name", "email", "message"],
  submitLabel = "Müraciəti göndər",
  messagePlaceholder = "Sizə necə kömək edə bilərik?",
  source,
  className,
}: {
  source?: string;
  fields?: Array<"name" | "email" | "phone" | "company" | "message">;
  submitLabel?: string;
  messagePlaceholder?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const api = process.env.NEXT_PUBLIC_API_URL;
    setStatus("sending");
    try {
      if (api) {
        const res = await fetch(`${api}/enquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(Object.fromEntries([...new FormData(form)].filter(([k, v]) => k !== "website" || v))),
        });
        if (!res.ok) throw new Error(String(res.status));
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={`enquiry-form ${className ?? ""}`} onSubmit={onSubmit}>
      {source && <input type="hidden" name="source" value={source} />}
      {/* Honeypot: hidden from people, filled by bots; the API rejects it. */}
      <input className="sr-only" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {fields.includes("name") && (
        <Field label="Ad və soyad" name="name" placeholder="Adınızı daxil edin" autoComplete="name" required />
      )}
      {fields.includes("company") && (
        <Field label="Təşkilat" name="company" placeholder="Təşkilatın adı" autoComplete="organization" />
      )}
      {fields.includes("email") && (
        <Field label="E-poçt" name="email" type="email" placeholder="name@company.az" autoComplete="email" required />
      )}
      {fields.includes("phone") && (
        <Field label="Telefon" name="phone" type="tel" placeholder="+994 __ ___ __ __" autoComplete="tel" />
      )}
      {fields.includes("message") && (
        <TextArea label="Müraciətiniz" name="message" placeholder={messagePlaceholder} required />
      )}
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Göndərilir…" : submitLabel}
      </Button>
      <p className="form-note" role="status" aria-live="polite">
        {status === "sent"
          ? "Təşəkkür edirik! Komandamız tezliklə sizinlə əlaqə saxlayacaq."
          : status === "error"
            ? "Göndərmək alınmadı. Zəhmət olmasa, bir az sonra yenidən cəhd edin."
            : "Göndərməklə məxfilik siyasəti ilə razılaşırsınız."}
      </p>
    </form>
  );
}
