"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { loadTurnstile, TURNSTILE_SITE_KEY, type TurnstileApi } from "@/lib/turnstile";
import { Button } from "./Button";
import { Field, TextArea } from "./Field";

type Status = "idle" | "sending" | "sent" | "error" | "captcha";

const API = process.env.NEXT_PUBLIC_API_URL;
/** Captcha runs only when the form really posts to the API and a site key is set. */
const CAPTCHA = Boolean(API && TURNSTILE_SITE_KEY);

/**
 * Enquiry form (Figma "Enquiry form"). Posts to the Laravel API when
 * NEXT_PUBLIC_API_URL is set; otherwise it only confirms locally.
 * Protected by a Cloudflare Turnstile captcha (NEXT_PUBLIC_TURNSTILE_SITE_KEY)
 * in "interaction-only" mode: invisible unless Cloudflare needs the visitor
 * to click, so the Figma layout is unchanged for almost everyone.
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
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widget = useRef<{ api: TurnstileApi; id: string } | null>(null);
  const token = useRef("");
  const waiters = useRef<Array<(token: string) => void>>([]);

  useEffect(() => {
    if (!CAPTCHA) return;
    let cancelled = false;
    const setToken = (value: string) => {
      token.current = value;
      if (value) waiters.current.splice(0).forEach((resolve) => resolve(value));
    };
    loadTurnstile()
      .then((api) => {
        if (cancelled || !captchaRef.current) return;
        const id = api.render(captchaRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          appearance: "interaction-only",
          theme: "light",
          "response-field": false,
          callback: setToken,
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
          "before-interactive-callback": () => setCaptchaVisible(true),
          "after-interactive-callback": () => setCaptchaVisible(false),
        });
        widget.current = { api, id };
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      if (widget.current) widget.current.api.remove(widget.current.id);
      widget.current = null;
    };
  }, []);

  /** Resolves with a captcha token, waiting briefly if the check is still running. */
  function captchaToken(timeoutMs = 15000): Promise<string> {
    if (token.current) return Promise.resolve(token.current);
    return new Promise((resolve) => {
      const done = (value: string) => {
        clearTimeout(timer);
        resolve(value);
      };
      const timer = setTimeout(() => {
        waiters.current = waiters.current.filter((w) => w !== done);
        resolve("");
      }, timeoutMs);
      waiters.current.push(done);
    });
  }

  function resetCaptcha() {
    token.current = "";
    if (widget.current) widget.current.api.reset(widget.current.id);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      if (API) {
        const payload: Record<string, FormDataEntryValue> = Object.fromEntries(
          [...new FormData(form)].filter(([k, v]) => k !== "website" || v),
        );
        if (CAPTCHA) {
          const captcha = await captchaToken();
          if (!captcha) {
            resetCaptcha();
            setStatus("captcha");
            return;
          }
          payload.captcha = captcha;
        }
        const res = await fetch(`${API}/enquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        // Tokens are single-use: fetch a fresh one for any next submission.
        if (CAPTCHA) resetCaptcha();
        if (res.status === 422) {
          const body = await res.json().catch(() => null);
          if (body?.errors?.captcha) {
            setStatus("captcha");
            return;
          }
        }
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
      {CAPTCHA && <div ref={captchaRef} className={`form-captcha${captchaVisible ? " is-visible" : ""}`} />}
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Göndərilir…" : submitLabel}
      </Button>
      <p className="form-note" role="status" aria-live="polite">
        {status === "sent"
          ? "Təşəkkür edirik! Komandamız tezliklə sizinlə əlaqə saxlayacaq."
          : status === "captcha"
            ? "Təhlükəsizlik yoxlaması alınmadı. Zəhmət olmasa, yenidən göndərin."
            : status === "error"
            ? "Göndərmək alınmadı. Zəhmət olmasa, bir az sonra yenidən cəhd edin."
            : "Göndərməklə məxfilik siyasəti ilə razılaşırsınız."}
      </p>
    </form>
  );
}
