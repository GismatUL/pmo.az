"use client";

import { useState } from "react";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className={`contact-form ${compact ? "compact" : ""}`}
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label>
        Ad və soyad
        <input name="name" placeholder="Adınızı daxil edin" required />
      </label>
      <label>
        E-poçt
        <input name="email" type="email" placeholder="name@company.az" required />
      </label>
      {!compact && (
        <label>
          Telefon
          <input name="phone" type="tel" placeholder="+994 __ ___ __ __" />
        </label>
      )}
      <label>
        Müraciətiniz
        <textarea name="message" placeholder="Məqsədiniz və ehtiyacınız haqqında yazın" required />
      </label>
      <button className="button dark" type="submit">
        {sent ? "Müraciət qəbul edildi" : "Müraciəti göndər ↗"}
      </button>
      <small>
        {sent
          ? "Təşəkkür edirik. Komandamız sizinlə əlaqə saxlayacaq."
          : "Göndərməklə məxfilik siyasəti ilə razılaşırsınız."}
      </small>
    </form>
  );
}
