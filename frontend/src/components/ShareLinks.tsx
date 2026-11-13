"use client";

import { useState } from "react";

/** "LinkedIn  ·  Facebook  ·  Keçidi kopyala" share row. */
export function ShareLinks() {
  const [copied, setCopied] = useState(false);
  const url = () => (typeof window === "undefined" ? "" : encodeURIComponent(window.location.href));

  return (
    <p className="t-label c-ink share-links">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url()}`, "_blank", "noopener");
        }}
      >
        LinkedIn
      </a>
      {"  ·  "}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${url()}`, "_blank", "noopener");
        }}
      >
        Facebook
      </a>
      {"  ·  "}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard unavailable */
          }
        }}
      >
        {copied ? "Kopyalandı ✓" : "Keçidi kopyala"}
      </button>
    </p>
  );
}
