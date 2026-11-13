import Link from "next/link";
import type { ReactNode } from "react";

/** Inner-page hero: breadcrumb, display title and introduction (Figma "Hero" on inner pages). */
export function PageHero({
  crumb,
  crumbs,
  title,
  intro,
  children,
  className,
}: {
  crumb?: string;
  crumbs?: Array<{ label: string; href?: string }>;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const trail = crumbs ?? [{ label: crumb ?? "" }];
  return (
    <section className={`section bg-green page-hero ${className ?? ""}`}>
      <nav className="t-label page-hero__crumb" aria-label="Breadcrumb">
        <Link href="/">Ana səhifə</Link>
        {trail.map((c) => (
          <span key={c.label}>
            {"  /  "}
            {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </span>
        ))}
      </nav>
      <h1 className="t-display page-hero__title">{title}</h1>
      {intro && <p className="t-body page-hero__intro">{intro}</p>}
      {children}
    </section>
  );
}
