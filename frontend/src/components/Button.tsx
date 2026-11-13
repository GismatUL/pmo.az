import Link from "next/link";
import type { ComponentProps } from "react";
import { ARROW } from "@/lib/site";

type Variant = "primary" | "secondary";

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** PMO / Button / Primary · Secondary rendered as a link. */
export function LinkButton({
  variant = "primary",
  label,
  href,
  arrow = true,
}: {
  variant?: Variant;
  label: string;
  href: string;
  arrow?: boolean;
}) {
  const text = arrow ? `${label}${ARROW}` : label;
  if (isExternal(href)) {
    return (
      <a className={`btn btn-${variant}`} href={href} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
  }
  return (
    <Link className={`btn btn-${variant}`} href={href}>
      {text}
    </Link>
  );
}

/** PMO / Button rendered as a <button>. */
export function Button({
  variant = "secondary",
  arrow = true,
  children,
  className,
  ...rest
}: ComponentProps<"button"> & { variant?: Variant; arrow?: boolean }) {
  return (
    <button className={`btn btn-${variant} ${className ?? ""}`} {...rest}>
      {children}
      {arrow && ARROW}
    </button>
  );
}

/** Inline "Label  ↗" text link. */
export function TextLink({ href, label, className }: { href: string; label: string; className?: string }) {
  const cls = `text-link ${className ?? ""}`.trim();
  if (isExternal(href)) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {`${label}${ARROW}`}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {`${label}${ARROW}`}
    </Link>
  );
}
